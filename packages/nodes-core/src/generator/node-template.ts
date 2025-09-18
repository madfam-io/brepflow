/**
 * Node Template System for BrepFlow
 * Generates consistent node implementations from templates
 */

export interface Parameter {
  name: string;
  type: 'number' | 'boolean' | 'string' | 'vector3' | 'enum';
  default?: any;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  description?: string;
}

export interface NodeTemplate {
  // Metadata
  category: 'Sketch' | 'Solid' | 'Boolean' | 'Features' | 'Transform' | 'Analysis' | 'Manufacturing' | 'Assembly' | 'IO';
  subcategory?: string;
  name: string;
  description: string;
  icon?: string;
  tags?: string[];

  // Functionality
  operation: string;
  occtBinding?: string; // Direct OCCT function to call
  parameters: Parameter[];

  // Inputs/Outputs
  inputs: {
    name: string;
    type: string;
    required?: boolean;
    description?: string;
  }[];
  outputs: {
    name: string;
    type: string;
    description?: string;
  }[];

  // Validation
  validation?: {
    rule: string;
    message: string;
  }[];

  // Examples
  examples?: {
    title: string;
    parameters: Record<string, any>;
    description?: string;
  }[];
}

/**
 * Generate TypeScript node implementation from template
 */
export function generateNodeImplementation(template: NodeTemplate): string {
  const className = `${template.name}Node`;
  const paramTypes = generateParamTypes(template.parameters);
  const inputTypes = generateInputTypes(template.inputs);
  const outputTypes = generateOutputTypes(template.outputs);

  return `
import { NodeDefinition } from '@brepflow/types';

${paramTypes}
${inputTypes}
${outputTypes}

export const ${className}: NodeDefinition<${template.name}Inputs, ${template.name}Outputs, ${template.name}Params> = {
  type: '${template.category}::${template.name}',
  category: '${template.category}',
  ${template.subcategory ? `subcategory: '${template.subcategory}',` : ''}

  metadata: {
    label: '${template.name}',
    description: '${template.description}',
    ${template.icon ? `icon: '${template.icon}',` : ''}
    ${template.tags ? `tags: ${JSON.stringify(template.tags)},` : ''}
  },

  params: {
    ${generateParamDefinitions(template.parameters)}
  },

  inputs: {
    ${generateInputDefinitions(template.inputs)}
  },

  outputs: {
    ${generateOutputDefinitions(template.outputs)}
  },

  async evaluate(context, inputs, params) {
    ${generateEvaluationLogic(template)}
  }
};
`;
}

function generateParamTypes(params: Parameter[]): string {
  if (params.length === 0) return 'type ' + 'Params = {};';

  const fields = params.map(p =>
    `  ${p.name}: ${getTypeScriptType(p.type)};`
  ).join('\n');

  return `interface Params {\n${fields}\n}`;
}

function generateInputTypes(inputs: NodeTemplate['inputs']): string {
  if (inputs.length === 0) return 'type Inputs = {};';

  const fields = inputs.map(i =>
    `  ${i.name}${i.required ? '' : '?'}: ${i.type};`
  ).join('\n');

  return `interface Inputs {\n${fields}\n}`;
}

function generateOutputTypes(outputs: NodeTemplate['outputs']): string {
  const fields = outputs.map(o =>
    `  ${o.name}: ${o.type};`
  ).join('\n');

  return `interface Outputs {\n${fields}\n}`;
}

function generateParamDefinitions(params: Parameter[]): string {
  return params.map(p => {
    const options: any = {};

    if (p.default !== undefined) options.default = p.default;
    if (p.min !== undefined) options.min = p.min;
    if (p.max !== undefined) options.max = p.max;
    if (p.step !== undefined) options.step = p.step;
    if (p.options) options.options = p.options;
    if (p.description) options.description = p.description;

    const optionsStr = Object.keys(options).length > 0
      ? JSON.stringify(options, null, 2).replace(/\n/g, '\n    ')
      : '{}';

    return `    ${p.name}: ${optionsStr}`;
  }).join(',\n');
}

function generateInputDefinitions(inputs: NodeTemplate['inputs']): string {
  return inputs.map(i =>
    `    ${i.name}: '${i.type}'`
  ).join(',\n');
}

