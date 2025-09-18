/**
 * Parameter utility functions for node definitions
 * Provides type-safe parameter constructors with validation
 */

export interface NumberParamOptions {
  default: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  description?: string;
}

export interface BoolParamOptions {
  default: boolean;
  label?: string;
  description?: string;
}

export interface StringParamOptions {
  default: string;
  label?: string;
  description?: string;
  multiline?: boolean;
}

export interface SelectParamOptions<T extends string> {
  default: T;
  options: readonly T[];
  label?: string;
  description?: string;
}

/**
 * Create a number parameter with validation
 */
export function NumberParam(options: NumberParamOptions) {
  return {
    type: 'number' as const,
    default: options.default,
    min: options.min,
    max: options.max,
    step: options.step,
    label: options.label,
    description: options.description
  };
}

/**
 * Create a boolean parameter
 */
export function BoolParam(options: BoolParamOptions) {
  return {
    type: 'boolean' as const,
    default: options.default,
    label: options.label,
    description: options.description
  };
}

/**
 * Create a string parameter
 */
export function StringParam(options: StringParamOptions) {
  return {
    type: 'string' as const,
    default: options.default,
    label: options.label,
    description: options.description,
    multiline: options.multiline
  };
}

/**
 * Create a select parameter with predefined options
 */
export function SelectParam<T extends string>(options: SelectParamOptions<T>) {
  return {
    type: 'select' as const,
    default: options.default,
    options: options.options,
    label: options.label,
    description: options.description
  };
}

/**
 * Create an enum parameter (alias for SelectParam for backwards compatibility)
 */
export const EnumParam = SelectParam;