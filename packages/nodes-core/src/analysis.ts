/**
 * Analysis and Measurement Nodes for BrepFlow
 * Implements geometric analysis, measurements, and evaluation operations
 */

import { NodeDefinition } from '@brepflow/types';

// Distance Measurement
export const distanceNode: NodeDefinition = {
  id: 'Analysis::Distance',
  category: 'Analysis',
  label: 'Distance',
  description: 'Measure distance between geometries',
  inputs: {
    geometryA: {
      type: 'Geometry',
      label: 'Geometry A',
      required: true,
    },
    geometryB: {
      type: 'Geometry',
      label: 'Geometry B',
      required: true,
    },
  },
  outputs: {
    distance: {
      type: 'Number',
      label: 'Distance',
    },
    pointA: {
      type: 'Point',
      label: 'Closest Point A',
    },
    pointB: {
      type: 'Point',
      label: 'Closest Point B',
    },
  },
  params: {
    signed: {
      type: 'boolean',
      default: false,
    },
  },
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('MEASURE_DISTANCE', {
      geometryA: inputs.geometryA,
      geometryB: inputs.geometryB,
      signed: params.signed,
    });
    return {
      distance: result.distance,
      pointA: result.closestPointA,
      pointB: result.closestPointB,
    };
  },
};

// Closest Point
export const closestPointNode: NodeDefinition = {
  id: 'Analysis::ClosestPoint',
  category: 'Analysis',
  label: 'Closest Point',
  description: 'Find closest point on geometry',
  inputs: {
    point: {
      type: 'Point',
      label: 'Sample Point',
      required: true,
    },
    geometry: {
      type: 'Geometry',
      label: 'Target Geometry',
      required: true,
    },
  },
  outputs: {
    closest: {
      type: 'Point',
      label: 'Closest Point',
    },
    distance: {
      type: 'Number',
      label: 'Distance',
    },
    parameter: {
      type: 'Number',
      label: 'Parameter',
    },
    normal: {
      type: 'Vector',
      label: 'Normal',
    },
  },
  params: {},
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('CLOSEST_POINT', {
      point: inputs.point,
      geometry: inputs.geometry,
    });
    return {
      closest: result.point,
      distance: result.distance,
      parameter: result.parameter,
      normal: result.normal,
    };
  },
};

// Area Measurement
export const areaNode: NodeDefinition = {
  id: 'Analysis::Area',
  category: 'Analysis',
  label: 'Area',
  description: 'Calculate surface area',
  inputs: {
    geometry: {
      type: 'Geometry',
      label: 'Geometry',
      required: true,
    },
  },
  outputs: {
    area: {
      type: 'Number',
      label: 'Area',
    },
    centroid: {
      type: 'Point',
      label: 'Centroid',
    },
  },
  params: {
    worldSpace: {
      type: 'boolean',
      default: true,
    },
  },
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('CALCULATE_AREA', {
      geometry: inputs.geometry,
      worldSpace: params.worldSpace,
    });
    return {
      area: result.area,
      centroid: result.centroid,
    };
  },
};

// Volume Measurement
export const volumeNode: NodeDefinition = {
  id: 'Analysis::Volume',
  category: 'Analysis',
  label: 'Volume',
  description: 'Calculate volume of solid',
  inputs: {
    solid: {
      type: 'Solid',
      label: 'Solid',
      required: true,
    },
  },
  outputs: {
    volume: {
      type: 'Number',
      label: 'Volume',
    },
    centroid: {
      type: 'Point',
      label: 'Centroid',
    },
    surfaceArea: {
      type: 'Number',
      label: 'Surface Area',
    },
  },
  params: {},
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('CALCULATE_VOLUME', {
      solid: inputs.solid,
    });
    return {
      volume: result.volume,
      centroid: result.centroid,
      surfaceArea: result.surfaceArea,
    };
  },
};

