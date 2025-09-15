import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { useGraphStore } from '../store/graph-store';
import { Icon } from './common/Icon';
import { MeasurementTools, type Measurement } from './viewport/MeasurementTools';
import type { MeshData, ShapeHandle } from '@brepflow/types';

export function Viewport() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const geometryGroupRef = useRef<THREE.Group | null>(null);
  const { graph, dagEngine } = useGraphStore();

  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [showMeasurementTools, setShowMeasurementTools] = useState(false);

  // Measurement handlers
  const handleMeasurementCreate = useCallback((measurement: Measurement) => {
    setMeasurements(prev => [...prev, measurement]);
  }, []);

  const handleMeasurementUpdate = useCallback((measurement: Measurement) => {
    setMeasurements(prev =>
      prev.map(m => m.id === measurement.id ? measurement : m)
    );
  }, []);

  const handleMeasurementDelete = useCallback((measurementId: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== measurementId));
  }, []);

  // Create Three.js mesh from tessellated geometry
  const createMeshFromTessellation = useCallback((meshData: MeshData, nodeId: string): THREE.Mesh => {
    const geometry = new THREE.BufferGeometry();

    // Set vertex positions
    geometry.setAttribute('position', new THREE.BufferAttribute(meshData.positions, 3));

    // Set normals if available
    if (meshData.normals) {
      geometry.setAttribute('normal', new THREE.BufferAttribute(meshData.normals, 3));
    } else {
      geometry.computeVertexNormals();
    }

    // Set indices for faces
    if (meshData.indices) {
      geometry.setIndex(new THREE.BufferAttribute(meshData.indices, 1));
    }

    // Create material with node-specific color
    const hue = Math.abs(nodeId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 360;
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(hue / 360, 0.7, 0.6),
      opacity: 0.8,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { nodeId, type: 'geometry' };

    return mesh;
  }, []);

  // Create simple geometry based on node type (mock implementation)
  const createSimpleGeometry = useCallback((node: any): THREE.Mesh | null => {
    const type = node.type.split('::')[1]?.toLowerCase();
    let geometry: THREE.BufferGeometry | null = null;

    switch (type) {
      case 'box':
        const width = node.params?.width || 100;
        const height = node.params?.height || 100;
        const depth = node.params?.depth || 100;
        geometry = new THREE.BoxGeometry(width, height, depth);
        break;

      case 'cylinder':
        const radius = node.params?.radius || 50;
        const cylHeight = node.params?.height || 100;
        geometry = new THREE.CylinderGeometry(radius, radius, cylHeight, 32);
        break;

      case 'sphere':
        const sphereRadius = node.params?.radius || 50;
        geometry = new THREE.SphereGeometry(sphereRadius, 32, 16);
        break;

      case 'union':
      case 'subtract':
      case 'intersect':
        // For Boolean operations, create a placeholder mesh
        // In a real implementation, this would compute the actual Boolean result
        geometry = new THREE.BoxGeometry(80, 80, 80);
        break;

      default:
        return null;
    }

    if (!geometry) return null;

    // Create material with node-specific color
    const hue = Math.abs(node.id.split('').reduce((a: number, b: string) => a + b.charCodeAt(0), 0)) % 360;
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(hue / 360, 0.7, 0.6),
      opacity: 0.9,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { nodeId: node.id, type: 'geometry' };

    // Position based on node position in graph (scaled down)
    if (node.position) {
      mesh.position.x = (node.position.x - 400) * 0.2;
      mesh.position.z = (node.position.y - 300) * 0.2;
    }

    return mesh;
  }, []);

  // Update 3D scene with current graph geometry
  const updateSceneGeometry = useCallback(async () => {
    if (!geometryGroupRef.current) return;

    // Clear existing geometry
    geometryGroupRef.current.clear();

    // Process all nodes with shape outputs
    const geometryNodes = graph.nodes.filter(node => {
      // Check if node has a shape output with a value
      return node.outputs?.shape?.value || node.outputs?.geometry?.value;
    });

    // If no real geometry yet, fall back to simple visualization for testing
    if (geometryNodes.length === 0) {
      const displayNodes = graph.nodes.filter(node =>
        node.type.startsWith('Solid::') || node.type.startsWith('Boolean::')
      );

      for (const node of displayNodes) {
        const mesh = createSimpleGeometry(node);
        if (mesh) {
          geometryGroupRef.current.add(mesh);
        }
      }
    } else {
      // Use real tessellation for nodes with shape outputs
      for (const node of geometryNodes) {
        try {
          const shapeHandle = (node.outputs?.shape?.value || node.outputs?.geometry?.value) as ShapeHandle;
          if (!shapeHandle || !shapeHandle.id || !dagEngine) continue;

          // Tessellate the shape with better quality
          const meshData = await dagEngine.geometryAPI.tessellate(shapeHandle.id, 0.01);

          // Create Three.js mesh
          const mesh = createMeshFromTessellation(meshData, node.id);
          geometryGroupRef.current.add(mesh);

        } catch (error) {
          console.warn(`Failed to tessellate geometry for node ${node.id}:`, error);
          // Fall back to simple geometry on error
          const mesh = createSimpleGeometry(node);
          if (mesh) {
            geometryGroupRef.current.add(mesh);
          }
        }
      }
    }

    // Fit view to show all geometry
    if (geometryGroupRef.current.children.length > 0) {
      const box = new THREE.Box3().setFromObject(geometryGroupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Position camera to see all geometry
      const camera = sceneRef.current?.userData?.camera;
      if (camera) {
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(
          center.x + maxDim,
          center.y + maxDim,
          center.z + maxDim
        );
        camera.lookAt(center);
      }
    }
  }, [graph.nodes, dagEngine, createMeshFromTessellation, createSimpleGeometry]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e1e1e);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Grid
    const gridHelper = new THREE.GridHelper(200, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Axes
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // Geometry group for CAD objects
    const geometryGroup = new THREE.Group();
    geometryGroup.name = 'geometry';
    scene.add(geometryGroup);
    geometryGroupRef.current = geometryGroup;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(100, 100, 50);
    scene.add(directionalLight);

    // Store camera reference for geometry fitting
    scene.userData.camera = camera;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update scene geometry when graph changes
  useEffect(() => {
    updateSceneGeometry();
  }, [updateSceneGeometry]);

  return (
    <div className="viewport" ref={mountRef}>
      <div className="viewport-toolbar">
        <button title="Shaded">
          <Icon name="shaded" size={16} />
        </button>
        <button title="Wireframe">
          <Icon name="wireframe" size={16} />
        </button>
        <button title="X-Ray">
          <Icon name="xray" size={16} />
        </button>
        <button title="Section">
          <Icon name="section" size={16} />
        </button>
        <span className="separator">|</span>
        <button title="Fit View">
          <Icon name="fit-view" size={16} />
        </button>
        <button title="Isolate">
          <Icon name="zoom" size={16} />
        </button>
        <button title="Hide">
          <Icon name="hide" size={16} />
        </button>
        <span className="separator">|</span>
        <button
          className={showMeasurementTools ? 'active' : ''}
          onClick={() => setShowMeasurementTools(!showMeasurementTools)}
          title="Measurement Tools"
        >
          <Icon name="measure-distance" size={16} />
        </button>
      </div>

      {showMeasurementTools && sceneRef.current && cameraRef.current && rendererRef.current && (
        <MeasurementTools
          scene={sceneRef.current}
          camera={cameraRef.current}
          renderer={rendererRef.current}
          onMeasurementCreate={handleMeasurementCreate}
          onMeasurementUpdate={handleMeasurementUpdate}
          onMeasurementDelete={handleMeasurementDelete}
        />
      )}
    </div>
  );
}