// Mechanical Engineering Nodes - 100 nodes for mechanical design and engineering
import { NodeTemplate } from '../types';

export const mechanicalEngineeringNodes: NodeTemplate[] = [
  // ============================================================
  // GEARS AND TRANSMISSIONS - 25 nodes
  // ============================================================
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'SpurGear',
    description: 'Create standard spur gear',
    operation: 'SPUR_GEAR',
    occtBinding: 'spurGear',
    parameters: [
      { name: 'module', type: 'number', default: 2, min: 0.5, max: 20, step: 0.1, description: 'Gear module in mm' },
      { name: 'teeth', type: 'number', default: 20, min: 6, max: 200, description: 'Number of teeth' },
      { name: 'pressureAngle', type: 'number', default: 20, min: 14.5, max: 25, description: 'Pressure angle in degrees' },
      { name: 'width', type: 'number', default: 20, min: 1, max: 200, description: 'Face width in mm' },
      { name: 'hubDiameter', type: 'number', default: 20, min: 5, max: 100, description: 'Hub bore diameter' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: false },
      { name: 'axis', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'gear', type: 'Shape' },
      { name: 'pitchCircle', type: 'Wire' },
      { name: 'properties', type: 'Properties' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'HelicalGear',
    description: 'Create helical gear with angle',
    operation: 'HELICAL_GEAR',
    occtBinding: 'helicalGear',
    parameters: [
      { name: 'module', type: 'number', default: 2, min: 0.5, max: 20, step: 0.1 },
      { name: 'teeth', type: 'number', default: 20, min: 6, max: 200 },
      { name: 'helixAngle', type: 'number', default: 15, min: 0, max: 45, description: 'Helix angle in degrees' },
      { name: 'width', type: 'number', default: 20, min: 1, max: 200 },
      { name: 'handedness', type: 'enum', options: ['left', 'right'], default: 'right' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: false }
    ],
    outputs: [
      { name: 'gear', type: 'Shape' },
      { name: 'profile', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'BevelGear',
    description: 'Create bevel gear for angle transmission',
    operation: 'BEVEL_GEAR',
    occtBinding: 'bevelGear',
    parameters: [
      { name: 'module', type: 'number', default: 3, min: 1, max: 20 },
      { name: 'teeth', type: 'number', default: 25, min: 10, max: 100 },
      { name: 'coneAngle', type: 'number', default: 45, min: 10, max: 80, description: 'Pitch cone angle' },
      { name: 'faceWidth', type: 'number', default: 15, min: 5, max: 50 }
    ],
    inputs: [
      { name: 'apex', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'gear', type: 'Shape' },
      { name: 'pitchCone', type: 'Surface' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'WormGear',
    description: 'Create worm gear for high reduction',
    operation: 'WORM_GEAR',
    occtBinding: 'wormGear',
    parameters: [
      { name: 'module', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'teeth', type: 'number', default: 30, min: 20, max: 100 },
      { name: 'diameter', type: 'number', default: 60, min: 20, max: 200 },
      { name: 'width', type: 'number', default: 20, min: 5, max: 50 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'gear', type: 'Shape' },
      { name: 'throat', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'WormShaft',
    description: 'Create worm shaft for worm gear',
    operation: 'WORM_SHAFT',
    occtBinding: 'wormShaft',
    parameters: [
      { name: 'module', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'starts', type: 'number', default: 1, min: 1, max: 4, description: 'Number of starts' },
      { name: 'length', type: 'number', default: 50, min: 20, max: 200 },
      { name: 'leadAngle', type: 'number', default: 5, min: 1, max: 30 }
    ],
    inputs: [
      { name: 'axis', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'worm', type: 'Shape' },
      { name: 'helix', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'RackGear',
    description: 'Create linear rack gear',
    operation: 'RACK_GEAR',
    occtBinding: 'rackGear',
    parameters: [
      { name: 'module', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'length', type: 'number', default: 100, min: 20, max: 500 },
      { name: 'width', type: 'number', default: 20, min: 5, max: 50 },
      { name: 'height', type: 'number', default: 15, min: 5, max: 30 }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'rack', type: 'Shape' },
      { name: 'pitchLine', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'InternalGear',
    description: 'Create internal/ring gear',
    operation: 'INTERNAL_GEAR',
    occtBinding: 'internalGear',
    parameters: [
      { name: 'module', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'teeth', type: 'number', default: 60, min: 30, max: 200 },
      { name: 'rimThickness', type: 'number', default: 10, min: 5, max: 30 },
      { name: 'width', type: 'number', default: 20, min: 5, max: 50 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'gear', type: 'Shape' },
      { name: 'innerProfile', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'PlanetaryGearSet',
    description: 'Create planetary gear system',
    operation: 'PLANETARY_GEARS',
    occtBinding: 'planetaryGears',
    parameters: [
      { name: 'sunTeeth', type: 'number', default: 20, min: 12, max: 40 },
      { name: 'planetTeeth', type: 'number', default: 16, min: 8, max: 30 },
      { name: 'planetCount', type: 'number', default: 3, min: 2, max: 6 },
      { name: 'module', type: 'number', default: 2, min: 0.5, max: 5 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'assembly', type: 'Shape' },
      { name: 'sunGear', type: 'Shape' },
      { name: 'planetGears', type: 'Shape[]' },
      { name: 'ringGear', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'TimingPulley',
    description: 'Create timing belt pulley',
    operation: 'TIMING_PULLEY',
    occtBinding: 'timingPulley',
    parameters: [
      { name: 'pitch', type: 'enum', options: ['MXL', 'XL', 'L', 'H', 'T2.5', 'T5', 'T10', 'GT2'], default: 'GT2' },
      { name: 'teeth', type: 'number', default: 20, min: 10, max: 100 },
      { name: 'width', type: 'number', default: 10, min: 6, max: 50 },
      { name: 'flanges', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'pulley', type: 'Shape' },
      { name: 'pitchCircle', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'ChainSprocket',
    description: 'Create chain drive sprocket',
    operation: 'CHAIN_SPROCKET',
    occtBinding: 'chainSprocket',
    parameters: [
      { name: 'chainPitch', type: 'number', default: 12.7, min: 6, max: 50, description: 'Chain pitch in mm' },
      { name: 'teeth', type: 'number', default: 18, min: 9, max: 100 },
      { name: 'rollerDiameter', type: 'number', default: 7.92, min: 3, max: 30 },
      { name: 'width', type: 'number', default: 7.85, min: 3, max: 30 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'sprocket', type: 'Shape' },
      { name: 'pitchCircle', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'CVTDisc',
    description: 'Create CVT transmission disc',
    operation: 'CVT_DISC',
    occtBinding: 'cvtDisc',
    parameters: [
      { name: 'minDiameter', type: 'number', default: 30, min: 20, max: 100 },
      { name: 'maxDiameter', type: 'number', default: 100, min: 50, max: 300 },
      { name: 'coneAngle', type: 'number', default: 11, min: 8, max: 15 },
      { name: 'shaftDiameter', type: 'number', default: 20, min: 10, max: 50 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'disc', type: 'Shape' },
      { name: 'contactSurface', type: 'Surface' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Gears',
    name: 'DifferentialGear',
    description: 'Create differential gear assembly',
    operation: 'DIFFERENTIAL_GEAR',
    occtBinding: 'differentialGear',
    parameters: [
      { name: 'ringGearTeeth', type: 'number', default: 41, min: 30, max: 60 },
      { name: 'pinionTeeth', type: 'number', default: 13, min: 9, max: 17 },
      { name: 'spiderGearTeeth', type: 'number', default: 10, min: 8, max: 14 },
      { name: 'module', type: 'number', default: 3, min: 2, max: 5 }
    ],
    inputs: [
      { name: 'housingCenter', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'assembly', type: 'Shape' },
      { name: 'housing', type: 'Shape' },
      { name: 'gears', type: 'Shape[]' }
    ]
  },

  // ============================================================
  // BEARINGS AND BUSHINGS - 20 nodes
  // ============================================================
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'BallBearing',
    description: 'Create ball bearing assembly',
    operation: 'BALL_BEARING',
    occtBinding: 'ballBearing',
    parameters: [
      { name: 'innerDiameter', type: 'number', default: 20, min: 3, max: 200, description: 'Bore diameter in mm' },
      { name: 'outerDiameter', type: 'number', default: 47, min: 10, max: 400, description: 'Outer diameter in mm' },
      { name: 'width', type: 'number', default: 14, min: 3, max: 100, description: 'Width in mm' },
      { name: 'ballCount', type: 'number', default: 8, min: 5, max: 20 },
      { name: 'showCage', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true },
      { name: 'axis', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'innerRace', type: 'Shape' },
      { name: 'outerRace', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'RollerBearing',
    description: 'Create roller bearing',
    operation: 'ROLLER_BEARING',
    occtBinding: 'rollerBearing',
    parameters: [
      { name: 'innerDiameter', type: 'number', default: 25, min: 5, max: 200 },
      { name: 'outerDiameter', type: 'number', default: 52, min: 15, max: 400 },
      { name: 'width', type: 'number', default: 15, min: 5, max: 100 },
      { name: 'rollerType', type: 'enum', options: ['cylindrical', 'tapered', 'spherical'], default: 'cylindrical' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'rollers', type: 'Shape[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'ThrustBearing',
    description: 'Create thrust bearing for axial loads',
    operation: 'THRUST_BEARING',
    occtBinding: 'thrustBearing',
    parameters: [
      { name: 'innerDiameter', type: 'number', default: 20, min: 5, max: 150 },
      { name: 'outerDiameter', type: 'number', default: 40, min: 15, max: 300 },
      { name: 'height', type: 'number', default: 10, min: 3, max: 50 },
      { name: 'type', type: 'enum', options: ['ball', 'roller', 'needle'], default: 'ball' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'raceways', type: 'Shape[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'NeedleBearing',
    description: 'Create needle bearing',
    operation: 'NEEDLE_BEARING',
    occtBinding: 'needleBearing',
    parameters: [
      { name: 'innerDiameter', type: 'number', default: 15, min: 5, max: 100 },
      { name: 'outerDiameter', type: 'number', default: 21, min: 10, max: 150 },
      { name: 'width', type: 'number', default: 12, min: 5, max: 50 },
      { name: 'needleCount', type: 'number', default: 20, min: 10, max: 50 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'needles', type: 'Shape[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'LinearBearing',
    description: 'Create linear motion bearing',
    operation: 'LINEAR_BEARING',
    occtBinding: 'linearBearing',
    parameters: [
      { name: 'shaftDiameter', type: 'number', default: 8, min: 3, max: 50 },
      { name: 'outerDiameter', type: 'number', default: 15, min: 8, max: 80 },
      { name: 'length', type: 'number', default: 24, min: 10, max: 100 },
      { name: 'type', type: 'enum', options: ['ball', 'plain', 'roller'], default: 'ball' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true },
      { name: 'axis', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'bore', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'PillowBlock',
    description: 'Create pillow block bearing housing',
    operation: 'PILLOW_BLOCK',
    occtBinding: 'pillowBlock',
    parameters: [
      { name: 'shaftDiameter', type: 'number', default: 20, min: 8, max: 100 },
      { name: 'mountingHoles', type: 'number', default: 2, min: 2, max: 4 },
      { name: 'baseWidth', type: 'number', default: 80, min: 30, max: 200 },
      { name: 'height', type: 'number', default: 50, min: 20, max: 150 }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'housing', type: 'Shape' },
      { name: 'bearing', type: 'Shape' },
      { name: 'mountingPoints', type: 'Point[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'FlangeBearing',
    description: 'Create flanged bearing unit',
    operation: 'FLANGE_BEARING',
    occtBinding: 'flangeBearing',
    parameters: [
      { name: 'boreDiameter', type: 'number', default: 12, min: 5, max: 80 },
      { name: 'flangeDiameter', type: 'number', default: 40, min: 20, max: 150 },
      { name: 'thickness', type: 'number', default: 8, min: 3, max: 30 },
      { name: 'mountingHoles', type: 'number', default: 4, min: 3, max: 8 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'flange', type: 'Face' },
      { name: 'holes', type: 'Wire[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'BronzeBushing',
    description: 'Create bronze bushing',
    operation: 'BRONZE_BUSHING',
    occtBinding: 'bronzeBushing',
    parameters: [
      { name: 'innerDiameter', type: 'number', default: 10, min: 3, max: 100 },
      { name: 'outerDiameter', type: 'number', default: 14, min: 5, max: 120 },
      { name: 'length', type: 'number', default: 15, min: 5, max: 100 },
      { name: 'oilGrooves', type: 'boolean', default: true },
      { name: 'flanged', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'bushing', type: 'Shape' },
      { name: 'grooves', type: 'Wire[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'SphericalBearing',
    description: 'Create spherical bearing for misalignment',
    operation: 'SPHERICAL_BEARING',
    occtBinding: 'sphericalBearing',
    parameters: [
      { name: 'ballDiameter', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'boreDiameter', type: 'number', default: 8, min: 3, max: 50 },
      { name: 'housingDiameter', type: 'number', default: 30, min: 10, max: 150 },
      { name: 'misalignmentAngle', type: 'number', default: 15, min: 5, max: 30 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'ball', type: 'Shape' },
      { name: 'housing', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Bearings',
    name: 'AirBearing',
    description: 'Create air bearing design',
    operation: 'AIR_BEARING',
    occtBinding: 'airBearing',
    parameters: [
      { name: 'diameter', type: 'number', default: 50, min: 20, max: 200 },
      { name: 'thickness', type: 'number', default: 10, min: 5, max: 30 },
      { name: 'pocketCount', type: 'number', default: 6, min: 3, max: 12 },
      { name: 'restrictorType', type: 'enum', options: ['orifice', 'porous', 'groove'], default: 'orifice' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'bearing', type: 'Shape' },
      { name: 'pockets', type: 'Face[]' },
      { name: 'restrictors', type: 'Wire[]' }
    ]
  },

  // ============================================================
  // FASTENERS AND JOINTS - 20 nodes
  // ============================================================
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'HexBolt',
    description: 'Create hex head bolt',
    operation: 'HEX_BOLT',
    occtBinding: 'hexBolt',
    parameters: [
      { name: 'diameter', type: 'enum', options: ['M3', 'M4', 'M5', 'M6', 'M8', 'M10', 'M12', 'M16', 'M20'], default: 'M6' },
      { name: 'length', type: 'number', default: 20, min: 5, max: 200, description: 'Length in mm' },
      { name: 'threadPitch', type: 'number', default: 1, min: 0.5, max: 3, step: 0.25 },
      { name: 'headHeight', type: 'number', default: 4, min: 2, max: 20 }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true },
      { name: 'direction', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'bolt', type: 'Shape' },
      { name: 'thread', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'SocketHeadCapScrew',
    description: 'Create socket head cap screw',
    operation: 'SOCKET_HEAD_SCREW',
    occtBinding: 'socketHeadScrew',
    parameters: [
      { name: 'diameter', type: 'enum', options: ['M3', 'M4', 'M5', 'M6', 'M8', 'M10'], default: 'M5' },
      { name: 'length', type: 'number', default: 16, min: 6, max: 100 },
      { name: 'socketSize', type: 'number', default: 4, min: 2, max: 10 },
      { name: 'headDiameter', type: 'number', default: 8.5, min: 5, max: 20 }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'screw', type: 'Shape' },
      { name: 'socket', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'HexNut',
    description: 'Create hexagonal nut',
    operation: 'HEX_NUT',
    occtBinding: 'hexNut',
    parameters: [
      { name: 'size', type: 'enum', options: ['M3', 'M4', 'M5', 'M6', 'M8', 'M10', 'M12'], default: 'M6' },
      { name: 'height', type: 'number', default: 5, min: 2, max: 20 },
      { name: 'style', type: 'enum', options: ['standard', 'nylon-insert', 'castle', 'wing'], default: 'standard' }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'nut', type: 'Shape' },
      { name: 'thread', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'Washer',
    description: 'Create washer',
    operation: 'WASHER',
    occtBinding: 'washer',
    parameters: [
      { name: 'innerDiameter', type: 'number', default: 6.4, min: 2, max: 50 },
      { name: 'outerDiameter', type: 'number', default: 12, min: 4, max: 100 },
      { name: 'thickness', type: 'number', default: 1.6, min: 0.5, max: 5 },
      { name: 'type', type: 'enum', options: ['flat', 'spring', 'lock', 'fender'], default: 'flat' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'washer', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'ThreadInsert',
    description: 'Create threaded insert',
    operation: 'THREAD_INSERT',
    occtBinding: 'threadInsert',
    parameters: [
      { name: 'threadSize', type: 'enum', options: ['M3', 'M4', 'M5', 'M6', 'M8'], default: 'M5' },
      { name: 'length', type: 'number', default: 10, min: 5, max: 30 },
      { name: 'type', type: 'enum', options: ['helicoil', 'heat-set', 'press-fit', 'ultrasonic'], default: 'heat-set' }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'insert', type: 'Shape' },
      { name: 'installation_hole', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'Rivet',
    description: 'Create rivet fastener',
    operation: 'RIVET',
    occtBinding: 'rivet',
    parameters: [
      { name: 'diameter', type: 'number', default: 4, min: 2, max: 10 },
      { name: 'length', type: 'number', default: 10, min: 5, max: 30 },
      { name: 'headType', type: 'enum', options: ['round', 'flat', 'countersunk', 'pan'], default: 'round' },
      { name: 'material', type: 'enum', options: ['aluminum', 'steel', 'stainless', 'copper'], default: 'aluminum' }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'rivet', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'ClampingCollar',
    description: 'Create shaft collar/clamp',
    operation: 'CLAMPING_COLLAR',
    occtBinding: 'clampingCollar',
    parameters: [
      { name: 'shaftDiameter', type: 'number', default: 10, min: 3, max: 50 },
      { name: 'outerDiameter', type: 'number', default: 20, min: 8, max: 80 },
      { name: 'width', type: 'number', default: 8, min: 3, max: 20 },
      { name: 'clampType', type: 'enum', options: ['set-screw', 'split', 'hinged'], default: 'set-screw' }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'collar', type: 'Shape' },
      { name: 'bore', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'Dowel',
    description: 'Create dowel pin',
    operation: 'DOWEL_PIN',
    occtBinding: 'dowelPin',
    parameters: [
      { name: 'diameter', type: 'number', default: 6, min: 2, max: 20 },
      { name: 'length', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'tolerance', type: 'enum', options: ['h6', 'h7', 'h8', 'm6'], default: 'h7' },
      { name: 'chamfered', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'position', type: 'Point', required: true },
      { name: 'direction', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'dowel', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'RetainingRing',
    description: 'Create retaining ring/circlip',
    operation: 'RETAINING_RING',
    occtBinding: 'retainingRing',
    parameters: [
      { name: 'shaftDiameter', type: 'number', default: 10, min: 3, max: 100 },
      { name: 'type', type: 'enum', options: ['external', 'internal'], default: 'external' },
      { name: 'thickness', type: 'number', default: 1, min: 0.5, max: 3 },
      { name: 'grooveWidth', type: 'number', default: 1.2, min: 0.6, max: 4 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'ring', type: 'Shape' },
      { name: 'groove', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Fasteners',
    name: 'KeywayJoint',
    description: 'Create keyway and key',
    operation: 'KEYWAY_JOINT',
    occtBinding: 'keywayJoint',
    parameters: [
      { name: 'shaftDiameter', type: 'number', default: 20, min: 6, max: 100 },
      { name: 'keyWidth', type: 'number', default: 6, min: 2, max: 30 },
      { name: 'keyHeight', type: 'number', default: 6, min: 2, max: 30 },
      { name: 'keyLength', type: 'number', default: 25, min: 10, max: 100 }
    ],
    inputs: [
      { name: 'shaftCenter', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'shaft', type: 'Shape' },
      { name: 'key', type: 'Shape' },
      { name: 'keyway', type: 'Wire' }
    ]
  },

  // ============================================================
  // SPRINGS AND MECHANISMS - 15 nodes
  // ============================================================
  {
    category: 'MechanicalEngineering',
    subcategory: 'Springs',
    name: 'CompressionSpring',
    description: 'Create compression coil spring',
    operation: 'COMPRESSION_SPRING',
    occtBinding: 'compressionSpring',
    parameters: [
      { name: 'wireDiameter', type: 'number', default: 2, min: 0.5, max: 10 },
      { name: 'coilDiameter', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'freeLength', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'coils', type: 'number', default: 8, min: 3, max: 30 },
      { name: 'endType', type: 'enum', options: ['closed', 'open', 'ground'], default: 'closed' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true },
      { name: 'axis', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'spring', type: 'Shape' },
      { name: 'helix', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Springs',
    name: 'ExtensionSpring',
    description: 'Create extension spring with hooks',
    operation: 'EXTENSION_SPRING',
    occtBinding: 'extensionSpring',
    parameters: [
      { name: 'wireDiameter', type: 'number', default: 1.5, min: 0.5, max: 8 },
      { name: 'coilDiameter', type: 'number', default: 15, min: 5, max: 80 },
      { name: 'bodyLength', type: 'number', default: 40, min: 10, max: 150 },
      { name: 'coils', type: 'number', default: 10, min: 5, max: 40 },
      { name: 'hookType', type: 'enum', options: ['machine', 'side', 'center'], default: 'machine' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'spring', type: 'Shape' },
      { name: 'hooks', type: 'Wire[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Springs',
    name: 'TorsionSpring',
    description: 'Create torsion spring',
    operation: 'TORSION_SPRING',
    occtBinding: 'torsionSpring',
    parameters: [
      { name: 'wireDiameter', type: 'number', default: 2, min: 0.5, max: 8 },
      { name: 'coilDiameter', type: 'number', default: 20, min: 5, max: 80 },
      { name: 'coils', type: 'number', default: 5, min: 2, max: 20 },
      { name: 'legLength', type: 'number', default: 30, min: 10, max: 100 },
      { name: 'legAngle', type: 'number', default: 90, min: 0, max: 180 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'spring', type: 'Shape' },
      { name: 'legs', type: 'Wire[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Springs',
    name: 'LeafSpring',
    description: 'Create leaf spring assembly',
    operation: 'LEAF_SPRING',
    occtBinding: 'leafSpring',
    parameters: [
      { name: 'leafCount', type: 'number', default: 5, min: 1, max: 10 },
      { name: 'length', type: 'number', default: 500, min: 100, max: 1500 },
      { name: 'width', type: 'number', default: 50, min: 20, max: 150 },
      { name: 'thickness', type: 'number', default: 6, min: 3, max: 15 },
      { name: 'camber', type: 'number', default: 50, min: 0, max: 150 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'assembly', type: 'Shape' },
      { name: 'leaves', type: 'Shape[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Springs',
    name: 'GasSpring',
    description: 'Create gas spring/damper',
    operation: 'GAS_SPRING',
    occtBinding: 'gasSpring',
    parameters: [
      { name: 'cylinderDiameter', type: 'number', default: 20, min: 10, max: 50 },
      { name: 'strokeLength', type: 'number', default: 100, min: 30, max: 300 },
      { name: 'extendedLength', type: 'number', default: 250, min: 100, max: 600 },
      { name: 'rodDiameter', type: 'number', default: 8, min: 4, max: 20 }
    ],
    inputs: [
      { name: 'mountPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'gasSpring', type: 'Shape' },
      { name: 'cylinder', type: 'Shape' },
      { name: 'rod', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Mechanisms',
    name: 'CamProfile',
    description: 'Create cam profile',
    operation: 'CAM_PROFILE',
    occtBinding: 'camProfile',
    parameters: [
      { name: 'baseRadius', type: 'number', default: 30, min: 10, max: 100 },
      { name: 'lift', type: 'number', default: 10, min: 2, max: 50 },
      { name: 'profileType', type: 'enum', options: ['harmonic', 'cycloidal', 'parabolic', 'custom'], default: 'harmonic' },
      { name: 'dwellAngle', type: 'number', default: 60, min: 0, max: 180 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true },
      { name: 'customProfile', type: 'Wire', required: false }
    ],
    outputs: [
      { name: 'cam', type: 'Shape' },
      { name: 'profile', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Mechanisms',
    name: 'LinkageMechanism',
    description: 'Create linkage mechanism',
    operation: 'LINKAGE_MECHANISM',
    occtBinding: 'linkageMechanism',
    parameters: [
      { name: 'type', type: 'enum', options: ['four-bar', 'slider-crank', 'scotch-yoke', 'geneva'], default: 'four-bar' },
      { name: 'linkLength1', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'linkLength2', type: 'number', default: 80, min: 10, max: 200 },
      { name: 'linkLength3', type: 'number', default: 60, min: 10, max: 200 },
      { name: 'angle', type: 'number', default: 0, min: 0, max: 360 }
    ],
    inputs: [
      { name: 'basePoints', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'mechanism', type: 'Shape' },
      { name: 'links', type: 'Shape[]' },
      { name: 'joints', type: 'Point[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Mechanisms',
    name: 'RatchetMechanism',
    description: 'Create ratchet and pawl',
    operation: 'RATCHET_MECHANISM',
    occtBinding: 'ratchetMechanism',
    parameters: [
      { name: 'wheelDiameter', type: 'number', default: 50, min: 20, max: 150 },
      { name: 'teeth', type: 'number', default: 24, min: 12, max: 60 },
      { name: 'pawlLength', type: 'number', default: 20, min: 10, max: 50 },
      { name: 'springTension', type: 'number', default: 5, min: 1, max: 20 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'assembly', type: 'Shape' },
      { name: 'wheel', type: 'Shape' },
      { name: 'pawl', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Mechanisms',
    name: 'ClutchMechanism',
    description: 'Create clutch assembly',
    operation: 'CLUTCH_MECHANISM',
    occtBinding: 'clutchMechanism',
    parameters: [
      { name: 'type', type: 'enum', options: ['friction', 'dog', 'centrifugal', 'electromagnetic'], default: 'friction' },
      { name: 'outerDiameter', type: 'number', default: 100, min: 30, max: 300 },
      { name: 'innerDiameter', type: 'number', default: 50, min: 20, max: 150 },
      { name: 'plateCount', type: 'number', default: 3, min: 1, max: 8 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'clutch', type: 'Shape' },
      { name: 'plates', type: 'Shape[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Mechanisms',
    name: 'UniversalJoint',
    description: 'Create universal joint',
    operation: 'UNIVERSAL_JOINT',
    occtBinding: 'universalJoint',
    parameters: [
      { name: 'yokeDiameter', type: 'number', default: 30, min: 10, max: 80 },
      { name: 'crossPinDiameter', type: 'number', default: 8, min: 3, max: 20 },
      { name: 'length', type: 'number', default: 60, min: 20, max: 150 },
      { name: 'angle', type: 'number', default: 0, min: 0, max: 45 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'joint', type: 'Shape' },
      { name: 'yokes', type: 'Shape[]' },
      { name: 'cross', type: 'Shape' }
    ]
  },

  // ============================================================
  // SHAFTS AND COUPLINGS - 20 nodes
  // ============================================================
  {
    category: 'MechanicalEngineering',
    subcategory: 'Shafts',
    name: 'SteppedShaft',
    description: 'Create stepped shaft',
    operation: 'STEPPED_SHAFT',
    occtBinding: 'steppedShaft',
    parameters: [
      { name: 'sections', type: 'string', default: '20x50,25x80,20x30', description: 'Diameter x Length pairs' },
      { name: 'chamfers', type: 'boolean', default: true },
      { name: 'filletRadius', type: 'number', default: 1, min: 0.5, max: 5 }
    ],
    inputs: [
      { name: 'centerline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'shaft', type: 'Shape' },
      { name: 'sections', type: 'Shape[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Shafts',
    name: 'SplinedShaft',
    description: 'Create splined shaft',
    operation: 'SPLINED_SHAFT',
    occtBinding: 'splinedShaft',
    parameters: [
      { name: 'majorDiameter', type: 'number', default: 25, min: 10, max: 100 },
      { name: 'minorDiameter', type: 'number', default: 22, min: 8, max: 95 },
      { name: 'splineCount', type: 'number', default: 6, min: 4, max: 20 },
      { name: 'length', type: 'number', default: 50, min: 10, max: 200 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'shaft', type: 'Shape' },
      { name: 'splines', type: 'Wire[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Shafts',
    name: 'FlexibleShaft',
    description: 'Create flexible shaft design',
    operation: 'FLEXIBLE_SHAFT',
    occtBinding: 'flexibleShaft',
    parameters: [
      { name: 'coreDiameter', type: 'number', default: 5, min: 2, max: 20 },
      { name: 'outerDiameter', type: 'number', default: 8, min: 4, max: 30 },
      { name: 'length', type: 'number', default: 300, min: 100, max: 1000 },
      { name: 'windingAngle', type: 'number', default: 45, min: 30, max: 60 }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'shaft', type: 'Shape' },
      { name: 'centerline', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Shafts',
    name: 'HollowShaft',
    description: 'Create hollow shaft',
    operation: 'HOLLOW_SHAFT',
    occtBinding: 'hollowShaft',
    parameters: [
      { name: 'outerDiameter', type: 'number', default: 40, min: 10, max: 200 },
      { name: 'innerDiameter', type: 'number', default: 30, min: 5, max: 190 },
      { name: 'length', type: 'number', default: 100, min: 20, max: 500 },
      { name: 'endMachining', type: 'enum', options: ['none', 'threads', 'splines'], default: 'none' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true },
      { name: 'axis', type: 'Vector', required: false }
    ],
    outputs: [
      { name: 'shaft', type: 'Shape' },
      { name: 'bore', type: 'Wire' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Couplings',
    name: 'RigidCoupling',
    description: 'Create rigid shaft coupling',
    operation: 'RIGID_COUPLING',
    occtBinding: 'rigidCoupling',
    parameters: [
      { name: 'shaft1Diameter', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'shaft2Diameter', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'couplingDiameter', type: 'number', default: 40, min: 15, max: 150 },
      { name: 'length', type: 'number', default: 50, min: 20, max: 150 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'coupling', type: 'Shape' },
      { name: 'bores', type: 'Wire[]' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Couplings',
    name: 'FlexibleCoupling',
    description: 'Create flexible coupling',
    operation: 'FLEXIBLE_COUPLING',
    occtBinding: 'flexibleCoupling',
    parameters: [
      { name: 'type', type: 'enum', options: ['jaw', 'disc', 'beam', 'oldham'], default: 'jaw' },
      { name: 'boreDiameter1', type: 'number', default: 10, min: 3, max: 50 },
      { name: 'boreDiameter2', type: 'number', default: 10, min: 3, max: 50 },
      { name: 'outerDiameter', type: 'number', default: 30, min: 10, max: 100 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'coupling', type: 'Shape' },
      { name: 'element', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Couplings',
    name: 'OldhamCoupling',
    description: 'Create Oldham coupling',
    operation: 'OLDHAM_COUPLING',
    occtBinding: 'oldhamCoupling',
    parameters: [
      { name: 'hubDiameter', type: 'number', default: 40, min: 20, max: 100 },
      { name: 'discDiameter', type: 'number', default: 35, min: 15, max: 90 },
      { name: 'slotWidth', type: 'number', default: 8, min: 3, max: 20 },
      { name: 'totalLength', type: 'number', default: 40, min: 20, max: 100 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'assembly', type: 'Shape' },
      { name: 'hubs', type: 'Shape[]' },
      { name: 'disc', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'Couplings',
    name: 'FluidCoupling',
    description: 'Create fluid coupling design',
    operation: 'FLUID_COUPLING',
    occtBinding: 'fluidCoupling',
    parameters: [
      { name: 'impellerDiameter', type: 'number', default: 150, min: 50, max: 500 },
      { name: 'housingDiameter', type: 'number', default: 180, min: 60, max: 600 },
      { name: 'vaneCount', type: 'number', default: 32, min: 16, max: 64 },
      { name: 'fluidCapacity', type: 'number', default: 2, min: 0.5, max: 20, description: 'Liters' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'coupling', type: 'Shape' },
      { name: 'impeller', type: 'Shape' },
      { name: 'turbine', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'PowerTransmission',
    name: 'PulleySystem',
    description: 'Create pulley system',
    operation: 'PULLEY_SYSTEM',
    occtBinding: 'pulleySystem',
    parameters: [
      { name: 'driveDiameter', type: 'number', default: 100, min: 20, max: 500 },
      { name: 'drivenDiameter', type: 'number', default: 200, min: 20, max: 500 },
      { name: 'beltWidth', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'centerDistance', type: 'number', default: 300, min: 100, max: 1000 }
    ],
    inputs: [
      { name: 'driveCenter', type: 'Point', required: true },
      { name: 'drivenCenter', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'system', type: 'Shape' },
      { name: 'pulleys', type: 'Shape[]' },
      { name: 'belt', type: 'Shape' }
    ]
  },
  {
    category: 'MechanicalEngineering',
    subcategory: 'PowerTransmission',
    name: 'ChainDrive',
    description: 'Create chain drive system',
    operation: 'CHAIN_DRIVE',
    occtBinding: 'chainDrive',
    parameters: [
      { name: 'driveTeeth', type: 'number', default: 17, min: 9, max: 50 },
      { name: 'drivenTeeth', type: 'number', default: 42, min: 15, max: 120 },
      { name: 'chainPitch', type: 'number', default: 12.7, min: 6, max: 25.4 },
      { name: 'chainRows', type: 'number', default: 1, min: 1, max: 3 }
    ],
    inputs: [
      { name: 'sprocket1Center', type: 'Point', required: true },
      { name: 'sprocket2Center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'system', type: 'Shape' },
      { name: 'sprockets', type: 'Shape[]' },
      { name: 'chain', type: 'Shape' }
    ]
  }
];