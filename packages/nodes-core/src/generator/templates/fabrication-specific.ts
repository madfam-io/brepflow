/**
 * Fabrication-Specific Templates
 * Manufacturing, 3D printing, CNC, laser cutting, and robotics
 */

import { NodeTemplate } from '../node-template';

/**
 * 3D Printing optimization (25 nodes)
 */
export const printing3DTemplates: NodeTemplate[] = [
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'SupportGeneration',
    description: 'Generate support structures',
    operation: 'SUPPORT_GENERATION',
    occtBinding: 'supportGeneration',
    parameters: [
      { name: 'type', type: 'enum', options: ['tree', 'linear', 'grid', 'organic'], default: 'tree' },
      { name: 'angle', type: 'number', default: 45, min: 0, max: 90 },
      { name: 'density', type: 'number', default: 0.2, min: 0.1, max: 1 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'supports', type: 'Shape' },
      { name: 'supportedModel', type: 'Shape' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'PrintOrientation',
    description: 'Optimize print orientation',
    operation: 'PRINT_ORIENTATION',
    occtBinding: 'printOrientation',
    parameters: [
      { name: 'optimize', type: 'enum', options: ['support', 'strength', 'time', 'quality'], default: 'support' },
      { name: 'constraints', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'orientation', type: 'Transform' },
      { name: 'orientedModel', type: 'Shape' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'SliceModel',
    description: 'Slice model for printing',
    operation: 'SLICE_MODEL',
    occtBinding: 'sliceModel',
    parameters: [
      { name: 'layerHeight', type: 'number', default: 0.2, min: 0.05, max: 1 },
      { name: 'infillDensity', type: 'number', default: 0.2, min: 0, max: 1 },
      { name: 'infillPattern', type: 'enum', options: ['grid', 'honeycomb', 'gyroid', 'cubic'], default: 'grid' }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'slices', type: 'Wire[]' },
      { name: 'infill', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'BridgeDetection',
    description: 'Detect bridges and overhangs',
    operation: 'BRIDGE_DETECTION',
    occtBinding: 'bridgeDetection',
    parameters: [
      { name: 'maxBridge', type: 'number', default: 5, min: 0, max: 50 },
      { name: 'overhangAngle', type: 'number', default: 45, min: 0, max: 90 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'bridges', type: 'Face[]' },
      { name: 'overhangs', type: 'Face[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'WallThickness',
    description: 'Analyze wall thickness',
    operation: 'WALL_THICKNESS',
    occtBinding: 'wallThickness',
    parameters: [
      { name: 'minThickness', type: 'number', default: 1, min: 0.1 },
      { name: 'maxThickness', type: 'number', default: 10, min: 1 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'analysis', type: 'Data' },
      { name: 'thinAreas', type: 'Face[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'PrintTimeEstimate',
    description: 'Estimate print time',
    operation: 'PRINT_TIME_ESTIMATE',
    occtBinding: 'printTimeEstimate',
    parameters: [
      { name: 'printSpeed', type: 'number', default: 60, min: 10, max: 300 },
      { name: 'travelSpeed', type: 'number', default: 120, min: 50, max: 500 },
      { name: 'layerHeight', type: 'number', default: 0.2, min: 0.05, max: 1 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'timeHours', type: 'Number' },
      { name: 'filamentMeters', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'RaftGeneration',
    description: 'Generate raft for adhesion',
    operation: 'RAFT_GENERATION',
    occtBinding: 'raftGeneration',
    parameters: [
      { name: 'raftLayers', type: 'number', default: 3, min: 1, max: 10, step: 1 },
      { name: 'raftOffset', type: 'number', default: 5, min: 0, max: 20 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'raft', type: 'Shape' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'BrimGeneration',
    description: 'Generate brim for adhesion',
    operation: 'BRIM_GENERATION',
    occtBinding: 'brimGeneration',
    parameters: [
      { name: 'brimWidth', type: 'number', default: 10, min: 1, max: 50 },
      { name: 'brimLines', type: 'number', default: 20, min: 1, max: 100, step: 1 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'brim', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'SeamOptimization',
    description: 'Optimize seam placement',
    operation: 'SEAM_OPTIMIZATION',
    occtBinding: 'seamOptimization',
    parameters: [
      { name: 'strategy', type: 'enum', options: ['hidden', 'aligned', 'random', 'shortest'], default: 'hidden' }
    ],
    inputs: [
      { name: 'slices', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'optimizedSlices', type: 'Wire[]' },
      { name: 'seamPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'InfillOptimization',
    description: 'Adaptive infill generation',
    operation: 'INFILL_OPTIMIZATION',
    occtBinding: 'infillOptimization',
    parameters: [
      { name: 'minDensity', type: 'number', default: 0.1, min: 0, max: 1 },
      { name: 'maxDensity', type: 'number', default: 0.5, min: 0, max: 1 },
      { name: 'gradientDistance', type: 'number', default: 5, min: 1, max: 20 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true },
      { name: 'stressMap', type: 'Data', required: false }
    ],
    outputs: [
      { name: 'adaptiveInfill', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'CoolingAnalysis',
    description: 'Analyze cooling requirements',
    operation: 'COOLING_ANALYSIS',
    occtBinding: 'coolingAnalysis',
    parameters: [
      { name: 'fanSpeed', type: 'number', default: 100, min: 0, max: 100 },
      { name: 'layerTime', type: 'number', default: 10, min: 1 }
    ],
    inputs: [
      { name: 'slices', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'coolingZones', type: 'Wire[]' },
      { name: 'fanProfile', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'RetractionOptimization',
    description: 'Optimize retraction points',
    operation: 'RETRACTION_OPTIMIZATION',
    occtBinding: 'retractionOptimization',
    parameters: [
      { name: 'retractionDistance', type: 'number', default: 1, min: 0, max: 10 },
      { name: 'minTravelDistance', type: 'number', default: 2, min: 0.5, max: 10 }
    ],
    inputs: [
      { name: 'toolpath', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'retractionPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'VaseMode',
    description: 'Generate vase mode spiral',
    operation: 'VASE_MODE',
    occtBinding: 'vaseMode',
    parameters: [
      { name: 'bottomLayers', type: 'number', default: 3, min: 0, max: 10, step: 1 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'spiralPath', type: 'Wire' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'MultiMaterialSetup',
    description: 'Setup multi-material regions',
    operation: 'MULTI_MATERIAL_SETUP',
    occtBinding: 'multiMaterialSetup',
    parameters: [
      { name: 'materials', type: 'number', default: 2, min: 2, max: 5, step: 1 },
      { name: 'purgeVolume', type: 'number', default: 50, min: 0, max: 200 }
    ],
    inputs: [
      { name: 'regions', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'materialAssignment', type: 'Data' },
      { name: 'purgeBlock', type: 'Shape' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'TreeSupports',
    description: 'Generate tree-like supports',
    operation: 'TREE_SUPPORTS',
    occtBinding: 'treeSupports',
    parameters: [
      { name: 'branchAngle', type: 'number', default: 40, min: 20, max: 60 },
      { name: 'trunkDiameter', type: 'number', default: 5, min: 1, max: 20 },
      { name: 'branchDiameter', type: 'number', default: 2, min: 0.5, max: 10 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'treeSupports', type: 'Shape' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'IroningPass',
    description: 'Generate ironing passes',
    operation: 'IRONING_PASS',
    occtBinding: 'ironingPass',
    parameters: [
      { name: 'ironingSpeed', type: 'number', default: 20, min: 5, max: 50 },
      { name: 'flowRate', type: 'number', default: 0.1, min: 0, max: 0.3 }
    ],
    inputs: [
      { name: 'topSurfaces', type: 'Face[]', required: true }
    ],
    outputs: [
      { name: 'ironingPaths', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'FuzzySkinn',
    description: 'Generate fuzzy skin texture',
    operation: 'FUZZY_SKIN',
    occtBinding: 'fuzzySkin',
    parameters: [
      { name: 'thickness', type: 'number', default: 0.3, min: 0.1, max: 1 },
      { name: 'pointDistance', type: 'number', default: 0.75, min: 0.1, max: 2 }
    ],
    inputs: [
      { name: 'perimeters', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'fuzzyPerimeters', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'CoastingSetup',
    description: 'Setup coasting parameters',
    operation: 'COASTING_SETUP',
    occtBinding: 'coastingSetup',
    parameters: [
      { name: 'coastVolume', type: 'number', default: 0.064, min: 0, max: 1 },
      { name: 'minVolume', type: 'number', default: 0.8, min: 0.1, max: 5 }
    ],
    inputs: [
      { name: 'extrusions', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'coastingPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'WipeTower',
    description: 'Generate wipe tower',
    operation: 'WIPE_TOWER',
    occtBinding: 'wipeTower',
    parameters: [
      { name: 'towerWidth', type: 'number', default: 60, min: 20, max: 100 },
      { name: 'wipeVolume', type: 'number', default: 15, min: 5, max: 50 }
    ],
    inputs: [
      { name: 'printHeight', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'tower', type: 'Shape' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'AdaptiveLayerHeight',
    description: 'Adaptive layer height calculation',
    operation: 'ADAPTIVE_LAYER_HEIGHT',
    occtBinding: 'adaptiveLayerHeight',
    parameters: [
      { name: 'minHeight', type: 'number', default: 0.1, min: 0.05, max: 0.5 },
      { name: 'maxHeight', type: 'number', default: 0.3, min: 0.1, max: 1 },
      { name: 'quality', type: 'number', default: 0.5, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'layerHeights', type: 'Number[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'PerimeterGenerator',
    description: 'Generate perimeter paths',
    operation: 'PERIMETER_GENERATOR',
    occtBinding: 'perimeterGenerator',
    parameters: [
      { name: 'perimeters', type: 'number', default: 3, min: 1, max: 10, step: 1 },
      { name: 'extrusionWidth', type: 'number', default: 0.4, min: 0.1, max: 2 }
    ],
    inputs: [
      { name: 'slice', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'perimeters', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'GCodePostProcessor',
    description: 'Post-process G-code',
    operation: 'GCODE_POST_PROCESSOR',
    occtBinding: 'gcodePostProcessor',
    parameters: [
      { name: 'flavor', type: 'enum', options: ['marlin', 'reprap', 'klipper', 'smoothie'], default: 'marlin' },
      { name: 'optimize', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'toolpaths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'gcode', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'NonPlanarSlicing',
    description: 'Non-planar slicing paths',
    operation: 'NON_PLANAR_SLICING',
    occtBinding: 'nonPlanarSlicing',
    parameters: [
      { name: 'maxAngle', type: 'number', default: 30, min: 0, max: 60 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'nonPlanarSlices', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'ConicalSlicing',
    description: 'Conical/cylindrical slicing',
    operation: 'CONICAL_SLICING',
    occtBinding: 'conicalSlicing',
    parameters: [
      { name: 'axis', type: 'vector3', default: '[0, 0, 1]' }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'conicalSlices', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: '3D Printing',
    name: 'SolubleSupportInterface',
    description: 'Soluble support interface',
    operation: 'SOLUBLE_SUPPORT_INTERFACE',
    occtBinding: 'solubleSupportInterface',
    parameters: [
      { name: 'interfaceLayers', type: 'number', default: 2, min: 1, max: 5, step: 1 },
      { name: 'interfaceDensity', type: 'number', default: 0.9, min: 0.5, max: 1 }
    ],
    inputs: [
      { name: 'supports', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'interface', type: 'Shape' }
    ]
  }
];

/**
 * CNC Machining (25 nodes)
 */
export const cncMachiningTemplates: NodeTemplate[] = [
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ToolpathGeneration',
    description: 'Generate CNC toolpaths',
    operation: 'TOOLPATH_GENERATION',
    occtBinding: 'toolpathGeneration',
    parameters: [
      { name: 'strategy', type: 'enum', options: ['parallel', 'contour', 'pocket', 'adaptive'], default: 'parallel' },
      { name: 'toolDiameter', type: 'number', default: 6, min: 0.1, max: 50 },
      { name: 'stepover', type: 'number', default: 0.5, min: 0.1, max: 1 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true },
      { name: 'stock', type: 'Shape', required: false }
    ],
    outputs: [
      { name: 'toolpath', type: 'Wire[]' },
      { name: 'rapids', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'PocketingStrategy',
    description: 'Pocket machining strategy',
    operation: 'POCKETING_STRATEGY',
    occtBinding: 'pocketingStrategy',
    parameters: [
      { name: 'pattern', type: 'enum', options: ['spiral', 'zigzag', 'contour', 'trochoidal'], default: 'spiral' },
      { name: 'stepdown', type: 'number', default: 2, min: 0.1, max: 10 },
      { name: 'finishPass', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'pocket', type: 'Wire', required: true },
      { name: 'depth', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'roughing', type: 'Wire[]' },
      { name: 'finishing', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ContouringToolpath',
    description: 'Contour machining paths',
    operation: 'CONTOURING_TOOLPATH',
    occtBinding: 'contouringToolpath',
    parameters: [
      { name: 'levels', type: 'number', default: 10, min: 1, max: 100, step: 1 },
      { name: 'climb', type: 'boolean', default: true },
      { name: 'compensation', type: 'enum', options: ['left', 'right', 'center'], default: 'right' }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'contours', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'DrillingOperation',
    description: 'Drilling operation setup',
    operation: 'DRILLING_OPERATION',
    occtBinding: 'drillingOperation',
    parameters: [
      { name: 'drillDiameter', type: 'number', default: 8, min: 0.1, max: 50 },
      { name: 'peckDepth', type: 'number', default: 5, min: 0, max: 20 },
      { name: 'dwellTime', type: 'number', default: 0, min: 0, max: 10 }
    ],
    inputs: [
      { name: 'holes', type: 'Point[]', required: true },
      { name: 'depths', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'drillCycles', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ThreadMilling',
    description: 'Thread milling operation',
    operation: 'THREAD_MILLING',
    occtBinding: 'threadMilling',
    parameters: [
      { name: 'threadPitch', type: 'number', default: 1.5, min: 0.1, max: 10 },
      { name: 'threadDepth', type: 'number', default: 1, min: 0.1, max: 5 },
      { name: 'passes', type: 'number', default: 3, min: 1, max: 10, step: 1 }
    ],
    inputs: [
      { name: 'holes', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'threadPaths', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'AdaptiveClearing',
    description: 'Adaptive clearing strategy',
    operation: 'ADAPTIVE_CLEARING',
    occtBinding: 'adaptiveClearing',
    parameters: [
      { name: 'optimalLoad', type: 'number', default: 0.4, min: 0.1, max: 1 },
      { name: 'helixAngle', type: 'number', default: 3, min: 0, max: 10 }
    ],
    inputs: [
      { name: 'region', type: 'Face', required: true },
      { name: 'depth', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'adaptivePath', type: 'Wire' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'TrochoidalMilling',
    description: 'Trochoidal milling paths',
    operation: 'TROCHOIDAL_MILLING',
    occtBinding: 'trochoidalMilling',
    parameters: [
      { name: 'trochoidWidth', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'stepover', type: 'number', default: 0.3, min: 0.1, max: 1 }
    ],
    inputs: [
      { name: 'slot', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'trochoidalPath', type: 'Wire' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'RestMachining',
    description: 'Rest material machining',
    operation: 'REST_MACHINING',
    occtBinding: 'restMachining',
    parameters: [
      { name: 'previousTool', type: 'number', default: 10, min: 1, max: 50 },
      { name: 'currentTool', type: 'number', default: 3, min: 0.1, max: 50 }
    ],
    inputs: [
      { name: 'model', type: 'Shape', required: true },
      { name: 'previousPaths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'restAreas', type: 'Face[]' },
      { name: 'restPaths', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ToolCompensation',
    description: 'Tool radius compensation',
    operation: 'TOOL_COMPENSATION',
    occtBinding: 'toolCompensation',
    parameters: [
      { name: 'toolRadius', type: 'number', default: 3, min: 0.1, max: 25 },
      { name: 'wearOffset', type: 'number', default: 0, min: -1, max: 1 }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'compensatedPath', type: 'Wire' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'HelicalEntry',
    description: 'Helical plunge entry',
    operation: 'HELICAL_ENTRY',
    occtBinding: 'helicalEntry',
    parameters: [
      { name: 'helixDiameter', type: 'number', default: 10, min: 1, max: 50 },
      { name: 'helixAngle', type: 'number', default: 3, min: 1, max: 10 }
    ],
    inputs: [
      { name: 'entryPoint', type: 'Point', required: true },
      { name: 'depth', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'helixPath', type: 'Wire' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'RampEntry',
    description: 'Ramped plunge entry',
    operation: 'RAMP_ENTRY',
    occtBinding: 'rampEntry',
    parameters: [
      { name: 'rampAngle', type: 'number', default: 5, min: 1, max: 30 },
      { name: 'rampLength', type: 'number', default: 20, min: 5, max: 100 }
    ],
    inputs: [
      { name: 'entryEdge', type: 'Edge', required: true },
      { name: 'depth', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'rampPath', type: 'Wire' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'HighSpeedMachining',
    description: 'HSM toolpath optimization',
    operation: 'HIGH_SPEED_MACHINING',
    occtBinding: 'highSpeedMachining',
    parameters: [
      { name: 'cornerRadius', type: 'number', default: 2, min: 0.1, max: 10 },
      { name: 'entrySpeed', type: 'number', default: 0.5, min: 0.1, max: 1 }
    ],
    inputs: [
      { name: 'toolpath', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'hsmPath', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ScallopHeight',
    description: 'Calculate scallop height',
    operation: 'SCALLOP_HEIGHT',
    occtBinding: 'scallopHeight',
    parameters: [
      { name: 'ballRadius', type: 'number', default: 3, min: 0.5, max: 25 },
      { name: 'stepover', type: 'number', default: 1, min: 0.1, max: 10 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'scallopMap', type: 'Data' },
      { name: 'maxScallop', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'CollisionDetection',
    description: 'Tool collision checking',
    operation: 'COLLISION_DETECTION',
    occtBinding: 'collisionDetection',
    parameters: [
      { name: 'toolLength', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'holderDiameter', type: 'number', default: 20, min: 5, max: 100 }
    ],
    inputs: [
      { name: 'toolpath', type: 'Wire[]', required: true },
      { name: 'model', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'collisions', type: 'Point[]' },
      { name: 'safePath', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'FeedsAndSpeeds',
    description: 'Calculate feeds and speeds',
    operation: 'FEEDS_AND_SPEEDS',
    occtBinding: 'feedsAndSpeeds',
    parameters: [
      { name: 'material', type: 'enum', options: ['aluminum', 'steel', 'stainless', 'titanium', 'plastic', 'wood'], default: 'aluminum' },
      { name: 'toolMaterial', type: 'enum', options: ['hss', 'carbide', 'ceramic', 'diamond'], default: 'carbide' },
      { name: 'toolDiameter', type: 'number', default: 6, min: 0.1, max: 50 }
    ],
    inputs: [],
    outputs: [
      { name: 'spindleSpeed', type: 'Number' },
      { name: 'feedRate', type: 'Number' },
      { name: 'chipLoad', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'FiveAxisPositioning',
    description: '5-axis positioning strategy',
    operation: 'FIVE_AXIS_POSITIONING',
    occtBinding: 'fiveAxisPositioning',
    parameters: [
      { name: 'leadAngle', type: 'number', default: 10, min: 0, max: 45 },
      { name: 'tiltAngle', type: 'number', default: 0, min: -90, max: 90 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true },
      { name: 'toolAxis', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'toolOrientations', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'SwarmMilling',
    description: 'Swarm/parallel finishing',
    operation: 'SWARM_MILLING',
    occtBinding: 'swarmMilling',
    parameters: [
      { name: 'passCount', type: 'number', default: 5, min: 1, max: 20, step: 1 },
      { name: 'overlap', type: 'number', default: 0.1, min: 0, max: 0.5 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'swarmPaths', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ToolLibrary',
    description: 'Tool library management',
    operation: 'TOOL_LIBRARY',
    occtBinding: 'toolLibrary',
    parameters: [
      { name: 'toolNumber', type: 'number', default: 1, min: 1, max: 999, step: 1 },
      { name: 'toolType', type: 'enum', options: ['endmill', 'ballmill', 'drill', 'tap', 'reamer', 'boring'], default: 'endmill' }
    ],
    inputs: [],
    outputs: [
      { name: 'toolData', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'WorkCoordinate',
    description: 'Work coordinate system',
    operation: 'WORK_COORDINATE',
    occtBinding: 'workCoordinate',
    parameters: [
      { name: 'wcs', type: 'enum', options: ['G54', 'G55', 'G56', 'G57', 'G58', 'G59'], default: 'G54' }
    ],
    inputs: [
      { name: 'origin', type: 'Point', required: true },
      { name: 'orientation', type: 'Transform', required: false }
    ],
    outputs: [
      { name: 'coordinate', type: 'Transform' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'PostProcessor',
    description: 'CNC post-processor',
    operation: 'POST_PROCESSOR',
    occtBinding: 'postProcessor',
    parameters: [
      { name: 'machine', type: 'enum', options: ['haas', 'fanuc', 'siemens', 'heidenhain', 'mazak'], default: 'haas' },
      { name: 'axes', type: 'enum', options: ['3-axis', '4-axis', '5-axis'], default: '3-axis' }
    ],
    inputs: [
      { name: 'toolpaths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'ncCode', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ChipEvacuation',
    description: 'Chip evacuation analysis',
    operation: 'CHIP_EVACUATION',
    occtBinding: 'chipEvacuation',
    parameters: [
      { name: 'flutes', type: 'number', default: 2, min: 1, max: 8, step: 1 },
      { name: 'helixAngle', type: 'number', default: 30, min: 0, max: 60 }
    ],
    inputs: [
      { name: 'pocket', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'evacuationScore', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'CutterEngagement',
    description: 'Analyze cutter engagement',
    operation: 'CUTTER_ENGAGEMENT',
    occtBinding: 'cutterEngagement',
    parameters: [
      { name: 'toolDiameter', type: 'number', default: 10, min: 1, max: 50 }
    ],
    inputs: [
      { name: 'toolpath', type: 'Wire', required: true },
      { name: 'stock', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'engagementAngle', type: 'Number[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ToolWear',
    description: 'Predict tool wear',
    operation: 'TOOL_WEAR',
    occtBinding: 'toolWear',
    parameters: [
      { name: 'material', type: 'enum', options: ['aluminum', 'steel', 'titanium', 'inconel'], default: 'steel' },
      { name: 'cuttingTime', type: 'number', default: 60, min: 1, max: 1000 }
    ],
    inputs: [
      { name: 'toolpath', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'wearRate', type: 'Number' },
      { name: 'toolLife', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'SetupSheets',
    description: 'Generate setup documentation',
    operation: 'SETUP_SHEETS',
    occtBinding: 'setupSheets',
    parameters: [
      { name: 'includeToolList', type: 'boolean', default: true },
      { name: 'includeFixtures', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'operations', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'setupDocument', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'CNC',
    name: 'ProbeRoutine',
    description: 'Probing cycle generation',
    operation: 'PROBE_ROUTINE',
    occtBinding: 'probeRoutine',
    parameters: [
      { name: 'probeType', type: 'enum', options: ['corner', 'bore', 'boss', 'plane', 'edge'], default: 'corner' }
    ],
    inputs: [
      { name: 'feature', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'probePoints', type: 'Point[]' },
      { name: 'probeCycle', type: 'Data' }
    ]
  }
];

/**
 * Laser Cutting and Engraving (25 nodes)
 */
export const laserCuttingTemplates: NodeTemplate[] = [
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'LaserPath',
    description: 'Generate laser cutting path',
    operation: 'LASER_PATH',
    occtBinding: 'laserPath',
    parameters: [
      { name: 'kerf', type: 'number', default: 0.15, min: 0, max: 1 },
      { name: 'cornerRadius', type: 'number', default: 0, min: 0, max: 5 }
    ],
    inputs: [
      { name: 'profiles', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'cuttingPath', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'TabsAndSlots',
    description: 'Add tabs for assembly',
    operation: 'TABS_AND_SLOTS',
    occtBinding: 'tabsAndSlots',
    parameters: [
      { name: 'tabWidth', type: 'number', default: 10, min: 1, max: 50 },
      { name: 'tabDepth', type: 'number', default: 5, min: 1, max: 20 },
      { name: 'clearance', type: 'number', default: 0.1, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'edges', type: 'Edge[]', required: true }
    ],
    outputs: [
      { name: 'tabbedEdges', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'LivingHinge',
    description: 'Generate living hinge pattern',
    operation: 'LIVING_HINGE',
    occtBinding: 'livingHinge',
    parameters: [
      { name: 'pattern', type: 'enum', options: ['straight', 'wave', 'diamond', 'honeycomb'], default: 'straight' },
      { name: 'spacing', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'cutLength', type: 'number', default: 10, min: 1, max: 50 }
    ],
    inputs: [
      { name: 'hingeArea', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'hingePattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'KerfBending',
    description: 'Kerf bending patterns',
    operation: 'KERF_BENDING',
    occtBinding: 'kerfBending',
    parameters: [
      { name: 'bendRadius', type: 'number', default: 50, min: 10, max: 500 },
      { name: 'materialThickness', type: 'number', default: 3, min: 0.5, max: 20 },
      { name: 'kerfWidth', type: 'number', default: 0.15, min: 0.05, max: 1 }
    ],
    inputs: [
      { name: 'bendZone', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'kerfPattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'PowerMapping',
    description: 'Map laser power settings',
    operation: 'POWER_MAPPING',
    occtBinding: 'powerMapping',
    parameters: [
      { name: 'material', type: 'enum', options: ['acrylic', 'wood', 'mdf', 'cardboard', 'leather', 'fabric'], default: 'acrylic' },
      { name: 'thickness', type: 'number', default: 3, min: 0.1, max: 50 },
      { name: 'wattage', type: 'number', default: 60, min: 10, max: 500 }
    ],
    inputs: [
      { name: 'geometry', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'powerSettings', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'EngraveRaster',
    description: 'Generate raster engraving',
    operation: 'ENGRAVE_RASTER',
    occtBinding: 'engraveRaster',
    parameters: [
      { name: 'resolution', type: 'number', default: 300, min: 100, max: 1200 },
      { name: 'dithering', type: 'enum', options: ['none', 'floyd-steinberg', 'ordered', 'random'], default: 'floyd-steinberg' }
    ],
    inputs: [
      { name: 'image', type: 'Data', required: true },
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'rasterData', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'VectorEngrave',
    description: 'Vector engraving paths',
    operation: 'VECTOR_ENGRAVE',
    occtBinding: 'vectorEngrave',
    parameters: [
      { name: 'depth', type: 'number', default: 0.5, min: 0.1, max: 5 },
      { name: 'passes', type: 'number', default: 1, min: 1, max: 10, step: 1 }
    ],
    inputs: [
      { name: 'vectors', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'engravePaths', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'NestingOptimization',
    description: 'Optimize material nesting',
    operation: 'NESTING_OPTIMIZATION',
    occtBinding: 'nestingOptimization',
    parameters: [
      { name: 'spacing', type: 'number', default: 2, min: 0, max: 10 },
      { name: 'rotations', type: 'boolean', default: true },
      { name: 'grainDirection', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'parts', type: 'Face[]', required: true },
      { name: 'sheet', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'nestedParts', type: 'Face[]' },
      { name: 'utilization', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'CutOrderOptimization',
    description: 'Optimize cutting order',
    operation: 'CUT_ORDER_OPTIMIZATION',
    occtBinding: 'cutOrderOptimization',
    parameters: [
      { name: 'innerFirst', type: 'boolean', default: true },
      { name: 'minimizeTravel', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'paths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'orderedPaths', type: 'Wire[]' },
      { name: 'travelPath', type: 'Wire' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'LeadInOut',
    description: 'Add lead-in/out to paths',
    operation: 'LEAD_IN_OUT',
    occtBinding: 'leadInOut',
    parameters: [
      { name: 'leadLength', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'leadType', type: 'enum', options: ['line', 'arc', 'none'], default: 'line' }
    ],
    inputs: [
      { name: 'paths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'pathsWithLeads', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'BridgeGeneration',
    description: 'Add holding bridges',
    operation: 'BRIDGE_GENERATION',
    occtBinding: 'bridgeGeneration',
    parameters: [
      { name: 'bridgeWidth', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'bridgeCount', type: 'number', default: 4, min: 1, max: 20, step: 1 }
    ],
    inputs: [
      { name: 'cutPath', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'bridgedPath', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'FocusCompensation',
    description: 'Focus height compensation',
    operation: 'FOCUS_COMPENSATION',
    occtBinding: 'focusCompensation',
    parameters: [
      { name: 'focalLength', type: 'number', default: 50, min: 20, max: 200 },
      { name: 'beamDivergence', type: 'number', default: 2, min: 0.5, max: 5 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'focusMap', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'HatchFill',
    description: 'Generate hatch fill pattern',
    operation: 'HATCH_FILL',
    occtBinding: 'hatchFill',
    parameters: [
      { name: 'angle', type: 'number', default: 45, min: 0, max: 180 },
      { name: 'spacing', type: 'number', default: 1, min: 0.1, max: 10 },
      { name: 'crosshatch', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'region', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'hatchLines', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'TextEngraving',
    description: 'Optimize text for engraving',
    operation: 'TEXT_ENGRAVING',
    occtBinding: 'textEngraving',
    parameters: [
      { name: 'font', type: 'enum', options: ['single-line', 'outline', 'filled'], default: 'single-line' },
      { name: 'height', type: 'number', default: 10, min: 1, max: 100 }
    ],
    inputs: [
      { name: 'text', type: 'Data', required: true },
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'textPaths', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'MaterialDatabase',
    description: 'Material cutting database',
    operation: 'MATERIAL_DATABASE',
    occtBinding: 'materialDatabase',
    parameters: [
      { name: 'material', type: 'enum', options: ['acrylic', 'plywood', 'mdf', 'leather', 'paper', 'fabric'], default: 'acrylic' },
      { name: 'thickness', type: 'number', default: 3, min: 0.1, max: 50 }
    ],
    inputs: [],
    outputs: [
      { name: 'cuttingSpeed', type: 'Number' },
      { name: 'power', type: 'Number' },
      { name: 'frequency', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'LayerSeparation',
    description: 'Separate by layer/color',
    operation: 'LAYER_SEPARATION',
    occtBinding: 'layerSeparation',
    parameters: [
      { name: 'separateBy', type: 'enum', options: ['color', 'layer', 'lineweight'], default: 'color' }
    ],
    inputs: [
      { name: 'drawing', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'layers', type: 'Wire[][]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'MultiplePasses',
    description: 'Setup multiple passes',
    operation: 'MULTIPLE_PASSES',
    occtBinding: 'multiplePasses',
    parameters: [
      { name: 'passes', type: 'number', default: 2, min: 1, max: 10, step: 1 },
      { name: 'powerRamp', type: 'boolean', default: false },
      { name: 'zStep', type: 'number', default: 0, min: 0, max: 5 }
    ],
    inputs: [
      { name: 'paths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'multipassPaths', type: 'Wire[][]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'CleanupPaths',
    description: 'Clean and optimize paths',
    operation: 'CLEANUP_PATHS',
    occtBinding: 'cleanupPaths',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 0.1 },
      { name: 'removeDoubles', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'paths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'cleanPaths', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'PierceOptimization',
    description: 'Optimize pierce points',
    operation: 'PIERCE_OPTIMIZATION',
    occtBinding: 'pierceOptimization',
    parameters: [
      { name: 'preferCorners', type: 'boolean', default: true },
      { name: 'minEdgeDistance', type: 'number', default: 2, min: 0, max: 10 }
    ],
    inputs: [
      { name: 'closedPaths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'piercePoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'MicroJoints',
    description: 'Add micro-joints',
    operation: 'MICRO_JOINTS',
    occtBinding: 'microJoints',
    parameters: [
      { name: 'jointWidth', type: 'number', default: 0.2, min: 0.1, max: 2 },
      { name: 'jointSpacing', type: 'number', default: 30, min: 10, max: 100 }
    ],
    inputs: [
      { name: 'cutPath', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'jointedPath', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'CutQuality',
    description: 'Predict cut quality',
    operation: 'CUT_QUALITY',
    occtBinding: 'cutQuality',
    parameters: [
      { name: 'speed', type: 'number', default: 20, min: 1, max: 100 },
      { name: 'power', type: 'number', default: 80, min: 10, max: 100 }
    ],
    inputs: [
      { name: 'material', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'edgeQuality', type: 'Data' },
      { name: 'heatAffectedZone', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'RotaryAttachment',
    description: 'Setup rotary cutting',
    operation: 'ROTARY_ATTACHMENT',
    occtBinding: 'rotaryAttachment',
    parameters: [
      { name: 'diameter', type: 'number', default: 100, min: 10, max: 500 },
      { name: 'stepsPerRotation', type: 'number', default: 10000, min: 100, max: 100000 }
    ],
    inputs: [
      { name: 'cylindricalPattern', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'unwrappedPattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'AirAssist',
    description: 'Air assist optimization',
    operation: 'AIR_ASSIST',
    occtBinding: 'airAssist',
    parameters: [
      { name: 'pressure', type: 'number', default: 20, min: 0, max: 100 },
      { name: 'nozzleType', type: 'enum', options: ['standard', 'high-pressure', 'wide', 'focused'], default: 'standard' }
    ],
    inputs: [
      { name: 'material', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'airSettings', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'SafetyZones',
    description: 'Define safety zones',
    operation: 'SAFETY_ZONES',
    occtBinding: 'safetyZones',
    parameters: [
      { name: 'margin', type: 'number', default: 5, min: 0, max: 50 }
    ],
    inputs: [
      { name: 'workArea', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'safeArea', type: 'Face' },
      { name: 'noGoZones', type: 'Face[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Laser',
    name: 'JobTimeEstimate',
    description: 'Estimate job time',
    operation: 'JOB_TIME_ESTIMATE',
    occtBinding: 'jobTimeEstimate',
    parameters: [
      { name: 'rapidSpeed', type: 'number', default: 500, min: 100, max: 1000 }
    ],
    inputs: [
      { name: 'cuttingPaths', type: 'Wire[]', required: true },
      { name: 'engravingPaths', type: 'Wire[]', required: false }
    ],
    outputs: [
      { name: 'totalTime', type: 'Number' },
      { name: 'cuttingTime', type: 'Number' },
      { name: 'engravingTime', type: 'Number' }
    ]
  }
];

/**
 * Robotic Fabrication (25 nodes)
 */
export const roboticFabricationTemplates: NodeTemplate[] = [
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'RobotKinematics',
    description: 'Robot kinematics solver',
    operation: 'ROBOT_KINEMATICS',
    occtBinding: 'robotKinematics',
    parameters: [
      { name: 'robotType', type: 'enum', options: ['6-axis', 'scara', 'delta', 'cartesian'], default: '6-axis' },
      { name: 'solver', type: 'enum', options: ['forward', 'inverse'], default: 'inverse' }
    ],
    inputs: [
      { name: 'target', type: 'Transform', required: true },
      { name: 'jointLimits', type: 'Data', required: false }
    ],
    outputs: [
      { name: 'jointAngles', type: 'Number[]' },
      { name: 'reachable', type: 'Boolean' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'PathPlanning',
    description: 'Robot path planning',
    operation: 'PATH_PLANNING',
    occtBinding: 'pathPlanning',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['rrt', 'prm', 'a-star', 'potential-field'], default: 'rrt' },
      { name: 'smoothing', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'waypoints', type: 'Transform[]', required: true },
      { name: 'obstacles', type: 'Shape[]', required: false }
    ],
    outputs: [
      { name: 'trajectory', type: 'Transform[]' },
      { name: 'jointTrajectory', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'CollisionAvoidance',
    description: 'Collision detection and avoidance',
    operation: 'COLLISION_AVOIDANCE',
    occtBinding: 'collisionAvoidance',
    parameters: [
      { name: 'safetyMargin', type: 'number', default: 10, min: 0, max: 50 }
    ],
    inputs: [
      { name: 'robotPath', type: 'Transform[]', required: true },
      { name: 'environment', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'safePath', type: 'Transform[]' },
      { name: 'collisionPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'EndEffectorSetup',
    description: 'Configure end effector',
    operation: 'END_EFFECTOR_SETUP',
    occtBinding: 'endEffectorSetup',
    parameters: [
      { name: 'toolType', type: 'enum', options: ['gripper', 'welder', 'extruder', 'mill', 'laser'], default: 'gripper' },
      { name: 'tcpOffset', type: 'vector3', default: '[0, 0, 100]' }
    ],
    inputs: [
      { name: 'toolGeometry', type: 'Shape', required: false }
    ],
    outputs: [
      { name: 'toolConfiguration', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'WorkCellSetup',
    description: 'Setup robotic work cell',
    operation: 'WORK_CELL_SETUP',
    occtBinding: 'workCellSetup',
    parameters: [
      { name: 'robotCount', type: 'number', default: 1, min: 1, max: 4, step: 1 }
    ],
    inputs: [
      { name: 'cellBoundary', type: 'Box', required: true },
      { name: 'fixtures', type: 'Shape[]', required: false }
    ],
    outputs: [
      { name: 'workCell', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'TrajectoryOptimization',
    description: 'Optimize robot trajectory',
    operation: 'TRAJECTORY_OPTIMIZATION',
    occtBinding: 'trajectoryOptimization',
    parameters: [
      { name: 'objective', type: 'enum', options: ['time', 'energy', 'smooth', 'accuracy'], default: 'time' },
      { name: 'maxVelocity', type: 'number', default: 1000, min: 10, max: 5000 },
      { name: 'maxAcceleration', type: 'number', default: 5000, min: 100, max: 20000 }
    ],
    inputs: [
      { name: 'trajectory', type: 'Transform[]', required: true }
    ],
    outputs: [
      { name: 'optimizedTrajectory', type: 'Transform[]' },
      { name: 'velocityProfile', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'SingularityAvoidance',
    description: 'Avoid robot singularities',
    operation: 'SINGULARITY_AVOIDANCE',
    occtBinding: 'singularityAvoidance',
    parameters: [
      { name: 'threshold', type: 'number', default: 0.1, min: 0.01, max: 1 }
    ],
    inputs: [
      { name: 'jointTrajectory', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'safeTrajectory', type: 'Data' },
      { name: 'singularityPoints', type: 'Number[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'RobotCalibration',
    description: 'Robot calibration routine',
    operation: 'ROBOT_CALIBRATION',
    occtBinding: 'robotCalibration',
    parameters: [
      { name: 'method', type: 'enum', options: ['dh-parameters', 'circle-point', 'plane', 'hand-eye'], default: 'dh-parameters' }
    ],
    inputs: [
      { name: 'measurementPoints', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'calibrationMatrix', type: 'Transform' },
      { name: 'accuracy', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'ForceControl',
    description: 'Force/torque control',
    operation: 'FORCE_CONTROL',
    occtBinding: 'forceControl',
    parameters: [
      { name: 'forceLimit', type: 'number', default: 100, min: 1, max: 1000 },
      { name: 'compliance', type: 'number', default: 0.5, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'contactSurface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'forceProfile', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'WeldingPath',
    description: 'Robotic welding path',
    operation: 'WELDING_PATH',
    occtBinding: 'weldingPath',
    parameters: [
      { name: 'weldType', type: 'enum', options: ['mig', 'tig', 'spot', 'laser'], default: 'mig' },
      { name: 'weavePattern', type: 'enum', options: ['none', 'zigzag', 'circular', 'triangular'], default: 'none' },
      { name: 'travelSpeed', type: 'number', default: 10, min: 1, max: 50 }
    ],
    inputs: [
      { name: 'seamPath', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'weldPath', type: 'Transform[]' },
      { name: 'weldParameters', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'PickAndPlace',
    description: 'Pick and place optimization',
    operation: 'PICK_AND_PLACE',
    occtBinding: 'pickAndPlace',
    parameters: [
      { name: 'gripperType', type: 'enum', options: ['vacuum', 'parallel', 'angular', 'magnetic'], default: 'parallel' },
      { name: 'approachAngle', type: 'number', default: 0, min: -90, max: 90 }
    ],
    inputs: [
      { name: 'pickPoints', type: 'Transform[]', required: true },
      { name: 'placePoints', type: 'Transform[]', required: true }
    ],
    outputs: [
      { name: 'pickPlaceSequence', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'PalletizingPattern',
    description: 'Palletizing patterns',
    operation: 'PALLETIZING_PATTERN',
    occtBinding: 'palletizingPattern',
    parameters: [
      { name: 'pattern', type: 'enum', options: ['column', 'interlocked', 'pinwheel', 'split-row'], default: 'interlocked' },
      { name: 'layersCount', type: 'number', default: 10, min: 1, max: 50, step: 1 }
    ],
    inputs: [
      { name: 'boxSize', type: 'Vector', required: true },
      { name: 'palletSize', type: 'Vector', required: true }
    ],
    outputs: [
      { name: 'placementPoints', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'RoboticMilling',
    description: 'Robotic milling paths',
    operation: 'ROBOTIC_MILLING',
    occtBinding: 'roboticMilling',
    parameters: [
      { name: 'spindleSpeed', type: 'number', default: 10000, min: 1000, max: 30000 },
      { name: 'feedRate', type: 'number', default: 1000, min: 10, max: 5000 }
    ],
    inputs: [
      { name: 'millingPaths', type: 'Wire[]', required: true },
      { name: 'toolOrientation', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'robotProgram', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'SprayPainting',
    description: 'Robotic spray painting',
    operation: 'SPRAY_PAINTING',
    occtBinding: 'sprayPainting',
    parameters: [
      { name: 'sprayWidth', type: 'number', default: 100, min: 10, max: 500 },
      { name: 'overlap', type: 'number', default: 0.5, min: 0, max: 0.9 },
      { name: 'standoffDistance', type: 'number', default: 200, min: 50, max: 500 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'sprayPath', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'AdditiveManufacturing',
    description: 'Robotic 3D printing',
    operation: 'ADDITIVE_MANUFACTURING',
    occtBinding: 'additiveManufacturing',
    parameters: [
      { name: 'nozzleSize', type: 'number', default: 4, min: 0.4, max: 10 },
      { name: 'layerHeight', type: 'number', default: 2, min: 0.1, max: 5 }
    ],
    inputs: [
      { name: 'printPaths', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'roboticPrintPath', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'VisionGuidance',
    description: 'Vision-guided robotics',
    operation: 'VISION_GUIDANCE',
    occtBinding: 'visionGuidance',
    parameters: [
      { name: 'cameraType', type: 'enum', options: ['2d', '3d', 'stereo'], default: '3d' },
      { name: 'patternType', type: 'enum', options: ['checkerboard', 'aruco', 'feature'], default: 'aruco' }
    ],
    inputs: [
      { name: 'targetFeatures', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'detectedPoses', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'MultiRobotCoordination',
    description: 'Coordinate multiple robots',
    operation: 'MULTI_ROBOT_COORDINATION',
    occtBinding: 'multiRobotCoordination',
    parameters: [
      { name: 'syncMethod', type: 'enum', options: ['time', 'position', 'event'], default: 'position' }
    ],
    inputs: [
      { name: 'robotPaths', type: 'Transform[][]', required: true }
    ],
    outputs: [
      { name: 'synchronizedPaths', type: 'Transform[][]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'ConveyorTracking',
    description: 'Moving conveyor tracking',
    operation: 'CONVEYOR_TRACKING',
    occtBinding: 'conveyorTracking',
    parameters: [
      { name: 'conveyorSpeed', type: 'number', default: 100, min: 1, max: 1000 },
      { name: 'trackingWindow', type: 'number', default: 500, min: 100, max: 2000 }
    ],
    inputs: [
      { name: 'objectPositions', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'trackingTrajectory', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'SafetyZoneSetup',
    description: 'Define robot safety zones',
    operation: 'SAFETY_ZONE_SETUP',
    occtBinding: 'safetyZoneSetup',
    parameters: [
      { name: 'zoneType', type: 'enum', options: ['stop', 'slow', 'warning'], default: 'slow' },
      { name: 'responseTime', type: 'number', default: 0.5, min: 0.1, max: 2 }
    ],
    inputs: [
      { name: 'zones', type: 'Box[]', required: true }
    ],
    outputs: [
      { name: 'safetyConfiguration', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'RobotSimulation',
    description: 'Simulate robot motion',
    operation: 'ROBOT_SIMULATION',
    occtBinding: 'robotSimulation',
    parameters: [
      { name: 'timeStep', type: 'number', default: 0.01, min: 0.001, max: 0.1 },
      { name: 'dynamics', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'program', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'simulation', type: 'Data' },
      { name: 'cycleTime', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'PostProcessorRobot',
    description: 'Robot code generation',
    operation: 'POST_PROCESSOR_ROBOT',
    occtBinding: 'postProcessorRobot',
    parameters: [
      { name: 'robotBrand', type: 'enum', options: ['abb', 'kuka', 'fanuc', 'yaskawa', 'ur'], default: 'abb' }
    ],
    inputs: [
      { name: 'trajectory', type: 'Transform[]', required: true }
    ],
    outputs: [
      { name: 'robotCode', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'ReachAnalysis',
    description: 'Analyze robot reach',
    operation: 'REACH_ANALYSIS',
    occtBinding: 'reachAnalysis',
    parameters: [
      { name: 'resolution', type: 'number', default: 50, min: 10, max: 200, step: 10 }
    ],
    inputs: [
      { name: 'robotModel', type: 'Data', required: true },
      { name: 'workspace', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'reachableVolume', type: 'Shape' },
      { name: 'coverage', type: 'Number' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'JointLimitAvoidance',
    description: 'Avoid joint limits',
    operation: 'JOINT_LIMIT_AVOIDANCE',
    occtBinding: 'jointLimitAvoidance',
    parameters: [
      { name: 'margin', type: 'number', default: 5, min: 0, max: 30 }
    ],
    inputs: [
      { name: 'jointTrajectory', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'safeTrajectory', type: 'Data' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'ToolChangerSetup',
    description: 'Automatic tool changer',
    operation: 'TOOL_CHANGER_SETUP',
    occtBinding: 'toolChangerSetup',
    parameters: [
      { name: 'toolCount', type: 'number', default: 6, min: 1, max: 20, step: 1 }
    ],
    inputs: [
      { name: 'toolRack', type: 'Transform', required: true }
    ],
    outputs: [
      { name: 'toolChangeSequence', type: 'Transform[]' }
    ]
  },
  {
    category: 'Fabrication',
    subcategory: 'Robotics',
    name: 'RobotMaintenance',
    description: 'Maintenance scheduling',
    operation: 'ROBOT_MAINTENANCE',
    occtBinding: 'robotMaintenance',
    parameters: [
      { name: 'operatingHours', type: 'number', default: 1000, min: 0, max: 50000 }
    ],
    inputs: [
      { name: 'robotData', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'maintenanceSchedule', type: 'Data' }
    ]
  }
];

// Export all fabrication templates
export const allFabricationTemplates = [
  ...printing3DTemplates,
  ...cncMachiningTemplates,
  ...laserCuttingTemplates,
  ...roboticFabricationTemplates
];