/**
 * Data Management Templates
 * List operations, data structures, and data flow control
 */

import { NodeTemplate } from '../node-template';

/**
 * List Operations
 */
export const listOperationTemplates: NodeTemplate[] = [
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListLength',
    description: 'Get list length',
    operation: 'LIST_LENGTH',
    occtBinding: 'listLength',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'length', type: 'number' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListItem',
    description: 'Get item at index',
    operation: 'LIST_ITEM',
    occtBinding: 'listItem',
    parameters: [
      { name: 'wrap', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'index', type: 'number', required: true }
    ],
    outputs: [
      { name: 'item', type: 'Data' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListSlice',
    description: 'Extract sublist',
    operation: 'LIST_SLICE',
    occtBinding: 'listSlice',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'start', type: 'number', required: true },
      { name: 'end', type: 'number', required: false }
    ],
    outputs: [
      { name: 'sublist', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListReverse',
    description: 'Reverse list order',
    operation: 'LIST_REVERSE',
    occtBinding: 'listReverse',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'reversed', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListSort',
    description: 'Sort list',
    operation: 'LIST_SORT',
    occtBinding: 'listSort',
    parameters: [
      { name: 'ascending', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'keys', type: 'number[]', required: false }
    ],
    outputs: [
      { name: 'sorted', type: 'Data[]' },
      { name: 'indices', type: 'number[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListShuffle',
    description: 'Randomize list order',
    operation: 'LIST_SHUFFLE',
    occtBinding: 'listShuffle',
    parameters: [
      { name: 'seed', type: 'number', default: -1 }
    ],
    inputs: [
      { name: 'list', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'shuffled', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListShift',
    description: 'Shift list items',
    operation: 'LIST_SHIFT',
    occtBinding: 'listShift',
    parameters: [
      { name: 'wrap', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'offset', type: 'number', required: true }
    ],
    outputs: [
      { name: 'shifted', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListInsert',
    description: 'Insert item in list',
    operation: 'LIST_INSERT',
    occtBinding: 'listInsert',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'item', type: 'Data', required: true },
      { name: 'index', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListRemove',
    description: 'Remove item from list',
    operation: 'LIST_REMOVE',
    occtBinding: 'listRemove',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'index', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Data[]' },
      { name: 'removed', type: 'Data' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListReplace',
    description: 'Replace item in list',
    operation: 'LIST_REPLACE',
    occtBinding: 'listReplace',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'item', type: 'Data', required: true },
      { name: 'index', type: 'number', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListAppend',
    description: 'Append to list',
    operation: 'LIST_APPEND',
    occtBinding: 'listAppend',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'item', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListPrepend',
    description: 'Prepend to list',
    operation: 'LIST_PREPEND',
    occtBinding: 'listPrepend',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'item', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'result', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListJoin',
    description: 'Join multiple lists',
    operation: 'LIST_JOIN',
    occtBinding: 'listJoin',
    parameters: [],
    inputs: [
      { name: 'lists', type: 'Data[][]', required: true }
    ],
    outputs: [
      { name: 'joined', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListSplit',
    description: 'Split list',
    operation: 'LIST_SPLIT',
    occtBinding: 'listSplit',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'index', type: 'number', required: true }
    ],
    outputs: [
      { name: 'before', type: 'Data[]' },
      { name: 'after', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListPartition',
    description: 'Partition list into chunks',
    operation: 'LIST_PARTITION',
    occtBinding: 'listPartition',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'size', type: 'number', required: true }
    ],
    outputs: [
      { name: 'partitions', type: 'Data[][]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListFlatten',
    description: 'Flatten nested lists',
    operation: 'LIST_FLATTEN',
    occtBinding: 'listFlatten',
    parameters: [
      { name: 'depth', type: 'number', default: 1, min: 1, max: 10 }
    ],
    inputs: [
      { name: 'list', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'flattened', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListUnique',
    description: 'Remove duplicates',
    operation: 'LIST_UNIQUE',
    occtBinding: 'listUnique',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'unique', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListContains',
    description: 'Check if list contains item',
    operation: 'LIST_CONTAINS',
    occtBinding: 'listContains',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'item', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'contains', type: 'boolean' },
      { name: 'index', type: 'number' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListFind',
    description: 'Find items matching condition',
    operation: 'LIST_FIND',
    occtBinding: 'listFind',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'pattern', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'items', type: 'Data[]' },
      { name: 'indices', type: 'number[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'List',
    name: 'ListFilter',
    description: 'Filter list by condition',
    operation: 'LIST_FILTER',
    occtBinding: 'listFilter',
    parameters: [],
    inputs: [
      { name: 'list', type: 'Data[]', required: true },
      { name: 'mask', type: 'boolean[]', required: true }
    ],
    outputs: [
      { name: 'filtered', type: 'Data[]' }
    ]
  }
];

/**
 * Set Operations
 */
export const setOperationTemplates: NodeTemplate[] = [
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetUnion',
    description: 'Union of sets',
    operation: 'SET_UNION',
    occtBinding: 'setUnion',
    parameters: [],
    inputs: [
      { name: 'setA', type: 'Data[]', required: true },
      { name: 'setB', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'union', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetIntersection',
    description: 'Intersection of sets',
    operation: 'SET_INTERSECTION',
    occtBinding: 'setIntersection',
    parameters: [],
    inputs: [
      { name: 'setA', type: 'Data[]', required: true },
      { name: 'setB', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'intersection', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetDifference',
    description: 'Difference of sets',
    operation: 'SET_DIFFERENCE',
    occtBinding: 'setDifference',
    parameters: [],
    inputs: [
      { name: 'setA', type: 'Data[]', required: true },
      { name: 'setB', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'difference', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetSymmetricDifference',
    description: 'Symmetric difference',
    operation: 'SET_SYMMETRIC_DIFFERENCE',
    occtBinding: 'setSymmetricDifference',
    parameters: [],
    inputs: [
      { name: 'setA', type: 'Data[]', required: true },
      { name: 'setB', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'difference', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetSubset',
    description: 'Check if subset',
    operation: 'SET_SUBSET',
    occtBinding: 'setSubset',
    parameters: [],
    inputs: [
      { name: 'setA', type: 'Data[]', required: true },
      { name: 'setB', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'isSubset', type: 'boolean' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetCartesianProduct',
    description: 'Cartesian product',
    operation: 'SET_CARTESIAN',
    occtBinding: 'setCartesian',
    parameters: [],
    inputs: [
      { name: 'setA', type: 'Data[]', required: true },
      { name: 'setB', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'product', type: 'Data[][]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetPowerSet',
    description: 'Power set',
    operation: 'SET_POWERSET',
    occtBinding: 'setPowerSet',
    parameters: [],
    inputs: [
      { name: 'set', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'powerSet', type: 'Data[][]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetCombinations',
    description: 'Combinations of set',
    operation: 'SET_COMBINATIONS',
    occtBinding: 'setCombinations',
    parameters: [
      { name: 'k', type: 'number', default: 2, min: 1, max: 10 }
    ],
    inputs: [
      { name: 'set', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'combinations', type: 'Data[][]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetPermutations',
    description: 'Permutations of set',
    operation: 'SET_PERMUTATIONS',
    occtBinding: 'setPermutations',
    parameters: [
      { name: 'k', type: 'number', default: -1, min: -1, max: 10 }
    ],
    inputs: [
      { name: 'set', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'permutations', type: 'Data[][]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Set',
    name: 'SetPartitions',
    description: 'Set partitions',
    operation: 'SET_PARTITIONS',
    occtBinding: 'setPartitions',
    parameters: [
      { name: 'k', type: 'number', default: 2, min: 2, max: 10 }
    ],
    inputs: [
      { name: 'set', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'partitions', type: 'Data[][][]' }
    ]
  }
];

/**
 * Tree Operations
 */
export const treeOperationTemplates: NodeTemplate[] = [
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeBranch',
    description: 'Get tree branch',
    operation: 'TREE_BRANCH',
    occtBinding: 'treeBranch',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true },
      { name: 'path', type: 'string', required: true }
    ],
    outputs: [
      { name: 'branch', type: 'Data[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreePaths',
    description: 'Get all tree paths',
    operation: 'TREE_PATHS',
    occtBinding: 'treePaths',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'paths', type: 'string[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeGraft',
    description: 'Graft tree',
    operation: 'TREE_GRAFT',
    occtBinding: 'treeGraft',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'grafted', type: 'DataTree' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeFlatten',
    description: 'Flatten tree',
    operation: 'TREE_FLATTEN',
    occtBinding: 'treeFlatten',
    parameters: [
      { name: 'depth', type: 'number', default: 1, min: 0, max: 10 }
    ],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'flattened', type: 'DataTree' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeSimplify',
    description: 'Simplify tree paths',
    operation: 'TREE_SIMPLIFY',
    occtBinding: 'treeSimplify',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'simplified', type: 'DataTree' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreePrune',
    description: 'Remove empty branches',
    operation: 'TREE_PRUNE',
    occtBinding: 'treePrune',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'pruned', type: 'DataTree' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeMerge',
    description: 'Merge trees',
    operation: 'TREE_MERGE',
    occtBinding: 'treeMerge',
    parameters: [],
    inputs: [
      { name: 'treeA', type: 'DataTree', required: true },
      { name: 'treeB', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'merged', type: 'DataTree' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeExplode',
    description: 'Explode tree to branches',
    operation: 'TREE_EXPLODE',
    occtBinding: 'treeExplode',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'branches', type: 'Data[][]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeShift',
    description: 'Shift tree paths',
    operation: 'TREE_SHIFT',
    occtBinding: 'treeShift',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true },
      { name: 'offset', type: 'number', required: true }
    ],
    outputs: [
      { name: 'shifted', type: 'DataTree' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Tree',
    name: 'TreeStatistics',
    description: 'Tree statistics',
    operation: 'TREE_STATISTICS',
    occtBinding: 'treeStatistics',
    parameters: [],
    inputs: [
      { name: 'tree', type: 'DataTree', required: true }
    ],
    outputs: [
      { name: 'branchCount', type: 'number' },
      { name: 'itemCount', type: 'number' },
      { name: 'depth', type: 'number' }
    ]
  }
];

/**
 * String Operations
 */
export const stringOperationTemplates: NodeTemplate[] = [
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringConcat',
    description: 'Concatenate strings',
    operation: 'STRING_CONCAT',
    occtBinding: 'stringConcat',
    parameters: [
      { name: 'separator', type: 'string', default: '' }
    ],
    inputs: [
      { name: 'strings', type: 'string[]', required: true }
    ],
    outputs: [
      { name: 'result', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringSplit',
    description: 'Split string',
    operation: 'STRING_SPLIT',
    occtBinding: 'stringSplit',
    parameters: [
      { name: 'delimiter', type: 'string', default: ',' }
    ],
    inputs: [
      { name: 'string', type: 'string', required: true }
    ],
    outputs: [
      { name: 'parts', type: 'string[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringReplace',
    description: 'Replace in string',
    operation: 'STRING_REPLACE',
    occtBinding: 'stringReplace',
    parameters: [
      { name: 'global', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'string', type: 'string', required: true },
      { name: 'search', type: 'string', required: true },
      { name: 'replace', type: 'string', required: true }
    ],
    outputs: [
      { name: 'result', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringFormat',
    description: 'Format string',
    operation: 'STRING_FORMAT',
    occtBinding: 'stringFormat',
    parameters: [],
    inputs: [
      { name: 'template', type: 'string', required: true },
      { name: 'values', type: 'Data[]', required: true }
    ],
    outputs: [
      { name: 'formatted', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringCase',
    description: 'Change string case',
    operation: 'STRING_CASE',
    occtBinding: 'stringCase',
    parameters: [
      { name: 'case', type: 'enum', options: ['upper', 'lower', 'title', 'camel', 'snake'], default: 'lower' }
    ],
    inputs: [
      { name: 'string', type: 'string', required: true }
    ],
    outputs: [
      { name: 'result', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringTrim',
    description: 'Trim whitespace',
    operation: 'STRING_TRIM',
    occtBinding: 'stringTrim',
    parameters: [
      { name: 'mode', type: 'enum', options: ['both', 'start', 'end'], default: 'both' }
    ],
    inputs: [
      { name: 'string', type: 'string', required: true }
    ],
    outputs: [
      { name: 'trimmed', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringLength',
    description: 'String length',
    operation: 'STRING_LENGTH',
    occtBinding: 'stringLength',
    parameters: [],
    inputs: [
      { name: 'string', type: 'string', required: true }
    ],
    outputs: [
      { name: 'length', type: 'number' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringSubstring',
    description: 'Extract substring',
    operation: 'STRING_SUBSTRING',
    occtBinding: 'stringSubstring',
    parameters: [],
    inputs: [
      { name: 'string', type: 'string', required: true },
      { name: 'start', type: 'number', required: true },
      { name: 'length', type: 'number', required: false }
    ],
    outputs: [
      { name: 'substring', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringContains',
    description: 'Check if contains',
    operation: 'STRING_CONTAINS',
    occtBinding: 'stringContains',
    parameters: [
      { name: 'caseSensitive', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'string', type: 'string', required: true },
      { name: 'search', type: 'string', required: true }
    ],
    outputs: [
      { name: 'contains', type: 'boolean' },
      { name: 'index', type: 'number' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'String',
    name: 'StringMatch',
    description: 'Match with regex',
    operation: 'STRING_MATCH',
    occtBinding: 'stringMatch',
    parameters: [
      { name: 'global', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'string', type: 'string', required: true },
      { name: 'pattern', type: 'string', required: true }
    ],
    outputs: [
      { name: 'matches', type: 'string[]' }
    ]
  }
];

/**
 * Data Conversion
 */
export const dataConversionTemplates: NodeTemplate[] = [
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'ToString',
    description: 'Convert to string',
    operation: 'CONVERT_TO_STRING',
    occtBinding: 'convertToString',
    parameters: [],
    inputs: [
      { name: 'data', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'ToNumber',
    description: 'Convert to number',
    operation: 'CONVERT_TO_NUMBER',
    occtBinding: 'convertToNumber',
    parameters: [],
    inputs: [
      { name: 'data', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'number', type: 'number' },
      { name: 'isValid', type: 'boolean' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'ToBoolean',
    description: 'Convert to boolean',
    operation: 'CONVERT_TO_BOOLEAN',
    occtBinding: 'convertToBoolean',
    parameters: [],
    inputs: [
      { name: 'data', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'boolean', type: 'boolean' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'ToJSON',
    description: 'Convert to JSON',
    operation: 'CONVERT_TO_JSON',
    occtBinding: 'convertToJSON',
    parameters: [
      { name: 'pretty', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'data', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'json', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'FromJSON',
    description: 'Parse JSON',
    operation: 'CONVERT_FROM_JSON',
    occtBinding: 'convertFromJSON',
    parameters: [],
    inputs: [
      { name: 'json', type: 'string', required: true }
    ],
    outputs: [
      { name: 'data', type: 'Data' },
      { name: 'isValid', type: 'boolean' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'ToCSV',
    description: 'Convert to CSV',
    operation: 'CONVERT_TO_CSV',
    occtBinding: 'convertToCSV',
    parameters: [
      { name: 'delimiter', type: 'string', default: ',' },
      { name: 'headers', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'data', type: 'Data[][]', required: true }
    ],
    outputs: [
      { name: 'csv', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'FromCSV',
    description: 'Parse CSV',
    operation: 'CONVERT_FROM_CSV',
    occtBinding: 'convertFromCSV',
    parameters: [
      { name: 'delimiter', type: 'string', default: ',' },
      { name: 'headers', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'csv', type: 'string', required: true }
    ],
    outputs: [
      { name: 'data', type: 'Data[][]' },
      { name: 'headers', type: 'string[]' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'ToBase64',
    description: 'Encode to Base64',
    operation: 'CONVERT_TO_BASE64',
    occtBinding: 'convertToBase64',
    parameters: [],
    inputs: [
      { name: 'data', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'base64', type: 'string' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'FromBase64',
    description: 'Decode from Base64',
    operation: 'CONVERT_FROM_BASE64',
    occtBinding: 'convertFromBase64',
    parameters: [],
    inputs: [
      { name: 'base64', type: 'string', required: true }
    ],
    outputs: [
      { name: 'data', type: 'Data' }
    ]
  },
  {
    category: 'Data',
    subcategory: 'Convert',
    name: 'TypeOf',
    description: 'Get data type',
    operation: 'TYPE_OF',
    occtBinding: 'typeOf',
    parameters: [],
    inputs: [
      { name: 'data', type: 'Data', required: true }
    ],
    outputs: [
      { name: 'type', type: 'string' }
    ]
  }
];

// Export all templates
export const allDataManagementTemplates = [
  ...listOperationTemplates,
  ...setOperationTemplates,
  ...treeOperationTemplates,
  ...stringOperationTemplates,
  ...dataConversionTemplates
];