function generateOutputDefinitions(outputs: NodeTemplate['outputs']): string {
  return outputs.map(o =>
    `    ${o.name}: '${o.type}'`
  ).join(',\n');
}

function generateEvaluationLogic(template: NodeTemplate): string {
  if (template.occtBinding) {
    // Direct OCCT binding call
    return `
    const result = await context.geometry.execute({
      type: '${template.occtBinding}',
      params: {
        ${template.inputs.map(i => `${i.name}: inputs.${i.name}`).join(',\n        ')}${template.inputs.length > 0 && template.parameters.length > 0 ? ',' : ''}
        ${template.parameters.map(p => `${p.name}: params.${p.name}`).join(',\n        ')}
      }
    });

    return {
      ${template.outputs.map(o => `${o.name}: result`).join(',\n      ')}
    };`;
  }

  // Custom implementation placeholder
  return `
    // TODO: Implement ${template.name} logic
    throw new Error('${template.name} not yet implemented');`;
}

function getTypeScriptType(type: Parameter['type']): string {
  switch (type) {
    case 'number': return 'number';
    case 'boolean': return 'boolean';
    case 'string': return 'string';
    case 'vector3': return '[number, number, number]';
    case 'enum': return 'string';
    default: return 'any';
  }
}

function getParamFunction(type: Parameter['type']): string {
  switch (type) {
    case 'number': return 'NumberParam';
    case 'boolean': return 'BooleanParam';
    case 'string': return 'StringParam';
    case 'vector3': return 'Vector3Param';
    case 'enum': return 'EnumParam';
    default: return 'StringParam';
  }
}

/**
 * Generate test file for node
 */
export function generateNodeTest(template: NodeTemplate): string {
  return `
import { describe, it, expect } from 'vitest';
import { ${template.name}Node } from './${template.name.toLowerCase()}-node';
import { createTestContext } from '../test-utils';

describe('${template.name}Node', () => {
  it('should create ${template.name}', async () => {
    const context = createTestContext();
    const inputs = {
      ${template.inputs.filter(i => i.required).map(i =>
        `${i.name}: /* test value */`
      ).join(',\n      ')}
    };
    const params = {
      ${template.parameters.map(p =>
        `${p.name}: ${p.default !== undefined ? JSON.stringify(p.default) : '/* test value */'}`
      ).join(',\n      ')}
    };

    const result = await ${template.name}Node.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    ${template.outputs.map(o =>
      `expect(result.${o.name}).toBeDefined();`
    ).join('\n    ')}
  });

  ${template.examples ? template.examples.map(ex => `
  it('should handle ${ex.title}', async () => {
    const context = createTestContext();
    const params = ${JSON.stringify(ex.parameters, null, 2).replace(/\n/g, '\n    ')};

    const result = await ${template.name}Node.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });`).join('\n  ') : ''}
});`;
}

/**
 * Generate documentation for node
 */
export function generateNodeDocumentation(template: NodeTemplate): string {
  return `
# ${template.name} Node

**Category:** ${template.category}${template.subcategory ? ` / ${template.subcategory}` : ''}

${template.description}

## Parameters

${template.parameters.length > 0 ? template.parameters.map(p => `
### ${p.name}
- **Type:** ${p.type}
- **Default:** ${p.default !== undefined ? JSON.stringify(p.default) : 'None'}
${p.min !== undefined ? `- **Min:** ${p.min}` : ''}
${p.max !== undefined ? `- **Max:** ${p.max}` : ''}
${p.description ? `- **Description:** ${p.description}` : ''}
`).join('\n') : 'This node has no parameters.'}

## Inputs

${template.inputs.length > 0 ? template.inputs.map(i => `
### ${i.name}
- **Type:** ${i.type}
- **Required:** ${i.required ? 'Yes' : 'No'}
${i.description ? `- **Description:** ${i.description}` : ''}
`).join('\n') : 'This node has no inputs.'}

## Outputs

${template.outputs.map(o => `
### ${o.name}
- **Type:** ${o.type}
${o.description ? `- **Description:** ${o.description}` : ''}
`).join('\n')}

${template.examples && template.examples.length > 0 ? `
## Examples

${template.examples.map(ex => `
### ${ex.title}
${ex.description || ''}

Parameters:
\`\`\`json
${JSON.stringify(ex.parameters, null, 2)}
\`\`\`
`).join('\n')}` : ''}
`;
}