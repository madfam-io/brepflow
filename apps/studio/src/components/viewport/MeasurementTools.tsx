import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ToolbarIcon } from '../icons/IconSystem';
import './MeasurementTools.css';

export interface MeasurementPoint {
  id: string;
  position: THREE.Vector3;
  worldPosition: THREE.Vector3;
  type: 'vertex' | 'edge' | 'face' | 'free';
  nodeId?: string;
}

export interface Measurement {
  id: string;
  type: 'distance' | 'angle' | 'radius' | 'area' | 'volume';
  points: MeasurementPoint[];
  value: number;
  unit: string;
  label: string;
  visible: boolean;
}

interface MeasurementToolsProps {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  onMeasurementCreate?: (measurement: Measurement) => void;
  onMeasurementUpdate?: (measurement: Measurement) => void;
  onMeasurementDelete?: (measurementId: string) => void;
}

export const MeasurementTools: React.FC<MeasurementToolsProps> = ({
  scene,
  camera,
  renderer,
  onMeasurementCreate,
  onMeasurementUpdate,
  onMeasurementDelete,
}) => {
  const [activeTool, setActiveTool] = useState<'distance' | 'angle' | 'radius' | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [pendingPoints, setPendingPoints] = useState<MeasurementPoint[]>([]);
  const [showMeasurements, setShowMeasurements] = useState(true);

  const measurementGroupRef = useRef<THREE.Group | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Initialize measurement group
  useEffect(() => {
    const measurementGroup = new THREE.Group();
    measurementGroup.name = 'measurements';
    scene.add(measurementGroup);
    measurementGroupRef.current = measurementGroup;

    return () => {
      scene.remove(measurementGroup);
    };
  }, [scene]);

  // Handle mouse clicks for measurement placement
  const handleMouseClick = useCallback((event: MouseEvent) => {
    if (!activeToolRef.current || !measurementGroupRef.current) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);

    // Find intersections with geometry
    const geometryGroup = scene.getObjectByName('geometry');
    const intersects = geometryGroup ?
      raycasterRef.current.intersectObjects(geometryGroup.children, true) : [];

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const point: MeasurementPoint = {
        id: `point-${Date.now()}-${Math.random()}`,
        position: intersect.point.clone(),
        worldPosition: intersect.point.clone(),
        type: 'vertex',
        nodeId: intersect.object.userData?.nodeId,
      };

      setPendingPoints(prev => {
        const newPoints = [...prev, point];

        // Check if we have enough points for the current tool
        if (activeToolRef.current === 'distance' && newPoints.length === 2) {
          createDistanceMeasurement(newPoints);
          return [];
        } else if (activeToolRef.current === 'angle' && newPoints.length === 3) {
          createAngleMeasurement(newPoints);
          return [];
        } else if (activeToolRef.current === 'radius' && newPoints.length === 2) {
          createRadiusMeasurement(newPoints);
          return [];
        }

        return newPoints;
      });

      // Add visual indicator for the point
      addPointIndicator(point);
    }
  }, [camera, renderer, scene]);

  // Refs for accessing state in event handlers
  const activeToolRef = useRef(activeTool);
  const pendingPointsRef = useRef(pendingPoints);

  useEffect(() => { activeToolRef.current = activeTool; });
  useEffect(() => { pendingPointsRef.current = pendingPoints; });

  // Add mouse event listener when tool is active
  useEffect(() => {
    if (activeTool) {
      renderer.domElement.addEventListener('click', handleMouseClick);
      renderer.domElement.style.cursor = 'crosshair';
    } else {
      renderer.domElement.removeEventListener('click', handleMouseClick);
      renderer.domElement.style.cursor = 'default';
    }

    return () => {
      renderer.domElement.removeEventListener('click', handleMouseClick);
      renderer.domElement.style.cursor = 'default';
    };
  }, [activeTool, handleMouseClick, renderer]);

  // Create distance measurement
  const createDistanceMeasurement = useCallback((points: MeasurementPoint[]) => {
    if (points.length !== 2) return;

    const distance = points[0].position.distanceTo(points[1].position);
    const measurement: Measurement = {
      id: `distance-${Date.now()}`,
      type: 'distance',
      points: points,
      value: distance,
      unit: 'mm',
      label: `${distance.toFixed(2)} mm`,
      visible: true,
    };

    setMeasurements(prev => [...prev, measurement]);
    onMeasurementCreate?.(measurement);
    addDistanceVisualization(measurement);
  }, [onMeasurementCreate]);

  // Create angle measurement
  const createAngleMeasurement = useCallback((points: MeasurementPoint[]) => {
    if (points.length !== 3) return;

    // Calculate angle between three points
    const v1 = new THREE.Vector3().subVectors(points[0].position, points[1].position);
    const v2 = new THREE.Vector3().subVectors(points[2].position, points[1].position);
    const angle = v1.angleTo(v2) * (180 / Math.PI);

    const measurement: Measurement = {
      id: `angle-${Date.now()}`,
      type: 'angle',
      points: points,
      value: angle,
      unit: '°',
      label: `${angle.toFixed(1)}°`,
      visible: true,
    };

    setMeasurements(prev => [...prev, measurement]);
    onMeasurementCreate?.(measurement);
    addAngleVisualization(measurement);
  }, [onMeasurementCreate]);

  // Create radius measurement
  const createRadiusMeasurement = useCallback((points: MeasurementPoint[]) => {
    if (points.length !== 2) return;

    const radius = points[0].position.distanceTo(points[1].position);
    const measurement: Measurement = {
      id: `radius-${Date.now()}`,
      type: 'radius',
      points: points,
      value: radius,
      unit: 'mm',
      label: `R ${radius.toFixed(2)} mm`,
      visible: true,
    };

    setMeasurements(prev => [...prev, measurement]);
    onMeasurementCreate?.(measurement);
    addRadiusVisualization(measurement);
  }, [onMeasurementCreate]);

  // Add point indicator
  const addPointIndicator = useCallback((point: MeasurementPoint) => {
    if (!measurementGroupRef.current) return;

    const geometry = new THREE.SphereGeometry(2, 8, 6);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(point.position);
    sphere.userData = { type: 'measurement-point', pointId: point.id };

    measurementGroupRef.current.add(sphere);
  }, []);

  // Add distance visualization
  const addDistanceVisualization = useCallback((measurement: Measurement) => {
    if (!measurementGroupRef.current || measurement.points.length !== 2) return;

    const [point1, point2] = measurement.points;

    // Create line
    const geometry = new THREE.BufferGeometry().setFromPoints([
      point1.position,
      point2.position
    ]);
    const material = new THREE.LineBasicMaterial({
      color: 0x00aaff,
      linewidth: 2
    });
    const line = new THREE.Line(geometry, material);
    line.userData = { type: 'measurement-line', measurementId: measurement.id };

    // Create label
    const midpoint = new THREE.Vector3().addVectors(point1.position, point2.position).multiplyScalar(0.5);
    const label = createTextLabel(measurement.label, midpoint);
    label.userData = { type: 'measurement-label', measurementId: measurement.id };

    measurementGroupRef.current.add(line);
    measurementGroupRef.current.add(label);
  }, []);

  // Add angle visualization
  const addAngleVisualization = useCallback((measurement: Measurement) => {
    if (!measurementGroupRef.current || measurement.points.length !== 3) return;

    const [point1, point2, point3] = measurement.points;

    // Create arc to show angle
    const v1 = new THREE.Vector3().subVectors(point1.position, point2.position).normalize();
    const v2 = new THREE.Vector3().subVectors(point3.position, point2.position).normalize();

    const arcRadius = 20;
    const arcGeometry = new THREE.BufferGeometry();
    const arcPoints: THREE.Vector3[] = [];

    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = v1.angleTo(v2) * t;
      const rotationAxis = new THREE.Vector3().crossVectors(v1, v2).normalize();
      const rotatedVector = v1.clone().applyAxisAngle(rotationAxis, angle);
      const arcPoint = point2.position.clone().add(rotatedVector.multiplyScalar(arcRadius));
      arcPoints.push(arcPoint);
    }

    arcGeometry.setFromPoints(arcPoints);
    const arcMaterial = new THREE.LineBasicMaterial({ color: 0xffaa00, linewidth: 2 });
    const arc = new THREE.Line(arcGeometry, arcMaterial);
    arc.userData = { type: 'measurement-arc', measurementId: measurement.id };

    // Create label
    const labelPos = point2.position.clone().add(
      v1.clone().add(v2).normalize().multiplyScalar(arcRadius * 1.5)
    );
    const label = createTextLabel(measurement.label, labelPos);
    label.userData = { type: 'measurement-label', measurementId: measurement.id };

    measurementGroupRef.current.add(arc);
    measurementGroupRef.current.add(label);
  }, []);

  // Add radius visualization
  const addRadiusVisualization = useCallback((measurement: Measurement) => {
    if (!measurementGroupRef.current || measurement.points.length !== 2) return;

    const [center, edge] = measurement.points;

    // Create circle
    const radius = measurement.value;
    const circleGeometry = new THREE.CircleGeometry(radius, 32);
    circleGeometry.rotateX(-Math.PI / 2); // Lay flat
    const circleMaterial = new THREE.LineBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.6
    });
    const circle = new THREE.LineLoop(circleGeometry, circleMaterial);
    circle.position.copy(center.position);
    circle.userData = { type: 'measurement-circle', measurementId: measurement.id };

    // Create radius line
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      center.position,
      edge.position
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff6600, linewidth: 2 });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.userData = { type: 'measurement-radius-line', measurementId: measurement.id };

    // Create label
    const midpoint = new THREE.Vector3().addVectors(center.position, edge.position).multiplyScalar(0.5);
    const label = createTextLabel(measurement.label, midpoint);
    label.userData = { type: 'measurement-label', measurementId: measurement.id };

    measurementGroupRef.current.add(circle);
    measurementGroupRef.current.add(line);
    measurementGroupRef.current.add(label);
  }, []);

  // Create text label (simplified - in real implementation would use proper text rendering)
  const createTextLabel = useCallback((text: string, position: THREE.Vector3) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 64;

    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffffff';
    context.font = '16px Arial';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 6);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.scale.set(20, 5, 1);

    return sprite;
  }, []);

  // Delete measurement
  const deleteMeasurement = useCallback((measurementId: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== measurementId));

    // Remove visualization objects
    if (measurementGroupRef.current) {
      const objectsToRemove = measurementGroupRef.current.children.filter(
        child => child.userData.measurementId === measurementId
      );
      objectsToRemove.forEach(obj => measurementGroupRef.current!.remove(obj));
    }

    onMeasurementDelete?.(measurementId);
  }, [onMeasurementDelete]);

  // Toggle measurements visibility
  const toggleMeasurements = useCallback(() => {
    setShowMeasurements(prev => {
      const newVisible = !prev;
      if (measurementGroupRef.current) {
        measurementGroupRef.current.visible = newVisible;
      }
      return newVisible;
    });
  }, []);

  // Clear all measurements
  const clearAllMeasurements = useCallback(() => {
    setMeasurements([]);
    setPendingPoints([]);
    if (measurementGroupRef.current) {
      measurementGroupRef.current.clear();
    }
  }, []);

  return (
    <div className="measurement-tools">
      <div className="measurement-toolbar">
        <button
          className={`measurement-tool ${activeTool === 'distance' ? 'active' : ''}`}
          onClick={() => setActiveTool(activeTool === 'distance' ? null : 'distance')}
          title="Measure Distance"
        >
          <ToolbarIcon action="measure-distance" size={16} />
        </button>

        <button
          className={`measurement-tool ${activeTool === 'angle' ? 'active' : ''}`}
          onClick={() => setActiveTool(activeTool === 'angle' ? null : 'angle')}
          title="Measure Angle"
        >
          <ToolbarIcon action="measure-angle" size={16} />
        </button>

        <button
          className={`measurement-tool ${activeTool === 'radius' ? 'active' : ''}`}
          onClick={() => setActiveTool(activeTool === 'radius' ? null : 'radius')}
          title="Measure Radius"
        >
          <ToolbarIcon action="measure-radius" size={16} />
        </button>

        <span className="separator">|</span>

        <button
          className={`measurement-tool ${showMeasurements ? 'active' : ''}`}
          onClick={toggleMeasurements}
          title="Toggle Measurements"
        >
          <ToolbarIcon action="visibility" size={16} />
        </button>

        <button
          className="measurement-tool"
          onClick={clearAllMeasurements}
          title="Clear All Measurements"
        >
          <ToolbarIcon action="clear" size={16} />
        </button>
      </div>

      {pendingPoints.length > 0 && (
        <div className="measurement-status">
          <span>
            {activeTool === 'distance' && `Click second point (${pendingPoints.length}/2)`}
            {activeTool === 'angle' && `Click ${pendingPoints.length === 1 ? 'vertex' : 'third'} point (${pendingPoints.length}/3)`}
            {activeTool === 'radius' && `Click edge point (${pendingPoints.length}/2)`}
          </span>
          <button onClick={() => setPendingPoints([])}>Cancel</button>
        </div>
      )}

      {measurements.length > 0 && (
        <div className="measurement-list">
          <h4>Measurements</h4>
          {measurements.map(measurement => (
            <div key={measurement.id} className="measurement-item">
              <span className="measurement-label">{measurement.label}</span>
              <span className="measurement-type">{measurement.type}</span>
              <button
                onClick={() => deleteMeasurement(measurement.id)}
                className="measurement-delete"
                title="Delete measurement"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};