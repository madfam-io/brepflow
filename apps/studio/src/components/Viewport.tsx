import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useGraphStore } from '../store/graph-store';
import type { MeshData, ShapeHandle } from '@brepflow/types';

export function Viewport() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const geometryGroupRef = useRef<THREE.Group | null>(null);
  const { graph, dagEngine } = useGraphStore();

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

  // Update 3D scene with current graph geometry
  const updateSceneGeometry = useCallback(async () => {
    if (!geometryGroupRef.current || !dagEngine) return;

    // Clear existing geometry
    geometryGroupRef.current.clear();

    // Find nodes with geometry results
    const geometryNodes = graph.nodes.filter(node =>
      node.outputs.geometry && node.outputs.geometry.value
    );

    for (const node of geometryNodes) {
      try {
        const shapeHandle = node.outputs.geometry.value as ShapeHandle;
        if (!shapeHandle || !shapeHandle.id) continue;

        // Tessellate the shape
        const meshData = await dagEngine.geometryAPI.tessellate(shapeHandle.id, 0.1);

        // Create Three.js mesh
        const mesh = createMeshFromTessellation(meshData, node.id);
        geometryGroupRef.current.add(mesh);

      } catch (error) {
        console.warn(`Failed to tessellate geometry for node ${node.id}:`, error);
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
  }, [graph.nodes, dagEngine, createMeshFromTessellation]);

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
        <button title="Shaded">🎨</button>
        <button title="Wireframe">📐</button>
        <button title="X-Ray">👁️</button>
        <button title="Section">✂️</button>
        <span className="separator">|</span>
        <button title="Fit View">🎯</button>
        <button title="Isolate">🔍</button>
        <button title="Hide">👻</button>
      </div>
    </div>
  );
}