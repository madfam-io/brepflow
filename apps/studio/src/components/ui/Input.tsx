import React, { useState, useRef, useEffect } from 'react';
import { Icon, type IconName } from '../icons/IconSystem';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helpText?: string;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'technical' | 'measurement';
  leftIcon?: IconName;
  rightIcon?: IconName;
  unit?: string;
  clearable?: boolean;
  loading?: boolean;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  helpText,
  errorText,
  successText,
  warningText,
  size = 'md',
  variant = 'default',
  validationState,
  leftIcon,
  rightIcon,
  unit,
  clearable = false,
  loading = false,
  className = '',
  disabled = false,
  value,
  onClear,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(errorText) || validationState === 'error';
  const hasSuccess = Boolean(successText) || validationState === 'success';
  const hasWarning = Boolean(warningText) || validationState === 'warning';
  const hasValue = Boolean(value && String(value).length > 0);

  // Determine the actual validation state
  const currentValidationState = validationState ||
    (hasError ? 'error' : hasSuccess ? 'success' : hasWarning ? 'warning' : 'default');

  const inputClasses = [
    'form-input',
    `form-input-${size}`,
    `form-input-${variant}`,
    currentValidationState !== 'default' && `form-input-${currentValidationState}`,
    isFocused && 'form-input-focused',
    leftIcon && 'form-input-with-left-icon',
    (rightIcon || unit || clearable || loading) && 'form-input-with-right-icon',
    disabled && 'form-input-disabled',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'form-group',
    currentValidationState !== 'default' && `form-group-${currentValidationState}`,
    isFocused && 'form-group-focused'
  ].filter(Boolean).join(' ');

  const showClearButton = clearable && hasValue && !disabled && !loading;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="form-label">
          {label}
          {props.required && <span className="form-label-required">*</span>}
        </label>
      )}

      <div className="form-input-container">
        {leftIcon && (
          <div className="form-input-icon form-input-icon-left">
            <Icon name={leftIcon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
          </div>
        )}

        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {(rightIcon || unit || showClearButton || loading) && (
          <div className="form-input-icon form-input-icon-right">
            {loading && (
              <Icon name="loader" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="form-input-loading" />
            )}

            {showClearButton && !loading && (
              <button
                type="button"
                className="form-input-clear"
                onClick={onClear}
                tabIndex={-1}
                aria-label="Clear input"
              >
                <Icon name="x" size={size === 'sm' ? 12 : 14} />
              </button>
            )}

            {unit && !showClearButton && !loading && (
              <span className="form-input-unit">{unit}</span>
            )}

            {rightIcon && !showClearButton && !loading && !unit && (
              <Icon name={rightIcon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
            )}
          </div>
        )}
      </div>

      {helpText && currentValidationState === 'default' && (
        <div className="form-help-text">{helpText}</div>
      )}

      {(hasError || currentValidationState === 'error') && (
        <div className="form-error-text" role="alert">
          <Icon name="alert-circle" size={14} />
          {errorText || 'Invalid input'}
        </div>
      )}

      {(hasSuccess || currentValidationState === 'success') && (
        <div className="form-success-text" role="status">
          <Icon name="check-circle" size={14} />
          {successText || 'Valid input'}
        </div>
      )}

      {(hasWarning || currentValidationState === 'warning') && (
        <div className="form-warning-text" role="alert">
          <Icon name="alert-triangle" size={14} />
          {warningText || 'Input warning'}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Number Input Component
export interface NumberInputProps extends Omit<InputProps, 'type' | 'variant'> {
  variant?: 'default' | 'technical' | 'measurement';
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  showSteppers?: boolean;
  onValueChange?: (value: number | undefined) => void;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  min,
  max,
  step = 1,
  precision,
  showSteppers = false,
  variant = 'technical',
  value,
  onChange,
  onValueChange,
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.target.value;
    let numValue: number | undefined;

    if (stringValue === '' || stringValue === '-') {
      numValue = undefined;
    } else {
      numValue = parseFloat(stringValue);
      if (isNaN(numValue)) {
        return; // Don't update if not a valid number
      }

      // Apply precision if specified
      if (precision !== undefined) {
        numValue = parseFloat(numValue.toFixed(precision));
      }

      // Apply min/max constraints
      if (min !== undefined && numValue < min) {
        numValue = min;
      }
      if (max !== undefined && numValue > max) {
        numValue = max;
      }
    }

    // Update the input value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: numValue?.toString() || ''
      }
    };

    onChange?.(syntheticEvent);
    onValueChange?.(numValue);
  };

  const handleStep = (direction: 'up' | 'down') => {
    const currentValue = typeof value === 'string' ? parseFloat(value) : (value as number) || 0;
    const stepValue = direction === 'up' ? step : -step;
    let newValue = currentValue + stepValue;

    if (min !== undefined && newValue < min) {
      newValue = min;
    }
    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    if (precision !== undefined) {
      newValue = parseFloat(newValue.toFixed(precision));
    }

    onValueChange?.(newValue);
  };

  return (
    <div className="number-input-container">
      <Input
        ref={ref}
        type="number"
        variant={variant}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        {...props}
      />

      {showSteppers && (
        <div className="number-input-steppers">
          <button
            type="button"
            className="number-input-stepper number-input-stepper-up"
            onClick={() => handleStep('up')}
            disabled={props.disabled || (max !== undefined && (value as number) >= max)}
            tabIndex={-1}
            aria-label="Increase value"
          >
            <Icon name="chevron-up" size={12} />
          </button>
          <button
            type="button"
            className="number-input-stepper number-input-stepper-down"
            onClick={() => handleStep('down')}
            disabled={props.disabled || (min !== undefined && (value as number) <= min)}
            tabIndex={-1}
            aria-label="Decrease value"
          >
            <Icon name="chevron-down" size={12} />
          </button>
        </div>
      )}
    </div>
  );
});

NumberInput.displayName = 'NumberInput';

// Coordinate Input Component (for X, Y, Z coordinates)
export interface CoordinateInputProps {
  value?: { x?: number; y?: number; z?: number };
  onChange?: (value: { x?: number; y?: number; z?: number }) => void;
  labels?: { x?: string; y?: string; z?: string };
  unit?: string;
  precision?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CoordinateInput: React.FC<CoordinateInputProps> = ({
  value = {},
  onChange,
  labels = { x: 'X', y: 'Y', z: 'Z' },
  unit = 'mm',
  precision = 2,
  disabled = false,
  size = 'md',
  className = ''
}) => {
  const handleCoordinateChange = (axis: 'x' | 'y' | 'z', newValue: number | undefined) => {
    onChange?.({
      ...value,
      [axis]: newValue
    });
  };

  return (
    <div className={`coordinate-input ${className}`}>
      <div className="coordinate-input-fields">
        {(['x', 'y', 'z'] as const).map((axis) => (
          <div key={axis} className="coordinate-input-field">
            <NumberInput
              label={labels[axis]}
              value={value[axis]}
              onValueChange={(newValue) => handleCoordinateChange(axis, newValue)}
              unit={unit}
              precision={precision}
              disabled={disabled}
              size={size}
              variant="measurement"
            />
          </div>
        ))}
      </div>
    </div>
  );
};