// Mass Properties
export const massPropertiesNode: NodeDefinition = {
  id: 'Analysis::MassProperties',
  category: 'Analysis',
  label: 'Mass Properties',
  description: 'Calculate mass properties of geometry',
  inputs: {
    geometry: {
      type: 'Geometry',
      label: 'Geometry',
      required: true,
    },
  },
  outputs: {
    volume: {
      type: 'Number',
      label: 'Volume',
    },
    area: {
      type: 'Number',
      label: 'Surface Area',
    },
    centroid: {
      type: 'Point',
      label: 'Centroid',
    },
    inertia: {
      type: 'Matrix',
      label: 'Inertia Tensor',
    },
    principalAxes: {
      type: 'Vector[]',
      label: 'Principal Axes',
    },
  },
  params: {
    density: {
      type: 'number',
      default: 1.0,
      min: 0.001,
      max: 100000,
    },
  },
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('MASS_PROPERTIES', {
      geometry: inputs.geometry,
      density: params.density,
    });
    return {
      volume: result.volume,
      area: result.area,
      centroid: result.centroid,
      inertia: result.inertiaTensor,
      principalAxes: result.principalAxes,
    };
  },
};

// Bounding Box
export const boundingBoxNode: NodeDefinition = {
  id: 'Analysis::BoundingBox',
  category: 'Analysis',
  label: 'Bounding Box',
  description: 'Get bounding box of geometry',
  inputs: {
    geometry: {
      type: 'Geometry',
      label: 'Geometry',
      required: true,
    },
    plane: {
      type: 'Plane',
      label: 'Orientation Plane',
      required: false,
    },
  },
  outputs: {
    box: {
      type: 'Box',
      label: 'Bounding Box',
    },
    min: {
      type: 'Point',
      label: 'Min Point',
    },
    max: {
      type: 'Point',
      label: 'Max Point',
    },
    center: {
      type: 'Point',
      label: 'Center',
    },
    diagonal: {
      type: 'Number',
      label: 'Diagonal',
    },
  },
  params: {
    aligned: {
      type: 'select',
      default: 'world',
      options: ['world', 'plane', 'oriented'],
    },
  },
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('BOUNDING_BOX', {
      geometry: inputs.geometry,
      plane: inputs.plane,
      alignment: params.aligned,
    });
    return {
      box: result.box,
      min: result.min,
      max: result.max,
      center: result.center,
      diagonal: result.diagonal,
    };
  },
};

// Intersection Analysis
export const intersectionNode: NodeDefinition = {
  id: 'Analysis::Intersection',
  category: 'Analysis',
  label: 'Intersection',
  description: 'Find intersections between geometries',
  inputs: {
    geometryA: {
      type: 'Geometry',
      label: 'Geometry A',
      required: true,
    },
    geometryB: {
      type: 'Geometry',
      label: 'Geometry B',
      required: true,
    },
  },
  outputs: {
    curves: {
      type: 'Curve[]',
      label: 'Intersection Curves',
    },
    points: {
      type: 'Point[]',
      label: 'Intersection Points',
    },
    count: {
      type: 'Number',
      label: 'Intersection Count',
    },
  },
  params: {
    tolerance: {
      type: 'number',
      default: 0.001,
      min: 0.0001,
      max: 1,
    },
    type: {
      type: 'select',
      default: 'all',
      options: ['all', 'curves', 'points'],
    },
  },
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('INTERSECTION_ANALYSIS', {
      geometryA: inputs.geometryA,
      geometryB: inputs.geometryB,
      tolerance: params.tolerance,
      type: params.type,
    });
    return {
      curves: result.curves || [],
      points: result.points || [],
      count: (result.curves?.length || 0) + (result.points?.length || 0),
    };
  },
};

