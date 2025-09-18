// Curve & Surface Analysis Nodes - 60 nodes for advanced geometric analysis
import { NodeTemplate } from '../types';

export const curveSurfaceAnalysisNodes: NodeTemplate[] = [
  // ============================================================
  // CURVE ANALYSIS - 20 nodes
  // ============================================================
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurvatureComb',
    description: 'Analyze curve curvature with visual comb',
    operation: 'CURVATURE_COMB',
    occtBinding: 'curvatureComb',
    parameters: [
      { name: 'scale', type: 'number', default: 1.0, min: 0.1, max: 10, description: 'Comb scale factor' },
      { name: 'density', type: 'number', default: 50, min: 10, max: 200, description: 'Number of samples' },
      { name: 'showNormals', type: 'boolean', default: true },
      { name: 'colorCode', type: 'boolean', default: false, description: 'Color by curvature value' }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'comb', type: 'Shape' },
      { name: 'maxCurvature', type: 'number' },
      { name: 'minCurvature', type: 'number' },
      { name: 'curvatureValues', type: 'number[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveLength',
    description: 'Calculate curve length and properties',
    operation: 'CURVE_LENGTH',
    occtBinding: 'curveLength',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'segments', type: 'number', default: 100, min: 10, max: 1000 }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'length', type: 'number' },
      { name: 'segmentLengths', type: 'number[]' },
      { name: 'arcLength', type: 'Wire' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveSmoothnessAnalysis',
    description: 'Analyze curve continuity and smoothness',
    operation: 'CURVE_SMOOTHNESS',
    occtBinding: 'curveSmoothness',
    parameters: [
      { name: 'continuityLevel', type: 'enum', options: ['C0', 'C1', 'C2', 'G1', 'G2'], default: 'G2' },
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showBreaks', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'isSmooth', type: 'boolean' },
      { name: 'breakPoints', type: 'Point[]' },
      { name: 'continuityReport', type: 'Properties' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveInflectionPoints',
    description: 'Find curve inflection points',
    operation: 'CURVE_INFLECTION',
    occtBinding: 'curveInflection',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'markPoints', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'inflectionPoints', type: 'Point[]' },
      { name: 'parameters', type: 'number[]' },
      { name: 'markers', type: 'Shape[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveTorsion',
    description: 'Calculate curve torsion values',
    operation: 'CURVE_TORSION',
    occtBinding: 'curveTorsion',
    parameters: [
      { name: 'samples', type: 'number', default: 100, min: 10, max: 500 },
      { name: 'scale', type: 'number', default: 1.0, min: 0.1, max: 10 },
      { name: 'showGraph', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'torsionValues', type: 'number[]' },
      { name: 'maxTorsion', type: 'number' },
      { name: 'torsionGraph', type: 'Wire' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveDerivatives',
    description: 'Calculate curve derivatives',
    operation: 'CURVE_DERIVATIVES',
    occtBinding: 'curveDerivatives',
    parameters: [
      { name: 'parameter', type: 'number', default: 0.5, min: 0, max: 1 },
      { name: 'order', type: 'number', default: 2, min: 1, max: 3 },
      { name: 'vectorScale', type: 'number', default: 1.0, min: 0.1, max: 10 }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'point', type: 'Point' },
      { name: 'firstDerivative', type: 'Vector' },
      { name: 'secondDerivative', type: 'Vector' },
      { name: 'thirdDerivative', type: 'Vector' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveParameter',
    description: 'Analyze curve parameterization',
    operation: 'CURVE_PARAMETER',
    occtBinding: 'curveParameter',
    parameters: [
      { name: 'samples', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'showParameter', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'parameterRange', type: 'number[]' },
      { name: 'samplePoints', type: 'Point[]' },
      { name: 'parameterValues', type: 'number[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveEndpoints',
    description: 'Extract curve endpoints and tangents',
    operation: 'CURVE_ENDPOINTS',
    occtBinding: 'curveEndpoints',
    parameters: [
      { name: 'tangentLength', type: 'number', default: 10, min: 1, max: 100 },
      { name: 'showTangents', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'startPoint', type: 'Point' },
      { name: 'endPoint', type: 'Point' },
      { name: 'startTangent', type: 'Vector' },
      { name: 'endTangent', type: 'Vector' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveClosestPoint',
    description: 'Find closest point on curve to reference',
    operation: 'CURVE_CLOSEST_POINT',
    occtBinding: 'curveClosestPoint',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showConnection', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true },
      { name: 'point', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'closestPoint', type: 'Point' },
      { name: 'distance', type: 'number' },
      { name: 'parameter', type: 'number' },
      { name: 'connectionLine', type: 'Wire' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveExtremePoints',
    description: 'Find extreme points (min/max X,Y,Z)',
    operation: 'CURVE_EXTREME_POINTS',
    occtBinding: 'curveExtremePoints',
    parameters: [
      { name: 'axis', type: 'enum', options: ['X', 'Y', 'Z', 'all'], default: 'all' },
      { name: 'markPoints', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'minPoints', type: 'Point[]' },
      { name: 'maxPoints', type: 'Point[]' },
      { name: 'extremeValues', type: 'number[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveAreaMoments',
    description: 'Calculate area moments for closed curves',
    operation: 'CURVE_AREA_MOMENTS',
    occtBinding: 'curveAreaMoments',
    parameters: [
      { name: 'precision', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showCentroid', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'area', type: 'number' },
      { name: 'centroid', type: 'Point' },
      { name: 'momentX', type: 'number' },
      { name: 'momentY', type: 'number' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveConvexHull',
    description: 'Generate convex hull of curve points',
    operation: 'CURVE_CONVEX_HULL',
    occtBinding: 'curveConvexHull',
    parameters: [
      { name: 'samples', type: 'number', default: 100, min: 20, max: 500 }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'convexHull', type: 'Wire' },
      { name: 'hullPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveBoundingBox',
    description: 'Calculate oriented bounding box',
    operation: 'CURVE_BOUNDING_BOX',
    occtBinding: 'curveBoundingBox',
    parameters: [
      { name: 'orientation', type: 'enum', options: ['axis-aligned', 'minimal'], default: 'axis-aligned' },
      { name: 'showBox', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'boundingBox', type: 'Shape' },
      { name: 'minPoint', type: 'Point' },
      { name: 'maxPoint', type: 'Point' },
      { name: 'dimensions', type: 'Vector' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Curves',
    name: 'CurveSpiral',
    description: 'Analyze spiral properties',
    operation: 'CURVE_SPIRAL',
    occtBinding: 'curveSpiral',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showCenter', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'isSpiral', type: 'boolean' },
      { name: 'center', type: 'Point' },
      { name: 'pitch', type: 'number' },
      { name: 'turns', type: 'number' }
    ]
  },

  // ============================================================
  // SURFACE ANALYSIS - 20 nodes
  // ============================================================
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceCurvature',
    description: 'Analyze surface curvature (Gaussian and Mean)',
    operation: 'SURFACE_CURVATURE',
    occtBinding: 'surfaceCurvature',
    parameters: [
      { name: 'uSamples', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'vSamples', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'curvatureType', type: 'enum', options: ['gaussian', 'mean', 'principal'], default: 'gaussian' },
      { name: 'colorMap', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'curvatureMap', type: 'Shape' },
      { name: 'maxCurvature', type: 'number' },
      { name: 'minCurvature', type: 'number' },
      { name: 'averageCurvature', type: 'number' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceNormals',
    description: 'Calculate surface normal vectors',
    operation: 'SURFACE_NORMALS',
    occtBinding: 'surfaceNormals',
    parameters: [
      { name: 'density', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'vectorLength', type: 'number', default: 5, min: 1, max: 50 },
      { name: 'showVectors', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'normalVectors', type: 'Vector[]' },
      { name: 'normalLines', type: 'Wire[]' },
      { name: 'samplePoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceArea',
    description: 'Calculate surface area and properties',
    operation: 'SURFACE_AREA',
    occtBinding: 'surfaceArea',
    parameters: [
      { name: 'precision', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showCentroid', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'area', type: 'number' },
      { name: 'centroid', type: 'Point' },
      { name: 'boundaryLength', type: 'number' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceIsoCurves',
    description: 'Extract surface isocurves',
    operation: 'SURFACE_ISOCURVES',
    occtBinding: 'surfaceIsocurves',
    parameters: [
      { name: 'uCount', type: 'number', default: 10, min: 2, max: 50 },
      { name: 'vCount', type: 'number', default: 10, min: 2, max: 50 },
      { name: 'direction', type: 'enum', options: ['both', 'u-only', 'v-only'], default: 'both' }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'uCurves', type: 'Wire[]' },
      { name: 'vCurves', type: 'Wire[]' },
      { name: 'allCurves', type: 'Wire[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceParametrization',
    description: 'Analyze surface parametrization',
    operation: 'SURFACE_PARAMETRIZATION',
    occtBinding: 'surfaceParametrization',
    parameters: [
      { name: 'showGrid', type: 'boolean', default: true },
      { name: 'gridDensity', type: 'number', default: 20, min: 5, max: 100 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'uRange', type: 'number[]' },
      { name: 'vRange', type: 'number[]' },
      { name: 'parameterGrid', type: 'Wire[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceDerivatives',
    description: 'Calculate surface derivatives',
    operation: 'SURFACE_DERIVATIVES',
    occtBinding: 'surfaceDerivatives',
    parameters: [
      { name: 'u', type: 'number', default: 0.5, min: 0, max: 1 },
      { name: 'v', type: 'number', default: 0.5, min: 0, max: 1 },
      { name: 'order', type: 'number', default: 2, min: 1, max: 3 },
      { name: 'vectorScale', type: 'number', default: 1.0, min: 0.1, max: 10 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'point', type: 'Point' },
      { name: 'duVector', type: 'Vector' },
      { name: 'dvVector', type: 'Vector' },
      { name: 'normal', type: 'Vector' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceClosestPoint',
    description: 'Find closest point on surface',
    operation: 'SURFACE_CLOSEST_POINT',
    occtBinding: 'surfaceClosestPoint',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showConnection', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true },
      { name: 'point', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'closestPoint', type: 'Point' },
      { name: 'distance', type: 'number' },
      { name: 'uParameter', type: 'number' },
      { name: 'vParameter', type: 'number' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceBoundary',
    description: 'Extract surface boundary curves',
    operation: 'SURFACE_BOUNDARY',
    occtBinding: 'surfaceBoundary',
    parameters: [
      { name: 'includeHoles', type: 'boolean', default: true },
      { name: 'simplify', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'outerBoundary', type: 'Wire' },
      { name: 'innerBoundaries', type: 'Wire[]' },
      { name: 'allBoundaries', type: 'Wire[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceContinuity',
    description: 'Analyze surface continuity across edges',
    operation: 'SURFACE_CONTINUITY',
    occtBinding: 'surfaceContinuity',
    parameters: [
      { name: 'continuityType', type: 'enum', options: ['G0', 'G1', 'G2', 'C0', 'C1', 'C2'], default: 'G1' },
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showAnalysis', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'surface1', type: 'Face', required: true },
      { name: 'surface2', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'isContinuous', type: 'boolean' },
      { name: 'discontinuityPoints', type: 'Point[]' },
      { name: 'analysisLines', type: 'Wire[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceDeviation',
    description: 'Compare surface deviation from reference',
    operation: 'SURFACE_DEVIATION',
    occtBinding: 'surfaceDeviation',
    parameters: [
      { name: 'samples', type: 'number', default: 100, min: 20, max: 500 },
      { name: 'colorMap', type: 'boolean', default: true },
      { name: 'tolerance', type: 'number', default: 0.1, min: 0.001, max: 10 }
    ],
    inputs: [
      { name: 'testSurface', type: 'Face', required: true },
      { name: 'referenceSurface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'deviationMap', type: 'Shape' },
      { name: 'maxDeviation', type: 'number' },
      { name: 'averageDeviation', type: 'number' },
      { name: 'deviationPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceFlatness',
    description: 'Analyze surface flatness',
    operation: 'SURFACE_FLATNESS',
    occtBinding: 'surfaceFlatness',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.1, min: 0.001, max: 10 },
      { name: 'showBestFitPlane', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'isFlat', type: 'boolean' },
      { name: 'flatness', type: 'number' },
      { name: 'bestFitPlane', type: 'Face' },
      { name: 'maxDeviation', type: 'number' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Surfaces',
    name: 'SurfaceRoughness',
    description: 'Calculate surface roughness metrics',
    operation: 'SURFACE_ROUGHNESS',
    occtBinding: 'surfaceRoughness',
    parameters: [
      { name: 'sampleDensity', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'analysisType', type: 'enum', options: ['Ra', 'Rz', 'Rq', 'all'], default: 'all' }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'roughnessRa', type: 'number' },
      { name: 'roughnessRz', type: 'number' },
      { name: 'roughnessRq', type: 'number' },
      { name: 'roughnessMap', type: 'Shape' }
    ]
  },

  // ============================================================
  // INTERSECTION & PROXIMITY - 20 nodes
  // ============================================================
  {
    category: 'Analysis',
    subcategory: 'Intersection',
    name: 'CurveCurveIntersection',
    description: 'Find curve-curve intersections',
    operation: 'CURVE_CURVE_INTERSECTION',
    occtBinding: 'curveCurveIntersection',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'extendCurves', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'curve1', type: 'Wire', required: true },
      { name: 'curve2', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'intersectionPoints', type: 'Point[]' },
      { name: 'parameters1', type: 'number[]' },
      { name: 'parameters2', type: 'number[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Intersection',
    name: 'CurveSurfaceIntersection',
    description: 'Find curve-surface intersections',
    operation: 'CURVE_SURFACE_INTERSECTION',
    occtBinding: 'curveSurfaceIntersection',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'extendCurve', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true },
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'intersectionPoints', type: 'Point[]' },
      { name: 'curveParameters', type: 'number[]' },
      { name: 'surfaceParameters', type: 'Point[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Intersection',
    name: 'SurfaceSurfaceIntersection',
    description: 'Find surface-surface intersection curves',
    operation: 'SURFACE_SURFACE_INTERSECTION',
    occtBinding: 'surfaceSurfaceIntersection',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'approximation', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'surface1', type: 'Face', required: true },
      { name: 'surface2', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'intersectionCurves', type: 'Wire[]' },
      { name: 'intersectionPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Intersection',
    name: 'PlaneIntersection',
    description: 'Intersect geometry with plane',
    operation: 'PLANE_INTERSECTION',
    occtBinding: 'planeIntersection',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape', required: true },
      { name: 'plane', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'intersectionCurves', type: 'Wire[]' },
      { name: 'sectionProfiles', type: 'Wire[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Intersection',
    name: 'RayIntersection',
    description: 'Cast ray and find intersections',
    operation: 'RAY_INTERSECTION',
    occtBinding: 'rayIntersection',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'maxDistance', type: 'number', default: 1000, min: 1, max: 10000 }
    ],
    inputs: [
      { name: 'rayOrigin', type: 'Point', required: true },
      { name: 'rayDirection', type: 'Vector', required: true },
      { name: 'targets', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'hitPoints', type: 'Point[]' },
      { name: 'hitDistances', type: 'number[]' },
      { name: 'hitNormals', type: 'Vector[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Proximity',
    name: 'MinimumDistance',
    description: 'Find minimum distance between geometries',
    operation: 'MINIMUM_DISTANCE',
    occtBinding: 'minimumDistance',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showConnection', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'geometry1', type: 'Shape', required: true },
      { name: 'geometry2', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'distance', type: 'number' },
      { name: 'point1', type: 'Point' },
      { name: 'point2', type: 'Point' },
      { name: 'connectionLine', type: 'Wire' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Proximity',
    name: 'ProximityAnalysis',
    description: 'Analyze proximity between multiple objects',
    operation: 'PROXIMITY_ANALYSIS',
    occtBinding: 'proximityAnalysis',
    parameters: [
      { name: 'threshold', type: 'number', default: 1.0, min: 0.1, max: 100 },
      { name: 'showConnections', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'objects', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'proximityPairs', type: 'Shape[][]' },
      { name: 'distances', type: 'number[]' },
      { name: 'connections', type: 'Wire[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Proximity',
    name: 'ClearanceCheck',
    description: 'Check clearance requirements',
    operation: 'CLEARANCE_CHECK',
    occtBinding: 'clearanceCheck',
    parameters: [
      { name: 'requiredClearance', type: 'number', default: 5.0, min: 0.1, max: 100 },
      { name: 'highlightViolations', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'movingObject', type: 'Shape', required: true },
      { name: 'obstacles', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'hasViolations', type: 'boolean' },
      { name: 'violationPoints', type: 'Point[]' },
      { name: 'clearanceValues', type: 'number[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Proximity',
    name: 'CollisionDetection',
    description: 'Detect collisions between objects',
    operation: 'COLLISION_DETECTION',
    occtBinding: 'collisionDetection',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'showCollisions', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'objects', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'hasCollisions', type: 'boolean' },
      { name: 'collidingPairs', type: 'Shape[][]' },
      { name: 'collisionRegions', type: 'Shape[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Proximity',
    name: 'VisibilityAnalysis',
    description: 'Analyze line-of-sight visibility',
    operation: 'VISIBILITY_ANALYSIS',
    occtBinding: 'visibilityAnalysis',
    parameters: [
      { name: 'viewAngle', type: 'number', default: 120, min: 10, max: 360 },
      { name: 'maxDistance', type: 'number', default: 100, min: 1, max: 1000 }
    ],
    inputs: [
      { name: 'viewpoint', type: 'Point', required: true },
      { name: 'targets', type: 'Point[]', required: true },
      { name: 'obstacles', type: 'Shape[]', required: false }
    ],
    outputs: [
      { name: 'visibleTargets', type: 'Point[]' },
      { name: 'occludedTargets', type: 'Point[]' },
      { name: 'sightLines', type: 'Wire[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Proximity',
    name: 'ShadowAnalysis',
    description: 'Calculate shadow patterns',
    operation: 'SHADOW_ANALYSIS',
    occtBinding: 'shadowAnalysis',
    parameters: [
      { name: 'lightType', type: 'enum', options: ['directional', 'point', 'spot'], default: 'directional' },
      { name: 'intensity', type: 'number', default: 1.0, min: 0.1, max: 10 }
    ],
    inputs: [
      { name: 'lightSource', type: 'Point', required: true },
      { name: 'lightDirection', type: 'Vector', required: false },
      { name: 'objects', type: 'Shape[]', required: true },
      { name: 'groundPlane', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'shadowRegions', type: 'Face[]' },
      { name: 'lightRays', type: 'Wire[]' },
      { name: 'illuminatedAreas', type: 'Face[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Measurement',
    name: 'VolumeCalculation',
    description: 'Calculate volume and mass properties',
    operation: 'VOLUME_CALCULATION',
    occtBinding: 'volumeCalculation',
    parameters: [
      { name: 'precision', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'density', type: 'number', default: 1.0, min: 0.001, max: 100, description: 'Material density' }
    ],
    inputs: [
      { name: 'solid', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'volume', type: 'number' },
      { name: 'mass', type: 'number' },
      { name: 'centerOfMass', type: 'Point' },
      { name: 'inertiaMatrix', type: 'number[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Measurement',
    name: 'AngleMeasurement',
    description: 'Measure angles between vectors/faces',
    operation: 'ANGLE_MEASUREMENT',
    occtBinding: 'angleMeasurement',
    parameters: [
      { name: 'units', type: 'enum', options: ['degrees', 'radians'], default: 'degrees' },
      { name: 'showAnnotation', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'vector1', type: 'Vector', required: true },
      { name: 'vector2', type: 'Vector', required: true },
      { name: 'vertex', type: 'Point', required: false }
    ],
    outputs: [
      { name: 'angle', type: 'number' },
      { name: 'complementAngle', type: 'number' },
      { name: 'angleBisector', type: 'Vector' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Measurement',
    name: 'DistanceMeasurement',
    description: 'Measure distances with annotations',
    operation: 'DISTANCE_MEASUREMENT',
    occtBinding: 'distanceMeasurement',
    parameters: [
      { name: 'precision', type: 'number', default: 2, min: 0, max: 6, description: 'Decimal places' },
      { name: 'showDimension', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'point1', type: 'Point', required: true },
      { name: 'point2', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'distance', type: 'number' },
      { name: 'dimensionLine', type: 'Wire' },
      { name: 'midpoint', type: 'Point' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Quality',
    name: 'GeometryValidation',
    description: 'Validate geometry integrity',
    operation: 'GEOMETRY_VALIDATION',
    occtBinding: 'geometryValidation',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'checkClosed', type: 'boolean', default: true },
      { name: 'checkValid', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'isValid', type: 'boolean' },
      { name: 'isClosed', type: 'boolean' },
      { name: 'errors', type: 'string[]' },
      { name: 'problemAreas', type: 'Shape[]' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Quality',
    name: 'MeshQuality',
    description: 'Analyze mesh quality metrics',
    operation: 'MESH_QUALITY',
    occtBinding: 'meshQuality',
    parameters: [
      { name: 'aspectRatioThreshold', type: 'number', default: 5.0, min: 1.0, max: 20.0 },
      { name: 'skewnessThreshold', type: 'number', default: 0.8, min: 0.1, max: 1.0 }
    ],
    inputs: [
      { name: 'mesh', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'averageAspectRatio', type: 'number' },
      { name: 'maxSkewness', type: 'number' },
      { name: 'problemElements', type: 'Shape[]' },
      { name: 'qualityReport', type: 'Properties' }
    ]
  },
  {
    category: 'Analysis',
    subcategory: 'Quality',
    name: 'ToleranceAnalysis',
    description: 'Analyze geometric tolerances',
    operation: 'TOLERANCE_ANALYSIS',
    occtBinding: 'toleranceAnalysis',
    parameters: [
      { name: 'nominalTolerance', type: 'number', default: 0.1, min: 0.001, max: 10 },
      { name: 'showDeviations', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'measured', type: 'Shape', required: true },
      { name: 'nominal', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'withinTolerance', type: 'boolean' },
      { name: 'maxDeviation', type: 'number' },
      { name: 'deviationMap', type: 'Shape' }
    ]
  }
];