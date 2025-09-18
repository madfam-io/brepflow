/**
 * Core Primitive Templates - Phase 2
 * Basic 3D primitives with full parametric control
 */

import { NodeTemplate } from '../node-template';

/**
 * Basic 3D Primitives - The foundation of all CAD modeling
 */
export const basicPrimitivesTemplates: NodeTemplate[] = [
  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Box',
    description: 'Create a parametric box/cuboid',
    operation: 'MAKE_BOX',
    occtBinding: 'makeBox',
    parameters: [
      { name: 'width', type: 'number', default: 100, min: 0.1, max: 10000, description: 'Width (X dimension)' },
      { name: 'depth', type: 'number', default: 100, min: 0.1, max: 10000, description: 'Depth (Y dimension)' },
      { name: 'height', type: 'number', default: 100, min: 0.1, max: 10000, description: 'Height (Z dimension)' },
      { name: 'centerX', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerY', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerZ', type: 'number', default: 0, min: -10000, max: 10000 }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Generated box' }
    ],
    examples: [
      {
        title: 'Unit Cube',
        parameters: { width: 1, depth: 1, height: 1 }
      },
      {
        title: 'Rectangular Block',
        parameters: { width: 200, depth: 100, height: 50 }
      }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Sphere',
    description: 'Create a parametric sphere',
    operation: 'MAKE_SPHERE',
    occtBinding: 'makeSphere',
    parameters: [
      { name: 'radius', type: 'number', default: 50, min: 0.1, max: 10000, description: 'Sphere radius' },
      { name: 'centerX', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerY', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerZ', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'angle1', type: 'number', default: 0, min: -180, max: 180, description: 'Start angle (longitude)' },
      { name: 'angle2', type: 'number', default: 360, min: 0, max: 360, description: 'End angle (longitude)' },
      { name: 'angle3', type: 'number', default: 180, min: 0, max: 180, description: 'Latitude range' }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Generated sphere' }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Cylinder',
    description: 'Create a parametric cylinder',
    operation: 'MAKE_CYLINDER',
    occtBinding: 'makeCylinder',
    parameters: [
      { name: 'radius', type: 'number', default: 50, min: 0.1, max: 10000, description: 'Cylinder radius' },
      { name: 'height', type: 'number', default: 100, min: 0.1, max: 10000, description: 'Cylinder height' },
      { name: 'centerX', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerY', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerZ', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'axisX', type: 'number', default: 0, min: -1, max: 1, description: 'Axis X component' },
      { name: 'axisY', type: 'number', default: 0, min: -1, max: 1, description: 'Axis Y component' },
      { name: 'axisZ', type: 'number', default: 1, min: -1, max: 1, description: 'Axis Z component' },
      { name: 'angle', type: 'number', default: 360, min: 0, max: 360, description: 'Sweep angle' }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Generated cylinder' }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Cone',
    description: 'Create a parametric cone or truncated cone',
    operation: 'MAKE_CONE',
    occtBinding: 'makeCone',
    parameters: [
      { name: 'radius1', type: 'number', default: 50, min: 0, max: 10000, description: 'Bottom radius' },
      { name: 'radius2', type: 'number', default: 0, min: 0, max: 10000, description: 'Top radius (0 for pointed)' },
      { name: 'height', type: 'number', default: 100, min: 0.1, max: 10000, description: 'Cone height' },
      { name: 'centerX', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerY', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerZ', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'angle', type: 'number', default: 360, min: 0, max: 360, description: 'Sweep angle' }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Generated cone' }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Torus',
    description: 'Create a parametric torus',
    operation: 'MAKE_TORUS',
    occtBinding: 'makeTorus',
    parameters: [
      { name: 'majorRadius', type: 'number', default: 50, min: 0.1, max: 10000, description: 'Major radius' },
      { name: 'minorRadius', type: 'number', default: 10, min: 0.1, max: 10000, description: 'Minor radius' },
      { name: 'centerX', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerY', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerZ', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'angle1', type: 'number', default: 0, min: 0, max: 360, description: 'Start angle' },
      { name: 'angle2', type: 'number', default: 360, min: 0, max: 360, description: 'End angle' },
      { name: 'angle', type: 'number', default: 360, min: 0, max: 360, description: 'Sweep angle' }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Generated torus' }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Ellipsoid',
    description: 'Create a parametric ellipsoid',
    operation: 'MAKE_ELLIPSOID',
    occtBinding: 'makeEllipsoid',
    parameters: [
      { name: 'radiusX', type: 'number', default: 50, min: 0.1, max: 10000, description: 'X radius' },
      { name: 'radiusY', type: 'number', default: 40, min: 0.1, max: 10000, description: 'Y radius' },
      { name: 'radiusZ', type: 'number', default: 30, min: 0.1, max: 10000, description: 'Z radius' },
      { name: 'centerX', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerY', type: 'number', default: 0, min: -10000, max: 10000 },
      { name: 'centerZ', type: 'number', default: 0, min: -10000, max: 10000 }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Generated ellipsoid' }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Capsule',
    description: 'Create a capsule (cylinder with hemisphere caps)',
    operation: 'MAKE_CAPSULE',
    occtBinding: 'makeCapsule',
    parameters: [
      { name: 'radius', type: 'number', default: 25, min: 0.1, max: 10000, description: 'Capsule radius' },
      { name: 'height', type: 'number', default: 100, min: 0.1, max: 10000, description: 'Cylindrical section height' }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Generated capsule' }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'RoundedBox',
    description: 'Create a box with rounded edges',
    operation: 'MAKE_ROUNDED_BOX',
    occtBinding: 'makeRoundedBox',
    parameters: [
      { name: 'width', type: 'number', default: 100, min: 0.1, max: 10000 },
      { name: 'depth', type: 'number', default: 100, min: 0.1, max: 10000 },
      { name: 'height', type: 'number', default: 100, min: 0.1, max: 10000 },
      { name: 'radius', type: 'number', default: 10, min: 0.1, max: 1000, description: 'Corner radius' }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Rounded box' }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Pipe',
    description: 'Create a pipe (hollow cylinder)',
    operation: 'MAKE_PIPE',
    occtBinding: 'makePipe',
    parameters: [
      { name: 'outerRadius', type: 'number', default: 50, min: 0.1, max: 10000 },
      { name: 'innerRadius', type: 'number', default: 40, min: 0.1, max: 10000 },
      { name: 'height', type: 'number', default: 100, min: 0.1, max: 10000 }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Pipe solid' }
    ],
    validation: [
      {
        rule: 'innerRadius < outerRadius',
        message: 'Inner radius must be less than outer radius'
      }
    ]
  },

  {
    category: 'Solid',
    subcategory: 'Primitives',
    name: 'Polyhedron',
    description: 'Create a regular polyhedron',
    operation: 'MAKE_POLYHEDRON',
    occtBinding: 'makePolyhedron',
    parameters: [
      {
        name: 'type',
        type: 'enum',
        options: ['tetrahedron', 'octahedron', 'dodecahedron', 'icosahedron'],
        default: 'octahedron'
      },
      { name: 'size', type: 'number', default: 50, min: 0.1, max: 10000 }
    ],
    inputs: [],
    outputs: [
      { name: 'solid', type: 'Solid', description: 'Polyhedron solid' }
    ]
  }
];

// Export all templates
export const allCorePrimitivesTemplates = [
  ...basicPrimitivesTemplates
];