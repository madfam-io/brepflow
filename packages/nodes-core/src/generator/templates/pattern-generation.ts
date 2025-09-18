/**
 * Pattern Generation Templates
 * Geometric patterns, tessellations, and algorithmic design
 */

import { NodeTemplate } from '../node-template';

/**
 * Voronoi and Delaunay patterns (15 nodes)
 */
export const voronoiDelaunayTemplates: NodeTemplate[] = [
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'Voronoi2D',
    description: 'Create 2D Voronoi diagram',
    operation: 'VORONOI_2D',
    occtBinding: 'voronoi2D',
    parameters: [
      { name: 'boundary', type: 'enum', options: ['box', 'circle', 'polygon'], default: 'box' },
      { name: 'clipToBoundary', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'plane', type: 'Plane', required: false }
    ],
    outputs: [
      { name: 'cells', type: 'Wire[]' },
      { name: 'edges', type: 'Edge[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'Voronoi3D',
    description: 'Create 3D Voronoi cells',
    operation: 'VORONOI_3D',
    occtBinding: 'voronoi3D',
    parameters: [
      { name: 'clipToBox', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'bounds', type: 'Box', required: false }
    ],
    outputs: [
      { name: 'cells', type: 'Shape[]' },
      { name: 'faces', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'WeightedVoronoi',
    description: 'Weighted Voronoi diagram',
    operation: 'VORONOI_WEIGHTED',
    occtBinding: 'voronoiWeighted',
    parameters: [
      { name: 'powerExponent', type: 'number', default: 2, min: 1, max: 5 }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'weights', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'cells', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'CentroidalVoronoi',
    description: 'Lloyd relaxation Voronoi',
    operation: 'VORONOI_CENTROIDAL',
    occtBinding: 'voronoiCentroidal',
    parameters: [
      { name: 'iterations', type: 'number', default: 10, min: 1, max: 100, step: 1 },
      { name: 'convergence', type: 'number', default: 0.001, min: 0 }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'boundary', type: 'Wire', required: false }
    ],
    outputs: [
      { name: 'cells', type: 'Wire[]' },
      { name: 'centroids', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'VoronoiOnSurface',
    description: 'Voronoi on curved surface',
    operation: 'VORONOI_SURFACE',
    occtBinding: 'voronoiSurface',
    parameters: [
      { name: 'geodesic', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true },
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'cells', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Delaunay',
    name: 'Delaunay2D',
    description: 'Create 2D Delaunay triangulation',
    operation: 'DELAUNAY_2D',
    occtBinding: 'delaunay2D',
    parameters: [
      { name: 'constrainEdges', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'constraints', type: 'Edge[]', required: false }
    ],
    outputs: [
      { name: 'triangles', type: 'Face[]' },
      { name: 'mesh', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Delaunay',
    name: 'Delaunay3D',
    description: 'Create 3D Delaunay tetrahedralization',
    operation: 'DELAUNAY_3D',
    occtBinding: 'delaunay3D',
    parameters: [],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'tetrahedra', type: 'Shape[]' },
      { name: 'mesh', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Delaunay',
    name: 'ConstrainedDelaunay',
    description: 'Constrained Delaunay triangulation',
    operation: 'DELAUNAY_CONSTRAINED',
    occtBinding: 'delaunayConstrained',
    parameters: [
      { name: 'refinement', type: 'boolean', default: true },
      { name: 'maxArea', type: 'number', default: 100, min: 0.1 }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'boundary', type: 'Wire', required: true },
      { name: 'holes', type: 'Wire[]', required: false }
    ],
    outputs: [
      { name: 'triangulation', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Delaunay',
    name: 'AlphaShape',
    description: 'Alpha shape from points',
    operation: 'ALPHA_SHAPE',
    occtBinding: 'alphaShape',
    parameters: [
      { name: 'alpha', type: 'number', default: 1, min: 0 }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'shape', type: 'Wire' },
      { name: 'mesh', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'VoronoiFracture',
    description: 'Fracture pattern generation',
    operation: 'VORONOI_FRACTURE',
    occtBinding: 'voronoiFracture',
    parameters: [
      { name: 'irregularity', type: 'number', default: 0.5, min: 0, max: 1 },
      { name: 'density', type: 'number', default: 10, min: 1, max: 100 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'fragments', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'VoronoiGrowth',
    description: 'Organic growth pattern',
    operation: 'VORONOI_GROWTH',
    occtBinding: 'voronoiGrowth',
    parameters: [
      { name: 'generations', type: 'number', default: 5, min: 1, max: 20, step: 1 },
      { name: 'growthRate', type: 'number', default: 1.5, min: 1, max: 3 }
    ],
    inputs: [
      { name: 'seeds', type: 'Point[]', required: true },
      { name: 'boundary', type: 'Wire', required: false }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Delaunay',
    name: 'DelaunayMesh',
    description: 'Quality mesh generation',
    operation: 'DELAUNAY_MESH',
    occtBinding: 'delaunayMesh',
    parameters: [
      { name: 'targetSize', type: 'number', default: 10, min: 0.1 },
      { name: 'minAngle', type: 'number', default: 20, min: 0, max: 60 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'mesh', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'VoronoiSkeleton',
    description: 'Medial axis from Voronoi',
    operation: 'VORONOI_SKELETON',
    occtBinding: 'voronoiSkeleton',
    parameters: [
      { name: 'pruning', type: 'number', default: 0.1, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'skeleton', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Voronoi',
    name: 'VoronoiOffset',
    description: 'Offset Voronoi cells',
    operation: 'VORONOI_OFFSET',
    occtBinding: 'voronoiOffset',
    parameters: [
      { name: 'offset', type: 'number', default: 1, min: -10, max: 10 },
      { name: 'roundCorners', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'cells', type: 'Wire[]', required: true }
    ],
    outputs: [
      { name: 'offsetCells', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Delaunay',
    name: 'ConvexHull',
    description: 'Convex hull of points',
    operation: 'CONVEX_HULL',
    occtBinding: 'convexHull',
    parameters: [],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'hull', type: 'Wire' },
      { name: 'vertices', type: 'Point[]' }
    ]
  }
];

/**
 * Islamic and Geometric patterns (20 nodes)
 */
export const islamicGeometricTemplates: NodeTemplate[] = [
  {
    category: 'Patterns',
    subcategory: 'Islamic',
    name: 'IslamicStar',
    description: 'Islamic star pattern',
    operation: 'ISLAMIC_STAR',
    occtBinding: 'islamicStar',
    parameters: [
      { name: 'points', type: 'number', default: 8, min: 3, max: 24, step: 1 },
      { name: 'innerRadius', type: 'number', default: 0.5, min: 0.1, max: 0.9 },
      { name: 'rotation', type: 'number', default: 0, min: -180, max: 180 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Islamic',
    name: 'GirihTiling',
    description: 'Girih pentagonal tiling',
    operation: 'GIRIH_TILING',
    occtBinding: 'girihTiling',
    parameters: [
      { name: 'type', type: 'enum', options: ['pentagon', 'hexagon', 'bow-tie', 'rhombus', 'decagon'], default: 'pentagon' },
      { name: 'size', type: 'number', default: 10, min: 1 }
    ],
    inputs: [
      { name: 'plane', type: 'Plane', required: false }
    ],
    outputs: [
      { name: 'tiles', type: 'Face[]' },
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Islamic',
    name: 'Arabesque',
    description: 'Arabesque pattern',
    operation: 'ARABESQUE',
    occtBinding: 'arabesque',
    parameters: [
      { name: 'complexity', type: 'number', default: 3, min: 1, max: 5, step: 1 },
      { name: 'symmetry', type: 'number', default: 6, min: 3, max: 12, step: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Islamic',
    name: 'MoorishPattern',
    description: 'Moorish geometric pattern',
    operation: 'MOORISH_PATTERN',
    occtBinding: 'moorishPattern',
    parameters: [
      { name: 'style', type: 'enum', options: ['alhambra', 'cordoba', 'seville', 'granada'], default: 'alhambra' },
      { name: 'scale', type: 'number', default: 10, min: 1 }
    ],
    inputs: [
      { name: 'region', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Islamic',
    name: 'IslamicGrid',
    description: 'Islamic grid system',
    operation: 'ISLAMIC_GRID',
    occtBinding: 'islamicGrid',
    parameters: [
      { name: 'gridType', type: 'enum', options: ['square', 'hexagonal', 'octagonal'], default: 'octagonal' },
      { name: 'spacing', type: 'number', default: 10, min: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'grid', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Celtic',
    name: 'CelticKnot',
    description: 'Celtic knot pattern',
    operation: 'CELTIC_KNOT',
    occtBinding: 'celticKnot',
    parameters: [
      { name: 'type', type: 'enum', options: ['trinity', 'spiral', 'maze', 'cross'], default: 'trinity' },
      { name: 'width', type: 'number', default: 2, min: 0.5, max: 5 }
    ],
    inputs: [
      { name: 'path', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'knot', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Celtic',
    name: 'CelticBraid',
    description: 'Celtic braid pattern',
    operation: 'CELTIC_BRAID',
    occtBinding: 'celticBraid',
    parameters: [
      { name: 'strands', type: 'number', default: 3, min: 2, max: 8, step: 1 },
      { name: 'crossings', type: 'number', default: 5, min: 1, max: 20, step: 1 }
    ],
    inputs: [
      { name: 'centerline', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'braid', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'PenroseTiling',
    description: 'Penrose aperiodic tiling',
    operation: 'PENROSE_TILING',
    occtBinding: 'penroseTiling',
    parameters: [
      { name: 'type', type: 'enum', options: ['P1', 'P2', 'P3'], default: 'P2' },
      { name: 'subdivisions', type: 'number', default: 5, min: 1, max: 10, step: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'tiles', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'TruchetTiles',
    description: 'Truchet tile pattern',
    operation: 'TRUCHET_TILES',
    occtBinding: 'truchetTiles',
    parameters: [
      { name: 'tileType', type: 'enum', options: ['arc', 'diagonal', 'smith', 'multi'], default: 'arc' },
      { name: 'randomSeed', type: 'number', default: 0, min: 0, max: 999999 }
    ],
    inputs: [
      { name: 'grid', type: 'Face[]', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'SpiralPattern',
    description: 'Spiral-based pattern',
    operation: 'SPIRAL_PATTERN',
    occtBinding: 'spiralPattern',
    parameters: [
      { name: 'spiralType', type: 'enum', options: ['archimedean', 'logarithmic', 'fermat', 'golden'], default: 'logarithmic' },
      { name: 'turns', type: 'number', default: 5, min: 0.5, max: 20 },
      { name: 'growth', type: 'number', default: 1.2, min: 1, max: 3 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'spiral', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'MandalaPattern',
    description: 'Mandala circular pattern',
    operation: 'MANDALA_PATTERN',
    occtBinding: 'mandalaPattern',
    parameters: [
      { name: 'rings', type: 'number', default: 5, min: 1, max: 20, step: 1 },
      { name: 'symmetry', type: 'number', default: 8, min: 3, max: 24, step: 1 },
      { name: 'complexity', type: 'number', default: 3, min: 1, max: 5 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'mandala', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'PolygonalTessellation',
    description: 'Regular polygon tessellation',
    operation: 'POLYGON_TESSELLATION',
    occtBinding: 'polygonTessellation',
    parameters: [
      { name: 'polygonType', type: 'enum', options: ['triangular', 'square', 'hexagonal', 'octagonal'], default: 'hexagonal' },
      { name: 'size', type: 'number', default: 10, min: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'tiles', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'CirclePacking',
    description: 'Circle packing pattern',
    operation: 'CIRCLE_PACKING',
    occtBinding: 'circlePacking',
    parameters: [
      { name: 'packingType', type: 'enum', options: ['hexagonal', 'square', 'random', 'apollonian'], default: 'hexagonal' },
      { name: 'minRadius', type: 'number', default: 1, min: 0.1 },
      { name: 'maxRadius', type: 'number', default: 5, min: 0.1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'circles', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'HyperbolicTiling',
    description: 'Hyperbolic tessellation',
    operation: 'HYPERBOLIC_TILING',
    occtBinding: 'hyperbolicTiling',
    parameters: [
      { name: 'p', type: 'number', default: 7, min: 3, max: 12, step: 1 },
      { name: 'q', type: 'number', default: 3, min: 3, max: 12, step: 1 },
      { name: 'iterations', type: 'number', default: 3, min: 1, max: 5, step: 1 }
    ],
    inputs: [
      { name: 'disk', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'tiling', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'GeodesicPattern',
    description: 'Geodesic dome pattern',
    operation: 'GEODESIC_PATTERN',
    occtBinding: 'geodesicPattern',
    parameters: [
      { name: 'frequency', type: 'number', default: 3, min: 1, max: 10, step: 1 },
      { name: 'class', type: 'enum', options: ['I', 'II', 'III'], default: 'I' }
    ],
    inputs: [
      { name: 'sphere', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'geodesic', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Islamic',
    name: 'Muqarnas',
    description: 'Muqarnas honeycomb pattern',
    operation: 'MUQARNAS',
    occtBinding: 'muqarnas',
    parameters: [
      { name: 'levels', type: 'number', default: 3, min: 1, max: 8, step: 1 },
      { name: 'cellType', type: 'enum', options: ['square', 'octagonal', 'mixed'], default: 'mixed' }
    ],
    inputs: [
      { name: 'base', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'muqarnas', type: 'Shape[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'QuasiCrystal',
    description: 'Quasicrystalline pattern',
    operation: 'QUASI_CRYSTAL',
    occtBinding: 'quasiCrystal',
    parameters: [
      { name: 'symmetry', type: 'number', default: 5, min: 5, max: 12, step: 1 },
      { name: 'waves', type: 'number', default: 4, min: 3, max: 8, step: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'MinimalSurface',
    description: 'Minimal surface pattern',
    operation: 'MINIMAL_SURFACE',
    occtBinding: 'minimalSurface',
    parameters: [
      { name: 'type', type: 'enum', options: ['gyroid', 'schwarz', 'diamond', 'neovius'], default: 'gyroid' },
      { name: 'period', type: 'number', default: 10, min: 1 }
    ],
    inputs: [
      { name: 'box', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'surface', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'ReactionDiffusion',
    description: 'Reaction-diffusion pattern',
    operation: 'REACTION_DIFFUSION',
    occtBinding: 'reactionDiffusion',
    parameters: [
      { name: 'pattern', type: 'enum', options: ['spots', 'stripes', 'labyrinth', 'honeycomb'], default: 'spots' },
      { name: 'scale', type: 'number', default: 10, min: 1 },
      { name: 'iterations', type: 'number', default: 100, min: 10, max: 1000, step: 10 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Geometric',
    name: 'ParquetDeformation',
    description: 'M.C. Escher deformation',
    operation: 'PARQUET_DEFORMATION',
    occtBinding: 'parquetDeformation',
    parameters: [
      { name: 'deformationType', type: 'enum', options: ['linear', 'radial', 'spiral'], default: 'radial' },
      { name: 'steps', type: 'number', default: 10, min: 3, max: 50, step: 1 }
    ],
    inputs: [
      { name: 'baseTile', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'deformation', type: 'Face[]' }
    ]
  }
];

/**
 * Fractals and L-systems (15 nodes)
 */
export const fractalLSystemTemplates: NodeTemplate[] = [
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'KochSnowflake',
    description: 'Koch snowflake fractal',
    operation: 'KOCH_SNOWFLAKE',
    occtBinding: 'kochSnowflake',
    parameters: [
      { name: 'iterations', type: 'number', default: 4, min: 0, max: 8, step: 1 }
    ],
    inputs: [
      { name: 'triangle', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'fractal', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'SierpinskiTriangle',
    description: 'Sierpinski triangle',
    operation: 'SIERPINSKI_TRIANGLE',
    occtBinding: 'sierpinskiTriangle',
    parameters: [
      { name: 'iterations', type: 'number', default: 5, min: 0, max: 10, step: 1 },
      { name: 'filled', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'triangle', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'fractal', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'MengerSponge',
    description: 'Menger sponge 3D fractal',
    operation: 'MENGER_SPONGE',
    occtBinding: 'mengerSponge',
    parameters: [
      { name: 'iterations', type: 'number', default: 3, min: 0, max: 4, step: 1 }
    ],
    inputs: [
      { name: 'cube', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'fractal', type: 'Shape' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'JuliaSet',
    description: 'Julia set fractal',
    operation: 'JULIA_SET',
    occtBinding: 'juliaSet',
    parameters: [
      { name: 'cReal', type: 'number', default: -0.7, min: -2, max: 2 },
      { name: 'cImag', type: 'number', default: 0.27, min: -2, max: 2 },
      { name: 'iterations', type: 'number', default: 100, min: 10, max: 1000, step: 10 },
      { name: 'resolution', type: 'number', default: 100, min: 50, max: 500, step: 10 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'fractal', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'MandelbrotSet',
    description: 'Mandelbrot set',
    operation: 'MANDELBROT_SET',
    occtBinding: 'mandelbrotSet',
    parameters: [
      { name: 'iterations', type: 'number', default: 100, min: 10, max: 1000, step: 10 },
      { name: 'resolution', type: 'number', default: 200, min: 50, max: 1000, step: 10 },
      { name: 'zoom', type: 'number', default: 1, min: 0.1, max: 1000 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'fractal', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'L-Systems',
    name: 'LSystem2D',
    description: '2D L-system generator',
    operation: 'LSYSTEM_2D',
    occtBinding: 'lsystem2D',
    parameters: [
      { name: 'axiom', type: 'string', default: 'F' },
      { name: 'rules', type: 'string', default: 'F=F+F-F-F+F' },
      { name: 'angle', type: 'number', default: 90, min: 0, max: 360 },
      { name: 'iterations', type: 'number', default: 3, min: 1, max: 8, step: 1 }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'L-Systems',
    name: 'LSystem3D',
    description: '3D L-system generator',
    operation: 'LSYSTEM_3D',
    occtBinding: 'lsystem3D',
    parameters: [
      { name: 'axiom', type: 'string', default: 'F' },
      { name: 'rules', type: 'string', default: 'F=F[+F]F[-F]F' },
      { name: 'angle', type: 'number', default: 25, min: 0, max: 360 },
      { name: 'iterations', type: 'number', default: 4, min: 1, max: 8, step: 1 }
    ],
    inputs: [
      { name: 'startPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'branches', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'L-Systems',
    name: 'TreeGenerator',
    description: 'Parametric tree generator',
    operation: 'TREE_GENERATOR',
    occtBinding: 'treeGenerator',
    parameters: [
      { name: 'treeType', type: 'enum', options: ['oak', 'pine', 'willow', 'palm', 'fractal'], default: 'oak' },
      { name: 'height', type: 'number', default: 100, min: 10 },
      { name: 'branches', type: 'number', default: 5, min: 2, max: 10, step: 1 },
      { name: 'seed', type: 'number', default: 0, min: 0, max: 999999 }
    ],
    inputs: [
      { name: 'base', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'trunk', type: 'Wire[]' },
      { name: 'leaves', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'DragonCurve',
    description: 'Dragon curve fractal',
    operation: 'DRAGON_CURVE',
    occtBinding: 'dragonCurve',
    parameters: [
      { name: 'iterations', type: 'number', default: 10, min: 0, max: 15, step: 1 },
      { name: 'angle', type: 'number', default: 90, min: 0, max: 180 }
    ],
    inputs: [
      { name: 'startSegment', type: 'Edge', required: true }
    ],
    outputs: [
      { name: 'curve', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'HilbertCurve',
    description: 'Hilbert space-filling curve',
    operation: 'HILBERT_CURVE',
    occtBinding: 'hilbertCurve',
    parameters: [
      { name: 'order', type: 'number', default: 4, min: 1, max: 8, step: 1 },
      { name: 'dimension', type: 'enum', options: ['2D', '3D'], default: '2D' }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'curve', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'PeanoCurve',
    description: 'Peano space-filling curve',
    operation: 'PEANO_CURVE',
    occtBinding: 'peanoCurve',
    parameters: [
      { name: 'order', type: 'number', default: 3, min: 1, max: 6, step: 1 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'curve', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'CantorSet',
    description: 'Cantor set fractal',
    operation: 'CANTOR_SET',
    occtBinding: 'cantorSet',
    parameters: [
      { name: 'iterations', type: 'number', default: 5, min: 1, max: 10, step: 1 },
      { name: 'ratio', type: 'number', default: 0.333, min: 0.1, max: 0.5 }
    ],
    inputs: [
      { name: 'segment', type: 'Edge', required: true }
    ],
    outputs: [
      { name: 'segments', type: 'Edge[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'L-Systems',
    name: 'PlantGrowth',
    description: 'Parametric plant growth',
    operation: 'PLANT_GROWTH',
    occtBinding: 'plantGrowth',
    parameters: [
      { name: 'species', type: 'enum', options: ['fern', 'bush', 'weed', 'algae', 'moss'], default: 'fern' },
      { name: 'age', type: 'number', default: 5, min: 1, max: 20, step: 1 }
    ],
    inputs: [
      { name: 'ground', type: 'Plane', required: true }
    ],
    outputs: [
      { name: 'plant', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'BarnsleyFern',
    description: 'Barnsley fern fractal',
    operation: 'BARNSLEY_FERN',
    occtBinding: 'barnsleyFern',
    parameters: [
      { name: 'points', type: 'number', default: 10000, min: 100, max: 100000, step: 100 },
      { name: 'variation', type: 'enum', options: ['classic', 'thelypteridaceae', 'leptosporangiate'], default: 'classic' }
    ],
    inputs: [
      { name: 'plane', type: 'Plane', required: false }
    ],
    outputs: [
      { name: 'fern', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Fractals',
    name: 'ApollonianGasket',
    description: 'Apollonian gasket circles',
    operation: 'APOLLONIAN_GASKET',
    occtBinding: 'apollonianGasket',
    parameters: [
      { name: 'depth', type: 'number', default: 5, min: 1, max: 10, step: 1 },
      { name: 'minRadius', type: 'number', default: 0.1, min: 0.01 }
    ],
    inputs: [
      { name: 'outerCircle', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'circles', type: 'Wire[]' }
    ]
  }
];

/**
 * Space-filling and packing patterns (20 nodes)
 */
export const spaceFillingTemplates: NodeTemplate[] = [
  {
    category: 'Patterns',
    subcategory: 'Packing',
    name: 'RectanglePacking',
    description: 'Rectangle packing algorithm',
    operation: 'RECTANGLE_PACKING',
    occtBinding: 'rectanglePacking',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['guillotine', 'maxrects', 'skyline', 'shelf'], default: 'maxrects' }
    ],
    inputs: [
      { name: 'container', type: 'Face', required: true },
      { name: 'rectangles', type: 'Face[]', required: true }
    ],
    outputs: [
      { name: 'packed', type: 'Face[]' },
      { name: 'transforms', type: 'Transform[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Packing',
    name: 'SpherePacking',
    description: '3D sphere packing',
    operation: 'SPHERE_PACKING',
    occtBinding: 'spherePacking',
    parameters: [
      { name: 'packingType', type: 'enum', options: ['cubic', 'hexagonal', 'random', 'optimal'], default: 'hexagonal' }
    ],
    inputs: [
      { name: 'container', type: 'Shape', required: true },
      { name: 'radius', type: 'number', required: true }
    ],
    outputs: [
      { name: 'centers', type: 'Point[]' },
      { name: 'spheres', type: 'Shape[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Packing',
    name: 'PolygonPacking',
    description: 'Irregular polygon packing',
    operation: 'POLYGON_PACKING',
    occtBinding: 'polygonPacking',
    parameters: [
      { name: 'rotations', type: 'boolean', default: true },
      { name: 'angleStep', type: 'number', default: 90, min: 1, max: 180 }
    ],
    inputs: [
      { name: 'container', type: 'Face', required: true },
      { name: 'polygons', type: 'Face[]', required: true }
    ],
    outputs: [
      { name: 'packed', type: 'Face[]' },
      { name: 'utilization', type: 'Number' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Lattice',
    name: 'CubicLattice',
    description: 'Cubic lattice structure',
    operation: 'CUBIC_LATTICE',
    occtBinding: 'cubicLattice',
    parameters: [
      { name: 'cellSize', type: 'number', default: 10, min: 1 },
      { name: 'strutDiameter', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'lattice', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Lattice',
    name: 'OctetLattice',
    description: 'Octet truss lattice',
    operation: 'OCTET_LATTICE',
    occtBinding: 'octetLattice',
    parameters: [
      { name: 'cellSize', type: 'number', default: 10, min: 1 },
      { name: 'strutDiameter', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'lattice', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Lattice',
    name: 'DiamondLattice',
    description: 'Diamond lattice structure',
    operation: 'DIAMOND_LATTICE',
    occtBinding: 'diamondLattice',
    parameters: [
      { name: 'cellSize', type: 'number', default: 10, min: 1 },
      { name: 'strutDiameter', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'lattice', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Lattice',
    name: 'KelvinLattice',
    description: 'Kelvin foam structure',
    operation: 'KELVIN_LATTICE',
    occtBinding: 'kelvinLattice',
    parameters: [
      { name: 'cellSize', type: 'number', default: 10, min: 1 },
      { name: 'wallThickness', type: 'number', default: 0.5, min: 0.1 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'foam', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Lattice',
    name: 'TPMSLattice',
    description: 'TPMS lattice structures',
    operation: 'TPMS_LATTICE',
    occtBinding: 'tpmsLattice',
    parameters: [
      { name: 'type', type: 'enum', options: ['gyroid', 'schwarz-p', 'schwarz-d', 'neovius'], default: 'gyroid' },
      { name: 'period', type: 'number', default: 10, min: 1 },
      { name: 'thickness', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'bounds', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'lattice', type: 'Shape' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Tiling',
    name: 'BrickPattern',
    description: 'Brick laying pattern',
    operation: 'BRICK_PATTERN',
    occtBinding: 'brickPattern',
    parameters: [
      { name: 'bond', type: 'enum', options: ['running', 'stack', 'english', 'flemish', 'herringbone'], default: 'running' },
      { name: 'brickLength', type: 'number', default: 20, min: 1 },
      { name: 'brickWidth', type: 'number', default: 10, min: 1 },
      { name: 'mortarGap', type: 'number', default: 1, min: 0 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'bricks', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Tiling',
    name: 'ParquetPattern',
    description: 'Wood parquet patterns',
    operation: 'PARQUET_PATTERN',
    occtBinding: 'parquetPattern',
    parameters: [
      { name: 'pattern', type: 'enum', options: ['herringbone', 'chevron', 'basket', 'versailles', 'chantilly'], default: 'herringbone' },
      { name: 'plankLength', type: 'number', default: 30, min: 1 },
      { name: 'plankWidth', type: 'number', default: 5, min: 1 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'planks', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Tiling',
    name: 'WeavePattern',
    description: 'Weaving patterns',
    operation: 'WEAVE_PATTERN',
    occtBinding: 'weavePattern',
    parameters: [
      { name: 'weaveType', type: 'enum', options: ['plain', 'twill', 'satin', 'basket'], default: 'plain' },
      { name: 'warpCount', type: 'number', default: 10, min: 2, max: 50, step: 1 },
      { name: 'weftCount', type: 'number', default: 10, min: 2, max: 50, step: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'weave', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Cellular',
    name: 'HoneycombPattern',
    description: 'Honeycomb hexagonal pattern',
    operation: 'HONEYCOMB_PATTERN',
    occtBinding: 'honeycombPattern',
    parameters: [
      { name: 'cellSize', type: 'number', default: 10, min: 1 },
      { name: 'wallThickness', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'honeycomb', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Cellular',
    name: 'FoamStructure',
    description: 'Foam bubble structure',
    operation: 'FOAM_STRUCTURE',
    occtBinding: 'foamStructure',
    parameters: [
      { name: 'bubbleCount', type: 'number', default: 50, min: 5, max: 500, step: 5 },
      { name: 'sizeVariation', type: 'number', default: 0.5, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'container', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'foam', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Cellular',
    name: 'CellularAutomata',
    description: 'Cellular automaton pattern',
    operation: 'CELLULAR_AUTOMATA',
    occtBinding: 'cellularAutomata',
    parameters: [
      { name: 'rule', type: 'number', default: 30, min: 0, max: 255 },
      { name: 'generations', type: 'number', default: 50, min: 1, max: 200, step: 1 },
      { name: 'cellSize', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'initialState', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'cells', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Cellular',
    name: 'ConwayLife',
    description: 'Conway Game of Life',
    operation: 'CONWAY_LIFE',
    occtBinding: 'conwayLife',
    parameters: [
      { name: 'generations', type: 'number', default: 10, min: 1, max: 100, step: 1 },
      { name: 'cellSize', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'initialCells', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'liveCells', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Stochastic',
    name: 'PoissonDisk',
    description: 'Poisson disk sampling',
    operation: 'POISSON_DISK',
    occtBinding: 'poissonDisk',
    parameters: [
      { name: 'radius', type: 'number', default: 5, min: 0.1 },
      { name: 'k', type: 'number', default: 30, min: 3, max: 100 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'points', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Stochastic',
    name: 'BlueNoise',
    description: 'Blue noise distribution',
    operation: 'BLUE_NOISE',
    occtBinding: 'blueNoise',
    parameters: [
      { name: 'count', type: 'number', default: 100, min: 10, max: 10000, step: 10 },
      { name: 'minDistance', type: 'number', default: 1, min: 0.1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'points', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Stochastic',
    name: 'JitteredGrid',
    description: 'Jittered grid sampling',
    operation: 'JITTERED_GRID',
    occtBinding: 'jitteredGrid',
    parameters: [
      { name: 'gridSize', type: 'number', default: 10, min: 2, max: 100, step: 1 },
      { name: 'jitter', type: 'number', default: 0.5, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'points', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Network',
    name: 'MinimumSpanningTree',
    description: 'MST network pattern',
    operation: 'MINIMUM_SPANNING_TREE',
    occtBinding: 'minimumSpanningTree',
    parameters: [],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'tree', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Network',
    name: 'RelativeNeighborhood',
    description: 'RNG network pattern',
    operation: 'RELATIVE_NEIGHBORHOOD',
    occtBinding: 'relativeNeighborhood',
    parameters: [],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'network', type: 'Wire[]' }
    ]
  }
];

/**
 * Algorithmic and procedural patterns (20 nodes)
 */
export const algorithmicPatternTemplates: NodeTemplate[] = [
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'BinaryTree',
    description: 'Binary tree structure',
    operation: 'BINARY_TREE',
    occtBinding: 'binaryTree',
    parameters: [
      { name: 'depth', type: 'number', default: 5, min: 1, max: 10, step: 1 },
      { name: 'branchAngle', type: 'number', default: 30, min: 0, max: 90 },
      { name: 'lengthRatio', type: 'number', default: 0.7, min: 0.3, max: 0.9 }
    ],
    inputs: [
      { name: 'root', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'tree', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'MazeGenerator',
    description: 'Maze generation algorithms',
    operation: 'MAZE_GENERATOR',
    occtBinding: 'mazeGenerator',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['recursive-backtracker', 'prims', 'kruskals', 'wilsons'], default: 'recursive-backtracker' },
      { name: 'width', type: 'number', default: 20, min: 5, max: 100, step: 1 },
      { name: 'height', type: 'number', default: 20, min: 5, max: 100, step: 1 }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true }
    ],
    outputs: [
      { name: 'walls', type: 'Wire[]' },
      { name: 'path', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'SubdivisionSurface',
    description: 'Subdivision surface algorithms',
    operation: 'SUBDIVISION_SURFACE',
    occtBinding: 'subdivisionSurface',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['catmull-clark', 'loop', 'doo-sabin', 'butterfly'], default: 'catmull-clark' },
      { name: 'iterations', type: 'number', default: 2, min: 1, max: 5, step: 1 }
    ],
    inputs: [
      { name: 'mesh', type: 'Mesh', required: true }
    ],
    outputs: [
      { name: 'subdivided', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'FlockingPattern',
    description: 'Flocking behavior simulation',
    operation: 'FLOCKING_PATTERN',
    occtBinding: 'flockingPattern',
    parameters: [
      { name: 'agents', type: 'number', default: 50, min: 10, max: 200, step: 5 },
      { name: 'steps', type: 'number', default: 100, min: 10, max: 1000, step: 10 },
      { name: 'cohesion', type: 'number', default: 1, min: 0, max: 2 },
      { name: 'separation', type: 'number', default: 1, min: 0, max: 2 },
      { name: 'alignment', type: 'number', default: 1, min: 0, max: 2 }
    ],
    inputs: [
      { name: 'boundary', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'trails', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'DiffusionLimitedAggregation',
    description: 'DLA growth pattern',
    operation: 'DLA_PATTERN',
    occtBinding: 'dlaPattern',
    parameters: [
      { name: 'particles', type: 'number', default: 1000, min: 100, max: 10000, step: 100 },
      { name: 'stickiness', type: 'number', default: 1, min: 0.1, max: 1 }
    ],
    inputs: [
      { name: 'seed', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'aggregate', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'GrammarShapes',
    description: 'Shape grammar generation',
    operation: 'GRAMMAR_SHAPES',
    occtBinding: 'grammarShapes',
    parameters: [
      { name: 'grammar', type: 'string', default: 'A->AB,B->A' },
      { name: 'iterations', type: 'number', default: 5, min: 1, max: 10, step: 1 },
      { name: 'seed', type: 'string', default: 'A' }
    ],
    inputs: [
      { name: 'shapeA', type: 'Shape', required: true },
      { name: 'shapeB', type: 'Shape', required: false }
    ],
    outputs: [
      { name: 'result', type: 'Shape[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'WaveFunctionCollapse',
    description: 'WFC pattern generation',
    operation: 'WAVE_FUNCTION_COLLAPSE',
    occtBinding: 'waveFunctionCollapse',
    parameters: [
      { name: 'tilesetSize', type: 'number', default: 5, min: 2, max: 20, step: 1 },
      { name: 'gridWidth', type: 'number', default: 20, min: 5, max: 100, step: 1 },
      { name: 'gridHeight', type: 'number', default: 20, min: 5, max: 100, step: 1 }
    ],
    inputs: [
      { name: 'tileset', type: 'Face[]', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Face[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'MarkovChain',
    description: 'Markov chain pattern',
    operation: 'MARKOV_CHAIN',
    occtBinding: 'markovChain',
    parameters: [
      { name: 'states', type: 'number', default: 5, min: 2, max: 10, step: 1 },
      { name: 'steps', type: 'number', default: 100, min: 10, max: 1000, step: 10 },
      { name: 'seed', type: 'number', default: 0, min: 0, max: 999999 }
    ],
    inputs: [
      { name: 'transitionMatrix', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'sequence', type: 'Number[]' },
      { name: 'pattern', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'GeneticAlgorithm',
    description: 'GA-based pattern optimization',
    operation: 'GENETIC_ALGORITHM',
    occtBinding: 'geneticAlgorithm',
    parameters: [
      { name: 'population', type: 'number', default: 50, min: 10, max: 200, step: 5 },
      { name: 'generations', type: 'number', default: 100, min: 10, max: 1000, step: 10 },
      { name: 'mutationRate', type: 'number', default: 0.1, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'fitness', type: 'Data', required: true },
      { name: 'constraints', type: 'Data', required: false }
    ],
    outputs: [
      { name: 'best', type: 'Shape' },
      { name: 'population', type: 'Shape[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'NeuralPattern',
    description: 'Neural network pattern',
    operation: 'NEURAL_PATTERN',
    occtBinding: 'neuralPattern',
    parameters: [
      { name: 'neurons', type: 'number', default: 100, min: 10, max: 1000, step: 10 },
      { name: 'connections', type: 'number', default: 3, min: 1, max: 10, step: 1 }
    ],
    inputs: [
      { name: 'inputPoints', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'network', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'StrangeAttractor',
    description: 'Strange attractor patterns',
    operation: 'STRANGE_ATTRACTOR',
    occtBinding: 'strangeAttractor',
    parameters: [
      { name: 'type', type: 'enum', options: ['lorenz', 'rossler', 'henon', 'duffing'], default: 'lorenz' },
      { name: 'iterations', type: 'number', default: 10000, min: 100, max: 100000, step: 100 },
      { name: 'dt', type: 'number', default: 0.01, min: 0.001, max: 0.1 }
    ],
    inputs: [
      { name: 'initial', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'attractor', type: 'Point[]' },
      { name: 'trajectory', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'PhyllotaxisPattern',
    description: 'Phyllotaxis spiral pattern',
    operation: 'PHYLLOTAXIS_PATTERN',
    occtBinding: 'phyllotaxisPattern',
    parameters: [
      { name: 'count', type: 'number', default: 100, min: 10, max: 1000, step: 10 },
      { name: 'angle', type: 'number', default: 137.5, min: 0, max: 360 },
      { name: 'c', type: 'number', default: 1, min: 0.1, max: 10 }
    ],
    inputs: [
      { name: 'center', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'points', type: 'Point[]' },
      { name: 'spiral', type: 'Wire' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'TuringPattern',
    description: 'Turing reaction-diffusion',
    operation: 'TURING_PATTERN',
    occtBinding: 'turingPattern',
    parameters: [
      { name: 'model', type: 'enum', options: ['gray-scott', 'gierer-meinhardt', 'brusselator'], default: 'gray-scott' },
      { name: 'iterations', type: 'number', default: 1000, min: 100, max: 10000, step: 100 },
      { name: 'resolution', type: 'number', default: 100, min: 50, max: 500, step: 10 }
    ],
    inputs: [
      { name: 'domain', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'pattern', type: 'Mesh' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'NoisePattern',
    description: 'Procedural noise patterns',
    operation: 'NOISE_PATTERN',
    occtBinding: 'noisePattern',
    parameters: [
      { name: 'noiseType', type: 'enum', options: ['perlin', 'simplex', 'worley', 'value', 'white'], default: 'perlin' },
      { name: 'octaves', type: 'number', default: 4, min: 1, max: 8, step: 1 },
      { name: 'frequency', type: 'number', default: 1, min: 0.1, max: 10 },
      { name: 'amplitude', type: 'number', default: 1, min: 0.1, max: 10 }
    ],
    inputs: [
      { name: 'domain', type: 'Box', required: true }
    ],
    outputs: [
      { name: 'noiseField', type: 'Data' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'PackingCircles',
    description: 'Circle packing algorithms',
    operation: 'PACKING_CIRCLES',
    occtBinding: 'packingCircles',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['power-diagram', 'front-chain', 'apollonian'], default: 'power-diagram' }
    ],
    inputs: [
      { name: 'boundary', type: 'Wire', required: true },
      { name: 'radii', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'circles', type: 'Wire[]' },
      { name: 'centers', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'KMeansClustering',
    description: 'K-means point clustering',
    operation: 'KMEANS_CLUSTERING',
    occtBinding: 'kmeansClustering',
    parameters: [
      { name: 'k', type: 'number', default: 5, min: 2, max: 20, step: 1 },
      { name: 'iterations', type: 'number', default: 100, min: 10, max: 1000, step: 10 }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'clusters', type: 'Point[][]' },
      { name: 'centroids', type: 'Point[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'ContextFreeArt',
    description: 'Context-free art generation',
    operation: 'CONTEXT_FREE_ART',
    occtBinding: 'contextFreeArt',
    parameters: [
      { name: 'rules', type: 'string', default: 'CIRCLE{},SQUARE{r 45}' },
      { name: 'depth', type: 'number', default: 10, min: 1, max: 20, step: 1 }
    ],
    inputs: [
      { name: 'canvas', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'art', type: 'Shape[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Procedural',
    name: 'ProceduralTexture',
    description: 'Procedural texture generation',
    operation: 'PROCEDURAL_TEXTURE',
    occtBinding: 'proceduralTexture',
    parameters: [
      { name: 'type', type: 'enum', options: ['wood', 'marble', 'clouds', 'rust', 'concrete'], default: 'wood' },
      { name: 'scale', type: 'number', default: 10, min: 1, max: 100 },
      { name: 'seed', type: 'number', default: 0, min: 0, max: 999999 }
    ],
    inputs: [
      { name: 'surface', type: 'Face', required: true }
    ],
    outputs: [
      { name: 'texture', type: 'Data' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'GraphLayout',
    description: 'Graph layout algorithms',
    operation: 'GRAPH_LAYOUT',
    occtBinding: 'graphLayout',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['force-directed', 'circular', 'hierarchical', 'spectral'], default: 'force-directed' },
      { name: 'iterations', type: 'number', default: 100, min: 10, max: 1000, step: 10 }
    ],
    inputs: [
      { name: 'nodes', type: 'Point[]', required: true },
      { name: 'edges', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'layout', type: 'Point[]' },
      { name: 'graph', type: 'Wire[]' }
    ]
  },
  {
    category: 'Patterns',
    subcategory: 'Algorithmic',
    name: 'ShortestPath',
    description: 'Shortest path algorithms',
    operation: 'SHORTEST_PATH',
    occtBinding: 'shortestPath',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['dijkstra', 'a-star', 'bellman-ford'], default: 'dijkstra' }
    ],
    inputs: [
      { name: 'graph', type: 'Wire[]', required: true },
      { name: 'start', type: 'Point', required: true },
      { name: 'end', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'path', type: 'Wire' },
      { name: 'distance', type: 'Number' }
    ]
  }
];

// Export all pattern generation templates
export const allPatternGenerationTemplates = [
  ...voronoiDelaunayTemplates,
  ...islamicGeometricTemplates,
  ...fractalLSystemTemplates,
  ...spaceFillingTemplates,
  ...algorithmicPatternTemplates
];