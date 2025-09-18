// Additional Algorithmic Nodes - 50 nodes for advanced computational design
import { NodeTemplate } from '../types';

export const additionalAlgorithmicNodes: NodeTemplate[] = [
  // ============================================================
  // OPTIMIZATION ALGORITHMS - 15 nodes
  // ============================================================
  {
    category: 'Algorithmic',
    subcategory: 'Optimization',
    name: 'GeneticOptimizer',
    description: 'Genetic algorithm optimization',
    operation: 'GENETIC_OPTIMIZER',
    occtBinding: 'geneticOptimizer',
    parameters: [
      { name: 'populationSize', type: 'number', default: 100, min: 10, max: 1000 },
      { name: 'generations', type: 'number', default: 50, min: 5, max: 500 },
      { name: 'mutationRate', type: 'number', default: 0.1, min: 0.01, max: 0.5 },
      { name: 'crossoverRate', type: 'number', default: 0.8, min: 0.1, max: 1.0 },
      { name: 'elitism', type: 'number', default: 0.1, min: 0, max: 0.5 }
    ],
    inputs: [
      { name: 'objectives', type: 'Properties', required: true },
      { name: 'constraints', type: 'Properties', required: false },
      { name: 'bounds', type: 'Properties', required: true }
    ],
    outputs: [
      { name: 'bestSolution', type: 'Properties' },
      { name: 'fitness', type: 'number' },
      { name: 'generations', type: 'Properties[]' },
      { name: 'convergence', type: 'number[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Optimization',
    name: 'ParticleSwarmOptimizer',
    description: 'Particle swarm optimization',
    operation: 'PARTICLE_SWARM_OPTIMIZER',
    occtBinding: 'particleSwarmOptimizer',
    parameters: [
      { name: 'swarmSize', type: 'number', default: 50, min: 10, max: 500 },
      { name: 'iterations', type: 'number', default: 100, min: 10, max: 1000 },
      { name: 'inertia', type: 'number', default: 0.7, min: 0.1, max: 1.0 },
      { name: 'cognitive', type: 'number', default: 2.0, min: 0.1, max: 4.0 },
      { name: 'social', type: 'number', default: 2.0, min: 0.1, max: 4.0 }
    ],
    inputs: [
      { name: 'objective', type: 'Properties', required: true },
      { name: 'bounds', type: 'Properties', required: true }
    ],
    outputs: [
      { name: 'globalBest', type: 'Properties' },
      { name: 'bestValue', type: 'number' },
      { name: 'swarmHistory', type: 'Properties[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Optimization',
    name: 'SimulatedAnnealing',
    description: 'Simulated annealing optimization',
    operation: 'SIMULATED_ANNEALING',
    occtBinding: 'simulatedAnnealing',
    parameters: [
      { name: 'initialTemp', type: 'number', default: 1000, min: 1, max: 10000 },
      { name: 'finalTemp', type: 'number', default: 0.1, min: 0.001, max: 10 },
      { name: 'coolingRate', type: 'number', default: 0.95, min: 0.8, max: 0.99 },
      { name: 'maxIterations', type: 'number', default: 1000, min: 100, max: 10000 }
    ],
    inputs: [
      { name: 'objective', type: 'Properties', required: true },
      { name: 'initialSolution', type: 'Properties', required: true }
    ],
    outputs: [
      { name: 'bestSolution', type: 'Properties' },
      { name: 'bestValue', type: 'number' },
      { name: 'temperature', type: 'number[]' },
      { name: 'values', type: 'number[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Optimization',
    name: 'GradientDescent',
    description: 'Gradient descent optimization',
    operation: 'GRADIENT_DESCENT',
    occtBinding: 'gradientDescent',
    parameters: [
      { name: 'learningRate', type: 'number', default: 0.01, min: 0.001, max: 1.0 },
      { name: 'maxIterations', type: 'number', default: 1000, min: 10, max: 10000 },
      { name: 'tolerance', type: 'number', default: 0.001, min: 1e-6, max: 0.1 },
      { name: 'momentum', type: 'number', default: 0.9, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'objective', type: 'Properties', required: true },
      { name: 'initialPoint', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'optimumPoint', type: 'Point' },
      { name: 'optimumValue', type: 'number' },
      { name: 'trajectory', type: 'Point[]' },
      { name: 'convergence', type: 'number[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Optimization',
    name: 'TopologyOptimizer',
    description: 'Topology optimization for structures',
    operation: 'TOPOLOGY_OPTIMIZER',
    occtBinding: 'topologyOptimizer',
    parameters: [
      { name: 'densityElements', type: 'number', default: 100, min: 10, max: 1000 },
      { name: 'volumeFraction', type: 'number', default: 0.5, min: 0.1, max: 0.9 },
      { name: 'penalization', type: 'number', default: 3.0, min: 1.0, max: 5.0 },
      { name: 'filter', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'designDomain', type: 'Shape', required: true },
      { name: 'loads', type: 'Properties[]', required: true },
      { name: 'supports', type: 'Properties[]', required: true }
    ],
    outputs: [
      { name: 'optimizedShape', type: 'Shape' },
      { name: 'densityField', type: 'Properties' },
      { name: 'compliance', type: 'number' }
    ]
  },

  // ============================================================
  // MACHINE LEARNING ALGORITHMS - 15 nodes
  // ============================================================
  {
    category: 'Algorithmic',
    subcategory: 'MachineLearning',
    name: 'LinearRegression',
    description: 'Linear regression analysis',
    operation: 'LINEAR_REGRESSION',
    occtBinding: 'linearRegression',
    parameters: [
      { name: 'regularization', type: 'enum', options: ['none', 'ridge', 'lasso'], default: 'none' },
      { name: 'alpha', type: 'number', default: 1.0, min: 0.001, max: 100 },
      { name: 'normalize', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'trainingData', type: 'Properties[]', required: true },
      { name: 'features', type: 'string[]', required: true },
      { name: 'target', type: 'string', required: true }
    ],
    outputs: [
      { name: 'model', type: 'Properties' },
      { name: 'coefficients', type: 'number[]' },
      { name: 'rSquared', type: 'number' },
      { name: 'predictions', type: 'number[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'MachineLearning',
    name: 'KMeansClustering',
    description: 'K-means clustering algorithm',
    operation: 'KMEANS_CLUSTERING',
    occtBinding: 'kmeansClustering',
    parameters: [
      { name: 'clusters', type: 'number', default: 3, min: 2, max: 20 },
      { name: 'maxIterations', type: 'number', default: 100, min: 10, max: 1000 },
      { name: 'tolerance', type: 'number', default: 0.001, min: 1e-6, max: 0.1 },
      { name: 'randomSeed', type: 'number', default: 42, min: 0, max: 1000 }
    ],
    inputs: [
      { name: 'data', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'centroids', type: 'Point[]' },
      { name: 'labels', type: 'number[]' },
      { name: 'clusters', type: 'Point[][]' },
      { name: 'inertia', type: 'number' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'MachineLearning',
    name: 'DecisionTree',
    description: 'Decision tree classifier',
    operation: 'DECISION_TREE',
    occtBinding: 'decisionTree',
    parameters: [
      { name: 'maxDepth', type: 'number', default: 5, min: 1, max: 20 },
      { name: 'minSamplesSplit', type: 'number', default: 2, min: 2, max: 50 },
      { name: 'criterion', type: 'enum', options: ['gini', 'entropy'], default: 'gini' }
    ],
    inputs: [
      { name: 'trainingData', type: 'Properties[]', required: true },
      { name: 'features', type: 'string[]', required: true },
      { name: 'target', type: 'string', required: true }
    ],
    outputs: [
      { name: 'tree', type: 'Properties' },
      { name: 'accuracy', type: 'number' },
      { name: 'featureImportance', type: 'Properties' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'MachineLearning',
    name: 'NeuralNetwork',
    description: 'Multi-layer perceptron neural network',
    operation: 'NEURAL_NETWORK',
    occtBinding: 'neuralNetwork',
    parameters: [
      { name: 'hiddenLayers', type: 'string', default: '10,5', description: 'Comma-separated layer sizes' },
      { name: 'activation', type: 'enum', options: ['relu', 'sigmoid', 'tanh'], default: 'relu' },
      { name: 'learningRate', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'epochs', type: 'number', default: 100, min: 10, max: 1000 }
    ],
    inputs: [
      { name: 'trainingData', type: 'Properties[]', required: true },
      { name: 'features', type: 'string[]', required: true },
      { name: 'target', type: 'string', required: true }
    ],
    outputs: [
      { name: 'model', type: 'Properties' },
      { name: 'loss', type: 'number[]' },
      { name: 'accuracy', type: 'number' },
      { name: 'predictions', type: 'number[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'MachineLearning',
    name: 'SupportVectorMachine',
    description: 'Support Vector Machine classifier',
    operation: 'SUPPORT_VECTOR_MACHINE',
    occtBinding: 'supportVectorMachine',
    parameters: [
      { name: 'kernel', type: 'enum', options: ['linear', 'rbf', 'poly'], default: 'rbf' },
      { name: 'c', type: 'number', default: 1.0, min: 0.001, max: 1000 },
      { name: 'gamma', type: 'enum', options: ['scale', 'auto'], default: 'scale' }
    ],
    inputs: [
      { name: 'trainingData', type: 'Properties[]', required: true },
      { name: 'features', type: 'string[]', required: true },
      { name: 'target', type: 'string', required: true }
    ],
    outputs: [
      { name: 'model', type: 'Properties' },
      { name: 'supportVectors', type: 'Properties[]' },
      { name: 'accuracy', type: 'number' }
    ]
  },

  // ============================================================
  // GEOMETRIC ALGORITHMS - 20 nodes
  // ============================================================
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'ConvexHull3D',
    description: 'Compute 3D convex hull',
    operation: 'CONVEX_HULL_3D',
    occtBinding: 'convexHull3D',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'includeInterior', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'hull', type: 'Shape' },
      { name: 'vertices', type: 'Point[]' },
      { name: 'faces', type: 'Face[]' },
      { name: 'volume', type: 'number' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'AlphaShape',
    description: 'Generate alpha shape from point cloud',
    operation: 'ALPHA_SHAPE',
    occtBinding: 'alphaShape',
    parameters: [
      { name: 'alpha', type: 'number', default: 1.0, min: 0.1, max: 100 },
      { name: 'mode', type: 'enum', options: ['3D', '2D'], default: '3D' }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'shape', type: 'Shape' },
      { name: 'boundary', type: 'Wire[]' },
      { name: 'simplices', type: 'Properties[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'MinimumSpanningTree',
    description: 'Compute minimum spanning tree of points',
    operation: 'MINIMUM_SPANNING_TREE',
    occtBinding: 'minimumSpanningTree',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['kruskal', 'prim'], default: 'kruskal' },
      { name: 'showWeights', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'tree', type: 'Wire[]' },
      { name: 'totalWeight', type: 'number' },
      { name: 'edges', type: 'Properties[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'ShortestPath',
    description: 'Find shortest path between points',
    operation: 'SHORTEST_PATH',
    occtBinding: 'shortestPath',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['dijkstra', 'astar'], default: 'dijkstra' },
      { name: 'heuristic', type: 'enum', options: ['euclidean', 'manhattan'], default: 'euclidean' }
    ],
    inputs: [
      { name: 'graph', type: 'Properties', required: true },
      { name: 'start', type: 'Point', required: true },
      { name: 'end', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'path', type: 'Wire' },
      { name: 'distance', type: 'number' },
      { name: 'nodes', type: 'Point[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'VisibilityGraph',
    description: 'Compute visibility graph for path planning',
    operation: 'VISIBILITY_GRAPH',
    occtBinding: 'visibilityGraph',
    parameters: [
      { name: 'epsilon', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'includeInterior', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'obstacles', type: 'Shape[]', required: true },
      { name: 'start', type: 'Point', required: true },
      { name: 'goal', type: 'Point', required: true }
    ],
    outputs: [
      { name: 'graph', type: 'Wire[]' },
      { name: 'vertices', type: 'Point[]' },
      { name: 'edges', type: 'Properties[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'MedialAxis',
    description: 'Compute medial axis/skeleton',
    operation: 'MEDIAL_AXIS',
    occtBinding: 'medialAxis',
    parameters: [
      { name: 'resolution', type: 'number', default: 0.1, min: 0.01, max: 1 },
      { name: 'pruning', type: 'number', default: 0.1, min: 0, max: 1 },
      { name: 'simplify', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'shape', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'skeleton', type: 'Wire[]' },
      { name: 'branchPoints', type: 'Point[]' },
      { name: 'endpoints', type: 'Point[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'DistanceField',
    description: 'Compute signed distance field',
    operation: 'DISTANCE_FIELD',
    occtBinding: 'distanceField',
    parameters: [
      { name: 'resolution', type: 'number', default: 50, min: 10, max: 200 },
      { name: 'bounds', type: 'Vector', default: '100,100,100', description: 'Bounding box size' },
      { name: 'signed', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'field', type: 'Properties' },
      { name: 'isosurface', type: 'Shape' },
      { name: 'gradient', type: 'Vector[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'MarchingCubes',
    description: 'Extract isosurface using marching cubes',
    operation: 'MARCHING_CUBES',
    occtBinding: 'marchingCubes',
    parameters: [
      { name: 'isovalue', type: 'number', default: 0.0, min: -100, max: 100 },
      { name: 'resolution', type: 'number', default: 32, min: 8, max: 128 },
      { name: 'smooth', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'scalarField', type: 'Properties', required: true }
    ],
    outputs: [
      { name: 'mesh', type: 'Shape' },
      { name: 'vertices', type: 'Point[]' },
      { name: 'normals', type: 'Vector[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'SpacePartitioning',
    description: 'Spatial data structure for fast queries',
    operation: 'SPACE_PARTITIONING',
    occtBinding: 'spacePartitioning',
    parameters: [
      { name: 'type', type: 'enum', options: ['octree', 'kdtree', 'bvh'], default: 'octree' },
      { name: 'maxDepth', type: 'number', default: 8, min: 3, max: 15 },
      { name: 'leafSize', type: 'number', default: 10, min: 1, max: 100 }
    ],
    inputs: [
      { name: 'objects', type: 'Shape[]', required: true }
    ],
    outputs: [
      { name: 'structure', type: 'Properties' },
      { name: 'stats', type: 'Properties' },
      { name: 'visualization', type: 'Wire[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'VoxelGrid',
    description: 'Convert geometry to voxel representation',
    operation: 'VOXEL_GRID',
    occtBinding: 'voxelGrid',
    parameters: [
      { name: 'voxelSize', type: 'number', default: 1.0, min: 0.1, max: 10 },
      { name: 'fillInterior', type: 'boolean', default: true },
      { name: 'optimize', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'voxels', type: 'Shape[]' },
      { name: 'grid', type: 'Properties' },
      { name: 'bounds', type: 'Properties' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'PointCloudProcessing',
    description: 'Process and filter point clouds',
    operation: 'POINT_CLOUD_PROCESSING',
    occtBinding: 'pointCloudProcessing',
    parameters: [
      { name: 'operation', type: 'enum', options: ['filter', 'downsample', 'normal', 'cluster'], default: 'filter' },
      { name: 'radius', type: 'number', default: 1.0, min: 0.1, max: 10 },
      { name: 'neighbors', type: 'number', default: 6, min: 3, max: 50 }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true }
    ],
    outputs: [
      { name: 'processed', type: 'Point[]' },
      { name: 'normals', type: 'Vector[]' },
      { name: 'indices', type: 'number[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'SurfaceReconstruction',
    description: 'Reconstruct surface from point cloud',
    operation: 'SURFACE_RECONSTRUCTION',
    occtBinding: 'surfaceReconstruction',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['poisson', 'delaunay', 'rbf'], default: 'poisson' },
      { name: 'depth', type: 'number', default: 8, min: 4, max: 12 },
      { name: 'samples', type: 'number', default: 1.0, min: 0.1, max: 10 }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'normals', type: 'Vector[]', required: false }
    ],
    outputs: [
      { name: 'surface', type: 'Shape' },
      { name: 'mesh', type: 'Shape' },
      { name: 'quality', type: 'number' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'GeometrySimplification',
    description: 'Simplify complex geometry',
    operation: 'GEOMETRY_SIMPLIFICATION',
    occtBinding: 'geometrySimplification',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['decimate', 'quadric', 'vertex'], default: 'quadric' },
      { name: 'reduction', type: 'number', default: 0.5, min: 0.1, max: 0.9 },
      { name: 'preserveBoundary', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'geometry', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'simplified', type: 'Shape' },
      { name: 'reductionRatio', type: 'number' },
      { name: 'error', type: 'number' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'GeometryMatching',
    description: 'Match and align geometries',
    operation: 'GEOMETRY_MATCHING',
    occtBinding: 'geometryMatching',
    parameters: [
      { name: 'algorithm', type: 'enum', options: ['icp', 'feature', 'global'], default: 'icp' },
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'iterations', type: 'number', default: 50, min: 10, max: 500 }
    ],
    inputs: [
      { name: 'source', type: 'Shape', required: true },
      { name: 'target', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'transform', type: 'Properties' },
      { name: 'aligned', type: 'Shape' },
      { name: 'error', type: 'number' },
      { name: 'correspondences', type: 'Properties[]' }
    ]
  },
  {
    category: 'Algorithmic',
    subcategory: 'Geometry',
    name: 'ShapeDescriptor',
    description: 'Compute geometric shape descriptors',
    operation: 'SHAPE_DESCRIPTOR',
    occtBinding: 'shapeDescriptor',
    parameters: [
      { name: 'descriptor', type: 'enum', options: ['moments', 'fourier', 'histogram'], default: 'moments' },
      { name: 'resolution', type: 'number', default: 32, min: 8, max: 128 },
      { name: 'normalize', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'shape', type: 'Shape', required: true }
    ],
    outputs: [
      { name: 'descriptor', type: 'number[]' },
      { name: 'features', type: 'Properties' },
      { name: 'similarity', type: 'number' }
    ]
  }
];