// Evaluate Curve
export const evaluateCurveNode: NodeDefinition = {
  id: 'Analysis::EvaluateCurve',
  category: 'Analysis',
  label: 'Evaluate Curve',
  description: 'Evaluate curve at parameter',
  inputs: {
    curve: {
      type: 'Curve',
      label: 'Curve',
      required: true,
    },
    parameter: {
      type: 'Number',
      label: 'Parameter',
      required: false,
    },
  },
  outputs: {
    point: {
      type: 'Point',
      label: 'Point',
    },
    tangent: {
      type: 'Vector',
      label: 'Tangent',
    },
    normal: {
      type: 'Vector',
      label: 'Normal',
    },
    curvature: {
      type: 'Number',
      label: 'Curvature',
    },
    frame: {
      type: 'Plane',
      label: 'Frame',
    },
  },
  params: {
    parameter: {
      type: 'number',
      default: 0.5,
      min: 0,
      max: 1,
    },
    normalized: {
      type: 'boolean',
      default: true,
    },
  },
  evaluate: async (inputs, params, context) => {
    const t = inputs.parameter ?? params.parameter;
    
    const result = await context.invoke('EVALUATE_CURVE', {
      curve: inputs.curve,
      parameter: t,
      normalized: params.normalized,
    });
    return {
      point: result.point,
      tangent: result.tangent,
      normal: result.normal,
      curvature: result.curvature,
      frame: result.frame,
    };
  },
};

// Evaluate Surface
export const evaluateSurfaceNode: NodeDefinition = {
  id: 'Analysis::EvaluateSurface',
  category: 'Analysis',
  label: 'Evaluate Surface',
  description: 'Evaluate surface at UV parameter',
  inputs: {
    surface: {
      type: 'Surface',
      label: 'Surface',
      required: true,
    },
    u: {
      type: 'Number',
      label: 'U Parameter',
      required: false,
    },
    v: {
      type: 'Number',
      label: 'V Parameter',
      required: false,
    },
  },
  outputs: {
    point: {
      type: 'Point',
      label: 'Point',
    },
    normal: {
      type: 'Vector',
      label: 'Normal',
    },
    uTangent: {
      type: 'Vector',
      label: 'U Tangent',
    },
    vTangent: {
      type: 'Vector',
      label: 'V Tangent',
    },
    frame: {
      type: 'Plane',
      label: 'Frame',
    },
  },
  params: {
    u: {
      type: 'number',
      default: 0.5,
      min: 0,
      max: 1,
    },
    v: {
      type: 'number',
      default: 0.5,
      min: 0,
      max: 1,
    },
  },
  evaluate: async (inputs, params, context) => {
    const u = inputs.u ?? params.u;
    const v = inputs.v ?? params.v;
    
    const result = await context.invoke('EVALUATE_SURFACE', {
      surface: inputs.surface,
      u: u,
      v: v,
    });
    return {
      point: result.point,
      normal: result.normal,
      uTangent: result.uTangent,
      vTangent: result.vTangent,
      frame: result.frame,
    };
  },
};

// Collision Detection
export const collisionDetectionNode: NodeDefinition = {
  id: 'Analysis::Collision',
  category: 'Analysis',
  label: 'Collision Detection',
  description: 'Detect collisions between geometries',
  inputs: {
    geometryA: {
      type: 'Geometry[]',
      label: 'Geometry Set A',
      required: true,
    },
    geometryB: {
      type: 'Geometry[]',
      label: 'Geometry Set B',
      required: true,
    },
  },
  outputs: {
    colliding: {
      type: 'Boolean',
      label: 'Has Collision',
    },
    pairs: {
      type: 'Number[][]',
      label: 'Collision Pairs',
    },
    clearance: {
      type: 'Number',
      label: 'Minimum Clearance',
    },
  },
  params: {
    tolerance: {
      type: 'number',
      default: 0.001,
      min: 0,
      max: 10,
    },
  },
  evaluate: async (inputs, params, context) => {
    const result = await context.invoke('COLLISION_DETECTION', {
      geometryA: inputs.geometryA,
      geometryB: inputs.geometryB,
      tolerance: params.tolerance,
    });
    return {
      colliding: result.hasCollision,
      pairs: result.collisionPairs,
      clearance: result.minClearance,
    };
  },
};

// Export all analysis nodes
export const analysisNodes = [
  distanceNode,
  closestPointNode,
  areaNode,
  volumeNode,
  massPropertiesNode,
  boundingBoxNode,
  intersectionNode,
  evaluateCurveNode,
  evaluateSurfaceNode,
  collisionDetectionNode,
];