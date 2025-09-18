/**
 * Field & Attractor Templates
 * Scalar/vector fields and attractor systems for parametric design
 */

import { NodeTemplate } from '../node-template';

/**
 * Field Generation
 */
export const fieldGenerationTemplates: NodeTemplate[] = [
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'LinearField',
    description: 'Linear gradient field',
    operation: 'FIELD_LINEAR',
    occtBinding: 'fieldLinear',
    parameters: [
      { name: 'direction', type: 'vector3', default: [1, 0, 0] },
      { name: 'min', type: 'number', default: 0 },
      { name: 'max', type: 'number', default: 1 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'RadialField',
    description: 'Radial gradient field',
    operation: 'FIELD_RADIAL',
    occtBinding: 'fieldRadial',
    parameters: [
      { name: 'falloff', type: 'enum', options: ['linear', 'quadratic', 'exponential', 'gaussian'], default: 'linear' },
      { name: 'radius', type: 'number', default: 100, min: 0.1 },
      { name: 'strength', type: 'number', default: 1, min: 0, max: 10 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'SphericalField',
    description: 'Spherical field',
    operation: 'FIELD_SPHERICAL',
    occtBinding: 'fieldSpherical',
    parameters: [
      { name: 'innerRadius', type: 'number', default: 10, min: 0 },
      { name: 'outerRadius', type: 'number', default: 100, min: 0.1 },
      { name: 'falloff', type: 'enum', options: ['linear', 'smooth', 'exponential'], default: 'smooth' }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'CylindricalField',
    description: 'Cylindrical field',
    operation: 'FIELD_CYLINDRICAL',
    occtBinding: 'fieldCylindrical',
    parameters: [
      { name: 'radius', type: 'number', default: 50, min: 0.1 },
      { name: 'height', type: 'number', default: 100, min: 0.1 },
      { name: 'falloff', type: 'enum', options: ['linear', 'smooth', 'exponential'], default: 'smooth' }
    ],
    inputs: [
      { name: 'axis', type: 'Line', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'NoiseField',
    description: 'Noise-based field',
    operation: 'FIELD_NOISE',
    occtBinding: 'fieldNoise',
    parameters: [
      { name: 'type', type: 'enum', options: ['perlin', 'simplex', 'worley', 'turbulence'], default: 'perlin' },
      { name: 'scale', type: 'number', default: 10, min: 0.1 },
      { name: 'octaves', type: 'number', default: 4, min: 1, max: 8, step: 1 },
      { name: 'persistence', type: 'number', default: 0.5, min: 0, max: 1 },
      { name: 'seed', type: 'number', default: 0, min: 0, max: 999999 }
    ],
    inputs: [
      { name: 'domain', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'SineField',
    description: 'Sinusoidal wave field',
    operation: 'FIELD_SINE',
    occtBinding: 'fieldSine',
    parameters: [
      { name: 'frequency', type: 'vector3', default: [0.1, 0.1, 0.1] },
      { name: 'amplitude', type: 'number', default: 1, min: 0 },
      { name: 'phase', type: 'vector3', default: [0, 0, 0] }
    ],
    inputs: [
      { name: 'domain', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'VectorField',
    description: 'Vector field from expression',
    operation: 'FIELD_VECTOR',
    occtBinding: 'fieldVector',
    parameters: [
      { name: 'expressionX', type: 'string', default: 'y' },
      { name: 'expressionY', type: 'string', default: '-x' },
      { name: 'expressionZ', type: 'string', default: '0' }
    ],
    inputs: [
      { name: 'domain', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'field', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'ImageField',
    description: 'Field from image',
    operation: 'FIELD_IMAGE',
    occtBinding: 'fieldImage',
    parameters: [
      { name: 'channel', type: 'enum', options: ['red', 'green', 'blue', 'alpha', 'luminance'], default: 'luminance' },
      { name: 'scale', type: 'vector2', default: [100, 100] },
      { name: 'height', type: 'number', default: 10, min: 0 }
    ],
    inputs: [
      { name: 'image', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'DistanceField',
    description: 'Distance field from geometry',
    operation: 'FIELD_DISTANCE',
    occtBinding: 'fieldDistance',
    parameters: [
      { name: 'maxDistance', type: 'number', default: 100, min: 0.1 },
      { name: 'inside', type: 'boolean', default: false },
      { name: 'signed', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Generate',
    name: 'ChargeField',
    description: 'Electric charge field',
    operation: 'FIELD_CHARGE',
    occtBinding: 'fieldCharge',
    parameters: [
      { name: 'charge', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'falloff', type: 'enum', options: ['inverse', 'inverse-square', 'exponential'], default: 'inverse-square' }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  }
];

/**
 * Attractor Systems
 */
export const attractorTemplates: NodeTemplate[] = [
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'PointAttractor',
    description: 'Point attractor field',
    operation: 'ATTRACTOR_POINT',
    occtBinding: 'attractorPoint',
    parameters: [
      { name: 'strength', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'radius', type: 'number', default: 100, min: 0.1 },
      { name: 'falloff', type: 'enum', options: ['linear', 'quadratic', 'exponential', 'gaussian'], default: 'quadratic' }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'CurveAttractor',
    description: 'Curve attractor field',
    operation: 'ATTRACTOR_CURVE',
    occtBinding: 'attractorCurve',
    parameters: [
      { name: 'strength', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'radius', type: 'number', default: 50, min: 0.1 },
      { name: 'falloff', type: 'enum', options: ['linear', 'smooth', 'exponential'], default: 'smooth' }
    ],
    inputs: [
      { name: 'curves', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'SurfaceAttractor',
    description: 'Surface attractor field',
    operation: 'ATTRACTOR_SURFACE',
    occtBinding: 'attractorSurface',
    parameters: [
      { name: 'strength', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'radius', type: 'number', default: 30, min: 0.1 },
      { name: 'falloff', type: 'enum', options: ['linear', 'smooth', 'exponential'], default: 'smooth' }
    ],
    inputs: [
      { name: 'surfaces', type: 'Face[]', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'MeshAttractor',
    description: 'Mesh vertex attractor',
    operation: 'ATTRACTOR_MESH',
    occtBinding: 'attractorMesh',
    parameters: [
      { name: 'strength', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'radius', type: 'number', default: 20, min: 0.1 },
      { name: 'weightByArea', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'mesh', type: 'Mesh', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'SpinAttractor',
    description: 'Spinning attractor field',
    operation: 'ATTRACTOR_SPIN',
    occtBinding: 'attractorSpin',
    parameters: [
      { name: 'strength', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'radius', type: 'number', default: 100, min: 0.1 },
      { name: 'axis', type: 'vector3', default: [0, 0, 1] },
      { name: 'decay', type: 'number', default: 0.5, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'field', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'DirectionalAttractor',
    description: 'Directional attractor',
    operation: 'ATTRACTOR_DIRECTIONAL',
    occtBinding: 'attractorDirectional',
    parameters: [
      { name: 'direction', type: 'vector3', default: [1, 0, 0] },
      { name: 'strength', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'spread', type: 'number', default: 45, min: 0, max: 180 }
    ],
    inputs: [
      { name: 'origin', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'field', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'TwistAttractor',
    description: 'Twist attractor field',
    operation: 'ATTRACTOR_TWIST',
    occtBinding: 'attractorTwist',
    parameters: [
      { name: 'angle', type: 'number', default: 90, min: -360, max: 360 },
      { name: 'height', type: 'number', default: 100, min: 0.1 },
      { name: 'radius', type: 'number', default: 50, min: 0.1 },
      { name: 'falloff', type: 'enum', options: ['linear', 'smooth', 'exponential'], default: 'smooth' }
    ],
    inputs: [
      { name: 'axis', type: 'Line', required: true }
    ],
    outputs: [
      { name: 'field', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'VortexAttractor',
    description: 'Vortex attractor field',
    operation: 'ATTRACTOR_VORTEX',
    occtBinding: 'attractorVortex',
    parameters: [
      { name: 'strength', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'radius', type: 'number', default: 100, min: 0.1 },
      { name: 'coreRadius', type: 'number', default: 10, min: 0.1 },
      { name: 'height', type: 'number', default: 200, min: 0.1 }
    ],
    inputs: [
      { name: 'axis', type: 'Line', required: true }
    ],
    outputs: [
      { name: 'field', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'GravityAttractor',
    description: 'Gravity well attractor',
    operation: 'ATTRACTOR_GRAVITY',
    occtBinding: 'attractorGravity',
    parameters: [
      { name: 'mass', type: 'number', default: 100, min: 0.1 },
      { name: 'G', type: 'number', default: 1, min: 0.001, description: 'Gravitational constant' }
    ],
    inputs: [
      { name: 'bodies', type: 'Point[]', required: true },
      { name: 'masses', type: 'number[]', required: false }
    ],
    outputs: [
      { name: 'field', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Attractor',
    name: 'FlowAttractor',
    description: 'Flow field attractor',
    operation: 'ATTRACTOR_FLOW',
    occtBinding: 'attractorFlow',
    parameters: [
      { name: 'velocity', type: 'number', default: 10, min: 0 },
      { name: 'turbulence', type: 'number', default: 0.1, min: 0, max: 1 },
      { name: 'viscosity', type: 'number', default: 0.1, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'obstacles', type: 'Shape[]', required: false },
      { name: 'sources', type: 'Point[]', required: false }
    ],
    outputs: [
      { name: 'field', type: 'VectorField' }
    ]
  }
];

/**
 * Field Operations
 */
export const fieldOperationTemplates: NodeTemplate[] = [
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldAdd',
    description: 'Add fields',
    operation: 'FIELD_ADD',
    occtBinding: 'fieldAdd',
    parameters: [],
    inputs: [
      { name: 'fieldA', type: 'ScalarField', required: true },
      { name: 'fieldB', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldSubtract',
    description: 'Subtract fields',
    operation: 'FIELD_SUBTRACT',
    occtBinding: 'fieldSubtract',
    parameters: [],
    inputs: [
      { name: 'fieldA', type: 'ScalarField', required: true },
      { name: 'fieldB', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldMultiply',
    description: 'Multiply fields',
    operation: 'FIELD_MULTIPLY',
    occtBinding: 'fieldMultiply',
    parameters: [],
    inputs: [
      { name: 'fieldA', type: 'ScalarField', required: true },
      { name: 'fieldB', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldDivide',
    description: 'Divide fields',
    operation: 'FIELD_DIVIDE',
    occtBinding: 'fieldDivide',
    parameters: [
      { name: 'epsilon', type: 'number', default: 0.001, min: 0 }
    ],
    inputs: [
      { name: 'fieldA', type: 'ScalarField', required: true },
      { name: 'fieldB', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldMin',
    description: 'Minimum of fields',
    operation: 'FIELD_MIN',
    occtBinding: 'fieldMin',
    parameters: [],
    inputs: [
      { name: 'fields', type: 'ScalarField[]', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldMax',
    description: 'Maximum of fields',
    operation: 'FIELD_MAX',
    occtBinding: 'fieldMax',
    parameters: [],
    inputs: [
      { name: 'fields', type: 'ScalarField[]', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldBlend',
    description: 'Blend fields',
    operation: 'FIELD_BLEND',
    occtBinding: 'fieldBlend',
    parameters: [
      { name: 'mode', type: 'enum', options: ['linear', 'smooth', 'overlay', 'multiply'], default: 'linear' }
    ],
    inputs: [
      { name: 'fieldA', type: 'ScalarField', required: true },
      { name: 'fieldB', type: 'ScalarField', required: true },
      { name: 'factor', type: 'number', required: true }
    ],
    outputs: [
      { name: 'field', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldRemap',
    description: 'Remap field values',
    operation: 'FIELD_REMAP',
    occtBinding: 'fieldRemap',
    parameters: [
      { name: 'fromMin', type: 'number', default: 0 },
      { name: 'fromMax', type: 'number', default: 1 },
      { name: 'toMin', type: 'number', default: 0 },
      { name: 'toMax', type: 'number', default: 100 }
    ],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'remapped', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldClamp',
    description: 'Clamp field values',
    operation: 'FIELD_CLAMP',
    occtBinding: 'fieldClamp',
    parameters: [
      { name: 'min', type: 'number', default: 0 },
      { name: 'max', type: 'number', default: 1 }
    ],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'clamped', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldInvert',
    description: 'Invert field values',
    operation: 'FIELD_INVERT',
    occtBinding: 'fieldInvert',
    parameters: [],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'inverted', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldGradient',
    description: 'Compute field gradient',
    operation: 'FIELD_GRADIENT',
    occtBinding: 'fieldGradient',
    parameters: [],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'gradient', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldDivergence',
    description: 'Compute divergence',
    operation: 'FIELD_DIVERGENCE',
    occtBinding: 'fieldDivergence',
    parameters: [],
    inputs: [
      { name: 'field', type: 'VectorField', required: true }
    ],
    outputs: [
      { name: 'divergence', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldCurl',
    description: 'Compute curl',
    operation: 'FIELD_CURL',
    occtBinding: 'fieldCurl',
    parameters: [],
    inputs: [
      { name: 'field', type: 'VectorField', required: true }
    ],
    outputs: [
      { name: 'curl', type: 'VectorField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldLaplacian',
    description: 'Compute Laplacian',
    operation: 'FIELD_LAPLACIAN',
    occtBinding: 'fieldLaplacian',
    parameters: [],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'laplacian', type: 'ScalarField' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Operations',
    name: 'FieldSmooth',
    description: 'Smooth field',
    operation: 'FIELD_SMOOTH',
    occtBinding: 'fieldSmooth',
    parameters: [
      { name: 'iterations', type: 'number', default: 3, min: 1, max: 10, step: 1 },
      { name: 'factor', type: 'number', default: 0.5, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'smoothed', type: 'ScalarField' }
    ]
  }
];

/**
 * Field Sampling
 */
export const fieldSamplingTemplates: NodeTemplate[] = [
  {
    category: 'Field',
    subcategory: 'Sample',
    name: 'SampleField',
    description: 'Sample field at points',
    operation: 'FIELD_SAMPLE',
    occtBinding: 'fieldSample',
    parameters: [],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true },
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'values', type: 'number[]' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Sample',
    name: 'FieldLine',
    description: 'Create field lines',
    operation: 'FIELD_LINE',
    occtBinding: 'fieldLine',
    parameters: [
      { name: 'stepSize', type: 'number', default: 1, min: 0.01 },
      { name: 'maxSteps', type: 'number', default: 1000, min: 10, max: 10000, step: 10 },
      { name: 'direction', type: 'enum', options: ['forward', 'backward', 'both'], default: 'forward' }
    ],
    inputs: [
      { name: 'field', type: 'VectorField', required: true },
      { name: 'seeds', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'lines', type: 'Wire[]' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Sample',
    name: 'IsoContour',
    description: 'Extract iso-contours',
    operation: 'FIELD_ISOCONTOUR',
    occtBinding: 'fieldIsoContour',
    parameters: [
      { name: 'value', type: 'number', default: 0.5 },
      { name: 'smooth', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'contours', type: 'Wire[]' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Sample',
    name: 'IsoSurface',
    description: 'Extract iso-surface',
    operation: 'FIELD_ISOSURFACE',
    occtBinding: 'fieldIsoSurface',
    parameters: [
      { name: 'value', type: 'number', default: 0.5 },
      { name: 'resolution', type: 'number', default: 50, min: 10, max: 200, step: 5 }
    ],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'surface', type: 'Mesh' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Sample',
    name: 'FieldGrid',
    description: 'Sample field on grid',
    operation: 'FIELD_GRID',
    occtBinding: 'fieldGrid',
    parameters: [
      { name: 'resolutionX', type: 'number', default: 10, min: 2, max: 100, step: 1 },
      { name: 'resolutionY', type: 'number', default: 10, min: 2, max: 100, step: 1 },
      { name: 'resolutionZ', type: 'number', default: 10, min: 2, max: 100, step: 1 }
    ],
    inputs: [
      { name: 'field', type: 'ScalarField', required: true },
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'grid', type: 'Data' },
      { name: 'points', type: 'Point[]' },
      { name: 'values', type: 'number[]' }
    ]
  }
];

/**
 * Field-Driven Deformation
 */
export const fieldDeformationTemplates: NodeTemplate[] = [
  {
    category: 'Field',
    subcategory: 'Deform',
    name: 'FieldDeform',
    description: 'Deform by field',
    operation: 'FIELD_DEFORM',
    occtBinding: 'fieldDeform',
    parameters: [
      { name: 'strength', type: 'number', default: 10, min: -100, max: 100 }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape', required: true },
      { name: 'field', type: 'VectorField', required: true }
    ],
    outputs: [
      { name: 'deformed', type: 'Shape' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Deform',
    name: 'FieldDisplace',
    description: 'Displace along normals',
    operation: 'FIELD_DISPLACE',
    occtBinding: 'fieldDisplace',
    parameters: [
      { name: 'strength', type: 'number', default: 10, min: -100, max: 100 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true },
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'displaced', type: 'Face' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Deform',
    name: 'FieldScale',
    description: 'Scale by field',
    operation: 'FIELD_SCALE',
    occtBinding: 'fieldScale',
    parameters: [
      { name: 'minScale', type: 'number', default: 0.5, min: 0 },
      { name: 'maxScale', type: 'number', default: 2, min: 0 }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape[]', required: true },
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'scaled', type: 'Shape[]' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Deform',
    name: 'FieldRotate',
    description: 'Rotate by field',
    operation: 'FIELD_ROTATE',
    occtBinding: 'fieldRotate',
    parameters: [
      { name: 'maxAngle', type: 'number', default: 180, min: -360, max: 360 }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape[]', required: true },
      { name: 'field', type: 'VectorField', required: true }
    ],
    outputs: [
      { name: 'rotated', type: 'Shape[]' }
    ]
  },
  {
    category: 'Field',
    subcategory: 'Deform',
    name: 'FieldColor',
    description: 'Color by field value',
    operation: 'FIELD_COLOR',
    occtBinding: 'fieldColor',
    parameters: [
      { name: 'gradient', type: 'enum', options: ['grayscale', 'rainbow', 'heat', 'cool', 'custom'], default: 'rainbow' }
    ],
    inputs: [
      { name: 'mesh', type: 'Mesh', required: true },
      { name: 'field', type: 'ScalarField', required: true }
    ],
    outputs: [
      { name: 'coloredMesh', type: 'Mesh' }
    ]
  }
];

// Field visualization templates (5 nodes)
export const fieldVisualizationTemplates: NodeTemplate[] = [
  {
    category: 'Fields',
    subcategory: 'Visualization',
    name: 'FieldColorMap',
    description: 'Visualize field values as colors',
    operation: 'visualizeFieldColors',
    parameters: [
      {
        name: 'colorScheme',
        type: 'enum',
        default: '"viridis"',
        options: ['viridis', 'plasma', 'inferno', 'magma', 'turbo', 'rainbow'],
        description: 'Color scheme for visualization'
      },
      {
        name: 'minValue',
        type: 'number',
        default: 0,
        description: 'Minimum field value'
      },
      {
        name: 'maxValue',
        type: 'number',
        default: 1,
        description: 'Maximum field value'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'mesh', type: 'Mesh', required: true }
    ],
    outputs: [
      { name: 'coloredMesh', type: 'Mesh' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Visualization',
    name: 'FieldVectorArrows',
    description: 'Display vector field as arrows',
    operation: 'visualizeFieldVectors',
    parameters: [
      {
        name: 'arrowScale',
        type: 'number',
        default: 1,
        min: 0.1,
        max: 10,
        description: 'Scale factor for arrows'
      },
      {
        name: 'density',
        type: 'number',
        default: 0.5,
        min: 0,
        max: 1,
        description: 'Display density (0-1)'
      }
    ],
    inputs: [
      { name: 'field', type: 'VectorField', required: false },
      { name: 'domain', type: 'Geometry', required: true }
    ],
    outputs: [
      { name: 'arrows', type: 'GeometrySet' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Visualization',
    name: 'FieldStreamLines',
    description: 'Generate streamlines through vector field',
    operation: 'generateStreamlines',
    parameters: [
      {
        name: 'seedCount',
        type: 'number',
        default: 20,
        min: 1,
        max: 1000,
        description: 'Number of streamlines'
      },
      {
        name: 'stepSize',
        type: 'number',
        default: 0.1,
        min: 0.01,
        max: 1,
        description: 'Integration step size'
      },
      {
        name: 'maxSteps',
        type: 'number',
        default: 100,
        min: 10,
        max: 1000,
        description: 'Maximum steps per line'
      }
    ],
    inputs: [
      { name: 'field', type: 'VectorField', required: false },
      { name: 'seedPoints', type: 'PointSet', required: false }
    ],
    outputs: [
      { name: 'streamlines', type: 'CurveSet' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Visualization',
    name: 'FieldHeatMap',
    description: 'Generate heat map visualization',
    operation: 'generateHeatMap',
    parameters: [
      {
        name: 'resolution',
        type: 'number',
        default: 50,
        min: 10,
        max: 200,
        description: 'Grid resolution'
      },
      {
        name: 'interpolation',
        type: 'enum',
        default: '"bilinear"',
        options: ['nearest', 'bilinear', 'bicubic'],
        description: 'Interpolation method'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'plane', type: 'Plane', required: true }
    ],
    outputs: [
      { name: 'heatMap', type: 'Mesh' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Visualization',
    name: 'FieldVolume',
    description: 'Generate volumetric field visualization',
    operation: 'visualizeFieldVolume',
    parameters: [
      {
        name: 'voxelSize',
        type: 'number',
        default: 1,
        min: 0.1,
        max: 10,
        description: 'Size of voxels'
      },
      {
        name: 'threshold',
        type: 'number',
        default: 0.5,
        min: 0,
        max: 1,
        description: 'Display threshold'
      },
      {
        name: 'opacity',
        type: 'number',
        default: 0.8,
        min: 0,
        max: 1,
        description: 'Volume opacity'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'volume', type: 'Mesh' }
    ]
  }
];

// Field analysis templates (10 nodes)
export const fieldAnalysisTemplates: NodeTemplate[] = [
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldMinMax',
    description: 'Find minimum and maximum field values',
    operation: 'analyzeFieldMinMax',
    parameters: [],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'domain', type: 'Geometry', required: false }
    ],
    outputs: [
      { name: 'min', type: 'Number' },
      { name: 'max', type: 'Number' },
      { name: 'minPoint', type: 'Point' },
      { name: 'maxPoint', type: 'Point' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldAverage',
    description: 'Calculate average field value',
    operation: 'calculateFieldAverage',
    parameters: [
      {
        name: 'sampleCount',
        type: 'number',
        default: 1000,
        min: 100,
        max: 10000,
        description: 'Number of samples'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'domain', type: 'Geometry', required: false }
    ],
    outputs: [
      { name: 'average', type: 'Number' },
      { name: 'standardDeviation', type: 'Number' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldCriticalPoints',
    description: 'Find critical points in field',
    operation: 'findCriticalPoints',
    parameters: [
      {
        name: 'tolerance',
        type: 'number',
        default: 0.001,
        min: 0,
        max: 1,
        description: 'Search tolerance'
      },
      {
        name: 'type',
        type: 'enum',
        default: '"all"',
        options: ['all', 'minima', 'maxima', 'saddles'],
        description: 'Type of critical points'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'domain', type: 'Geometry', required: false }
    ],
    outputs: [
      { name: 'points', type: 'PointSet' },
      { name: 'types', type: 'StringList' },
      { name: 'values', type: 'NumberList' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldDivergenceAnalysis',
    description: 'Calculate divergence of vector field',
    operation: 'calculateDivergenceAnalysis',
    parameters: [],
    inputs: [
      { name: 'vectorField', type: 'VectorField', required: false }
    ],
    outputs: [
      { name: 'divergenceField', type: 'Field' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldCurlAnalysis',
    description: 'Calculate curl of vector field',
    operation: 'calculateCurlAnalysis',
    parameters: [],
    inputs: [
      { name: 'vectorField', type: 'VectorField', required: false }
    ],
    outputs: [
      { name: 'curlField', type: 'VectorField' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldFlux',
    description: 'Calculate flux through surface',
    operation: 'calculateFlux',
    parameters: [],
    inputs: [
      { name: 'vectorField', type: 'VectorField', required: false },
      { name: 'surface', type: 'Surface', required: true }
    ],
    outputs: [
      { name: 'flux', type: 'Number' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldCirculation',
    description: 'Calculate circulation along curve',
    operation: 'calculateCirculation',
    parameters: [],
    inputs: [
      { name: 'vectorField', type: 'VectorField', required: false },
      { name: 'curve', type: 'Curve', required: true }
    ],
    outputs: [
      { name: 'circulation', type: 'Number' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldPotential',
    description: 'Find potential function for conservative field',
    operation: 'findPotential',
    parameters: [
      {
        name: 'referencePoint',
        type: 'vector3',
        default: '[0, 0, 0]',
        description: 'Reference point for potential'
      }
    ],
    inputs: [
      { name: 'vectorField', type: 'VectorField', required: false }
    ],
    outputs: [
      { name: 'potentialField', type: 'Field' },
      { name: 'isConservative', type: 'Boolean' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldHistogram',
    description: 'Generate histogram of field values',
    operation: 'generateHistogram',
    parameters: [
      {
        name: 'bins',
        type: 'number',
        default: 20,
        min: 5,
        max: 100,
        description: 'Number of histogram bins'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'domain', type: 'Geometry', required: false }
    ],
    outputs: [
      { name: 'binCenters', type: 'NumberList' },
      { name: 'binCounts', type: 'NumberList' },
      { name: 'binEdges', type: 'NumberList' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Analysis',
    name: 'FieldCorrelation',
    description: 'Calculate correlation between fields',
    operation: 'calculateCorrelation',
    parameters: [
      {
        name: 'sampleCount',
        type: 'number',
        default: 1000,
        min: 100,
        max: 10000,
        description: 'Number of samples'
      }
    ],
    inputs: [
      { name: 'field1', type: 'Field', required: false },
      { name: 'field2', type: 'Field', required: false },
      { name: 'domain', type: 'Geometry', required: false }
    ],
    outputs: [
      { name: 'correlation', type: 'Number' },
      { name: 'covariance', type: 'Number' }
    ]
  }
];

// Advanced field operations (5 nodes)
export const advancedFieldTemplates: NodeTemplate[] = [
  {
    category: 'Fields',
    subcategory: 'Advanced',
    name: 'FieldMorphing',
    description: 'Morph between two fields',
    operation: 'morphFields',
    parameters: [
      {
        name: 'factor',
        type: 'number',
        default: 0.5,
        min: 0,
        max: 1,
        description: 'Morphing factor (0=field1, 1=field2)'
      },
      {
        name: 'interpolation',
        type: 'enum',
        default: '"linear"',
        options: ['linear', 'smooth', 'exponential'],
        description: 'Interpolation method'
      }
    ],
    inputs: [
      { name: 'field1', type: 'Field', required: false },
      { name: 'field2', type: 'Field', required: false }
    ],
    outputs: [
      { name: 'morphedField', type: 'Field' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Advanced',
    name: 'FieldWarp',
    description: 'Warp field with deformation',
    operation: 'warpField',
    parameters: [
      {
        name: 'strength',
        type: 'number',
        default: 1,
        min: 0,
        max: 10,
        description: 'Warping strength'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'deformation', type: 'VectorField', required: true }
    ],
    outputs: [
      { name: 'warpedField', type: 'Field' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Advanced',
    name: 'FieldConvolution',
    description: 'Convolve field with kernel',
    operation: 'convolveField',
    parameters: [
      {
        name: 'kernelSize',
        type: 'number',
        default: 3,
        min: 3,
        max: 11,
        step: 2,
        description: 'Kernel size (odd number)'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false },
      { name: 'kernel', type: 'Field', required: true }
    ],
    outputs: [
      { name: 'convolvedField', type: 'Field' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Advanced',
    name: 'FieldFourier',
    description: 'Fourier transform of field',
    operation: 'fourierTransform',
    parameters: [
      {
        name: 'direction',
        type: 'enum',
        default: '"forward"',
        options: ['forward', 'inverse'],
        description: 'Transform direction'
      }
    ],
    inputs: [
      { name: 'field', type: 'Field', required: false }
    ],
    outputs: [
      { name: 'transformedField', type: 'Field' },
      { name: 'phase', type: 'Field' },
      { name: 'magnitude', type: 'Field' }
    ]
  },
  {
    category: 'Fields',
    subcategory: 'Advanced',
    name: 'FieldOptimize',
    description: 'Optimize field for objective',
    operation: 'optimizeField',
    parameters: [
      {
        name: 'iterations',
        type: 'number',
        default: 100,
        min: 10,
        max: 1000,
        description: 'Optimization iterations'
      },
      {
        name: 'objective',
        type: 'enum',
        default: '"minimize"',
        options: ['minimize', 'maximize', 'smooth', 'sharpen'],
        description: 'Optimization objective'
      },
      {
        name: 'learningRate',
        type: 'number',
        default: 0.01,
        min: 0.001,
        max: 1,
        description: 'Learning rate'
      }
    ],
    inputs: [
      { name: 'initialField', type: 'Field', required: false },
      { name: 'constraints', type: 'Field', required: false }
    ],
    outputs: [
      { name: 'optimizedField', type: 'Field' },
      { name: 'convergence', type: 'NumberList' }
    ]
  }
];

// Export all templates
export const allFieldAttractorTemplates = [
  ...fieldGenerationTemplates,
  ...attractorTemplates,
  ...fieldOperationTemplates,
  ...fieldSamplingTemplates,
  ...fieldDeformationTemplates,
  ...fieldVisualizationTemplates,
  ...fieldAnalysisTemplates,
  ...advancedFieldTemplates
];