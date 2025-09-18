/**
 * Architecture-Specific Templates
 * Building components, spatial design, and architectural systems
 */

import { NodeTemplate } from '../node-template';

/**
 * Wall Systems (20 nodes)
 */
export const wallSystemTemplates: NodeTemplate[] = [
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'StraightWall',
    description: 'Create straight wall segment',
    operation: 'STRAIGHT_WALL',
    occtBinding: 'straightWall',
    parameters: [
      { name: 'height', type: 'number', default: 3000, min: 100, max: 10000 },
      { name: 'thickness', type: 'number', default: 200, min: 50, max: 500 },
      { name: 'justification', type: 'enum', options: ['center', 'left', 'right'], default: 'center' }
    ],
    inputs: [
      { name: 'centerline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'wall', type: 'Shape' },
      { name: 'centerline', type: 'Wire' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'CurvedWall',
    description: 'Create curved wall segment',
    operation: 'CURVED_WALL',
    occtBinding: 'curvedWall',
    parameters: [
      { name: 'height', type: 'number', default: 3000, min: 100, max: 10000 },
      { name: 'thickness', type: 'number', default: 200, min: 50, max: 500 },
      { name: 'segments', type: 'number', default: 10, min: 3, max: 50, step: 1 }
    ],
    inputs: [
      { name: 'curve', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'wall', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'CompoundWall',
    description: 'Multi-layer wall assembly',
    operation: 'COMPOUND_WALL',
    occtBinding: 'compoundWall',
    parameters: [
      { name: 'layers', type: 'number', default: 3, min: 1, max: 10, step: 1 },
      { name: 'layerThicknesses', type: 'string', default: '100,50,100' },
      { name: 'layerMaterials', type: 'string', default: 'brick,insulation,drywall' }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'compoundWall', type: 'Shape' },
      { name: 'layers', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'CurtainWall',
    description: 'Glass curtain wall system',
    operation: 'CURTAIN_WALL',
    occtBinding: 'curtainWall',
    parameters: [
      { name: 'gridU', type: 'number', default: 1500, min: 500, max: 3000 },
      { name: 'gridV', type: 'number', default: 1500, min: 500, max: 3000 },
      { name: 'mullionWidth', type: 'number', default: 50, min: 20, max: 200 },
      { name: 'mullionDepth', type: 'number', default: 100, min: 50, max: 300 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'curtainWall', type: 'Shape' },
      { name: 'mullions', type: 'Shape[]' },
      { name: 'panels', type: 'Face[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'WallOpening',
    description: 'Create opening in wall',
    operation: 'WALL_OPENING',
    occtBinding: 'wallOpening',
    parameters: [
      { name: 'width', type: 'number', default: 900, min: 100, max: 5000 },
      { name: 'height', type: 'number', default: 2100, min: 100, max: 5000 },
      { name: 'sillHeight', type: 'number', default: 0, min: 0, max: 2000 }
    ],
    inputs: [
      { name: 'wall', type: 'Shape', required: true },
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'wallWithOpening', type: 'Shape' },
      { name: 'opening', type: 'Face' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'WallJoin',
    description: 'Join wall segments',
    operation: 'WALL_JOIN',
    occtBinding: 'wallJoin',
    parameters: [
      { name: 'joinType', type: 'enum', options: ['miter', 'butt', 'overlap'], default: 'miter' }
    ],
    inputs: [
      { name: 'wall1', type: 'Shape', required: true },
      { name: 'wall2', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'joinedWalls', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'RetainingWall',
    description: 'Retaining wall with batter',
    operation: 'RETAINING_WALL',
    occtBinding: 'retainingWall',
    parameters: [
      { name: 'height', type: 'number', default: 2000, min: 500, max: 6000 },
      { name: 'baseThickness', type: 'number', default: 400, min: 200, max: 1000 },
      { name: 'batter', type: 'number', default: 10, min: 0, max: 30 }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'retainingWall', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'StudWall',
    description: 'Framed stud wall',
    operation: 'STUD_WALL',
    occtBinding: 'studWall',
    parameters: [
      { name: 'studSpacing', type: 'number', default: 400, min: 300, max: 600 },
      { name: 'studWidth', type: 'number', default: 90, min: 50, max: 200 },
      { name: 'studDepth', type: 'number', default: 45, min: 35, max: 100 }
    ],
    inputs: [
      { name: 'outline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'studFrame', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'InsulatedWall',
    description: 'Wall with insulation layers',
    operation: 'INSULATED_WALL',
    occtBinding: 'insulatedWall',
    parameters: [
      { name: 'insulationType', type: 'enum', options: ['batt', 'rigid', 'spray', 'blown'], default: 'batt' },
      { name: 'rValue', type: 'number', default: 19, min: 5, max: 50 }
    ],
    inputs: [
      { name: 'wallCavity', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'insulatedWall', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'TiltUpPanel',
    description: 'Tilt-up concrete panel',
    operation: 'TILT_UP_PANEL',
    occtBinding: 'tiltUpPanel',
    parameters: [
      { name: 'panelThickness', type: 'number', default: 200, min: 150, max: 400 },
      { name: 'reinforcement', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'panelOutline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'panel', type: 'Shape' },
      { name: 'liftingPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'ParapetWall',
    description: 'Roof parapet wall',
    operation: 'PARAPET_WALL',
    occtBinding: 'parapetWall',
    parameters: [
      { name: 'height', type: 'number', default: 1000, min: 300, max: 2000 },
      { name: 'coping', type: 'boolean', default: true },
      { name: 'copingOverhang', type: 'number', default: 50, min: 0, max: 150 }
    ],
    inputs: [
      { name: 'roofEdge', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'parapet', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'FireWall',
    description: 'Fire-rated wall assembly',
    operation: 'FIRE_WALL',
    occtBinding: 'fireWall',
    parameters: [
      { name: 'fireRating', type: 'enum', options: ['1-hour', '2-hour', '3-hour', '4-hour'], default: '2-hour' },
      { name: 'thickness', type: 'number', default: 250, min: 200, max: 400 }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'fireWall', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'MovablePartition',
    description: 'Movable partition system',
    operation: 'MOVABLE_PARTITION',
    occtBinding: 'movablePartition',
    parameters: [
      { name: 'panelWidth', type: 'number', default: 1200, min: 600, max: 2000 },
      { name: 'trackType', type: 'enum', options: ['ceiling', 'floor', 'both'], default: 'ceiling' }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'partition', type: 'Shape[]' },
      { name: 'track', type: 'Wire' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'SoundproofWall',
    description: 'Acoustic wall assembly',
    operation: 'SOUNDPROOF_WALL',
    occtBinding: 'soundproofWall',
    parameters: [
      { name: 'stcRating', type: 'number', default: 50, min: 30, max: 80 },
      { name: 'massLayers', type: 'number', default: 2, min: 1, max: 4, step: 1 }
    ],
    inputs: [
      { name: 'wallPath', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'acousticWall', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'GreenWall',
    description: 'Living green wall system',
    operation: 'GREEN_WALL',
    occtBinding: 'greenWall',
    parameters: [
      { name: 'moduleSize', type: 'number', default: 600, min: 300, max: 1200 },
      { name: 'irrigationType', type: 'enum', options: ['drip', 'hydroponic', 'aeroponic'], default: 'drip' }
    ],
    inputs: [
      { name: 'wallSurface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'greenWall', type: 'Shape' },
      { name: 'modules', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'DoubleSkinnedFacade',
    description: 'Double-skin facade system',
    operation: 'DOUBLE_SKINNED_FACADE',
    occtBinding: 'doubleSkinned Facade',
    parameters: [
      { name: 'cavityWidth', type: 'number', default: 600, min: 300, max: 1500 },
      { name: 'ventilationType', type: 'enum', options: ['natural', 'mechanical', 'hybrid'], default: 'natural' }
    ],
    inputs: [
      { name: 'buildingFace', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'innerSkin', type: 'Shape' },
      { name: 'outerSkin', type: 'Shape' },
      { name: 'cavity', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'RainScreen',
    description: 'Rainscreen cladding system',
    operation: 'RAIN_SCREEN',
    occtBinding: 'rainScreen',
    parameters: [
      { name: 'claddingType', type: 'enum', options: ['metal', 'composite', 'terracotta', 'wood'], default: 'composite' },
      { name: 'ventGap', type: 'number', default: 25, min: 20, max: 50 }
    ],
    inputs: [
      { name: 'wall', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'rainScreen', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'ShearWall',
    description: 'Structural shear wall',
    operation: 'SHEAR_WALL',
    occtBinding: 'shearWall',
    parameters: [
      { name: 'thickness', type: 'number', default: 300, min: 200, max: 500 },
      { name: 'reinforcementRatio', type: 'number', default: 0.025, min: 0.01, max: 0.04 }
    ],
    inputs: [
      { name: 'wallOutline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'shearWall', type: 'Shape' },
      { name: 'reinforcement', type: 'Wire[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'FoundationWall',
    description: 'Foundation wall system',
    operation: 'FOUNDATION_WALL',
    occtBinding: 'foundationWall',
    parameters: [
      { name: 'depth', type: 'number', default: 1500, min: 1000, max: 3000 },
      { name: 'footingWidth', type: 'number', default: 600, min: 400, max: 1200 }
    ],
    inputs: [
      { name: 'foundationLine', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'foundationWall', type: 'Shape' },
      { name: 'footing', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Walls',
    name: 'HistoricWallRestoration',
    description: 'Historic wall analysis',
    operation: 'HISTORIC_WALL_RESTORATION',
    occtBinding: 'historicWallRestoration',
    parameters: [
      { name: 'period', type: 'enum', options: ['victorian', 'georgian', 'art-deco', 'modernist'], default: 'victorian' },
      { name: 'preservationLevel', type: 'enum', options: ['restore', 'rehabilitate', 'preserve'], default: 'preserve' }
    ],
    inputs: [
      { name: 'existingWall', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'restoredWall', type: 'Shape' }
    ]
  }
];

/**
 * Floor and Ceiling Systems (20 nodes)
 */
export const floorCeilingTemplates: NodeTemplate[] = [
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'SlabOnGrade',
    description: 'Concrete slab on grade',
    operation: 'SLAB_ON_GRADE',
    occtBinding: 'slabOnGrade',
    parameters: [
      { name: 'thickness', type: 'number', default: 150, min: 100, max: 300 },
      { name: 'vaporBarrier', type: 'boolean', default: true },
      { name: 'insulation', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'slab', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'CompositeFloor',
    description: 'Steel deck composite floor',
    operation: 'COMPOSITE_FLOOR',
    occtBinding: 'compositeFloor',
    parameters: [
      { name: 'deckType', type: 'enum', options: ['2-inch', '3-inch', 'cellular'], default: '3-inch' },
      { name: 'concreteThickness', type: 'number', default: 100, min: 75, max: 200 }
    ],
    inputs: [
      { name: 'floorOutline', type: 'Wire', required: true },
      { name: 'beams', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'compositeFloor', type: 'Shape' },
      { name: 'deck', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'RaisedFloor',
    description: 'Raised access floor system',
    operation: 'RAISED_FLOOR',
    occtBinding: 'raisedFloor',
    parameters: [
      { name: 'height', type: 'number', default: 300, min: 150, max: 600 },
      { name: 'panelSize', type: 'number', default: 600, min: 500, max: 1200 },
      { name: 'loadRating', type: 'number', default: 1250, min: 500, max: 2000 }
    ],
    inputs: [
      { name: 'roomBoundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'raisedFloor', type: 'Shape' },
      { name: 'pedestals', type: 'Shape[]' },
      { name: 'panels', type: 'Face[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'WoodJoistFloor',
    description: 'Wood joist floor system',
    operation: 'WOOD_JOIST_FLOOR',
    occtBinding: 'woodJoistFloor',
    parameters: [
      { name: 'joistDepth', type: 'number', default: 250, min: 150, max: 400 },
      { name: 'joistSpacing', type: 'number', default: 400, min: 300, max: 600 },
      { name: 'subfloorThickness', type: 'number', default: 18, min: 15, max: 25 }
    ],
    inputs: [
      { name: 'floorBoundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'floorSystem', type: 'Shape' },
      { name: 'joists', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'PostTensionedSlab',
    description: 'Post-tensioned concrete slab',
    operation: 'POST_TENSIONED_SLAB',
    occtBinding: 'postTensionedSlab',
    parameters: [
      { name: 'slabThickness', type: 'number', default: 200, min: 150, max: 400 },
      { name: 'tendonSpacing', type: 'number', default: 1200, min: 900, max: 1800 }
    ],
    inputs: [
      { name: 'slabOutline', type: 'Wire', required: true },
      { name: 'columnPoints', type: 'Point[]', required: false }
    ],
    outputs: [
      { name: 'ptSlab', type: 'Shape' },
      { name: 'tendons', type: 'Wire[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ceilings',
    name: 'SuspendedCeiling',
    description: 'Suspended ceiling grid',
    operation: 'SUSPENDED_CEILING',
    occtBinding: 'suspendedCeiling',
    parameters: [
      { name: 'tileSize', type: 'enum', options: ['600x600', '600x1200', '1200x1200'], default: '600x600' },
      { name: 'suspensionHeight', type: 'number', default: 300, min: 150, max: 1000 }
    ],
    inputs: [
      { name: 'roomBoundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'ceiling', type: 'Shape' },
      { name: 'grid', type: 'Wire[]' },
      { name: 'tiles', type: 'Face[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ceilings',
    name: 'CofferedCeiling',
    description: 'Coffered ceiling pattern',
    operation: 'COFFERED_CEILING',
    occtBinding: 'cofferedCeiling',
    parameters: [
      { name: 'cofferSize', type: 'number', default: 1200, min: 600, max: 2000 },
      { name: 'cofferDepth', type: 'number', default: 150, min: 50, max: 300 },
      { name: 'beamWidth', type: 'number', default: 200, min: 100, max: 400 }
    ],
    inputs: [
      { name: 'ceilingBoundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'cofferedCeiling', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ceilings',
    name: 'VaultedCeiling',
    description: 'Vaulted ceiling geometry',
    operation: 'VAULTED_CEILING',
    occtBinding: 'vaultedCeiling',
    parameters: [
      { name: 'vaultType', type: 'enum', options: ['barrel', 'groin', 'cloister', 'dome'], default: 'barrel' },
      { name: 'rise', type: 'number', default: 1000, min: 500, max: 3000 }
    ],
    inputs: [
      { name: 'ceilingOutline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'vaultedCeiling', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'MezzanineFloor',
    description: 'Mezzanine floor structure',
    operation: 'MEZZANINE_FLOOR',
    occtBinding: 'mezzanineFloor',
    parameters: [
      { name: 'structureType', type: 'enum', options: ['steel', 'concrete', 'wood'], default: 'steel' },
      { name: 'clearHeight', type: 'number', default: 2400, min: 2100, max: 3000 }
    ],
    inputs: [
      { name: 'mezzanineOutline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'mezzanine', type: 'Shape' },
      { name: 'structure', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'EpoxyFloor',
    description: 'Epoxy floor coating system',
    operation: 'EPOXY_FLOOR',
    occtBinding: 'epoxyFloor',
    parameters: [
      { name: 'thickness', type: 'number', default: 3, min: 2, max: 10 },
      { name: 'texture', type: 'enum', options: ['smooth', 'orange-peel', 'quartz', 'flake'], default: 'smooth' }
    ],
    inputs: [
      { name: 'floorSurface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'epoxyFloor', type: 'Face' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'RadiantFloor',
    description: 'In-floor radiant heating',
    operation: 'RADIANT_FLOOR',
    occtBinding: 'radiantFloor',
    parameters: [
      { name: 'pipeSpacing', type: 'number', default: 200, min: 150, max: 300 },
      { name: 'pipeDialeter', type: 'number', default: 16, min: 12, max: 25 },
      { name: 'zoneCount', type: 'number', default: 1, min: 1, max: 10, step: 1 }
    ],
    inputs: [
      { name: 'floorArea', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'radiantLayout', type: 'Wire[]' },
      { name: 'manifold', type: 'Point' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ceilings',
    name: 'AcousticCeiling',
    description: 'Acoustic ceiling treatment',
    operation: 'ACOUSTIC_CEILING',
    occtBinding: 'acousticCeiling',
    parameters: [
      { name: 'nrc', type: 'number', default: 0.85, min: 0.5, max: 1 },
      { name: 'panelType', type: 'enum', options: ['perforated', 'baffles', 'clouds', 'tiles'], default: 'tiles' }
    ],
    inputs: [
      { name: 'ceilingArea', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'acousticCeiling', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'FloorDrainage',
    description: 'Floor drainage system',
    operation: 'FLOOR_DRAINAGE',
    occtBinding: 'floorDrainage',
    parameters: [
      { name: 'slope', type: 'number', default: 0.01, min: 0.005, max: 0.02 },
      { name: 'drainType', type: 'enum', options: ['point', 'linear', 'area'], default: 'point' }
    ],
    inputs: [
      { name: 'floorBoundary', type: 'Wire', required: true },
      { name: 'drainLocations', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'slopedFloor', type: 'Shape' },
      { name: 'drains', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ceilings',
    name: 'StretchCeiling',
    description: 'Stretch fabric ceiling',
    operation: 'STRETCH_CEILING',
    occtBinding: 'stretchCeiling',
    parameters: [
      { name: 'fabricType', type: 'enum', options: ['matte', 'satin', 'gloss', 'translucent'], default: 'matte' },
      { name: 'backlighting', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'ceilingBoundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'stretchCeiling', type: 'Face' },
      { name: 'track', type: 'Wire' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'GreenRoof',
    description: 'Green roof system',
    operation: 'GREEN_ROOF',
    occtBinding: 'greenRoof',
    parameters: [
      { name: 'type', type: 'enum', options: ['extensive', 'intensive', 'semi-intensive'], default: 'extensive' },
      { name: 'soilDepth', type: 'number', default: 100, min: 50, max: 500 }
    ],
    inputs: [
      { name: 'roofSurface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'greenRoof', type: 'Shape' },
      { name: 'layers', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'FloorExpansionJoint',
    description: 'Expansion joint detail',
    operation: 'FLOOR_EXPANSION_JOINT',
    occtBinding: 'floorExpansionJoint',
    parameters: [
      { name: 'jointWidth', type: 'number', default: 25, min: 10, max: 100 },
      { name: 'sealantDepth', type: 'number', default: 10, min: 5, max: 25 }
    ],
    inputs: [
      { name: 'jointPath', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'expansionJoint', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ceilings',
    name: 'SkyLight',
    description: 'Skylight opening',
    operation: 'SKYLIGHT',
    occtBinding: 'skyLight',
    parameters: [
      { name: 'type', type: 'enum', options: ['flat', 'pyramid', 'barrel', 'dome'], default: 'pyramid' },
      { name: 'glazingType', type: 'enum', options: ['single', 'double', 'triple', 'aerogel'], default: 'double' }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'skylight', type: 'Shape' },
      { name: 'frame', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'FloorFinish',
    description: 'Floor finish materials',
    operation: 'FLOOR_FINISH',
    occtBinding: 'floorFinish',
    parameters: [
      { name: 'material', type: 'enum', options: ['tile', 'wood', 'carpet', 'vinyl', 'polished-concrete'], default: 'tile' },
      { name: 'pattern', type: 'enum', options: ['straight', 'diagonal', 'herringbone', 'random'], default: 'straight' }
    ],
    inputs: [
      { name: 'floorArea', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'finishedFloor', type: 'Face' },
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ceilings',
    name: 'CeilingBeam',
    description: 'Exposed ceiling beams',
    operation: 'CEILING_BEAM',
    occtBinding: 'ceilingBeam',
    parameters: [
      { name: 'beamDepth', type: 'number', default: 300, min: 200, max: 600 },
      { name: 'beamWidth', type: 'number', default: 150, min: 100, max: 300 },
      { name: 'spacing', type: 'number', default: 1200, min: 600, max: 2400 }
    ],
    inputs: [
      { name: 'ceilingArea', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'beams', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Floors',
    name: 'PedestalPavers',
    description: 'Pedestal paver system',
    operation: 'PEDESTAL_PAVERS',
    occtBinding: 'pedestalPavers',
    parameters: [
      { name: 'paverSize', type: 'number', default: 600, min: 300, max: 900 },
      { name: 'pedestalHeight', type: 'number', default: 100, min: 25, max: 500 }
    ],
    inputs: [
      { name: 'area', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'pavers', type: 'Face[]' },
      { name: 'pedestals', type: 'Shape[]' }
    ]
  }
];

/**
 * Stairs and Ramps (20 nodes)
 */
export const stairsRampsTemplates: NodeTemplate[] = [
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'StraightStair',
    description: 'Straight run staircase',
    operation: 'STRAIGHT_STAIR',
    occtBinding: 'straightStair',
    parameters: [
      { name: 'totalRise', type: 'number', default: 3000, min: 1000, max: 6000 },
      { name: 'treadDepth', type: 'number', default: 280, min: 250, max: 350 },
      { name: 'riserHeight', type: 'number', default: 175, min: 150, max: 200 },
      { name: 'width', type: 'number', default: 1200, min: 900, max: 2000 }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'staircase', type: 'Shape' },
      { name: 'treads', type: 'Shape[]' },
      { name: 'risers', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'LShapedStair',
    description: 'L-shaped staircase',
    operation: 'L_SHAPED_STAIR',
    occtBinding: 'lShapedStair',
    parameters: [
      { name: 'totalRise', type: 'number', default: 3000, min: 1000, max: 6000 },
      { name: 'landingSize', type: 'number', default: 1200, min: 900, max: 2000 },
      { name: 'turnDirection', type: 'enum', options: ['left', 'right'], default: 'right' }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'staircase', type: 'Shape' },
      { name: 'landing', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'UShapedStair',
    description: 'U-shaped staircase',
    operation: 'U_SHAPED_STAIR',
    occtBinding: 'uShapedStair',
    parameters: [
      { name: 'totalRise', type: 'number', default: 3000, min: 1000, max: 6000 },
      { name: 'clearance', type: 'number', default: 100, min: 50, max: 300 }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'staircase', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'SpiralStair',
    description: 'Spiral staircase',
    operation: 'SPIRAL_STAIR',
    occtBinding: 'spiralStair',
    parameters: [
      { name: 'diameter', type: 'number', default: 2000, min: 1200, max: 3000 },
      { name: 'totalRise', type: 'number', default: 3000, min: 1000, max: 6000 },
      { name: 'rotation', type: 'number', default: 360, min: 270, max: 720 },
      { name: 'centerPole', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'centerPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'spiralStair', type: 'Shape' },
      { name: 'centerPole', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'HelicalStair',
    description: 'Helical staircase',
    operation: 'HELICAL_STAIR',
    occtBinding: 'helicalStair',
    parameters: [
      { name: 'innerRadius', type: 'number', default: 500, min: 0, max: 1000 },
      { name: 'outerRadius', type: 'number', default: 1500, min: 1000, max: 3000 },
      { name: 'totalRise', type: 'number', default: 3000, min: 1000, max: 6000 }
    ],
    inputs: [
      { name: 'centerPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'helicalStair', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'WinderStair',
    description: 'Winder staircase',
    operation: 'WINDER_STAIR',
    occtBinding: 'winderStair',
    parameters: [
      { name: 'winderCount', type: 'number', default: 3, min: 2, max: 5, step: 1 },
      { name: 'turnAngle', type: 'number', default: 90, min: 45, max: 180 }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'winderStair', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ramps',
    name: 'StraightRamp',
    description: 'Straight access ramp',
    operation: 'STRAIGHT_RAMP',
    occtBinding: 'straightRamp',
    parameters: [
      { name: 'slope', type: 'number', default: 0.083, min: 0.05, max: 0.125 },
      { name: 'width', type: 'number', default: 1200, min: 900, max: 2000 },
      { name: 'handrails', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true },
      { name: 'endPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'ramp', type: 'Shape' },
      { name: 'handrails', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ramps',
    name: 'SwitchbackRamp',
    description: 'Switchback accessibility ramp',
    operation: 'SWITCHBACK_RAMP',
    occtBinding: 'switchbackRamp',
    parameters: [
      { name: 'runLength', type: 'number', default: 9000, min: 6000, max: 12000 },
      { name: 'landingSize', type: 'number', default: 1500, min: 1500, max: 2000 }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true },
      { name: 'totalRise', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'ramp', type: 'Shape' },
      { name: 'landings', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ramps',
    name: 'HelicalRamp',
    description: 'Helical parking ramp',
    operation: 'HELICAL_RAMP',
    occtBinding: 'helicalRamp',
    parameters: [
      { name: 'radius', type: 'number', default: 15000, min: 10000, max: 25000 },
      { name: 'pitch', type: 'number', default: 3000, min: 2500, max: 4000 },
      { name: 'width', type: 'number', default: 7000, min: 5500, max: 9000 }
    ],
    inputs: [
      { name: 'centerPoint', type: 'Point', required: true },
      { name: 'levels', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'helicalRamp', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'StairHandrail',
    description: 'Stair handrail system',
    operation: 'STAIR_HANDRAIL',
    occtBinding: 'stairHandrail',
    parameters: [
      { name: 'height', type: 'number', default: 900, min: 850, max: 1000 },
      { name: 'diameter', type: 'number', default: 50, min: 40, max: 60 },
      { name: 'mountType', type: 'enum', options: ['wall', 'post', 'glass'], default: 'post' }
    ],
    inputs: [
      { name: 'stairEdge', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'handrail', type: 'Shape' },
      { name: 'posts', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'StairBalustrade',
    description: 'Stair balustrade system',
    operation: 'STAIR_BALUSTRADE',
    occtBinding: 'stairBalustrade',
    parameters: [
      { name: 'style', type: 'enum', options: ['vertical', 'horizontal', 'glass', 'cable'], default: 'vertical' },
      { name: 'spacing', type: 'number', default: 100, min: 75, max: 125 }
    ],
    inputs: [
      { name: 'stairSide', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'balustrade', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'StairNosing',
    description: 'Stair nosing profile',
    operation: 'STAIR_NOSING',
    occtBinding: 'stairNosing',
    parameters: [
      { name: 'projection', type: 'number', default: 25, min: 20, max: 40 },
      { name: 'material', type: 'enum', options: ['aluminum', 'rubber', 'wood', 'stone'], default: 'aluminum' }
    ],
    inputs: [
      { name: 'treadEdges', type: 'Edge[]', required: true }
    ],
    outputs: [
      { name: 'nosing', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'StairStringer',
    description: 'Stair stringer structure',
    operation: 'STAIR_STRINGER',
    occtBinding: 'stairStringer',
    parameters: [
      { name: 'type', type: 'enum', options: ['closed', 'open', 'mono'], default: 'closed' },
      { name: 'material', type: 'enum', options: ['steel', 'wood', 'concrete'], default: 'steel' },
      { name: 'depth', type: 'number', default: 300, min: 200, max: 500 }
    ],
    inputs: [
      { name: 'stairProfile', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'stringers', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'EscapeStair',
    description: 'Fire escape staircase',
    operation: 'ESCAPE_STAIR',
    occtBinding: 'escapeStair',
    parameters: [
      { name: 'enclosure', type: 'enum', options: ['open', 'enclosed', 'pressurized'], default: 'enclosed' },
      { name: 'width', type: 'number', default: 1200, min: 1100, max: 1500 }
    ],
    inputs: [
      { name: 'stairwell', type: 'Wire', required: true },
      { name: 'floors', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'escapeStair', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'MonumentalStair',
    description: 'Grand monumental staircase',
    operation: 'MONUMENTAL_STAIR',
    occtBinding: 'monumentalStair',
    parameters: [
      { name: 'style', type: 'enum', options: ['imperial', 'bifurcated', 'horseshoe'], default: 'imperial' },
      { name: 'width', type: 'number', default: 3000, min: 2000, max: 6000 }
    ],
    inputs: [
      { name: 'footprint', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'monumentalStair', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'FloatingStair',
    description: 'Floating cantilevered stairs',
    operation: 'FLOATING_STAIR',
    occtBinding: 'floatingStair',
    parameters: [
      { name: 'cantileverDepth', type: 'number', default: 100, min: 50, max: 200 },
      { name: 'treadThickness', type: 'number', default: 60, min: 40, max: 100 }
    ],
    inputs: [
      { name: 'wallLine', type: 'Wire', required: true },
      { name: 'riseRun', type: 'Vector', required: true }
    ],
    outputs: [
      { name: 'floatingStair', type: 'Shape' },
      { name: 'anchors', type: 'Point[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ramps',
    name: 'LoadingDock',
    description: 'Loading dock ramp',
    operation: 'LOADING_DOCK',
    occtBinding: 'loadingDock',
    parameters: [
      { name: 'dockHeight', type: 'number', default: 1200, min: 900, max: 1500 },
      { name: 'levellerType', type: 'enum', options: ['hydraulic', 'mechanical', 'air-powered'], default: 'hydraulic' }
    ],
    inputs: [
      { name: 'dockPosition', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'dockRamp', type: 'Shape' },
      { name: 'leveller', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ramps',
    name: 'CurbRamp',
    description: 'Curb cut ramp',
    operation: 'CURB_RAMP',
    occtBinding: 'curbRamp',
    parameters: [
      { name: 'type', type: 'enum', options: ['perpendicular', 'parallel', 'combination'], default: 'perpendicular' },
      { name: 'flareSlope', type: 'number', default: 0.1, min: 0.083, max: 0.125 }
    ],
    inputs: [
      { name: 'curbLine', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'curbRamp', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Stairs',
    name: 'AlternatingTreadStair',
    description: 'Alternating tread device',
    operation: 'ALTERNATING_TREAD_STAIR',
    occtBinding: 'alternatingTreadStair',
    parameters: [
      { name: 'angle', type: 'number', default: 56, min: 50, max: 70 },
      { name: 'treadWidth', type: 'number', default: 600, min: 500, max: 700 }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true },
      { name: 'totalRise', type: 'Number', required: true }
    ],
    outputs: [
      { name: 'alternatingStair', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Ramps',
    name: 'VehicleRamp',
    description: 'Vehicular access ramp',
    operation: 'VEHICLE_RAMP',
    occtBinding: 'vehicleRamp',
    parameters: [
      { name: 'gradient', type: 'number', default: 0.15, min: 0.1, max: 0.2 },
      { name: 'width', type: 'number', default: 6000, min: 5000, max: 8000 },
      { name: 'transitionLength', type: 'number', default: 3000, min: 2000, max: 4000 }
    ],
    inputs: [
      { name: 'rampPath', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'vehicleRamp', type: 'Shape' }
    ]
  }
];

/**
 * Doors and Windows (20 nodes)
 */
export const doorsWindowsTemplates: NodeTemplate[] = [
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'SingleDoor',
    description: 'Single swing door',
    operation: 'SINGLE_DOOR',
    occtBinding: 'singleDoor',
    parameters: [
      { name: 'width', type: 'number', default: 900, min: 600, max: 1200 },
      { name: 'height', type: 'number', default: 2100, min: 1800, max: 2400 },
      { name: 'thickness', type: 'number', default: 45, min: 35, max: 60 },
      { name: 'swing', type: 'enum', options: ['left', 'right'], default: 'right' },
      { name: 'opening', type: 'number', default: 0, min: 0, max: 90 }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true },
      { name: 'wall', type: 'Shape', required: false }
    ],
    outputs: [
      { name: 'door', type: 'Shape' },
      { name: 'frame', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'DoubleDoor',
    description: 'Double swing door',
    operation: 'DOUBLE_DOOR',
    occtBinding: 'doubleDoor',
    parameters: [
      { name: 'totalWidth', type: 'number', default: 1800, min: 1200, max: 2400 },
      { name: 'height', type: 'number', default: 2100, min: 1800, max: 2400 },
      { name: 'activeLeaf', type: 'enum', options: ['left', 'right', 'both'], default: 'both' }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'doors', type: 'Shape[]' },
      { name: 'frame', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'SlidingDoor',
    description: 'Sliding door system',
    operation: 'SLIDING_DOOR',
    occtBinding: 'slidingDoor',
    parameters: [
      { name: 'panelCount', type: 'number', default: 2, min: 1, max: 4, step: 1 },
      { name: 'panelWidth', type: 'number', default: 900, min: 600, max: 1500 },
      { name: 'openingPercent', type: 'number', default: 0, min: 0, max: 100 }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'panels', type: 'Shape[]' },
      { name: 'track', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'RevolvingDoor',
    description: 'Revolving door entry',
    operation: 'REVOLVING_DOOR',
    occtBinding: 'revolvingDoor',
    parameters: [
      { name: 'diameter', type: 'number', default: 2000, min: 1800, max: 3000 },
      { name: 'wings', type: 'number', default: 4, min: 3, max: 4, step: 1 },
      { name: 'rotation', type: 'number', default: 0, min: 0, max: 360 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'revolvingDoor', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'FoldingDoor',
    description: 'Bi-fold door system',
    operation: 'FOLDING_DOOR',
    occtBinding: 'foldingDoor',
    parameters: [
      { name: 'panels', type: 'number', default: 4, min: 2, max: 8, step: 2 },
      { name: 'foldDirection', type: 'enum', options: ['left', 'right', 'center'], default: 'left' }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'foldingDoor', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'RollupDoor',
    description: 'Roll-up garage door',
    operation: 'ROLLUP_DOOR',
    occtBinding: 'rollupDoor',
    parameters: [
      { name: 'slatHeight', type: 'number', default: 75, min: 50, max: 100 },
      { name: 'openHeight', type: 'number', default: 0, min: 0, max: 3000 }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'rollupDoor', type: 'Shape' },
      { name: 'guides', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'CasementWindow',
    description: 'Casement window',
    operation: 'CASEMENT_WINDOW',
    occtBinding: 'casementWindow',
    parameters: [
      { name: 'width', type: 'number', default: 600, min: 400, max: 1200 },
      { name: 'height', type: 'number', default: 1200, min: 600, max: 2000 },
      { name: 'hinge', type: 'enum', options: ['left', 'right', 'top'], default: 'left' },
      { name: 'opening', type: 'number', default: 0, min: 0, max: 90 }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'window', type: 'Shape' },
      { name: 'frame', type: 'Shape' },
      { name: 'glass', type: 'Face' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'SlidingWindow',
    description: 'Horizontal sliding window',
    operation: 'SLIDING_WINDOW',
    occtBinding: 'slidingWindow',
    parameters: [
      { name: 'panels', type: 'number', default: 2, min: 2, max: 4, step: 1 },
      { name: 'operablePanel', type: 'enum', options: ['left', 'right', 'both'], default: 'left' }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'window', type: 'Shape' },
      { name: 'panels', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'DoubleHungWindow',
    description: 'Double hung window',
    operation: 'DOUBLE_HUNG_WINDOW',
    occtBinding: 'doubleHungWindow',
    parameters: [
      { name: 'width', type: 'number', default: 900, min: 600, max: 1500 },
      { name: 'height', type: 'number', default: 1500, min: 900, max: 2400 },
      { name: 'sashPosition', type: 'number', default: 0.5, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'window', type: 'Shape' },
      { name: 'upperSash', type: 'Shape' },
      { name: 'lowerSash', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'AwningWindow',
    description: 'Awning window',
    operation: 'AWNING_WINDOW',
    occtBinding: 'awningWindow',
    parameters: [
      { name: 'opening', type: 'number', default: 0, min: 0, max: 45 }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'window', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'BayWindow',
    description: 'Bay window projection',
    operation: 'BAY_WINDOW',
    occtBinding: 'bayWindow',
    parameters: [
      { name: 'projection', type: 'number', default: 600, min: 400, max: 1200 },
      { name: 'angleCount', type: 'number', default: 3, min: 3, max: 5, step: 1 },
      { name: 'centerAngle', type: 'number', default: 135, min: 90, max: 180 }
    ],
    inputs: [
      { name: 'wallOpening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'bayWindow', type: 'Shape' },
      { name: 'windows', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'BowWindow',
    description: 'Bow window projection',
    operation: 'BOW_WINDOW',
    occtBinding: 'bowWindow',
    parameters: [
      { name: 'projection', type: 'number', default: 600, min: 400, max: 1200 },
      { name: 'segments', type: 'number', default: 5, min: 3, max: 7, step: 1 }
    ],
    inputs: [
      { name: 'wallOpening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'bowWindow', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'ClerestroyWindow',
    description: 'Clerestory window band',
    operation: 'CLERESTORY_WINDOW',
    occtBinding: 'clerestoryWindow',
    parameters: [
      { name: 'height', type: 'number', default: 600, min: 400, max: 1200 },
      { name: 'continuous', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'wallTop', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'clerestory', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'FireDoor',
    description: 'Fire-rated door',
    operation: 'FIRE_DOOR',
    occtBinding: 'fireDoor',
    parameters: [
      { name: 'rating', type: 'enum', options: ['20-min', '45-min', '60-min', '90-min'], default: '60-min' },
      { name: 'closer', type: 'boolean', default: true },
      { name: 'panic', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'fireDoor', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'SecurityDoor',
    description: 'Security door system',
    operation: 'SECURITY_DOOR',
    occtBinding: 'securityDoor',
    parameters: [
      { name: 'level', type: 'enum', options: ['standard', 'high', 'maximum'], default: 'high' },
      { name: 'accessControl', type: 'enum', options: ['key', 'code', 'card', 'biometric'], default: 'card' }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'securityDoor', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'StainedGlassWindow',
    description: 'Stained glass window',
    operation: 'STAINED_GLASS_WINDOW',
    occtBinding: 'stainedGlassWindow',
    parameters: [
      { name: 'pattern', type: 'enum', options: ['geometric', 'floral', 'abstract', 'pictorial'], default: 'geometric' },
      { name: 'leadWidth', type: 'number', default: 6, min: 4, max: 10 }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true },
      { name: 'pattern', type: 'Wire[]', required: false }
    ],
    outputs: [
      { name: 'stainedGlass', type: 'Shape' },
      { name: 'leadCame', type: 'Wire[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'OverheadDoor',
    description: 'Overhead sectional door',
    operation: 'OVERHEAD_DOOR',
    occtBinding: 'overheadDoor',
    parameters: [
      { name: 'sections', type: 'number', default: 4, min: 3, max: 6, step: 1 },
      { name: 'trackType', type: 'enum', options: ['standard', 'low-headroom', 'high-lift'], default: 'standard' }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'overheadDoor', type: 'Shape' },
      { name: 'tracks', type: 'Wire[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'JalousieWindow',
    description: 'Jalousie louvre window',
    operation: 'JALOUSIE_WINDOW',
    occtBinding: 'jalousieWindow',
    parameters: [
      { name: 'slats', type: 'number', default: 10, min: 5, max: 20, step: 1 },
      { name: 'angle', type: 'number', default: 0, min: 0, max: 90 }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'jalousie', type: 'Shape' },
      { name: 'slats', type: 'Shape[]' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Doors',
    name: 'DutchDoor',
    description: 'Dutch split door',
    operation: 'DUTCH_DOOR',
    occtBinding: 'dutchDoor',
    parameters: [
      { name: 'splitHeight', type: 'number', default: 1050, min: 900, max: 1200 },
      { name: 'topOpen', type: 'boolean', default: false },
      { name: 'bottomOpen', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'topDoor', type: 'Shape' },
      { name: 'bottomDoor', type: 'Shape' }
    ]
  },
  {
    category: 'Architecture',
    subcategory: 'Windows',
    name: 'GothicWindow',
    description: 'Gothic arch window',
    operation: 'GOTHIC_WINDOW',
    occtBinding: 'gothicWindow',
    parameters: [
      { name: 'style', type: 'enum', options: ['lancet', 'equilateral', 'flamboyant', 'perpendicular'], default: 'equilateral' },
      { name: 'tracery', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'opening', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'gothicWindow', type: 'Shape' },
      { name: 'tracery', type: 'Wire[]' }
    ]
  }
];

// Export all architecture templates
export const allArchitectureTemplates = [
  ...wallSystemTemplates,
  ...floorCeilingTemplates,
  ...stairsRampsTemplates,
  ...doorsWindowsTemplates
];