/**
 * Mathematical Operations Templates
 * Core mathematical functions essential for parametric design
 */

import { NodeTemplate } from '../node-template';

/**
 * Basic Math Operations
 */
export const basicMathTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Add',
    description: 'Add two numbers',
    operation: 'MATH_ADD',
    occtBinding: 'mathAdd',
    parameters: [],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Subtract',
    description: 'Subtract numbers',
    operation: 'MATH_SUBTRACT',
    occtBinding: 'mathSubtract',
    parameters: [],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Multiply',
    description: 'Multiply numbers',
    operation: 'MATH_MULTIPLY',
    occtBinding: 'mathMultiply',
    parameters: [],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Divide',
    description: 'Divide numbers',
    operation: 'MATH_DIVIDE',
    occtBinding: 'mathDivide',
    parameters: [],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Power',
    description: 'Raise to power',
    operation: 'MATH_POWER',
    occtBinding: 'mathPower',
    parameters: [],
    inputs: [
      { name: 'base', type: 'number', required: true },
      { name: 'exponent', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Modulo',
    description: 'Modulo operation',
    operation: 'MATH_MODULO',
    occtBinding: 'mathModulo',
    parameters: [],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Absolute',
    description: 'Absolute value',
    operation: 'MATH_ABS',
    occtBinding: 'mathAbs',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Negate',
    description: 'Negate value',
    operation: 'MATH_NEGATE',
    occtBinding: 'mathNegate',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'SquareRoot',
    description: 'Square root',
    operation: 'MATH_SQRT',
    occtBinding: 'mathSqrt',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Operators',
    name: 'Factorial',
    description: 'Factorial',
    operation: 'MATH_FACTORIAL',
    occtBinding: 'mathFactorial',
    parameters: [],
    inputs: [
      { name: 'n', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  }
];

/**
 * Trigonometric Functions
 */
export const trigonometricTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'Sine',
    description: 'Sine function',
    operation: 'MATH_SIN',
    occtBinding: 'mathSin',
    parameters: [
      { name: 'angleUnit', type: 'enum', options: ['radians', 'degrees'], default: 'radians' }
    ],
    inputs: [
      { name: 'angle', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'Cosine',
    description: 'Cosine function',
    operation: 'MATH_COS',
    occtBinding: 'mathCos',
    parameters: [
      { name: 'angleUnit', type: 'enum', options: ['radians', 'degrees'], default: 'radians' }
    ],
    inputs: [
      { name: 'angle', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'Tangent',
    description: 'Tangent function',
    operation: 'MATH_TAN',
    occtBinding: 'mathTan',
    parameters: [
      { name: 'angleUnit', type: 'enum', options: ['radians', 'degrees'], default: 'radians' }
    ],
    inputs: [
      { name: 'angle', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'ArcSine',
    description: 'Arc sine function',
    operation: 'MATH_ASIN',
    occtBinding: 'mathAsin',
    parameters: [
      { name: 'angleUnit', type: 'enum', options: ['radians', 'degrees'], default: 'radians' }
    ],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'angle', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'ArcCosine',
    description: 'Arc cosine function',
    operation: 'MATH_ACOS',
    occtBinding: 'mathAcos',
    parameters: [
      { name: 'angleUnit', type: 'enum', options: ['radians', 'degrees'], default: 'radians' }
    ],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'angle', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'ArcTangent',
    description: 'Arc tangent function',
    operation: 'MATH_ATAN',
    occtBinding: 'mathAtan',
    parameters: [
      { name: 'angleUnit', type: 'enum', options: ['radians', 'degrees'], default: 'radians' }
    ],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'angle', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'ArcTangent2',
    description: 'Two-argument arc tangent',
    operation: 'MATH_ATAN2',
    occtBinding: 'mathAtan2',
    parameters: [
      { name: 'angleUnit', type: 'enum', options: ['radians', 'degrees'], default: 'radians' }
    ],
    inputs: [
      { name: 'y', type: 'number', required: true },
      { name: 'x', type: 'number', required: true }
    ],
    outputs: [
      { name: 'angle', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'HyperbolicSine',
    description: 'Hyperbolic sine',
    operation: 'MATH_SINH',
    occtBinding: 'mathSinh',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'HyperbolicCosine',
    description: 'Hyperbolic cosine',
    operation: 'MATH_COSH',
    occtBinding: 'mathCosh',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Trigonometry',
    name: 'HyperbolicTangent',
    description: 'Hyperbolic tangent',
    operation: 'MATH_TANH',
    occtBinding: 'mathTanh',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  }
];

/**
 * Logarithmic and Exponential Functions
 */
export const logarithmicTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Logarithmic',
    name: 'NaturalLog',
    description: 'Natural logarithm',
    operation: 'MATH_LN',
    occtBinding: 'mathLn',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Logarithmic',
    name: 'Log10',
    description: 'Base-10 logarithm',
    operation: 'MATH_LOG10',
    occtBinding: 'mathLog10',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Logarithmic',
    name: 'LogBase',
    description: 'Logarithm with custom base',
    operation: 'MATH_LOGBASE',
    occtBinding: 'mathLogBase',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true },
      { name: 'base', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Logarithmic',
    name: 'Exponential',
    description: 'Exponential function',
    operation: 'MATH_EXP',
    occtBinding: 'mathExp',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Logarithmic',
    name: 'Exp10',
    description: '10 raised to power',
    operation: 'MATH_EXP10',
    occtBinding: 'mathExp10',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  }
];

/**
 * Rounding and Comparison
 */
export const roundingComparisonTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Rounding',
    name: 'Round',
    description: 'Round to nearest integer',
    operation: 'MATH_ROUND',
    occtBinding: 'mathRound',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Rounding',
    name: 'Floor',
    description: 'Round down',
    operation: 'MATH_FLOOR',
    occtBinding: 'mathFloor',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Rounding',
    name: 'Ceiling',
    description: 'Round up',
    operation: 'MATH_CEIL',
    occtBinding: 'mathCeil',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Rounding',
    name: 'Truncate',
    description: 'Remove decimal part',
    operation: 'MATH_TRUNC',
    occtBinding: 'mathTrunc',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Rounding',
    name: 'RoundToDecimal',
    description: 'Round to decimal places',
    operation: 'MATH_ROUND_DECIMAL',
    occtBinding: 'mathRoundDecimal',
    parameters: [
      { name: 'decimals', type: 'number', default: 2, min: 0, max: 10, step: 1 }
    ],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Comparison',
    name: 'Min',
    description: 'Minimum value',
    operation: 'MATH_MIN',
    occtBinding: 'mathMin',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'min', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Comparison',
    name: 'Max',
    description: 'Maximum value',
    operation: 'MATH_MAX',
    occtBinding: 'mathMax',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'max', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Comparison',
    name: 'Clamp',
    description: 'Clamp value between min and max',
    operation: 'MATH_CLAMP',
    occtBinding: 'mathClamp',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true },
      { name: 'min', type: 'number', required: true },
      { name: 'max', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Comparison',
    name: 'Sign',
    description: 'Sign of number',
    operation: 'MATH_SIGN',
    occtBinding: 'mathSign',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 'sign', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Comparison',
    name: 'IsEqual',
    description: 'Check equality with tolerance',
    operation: 'MATH_IS_EQUAL',
    occtBinding: 'mathIsEqual',
    parameters: [
      { name: 'tolerance', type: 'number', default: 0.0001, min: 0, max: 1 }
    ],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true }
    ],
    outputs: [
      { name: 'equal', type: 'boolean' }
    ]
  }
];

/**
 * Statistical Functions
 */
export const statisticalTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Average',
    description: 'Calculate average',
    operation: 'MATH_AVERAGE',
    occtBinding: 'mathAverage',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'average', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Median',
    description: 'Calculate median',
    operation: 'MATH_MEDIAN',
    occtBinding: 'mathMedian',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'median', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Mode',
    description: 'Calculate mode',
    operation: 'MATH_MODE',
    occtBinding: 'mathMode',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'mode', type: 'number[]' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'StandardDeviation',
    description: 'Calculate standard deviation',
    operation: 'MATH_STDDEV',
    occtBinding: 'mathStdDev',
    parameters: [
      { name: 'sample', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'stddev', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Variance',
    description: 'Calculate variance',
    operation: 'MATH_VARIANCE',
    occtBinding: 'mathVariance',
    parameters: [
      { name: 'sample', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'variance', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Sum',
    description: 'Sum of values',
    operation: 'MATH_SUM',
    occtBinding: 'mathSum',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'sum', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Product',
    description: 'Product of values',
    operation: 'MATH_PRODUCT',
    occtBinding: 'mathProduct',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'product', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Range',
    description: 'Range of values',
    operation: 'MATH_RANGE',
    occtBinding: 'mathRange',
    parameters: [],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'min', type: 'number' },
      { name: 'max', type: 'number' },
      { name: 'range', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Percentile',
    description: 'Calculate percentile',
    operation: 'MATH_PERCENTILE',
    occtBinding: 'mathPercentile',
    parameters: [
      { name: 'percentile', type: 'number', default: 50, min: 0, max: 100 }
    ],
    inputs: [
      { name: 'values', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Statistics',
    name: 'Correlation',
    description: 'Correlation coefficient',
    operation: 'MATH_CORRELATION',
    occtBinding: 'mathCorrelation',
    parameters: [],
    inputs: [
      { name: 'x', type: 'number[]', required: true },
      { name: 'y', type: 'number[]', required: true }
    ],
    outputs: [
      { name: 'correlation', type: 'number' }
    ]
  }
];

/**
 * Random Number Generation
 */
export const randomTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'Random',
    description: 'Random number 0-1',
    operation: 'MATH_RANDOM',
    occtBinding: 'mathRandom',
    parameters: [
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [],
    outputs: [
      { name: 'value', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'RandomRange',
    description: 'Random in range',
    operation: 'MATH_RANDOM_RANGE',
    occtBinding: 'mathRandomRange',
    parameters: [
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [
      { name: 'min', type: 'number', required: true },
      { name: 'max', type: 'number', required: true }
    ],
    outputs: [
      { name: 'value', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'RandomInteger',
    description: 'Random integer',
    operation: 'MATH_RANDOM_INT',
    occtBinding: 'mathRandomInt',
    parameters: [
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [
      { name: 'min', type: 'number', required: true },
      { name: 'max', type: 'number', required: true }
    ],
    outputs: [
      { name: 'value', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'RandomNormal',
    description: 'Normal distribution',
    operation: 'MATH_RANDOM_NORMAL',
    occtBinding: 'mathRandomNormal',
    parameters: [
      { name: 'mean', type: 'number', default: 0 },
      { name: 'stddev', type: 'number', default: 1, min: 0.01 },
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [],
    outputs: [
      { name: 'value', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'RandomPoisson',
    description: 'Poisson distribution',
    operation: 'MATH_RANDOM_POISSON',
    occtBinding: 'mathRandomPoisson',
    parameters: [
      { name: 'lambda', type: 'number', default: 1, min: 0.01 },
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [],
    outputs: [
      { name: 'value', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'RandomExponential',
    description: 'Exponential distribution',
    operation: 'MATH_RANDOM_EXPONENTIAL',
    occtBinding: 'mathRandomExponential',
    parameters: [
      { name: 'lambda', type: 'number', default: 1, min: 0.01 },
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [],
    outputs: [
      { name: 'value', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'RandomChoice',
    description: 'Random choice from list',
    operation: 'MATH_RANDOM_CHOICE',
    occtBinding: 'mathRandomChoice',
    parameters: [
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [
      { name: 'choices', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'choice', type: 'Data' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'Shuffle',
    description: 'Shuffle list randomly',
    operation: 'MATH_SHUFFLE',
    occtBinding: 'mathShuffle',
    parameters: [
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [
      { name: 'list', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'shuffled', type: 'Data[]' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'PerlinNoise',
    description: 'Perlin noise',
    operation: 'MATH_PERLIN_NOISE',
    occtBinding: 'mathPerlinNoise',
    parameters: [
      { name: 'octaves', type: 'number', default: 4, min: 1, max: 8, step: 1 },
      { name: 'persistence', type: 'number', default: 0.5, min: 0, max: 1 },
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [
      { name: 'x', type: 'number', required: true },
      { name: 'y', type: 'number', required: false },
      { name: 'z', type: 'number', required: false }
    ],
    outputs: [
      { name: 'noise', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Random',
    name: 'SimplexNoise',
    description: 'Simplex noise',
    operation: 'MATH_SIMPLEX_NOISE',
    occtBinding: 'mathSimplexNoise',
    parameters: [
      { name: 'scale', type: 'number', default: 1, min: 0.01 },
      { name: 'seed', type: 'number', default: -1, min: -1, max: 999999 }
    ],
    inputs: [
      { name: 'x', type: 'number', required: true },
      { name: 'y', type: 'number', required: false },
      { name: 'z', type: 'number', required: false }
    ],
    outputs: [
      { name: 'noise', type: 'number' }
    ]
  }
];

/**
 * Interpolation and Mapping
 */
export const interpolationTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'Lerp',
    description: 'Linear interpolation',
    operation: 'MATH_LERP',
    occtBinding: 'mathLerp',
    parameters: [],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true },
      { name: 't', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'InverseLerp',
    description: 'Inverse linear interpolation',
    operation: 'MATH_INVERSE_LERP',
    occtBinding: 'mathInverseLerp',
    parameters: [],
    inputs: [
      { name: 'a', type: 'number', required: true },
      { name: 'b', type: 'number', required: true },
      { name: 'value', type: 'number', required: true }
    ],
    outputs: [
      { name: 't', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'Remap',
    description: 'Remap value to new range',
    operation: 'MATH_REMAP',
    occtBinding: 'mathRemap',
    parameters: [],
    inputs: [
      { name: 'value', type: 'number', required: true },
      { name: 'fromMin', type: 'number', required: true },
      { name: 'fromMax', type: 'number', required: true },
      { name: 'toMin', type: 'number', required: true },
      { name: 'toMax', type: 'number', required: true }
    ],
    outputs: [
      { name: 'remapped', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'SmoothStep',
    description: 'Smooth step interpolation',
    operation: 'MATH_SMOOTHSTEP',
    occtBinding: 'mathSmoothStep',
    parameters: [],
    inputs: [
      { name: 'edge0', type: 'number', required: true },
      { name: 'edge1', type: 'number', required: true },
      { name: 'x', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'SmootherStep',
    description: 'Smoother step interpolation',
    operation: 'MATH_SMOOTHERSTEP',
    occtBinding: 'mathSmootherStep',
    parameters: [],
    inputs: [
      { name: 'edge0', type: 'number', required: true },
      { name: 'edge1', type: 'number', required: true },
      { name: 'x', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'CubicInterp',
    description: 'Cubic interpolation',
    operation: 'MATH_CUBIC_INTERP',
    occtBinding: 'mathCubicInterp',
    parameters: [],
    inputs: [
      { name: 'v0', type: 'number', required: true },
      { name: 'v1', type: 'number', required: true },
      { name: 'v2', type: 'number', required: true },
      { name: 'v3', type: 'number', required: true },
      { name: 't', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'HermiteInterp',
    description: 'Hermite interpolation',
    operation: 'MATH_HERMITE_INTERP',
    occtBinding: 'mathHermiteInterp',
    parameters: [],
    inputs: [
      { name: 'p0', type: 'number', required: true },
      { name: 'p1', type: 'number', required: true },
      { name: 'm0', type: 'number', required: true },
      { name: 'm1', type: 'number', required: true },
      { name: 't', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'BezierInterp',
    description: 'Bezier interpolation',
    operation: 'MATH_BEZIER_INTERP',
    occtBinding: 'mathBezierInterp',
    parameters: [],
    inputs: [
      { name: 'points', type: 'number[]', required: true },
      { name: 't', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'EaseIn',
    description: 'Ease in curve',
    operation: 'MATH_EASE_IN',
    occtBinding: 'mathEaseIn',
    parameters: [
      { name: 'power', type: 'number', default: 2, min: 1, max: 10 }
    ],
    inputs: [
      { name: 't', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'EaseOut',
    description: 'Ease out curve',
    operation: 'MATH_EASE_OUT',
    occtBinding: 'mathEaseOut',
    parameters: [
      { name: 'power', type: 'number', default: 2, min: 1, max: 10 }
    ],
    inputs: [
      { name: 't', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'EaseInOut',
    description: 'Ease in-out curve',
    operation: 'MATH_EASE_INOUT',
    occtBinding: 'mathEaseInOut',
    parameters: [
      { name: 'power', type: 'number', default: 2, min: 1, max: 10 }
    ],
    inputs: [
      { name: 't', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Interpolation',
    name: 'SpringInterp',
    description: 'Spring interpolation',
    operation: 'MATH_SPRING_INTERP',
    occtBinding: 'mathSpringInterp',
    parameters: [
      { name: 'stiffness', type: 'number', default: 100, min: 1, max: 1000 },
      { name: 'damping', type: 'number', default: 10, min: 0, max: 100 }
    ],
    inputs: [
      { name: 'current', type: 'number', required: true },
      { name: 'target', type: 'number', required: true },
      { name: 'velocity', type: 'number', required: true },
      { name: 'deltaTime', type: 'number', required: true }
    ],
    outputs: [
      { name: 'position', type: 'number' },
      { name: 'velocity', type: 'number' }
    ]
  }
];

/**
 * Complex and Matrix Operations
 */
export const complexMatrixTemplates: NodeTemplate[] = [
  {
    category: 'Math',
    subcategory: 'Complex',
    name: 'ComplexNumber',
    description: 'Create complex number',
    operation: 'MATH_COMPLEX',
    occtBinding: 'mathComplex',
    parameters: [],
    inputs: [
      { name: 'real', type: 'number', required: true },
      { name: 'imaginary', type: 'number', required: true }
    ],
    outputs: [
      { name: 'complex', type: 'Complex' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Complex',
    name: 'ComplexAdd',
    description: 'Add complex numbers',
    operation: 'MATH_COMPLEX_ADD',
    occtBinding: 'mathComplexAdd',
    parameters: [],
    inputs: [
      { name: 'a', type: 'Complex', required: true },
      { name: 'b', type: 'Complex', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Complex' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Complex',
    name: 'ComplexMultiply',
    description: 'Multiply complex numbers',
    operation: 'MATH_COMPLEX_MULTIPLY',
    occtBinding: 'mathComplexMultiply',
    parameters: [],
    inputs: [
      { name: 'a', type: 'Complex', required: true },
      { name: 'b', type: 'Complex', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Complex' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Complex',
    name: 'ComplexConjugate',
    description: 'Complex conjugate',
    operation: 'MATH_COMPLEX_CONJUGATE',
    occtBinding: 'mathComplexConjugate',
    parameters: [],
    inputs: [
      { name: 'complex', type: 'Complex', required: true }
    ],
    outputs: [
      { name: 'conjugate', type: 'Complex' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Complex',
    name: 'ComplexMagnitude',
    description: 'Complex magnitude',
    operation: 'MATH_COMPLEX_MAGNITUDE',
    occtBinding: 'mathComplexMagnitude',
    parameters: [],
    inputs: [
      { name: 'complex', type: 'Complex', required: true }
    ],
    outputs: [
      { name: 'magnitude', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Complex',
    name: 'ComplexPhase',
    description: 'Complex phase angle',
    operation: 'MATH_COMPLEX_PHASE',
    occtBinding: 'mathComplexPhase',
    parameters: [],
    inputs: [
      { name: 'complex', type: 'Complex', required: true }
    ],
    outputs: [
      { name: 'phase', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Matrix',
    name: 'MatrixMultiply',
    description: 'Matrix multiplication',
    operation: 'MATH_MATRIX_MULTIPLY',
    occtBinding: 'mathMatrixMultiply',
    parameters: [],
    inputs: [
      { name: 'a', type: 'Matrix', required: true },
      { name: 'b', type: 'Matrix', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Matrix' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Matrix',
    name: 'MatrixInverse',
    description: 'Matrix inverse',
    operation: 'MATH_MATRIX_INVERSE',
    occtBinding: 'mathMatrixInverse',
    parameters: [],
    inputs: [
      { name: 'matrix', type: 'Matrix', required: true }
    ],
    outputs: [
      { name: 'inverse', type: 'Matrix' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Matrix',
    name: 'MatrixDeterminant',
    description: 'Matrix determinant',
    operation: 'MATH_MATRIX_DETERMINANT',
    occtBinding: 'mathMatrixDeterminant',
    parameters: [],
    inputs: [
      { name: 'matrix', type: 'Matrix', required: true }
    ],
    outputs: [
      { name: 'determinant', type: 'number' }
    ]
  },
  {
    category: 'Math',
    subcategory: 'Matrix',
    name: 'MatrixTranspose',
    description: 'Matrix transpose',
    operation: 'MATH_MATRIX_TRANSPOSE',
    occtBinding: 'mathMatrixTranspose',
    parameters: [],
    inputs: [
      { name: 'matrix', type: 'Matrix', required: true }
    ],
    outputs: [
      { name: 'transpose', type: 'Matrix' }
    ]
  }
];

// Export all templates
export const allMathematicalTemplates = [
  ...basicMathTemplates,
  ...trigonometricTemplates,
  ...logarithmicTemplates,
  ...roundingComparisonTemplates,
  ...statisticalTemplates,
  ...randomTemplates,
  ...interpolationTemplates,
  ...complexMatrixTemplates
];