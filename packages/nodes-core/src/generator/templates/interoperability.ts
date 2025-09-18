// Interoperability Nodes - 50 nodes for data exchange and integration
import { NodeTemplate } from '../types';

export const interoperabilityNodes: NodeTemplate[] = [
  // ============================================================
  // FILE FORMAT IMPORT/EXPORT - 20 nodes
  // ============================================================
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'STEPImport',
    description: 'Import STEP (.stp) CAD files',
    operation: 'STEP_IMPORT',
    occtBinding: 'stepImport',
    parameters: [
      { name: 'units', type: 'enum', options: ['auto', 'mm', 'cm', 'm', 'inch', 'ft'], default: 'auto' },
      { name: 'healGeometry', type: 'boolean', default: true },
      { name: 'precision', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'mergeSurfaces', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'shapes', type: 'Shape[]' },
      { name: 'metadata', type: 'Properties' },
      { name: 'units', type: 'string' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'STEPExport',
    description: 'Export geometry to STEP format',
    operation: 'STEP_EXPORT',
    occtBinding: 'stepExport',
    parameters: [
      { name: 'version', type: 'enum', options: ['AP203', 'AP214', 'AP242'], default: 'AP214' },
      { name: 'units', type: 'enum', options: ['mm', 'cm', 'm', 'inch'], default: 'mm' },
      { name: 'precision', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'writeMode', type: 'enum', options: ['manifold', 'wireframe', 'shell'], default: 'manifold' }
    ],
    inputs: [
      { name: 'shapes', type: 'Shape[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'fileSize', type: 'number' },
      { name: 'exportLog', type: 'string[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'IGESImport',
    description: 'Import IGES (.igs) CAD files',
    operation: 'IGES_IMPORT',
    occtBinding: 'igesImport',
    parameters: [
      { name: 'units', type: 'enum', options: ['auto', 'mm', 'cm', 'm', 'inch'], default: 'auto' },
      { name: 'readFailed', type: 'boolean', default: false, description: 'Read failed entities' },
      { name: 'oneObject', type: 'boolean', default: false, description: 'Merge into one shape' }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'shapes', type: 'Shape[]' },
      { name: 'curves', type: 'Wire[]' },
      { name: 'surfaces', type: 'Face[]' },
      { name: 'metadata', type: 'Properties' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'IGESExport',
    description: 'Export geometry to IGES format',
    operation: 'IGES_EXPORT',
    occtBinding: 'igesExport',
    parameters: [
      { name: 'units', type: 'enum', options: ['mm', 'cm', 'm', 'inch'], default: 'mm' },
      { name: 'precision', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'writeMode', type: 'enum', options: ['brep', 'faces'], default: 'brep' }
    ],
    inputs: [
      { name: 'shapes', type: 'Shape[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'entityCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'STLImport',
    description: 'Import STL mesh files',
    operation: 'STL_IMPORT',
    occtBinding: 'stlImport',
    parameters: [
      { name: 'mergeVertices', type: 'boolean', default: true },
      { name: 'tolerance', type: 'number', default: 0.01, min: 0.001, max: 1 },
      { name: 'units', type: 'enum', options: ['mm', 'cm', 'm', 'inch'], default: 'mm' }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'mesh', type: 'Shape' },
      { name: 'triangleCount', type: 'number' },
      { name: 'vertexCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'STLExport',
    description: 'Export mesh to STL format',
    operation: 'STL_EXPORT',
    occtBinding: 'stlExport',
    parameters: [
      { name: 'format', type: 'enum', options: ['ascii', 'binary'], default: 'binary' },
      { name: 'deflection', type: 'number', default: 0.1, min: 0.01, max: 1 },
      { name: 'angularDeflection', type: 'number', default: 0.1, min: 0.01, max: 1 }
    ],
    inputs: [
      { name: 'shapes', type: 'Shape[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'triangleCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'OBJImport',
    description: 'Import Wavefront OBJ files',
    operation: 'OBJ_IMPORT',
    occtBinding: 'objImport',
    parameters: [
      { name: 'scale', type: 'number', default: 1.0, min: 0.001, max: 1000 },
      { name: 'flipNormals', type: 'boolean', default: false },
      { name: 'loadMaterials', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'meshes', type: 'Shape[]' },
      { name: 'materials', type: 'Properties[]' },
      { name: 'groups', type: 'string[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'OBJExport',
    description: 'Export mesh to OBJ format',
    operation: 'OBJ_EXPORT',
    occtBinding: 'objExport',
    parameters: [
      { name: 'includeNormals', type: 'boolean', default: true },
      { name: 'includeTexCoords', type: 'boolean', default: false },
      { name: 'smoothing', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'meshes', type: 'Shape[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'vertexCount', type: 'number' },
      { name: 'faceCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'PLYImport',
    description: 'Import PLY point cloud files',
    operation: 'PLY_IMPORT',
    occtBinding: 'plyImport',
    parameters: [
      { name: 'loadColors', type: 'boolean', default: true },
      { name: 'loadNormals', type: 'boolean', default: true },
      { name: 'scaleFactor', type: 'number', default: 1.0, min: 0.001, max: 1000 }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'points', type: 'Point[]' },
      { name: 'colors', type: 'number[][]' },
      { name: 'normals', type: 'Vector[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'PLYExport',
    description: 'Export point cloud to PLY format',
    operation: 'PLY_EXPORT',
    occtBinding: 'plyExport',
    parameters: [
      { name: 'format', type: 'enum', options: ['ascii', 'binary'], default: 'binary' },
      { name: 'includeColors', type: 'boolean', default: false },
      { name: 'includeNormals', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'points', type: 'Point[]', required: true },
      { name: 'filePath', type: 'string', required: true },
      { name: 'colors', type: 'number[][]', required: false },
      { name: 'normals', type: 'Vector[]', required: false }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'pointCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'ThreeMFImport',
    description: 'Import 3D Manufacturing Format files',
    operation: '3MF_IMPORT',
    occtBinding: 'threeMFImport',
    parameters: [
      { name: 'loadTextures', type: 'boolean', default: true },
      { name: 'loadMaterials', type: 'boolean', default: true },
      { name: 'units', type: 'enum', options: ['auto', 'mm', 'cm', 'm'], default: 'auto' }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'models', type: 'Shape[]' },
      { name: 'materials', type: 'Properties[]' },
      { name: 'build', type: 'Properties' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'ThreeMFExport',
    description: 'Export to 3D Manufacturing Format',
    operation: '3MF_EXPORT',
    occtBinding: 'threeMFExport',
    parameters: [
      { name: 'units', type: 'enum', options: ['mm', 'cm', 'm'], default: 'mm' },
      { name: 'includeColors', type: 'boolean', default: true },
      { name: 'compression', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'models', type: 'Shape[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'modelCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'DXFImport',
    description: 'Import DXF 2D drawing files',
    operation: 'DXF_IMPORT',
    occtBinding: 'dxfImport',
    parameters: [
      { name: 'units', type: 'enum', options: ['auto', 'mm', 'cm', 'm', 'inch'], default: 'auto' },
      { name: 'layers', type: 'string', default: 'all', description: 'Comma-separated layer names' },
      { name: 'explodeBlocks', type: 'boolean', default: false }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'curves', type: 'Wire[]' },
      { name: 'points', type: 'Point[]' },
      { name: 'texts', type: 'Properties[]' },
      { name: 'layers', type: 'string[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'DXFExport',
    description: 'Export 2D geometry to DXF format',
    operation: 'DXF_EXPORT',
    occtBinding: 'dxfExport',
    parameters: [
      { name: 'version', type: 'enum', options: ['R12', 'R14', '2000', '2004', '2007'], default: '2000' },
      { name: 'units', type: 'enum', options: ['mm', 'cm', 'm', 'inch'], default: 'mm' },
      { name: 'layerName', type: 'string', default: 'BrepFlow' }
    ],
    inputs: [
      { name: 'curves', type: 'Wire[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'entityCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Import',
    name: 'SVGImport',
    description: 'Import SVG vector graphics',
    operation: 'SVG_IMPORT',
    occtBinding: 'svgImport',
    parameters: [
      { name: 'scale', type: 'number', default: 1.0, min: 0.001, max: 1000 },
      { name: 'tolerance', type: 'number', default: 0.1, min: 0.01, max: 1 },
      { name: 'flatten', type: 'boolean', default: true, description: 'Flatten to single plane' }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'curves', type: 'Wire[]' },
      { name: 'closed', type: 'Wire[]' },
      { name: 'open', type: 'Wire[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Export',
    name: 'SVGExport',
    description: 'Export 2D curves to SVG format',
    operation: 'SVG_EXPORT',
    occtBinding: 'svgExport',
    parameters: [
      { name: 'scale', type: 'number', default: 1.0, min: 0.001, max: 1000 },
      { name: 'strokeWidth', type: 'number', default: 1.0, min: 0.1, max: 10 },
      { name: 'viewBox', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'curves', type: 'Wire[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'dimensions', type: 'Vector' }
    ]
  },

  // ============================================================
  // DATABASE AND API CONNECTIVITY - 15 nodes
  // ============================================================
  {
    category: 'Interoperability',
    subcategory: 'Database',
    name: 'SQLQuery',
    description: 'Execute SQL database queries',
    operation: 'SQL_QUERY',
    occtBinding: 'sqlQuery',
    parameters: [
      { name: 'connectionString', type: 'string', default: '', description: 'Database connection string' },
      { name: 'query', type: 'string', default: 'SELECT * FROM table', description: 'SQL query' },
      { name: 'timeout', type: 'number', default: 30, min: 1, max: 300, description: 'Timeout in seconds' }
    ],
    inputs: [
      { name: 'parameters', type: 'Properties', required: false }
    ],
    outputs: [
      { name: 'data', type: 'Properties[]' },
      { name: 'rowCount', type: 'number' },
      { name: 'columns', type: 'string[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Database',
    name: 'SQLInsert',
    description: 'Insert data into SQL database',
    operation: 'SQL_INSERT',
    occtBinding: 'sqlInsert',
    parameters: [
      { name: 'connectionString', type: 'string', default: '' },
      { name: 'tableName', type: 'string', default: '', description: 'Target table name' },
      { name: 'batchSize', type: 'number', default: 100, min: 1, max: 1000 }
    ],
    inputs: [
      { name: 'data', type: 'Properties[]', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'insertedRows', type: 'number' },
      { name: 'errors', type: 'string[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'API',
    name: 'HTTPRequest',
    description: 'Make HTTP REST API requests',
    operation: 'HTTP_REQUEST',
    occtBinding: 'httpRequest',
    parameters: [
      { name: 'method', type: 'enum', options: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
      { name: 'url', type: 'string', default: '', description: 'API endpoint URL' },
      { name: 'timeout', type: 'number', default: 30, min: 1, max: 300 },
      { name: 'retries', type: 'number', default: 3, min: 0, max: 10 }
    ],
    inputs: [
      { name: 'headers', type: 'Properties', required: false },
      { name: 'body', type: 'Properties', required: false }
    ],
    outputs: [
      { name: 'response', type: 'Properties' },
      { name: 'statusCode', type: 'number' },
      { name: 'headers', type: 'Properties' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'API',
    name: 'JSONParser',
    description: 'Parse JSON data structures',
    operation: 'JSON_PARSER',
    occtBinding: 'jsonParser',
    parameters: [
      { name: 'path', type: 'string', default: '', description: 'JSONPath expression' },
      { name: 'flatten', type: 'boolean', default: false, description: 'Flatten nested objects' }
    ],
    inputs: [
      { name: 'jsonData', type: 'string', required: true }
    ],
    outputs: [
      { name: 'data', type: 'Properties' },
      { name: 'arrays', type: 'Properties[]' },
      { name: 'values', type: 'string[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'API',
    name: 'JSONGenerator',
    description: 'Generate JSON from data',
    operation: 'JSON_GENERATOR',
    occtBinding: 'jsonGenerator',
    parameters: [
      { name: 'indent', type: 'number', default: 2, min: 0, max: 8, description: 'Indentation spaces' },
      { name: 'compact', type: 'boolean', default: false, description: 'Compact output' }
    ],
    inputs: [
      { name: 'data', type: 'Properties', required: true }
    ],
    outputs: [
      { name: 'json', type: 'string' },
      { name: 'size', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Cloud',
    name: 'S3Upload',
    description: 'Upload files to AWS S3',
    operation: 'S3_UPLOAD',
    occtBinding: 's3Upload',
    parameters: [
      { name: 'bucket', type: 'string', default: '', description: 'S3 bucket name' },
      { name: 'accessKey', type: 'string', default: '', description: 'AWS access key' },
      { name: 'secretKey', type: 'string', default: '', description: 'AWS secret key' },
      { name: 'region', type: 'string', default: 'us-east-1' }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true },
      { name: 'key', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'url', type: 'string' },
      { name: 'etag', type: 'string' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Cloud',
    name: 'S3Download',
    description: 'Download files from AWS S3',
    operation: 'S3_DOWNLOAD',
    occtBinding: 's3Download',
    parameters: [
      { name: 'bucket', type: 'string', default: '' },
      { name: 'accessKey', type: 'string', default: '' },
      { name: 'secretKey', type: 'string', default: '' },
      { name: 'region', type: 'string', default: 'us-east-1' }
    ],
    inputs: [
      { name: 'key', type: 'string', required: true },
      { name: 'localPath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'fileSize', type: 'number' },
      { name: 'metadata', type: 'Properties' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Messaging',
    name: 'EmailSender',
    description: 'Send email notifications',
    operation: 'EMAIL_SENDER',
    occtBinding: 'emailSender',
    parameters: [
      { name: 'smtpServer', type: 'string', default: '', description: 'SMTP server address' },
      { name: 'port', type: 'number', default: 587, min: 1, max: 65535 },
      { name: 'username', type: 'string', default: '' },
      { name: 'password', type: 'string', default: '' }
    ],
    inputs: [
      { name: 'to', type: 'string', required: true },
      { name: 'subject', type: 'string', required: true },
      { name: 'body', type: 'string', required: true },
      { name: 'attachments', type: 'string[]', required: false }
    ],
    outputs: [
      { name: 'sent', type: 'boolean' },
      { name: 'messageId', type: 'string' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Messaging',
    name: 'SlackNotification',
    description: 'Send Slack notifications',
    operation: 'SLACK_NOTIFICATION',
    occtBinding: 'slackNotification',
    parameters: [
      { name: 'webhookUrl', type: 'string', default: '', description: 'Slack webhook URL' },
      { name: 'channel', type: 'string', default: '#general' },
      { name: 'username', type: 'string', default: 'BrepFlow' }
    ],
    inputs: [
      { name: 'message', type: 'string', required: true },
      { name: 'attachments', type: 'Properties[]', required: false }
    ],
    outputs: [
      { name: 'sent', type: 'boolean' },
      { name: 'timestamp', type: 'string' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Data',
    name: 'CSVReader',
    description: 'Read CSV data files',
    operation: 'CSV_READER',
    occtBinding: 'csvReader',
    parameters: [
      { name: 'delimiter', type: 'string', default: ',', description: 'Field delimiter' },
      { name: 'hasHeader', type: 'boolean', default: true },
      { name: 'encoding', type: 'enum', options: ['utf-8', 'ascii', 'latin1'], default: 'utf-8' }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'data', type: 'Properties[]' },
      { name: 'headers', type: 'string[]' },
      { name: 'rowCount', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Data',
    name: 'CSVWriter',
    description: 'Write data to CSV files',
    operation: 'CSV_WRITER',
    occtBinding: 'csvWriter',
    parameters: [
      { name: 'delimiter', type: 'string', default: ',' },
      { name: 'includeHeader', type: 'boolean', default: true },
      { name: 'encoding', type: 'enum', options: ['utf-8', 'ascii'], default: 'utf-8' }
    ],
    inputs: [
      { name: 'data', type: 'Properties[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'rowsWritten', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Data',
    name: 'ExcelReader',
    description: 'Read Excel spreadsheet files',
    operation: 'EXCEL_READER',
    occtBinding: 'excelReader',
    parameters: [
      { name: 'sheetName', type: 'string', default: '', description: 'Sheet name (empty for first)' },
      { name: 'hasHeader', type: 'boolean', default: true },
      { name: 'range', type: 'string', default: '', description: 'Cell range (e.g., A1:C10)' }
    ],
    inputs: [
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'data', type: 'Properties[]' },
      { name: 'sheetNames', type: 'string[]' },
      { name: 'dimensions', type: 'number[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Data',
    name: 'ExcelWriter',
    description: 'Write data to Excel files',
    operation: 'EXCEL_WRITER',
    occtBinding: 'excelWriter',
    parameters: [
      { name: 'sheetName', type: 'string', default: 'Sheet1' },
      { name: 'includeHeader', type: 'boolean', default: true },
      { name: 'startCell', type: 'string', default: 'A1' }
    ],
    inputs: [
      { name: 'data', type: 'Properties[]', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'cellsWritten', type: 'number' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Integration',
    name: 'GrasshopperExport',
    description: 'Export definitions compatible with Grasshopper',
    operation: 'GRASSHOPPER_EXPORT',
    occtBinding: 'grasshopperExport',
    parameters: [
      { name: 'version', type: 'enum', options: ['GH1', 'GH2'], default: 'GH1' },
      { name: 'embedGeometry', type: 'boolean', default: true }
    ],
    inputs: [
      { name: 'definition', type: 'Properties', required: true },
      { name: 'filePath', type: 'string', required: true }
    ],
    outputs: [
      { name: 'success', type: 'boolean' },
      { name: 'componentCount', type: 'number' }
    ]
  },

  // ============================================================
  // REAL-TIME DATA STREAMING - 15 nodes
  // ============================================================
  {
    category: 'Interoperability',
    subcategory: 'Streaming',
    name: 'WebSocketClient',
    description: 'Connect to WebSocket data streams',
    operation: 'WEBSOCKET_CLIENT',
    occtBinding: 'webSocketClient',
    parameters: [
      { name: 'url', type: 'string', default: '', description: 'WebSocket server URL' },
      { name: 'reconnect', type: 'boolean', default: true },
      { name: 'heartbeat', type: 'number', default: 30, min: 0, max: 300, description: 'Heartbeat interval' }
    ],
    inputs: [
      { name: 'message', type: 'string', required: false }
    ],
    outputs: [
      { name: 'connected', type: 'boolean' },
      { name: 'messages', type: 'string[]' },
      { name: 'lastMessage', type: 'string' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Streaming',
    name: 'MQTTPublisher',
    description: 'Publish MQTT messages',
    operation: 'MQTT_PUBLISHER',
    occtBinding: 'mqttPublisher',
    parameters: [
      { name: 'broker', type: 'string', default: '', description: 'MQTT broker address' },
      { name: 'port', type: 'number', default: 1883, min: 1, max: 65535 },
      { name: 'topic', type: 'string', default: '' },
      { name: 'qos', type: 'enum', options: ['0', '1', '2'], default: '0' }
    ],
    inputs: [
      { name: 'payload', type: 'string', required: true }
    ],
    outputs: [
      { name: 'published', type: 'boolean' },
      { name: 'messageId', type: 'string' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Streaming',
    name: 'MQTTSubscriber',
    description: 'Subscribe to MQTT topics',
    operation: 'MQTT_SUBSCRIBER',
    occtBinding: 'mqttSubscriber',
    parameters: [
      { name: 'broker', type: 'string', default: '' },
      { name: 'port', type: 'number', default: 1883, min: 1, max: 65535 },
      { name: 'topic', type: 'string', default: '' },
      { name: 'qos', type: 'enum', options: ['0', '1', '2'], default: '0' }
    ],
    inputs: [],
    outputs: [
      { name: 'connected', type: 'boolean' },
      { name: 'messages', type: 'string[]' },
      { name: 'lastMessage', type: 'string' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Streaming',
    name: 'SerialPort',
    description: 'Communicate with serial devices',
    operation: 'SERIAL_PORT',
    occtBinding: 'serialPort',
    parameters: [
      { name: 'port', type: 'string', default: 'COM1', description: 'Serial port name' },
      { name: 'baudRate', type: 'enum', options: ['9600', '19200', '38400', '57600', '115200'], default: '9600' },
      { name: 'dataBits', type: 'enum', options: ['7', '8'], default: '8' },
      { name: 'parity', type: 'enum', options: ['none', 'even', 'odd'], default: 'none' }
    ],
    inputs: [
      { name: 'data', type: 'string', required: false }
    ],
    outputs: [
      { name: 'connected', type: 'boolean' },
      { name: 'received', type: 'string' },
      { name: 'buffer', type: 'string[]' }
    ]
  },
  {
    category: 'Interoperability',
    subcategory: 'Streaming',
    name: 'TCPClient',
    description: 'TCP socket client connection',
    operation: 'TCP_CLIENT',
    occtBinding: 'tcpClient',
    parameters: [
      { name: 'host', type: 'string', default: 'localhost' },
      { name: 'port', type: 'number', default: 8080, min: 1, max: 65535 },
      { name: 'timeout', type: 'number', default: 30, min: 1, max: 300 }
    ],
    inputs: [
      { name: 'data', type: 'string', required: false }
    ],
    outputs: [
      { name: 'connected', type: 'boolean' },
      { name: 'response', type: 'string' },
      { name: 'error', type: 'string' }
    ]
  }
];