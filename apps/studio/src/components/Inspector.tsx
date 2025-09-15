import React, { useState, useCallback, useMemo } from 'react';
import type { NodeInstance } from '@brepflow/types';
import { StatusIcon } from './icons/IconSystem';
import { Icon } from './common/Icon';
import './Inspector.css';

interface InspectorProps {
  selectedNode: NodeInstance | null;
  onParamChange: (nodeId: string, updates: Partial<NodeInstance>) => void;
}

interface ParamConfig {
  name: string;
  label: string;
  type: 'number' | 'vector3' | 'angle' | 'count' | 'text' | 'select' | 'boolean' | 'range';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  unit?: string;
  description?: string;
  validation?: (value: any) => string | null;
}

const getNodeParameterConfig = (nodeType: string): ParamConfig[] => {
  const type = nodeType.split('::')[1]?.toLowerCase();

  switch (type) {
    case 'box':
      return [
        { name: 'width', label: 'Width', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Box width dimension' },
        { name: 'height', label: 'Height', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Box height dimension' },
        { name: 'depth', label: 'Depth', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Box depth dimension' },
      ];
    case 'cylinder':
      return [
        { name: 'radius', label: 'Radius', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Cylinder radius' },
        { name: 'height', label: 'Height', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Cylinder height' },
      ];
    case 'sphere':
      return [
        { name: 'radius', label: 'Radius', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Sphere radius' },
      ];
    case 'extrude':
      return [
        { name: 'distance', label: 'Distance', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Extrusion distance' },
      ];
    case 'revolve':
      return [
        { name: 'angle', label: 'Angle', type: 'angle', min: 1, max: 360, step: 1, unit: '°', description: 'Revolution angle' },
      ];
    case 'fillet':
      return [
        { name: 'radius', label: 'Radius', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Fillet radius' },
      ];
    case 'chamfer':
      return [
        { name: 'distance', label: 'Distance', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Chamfer distance' },
      ];
    case 'move':
      return [
        { name: 'x', label: 'X', type: 'number', step: 0.1, unit: 'mm', description: 'X translation' },
        { name: 'y', label: 'Y', type: 'number', step: 0.1, unit: 'mm', description: 'Y translation' },
        { name: 'z', label: 'Z', type: 'number', step: 0.1, unit: 'mm', description: 'Z translation' },
      ];
    case 'rotate':
      return [
        { name: 'x', label: 'X Rotation', type: 'angle', min: -360, max: 360, step: 1, unit: '°', description: 'Rotation around X axis' },
        { name: 'y', label: 'Y Rotation', type: 'angle', min: -360, max: 360, step: 1, unit: '°', description: 'Rotation around Y axis' },
        { name: 'z', label: 'Z Rotation', type: 'angle', min: -360, max: 360, step: 1, unit: '°', description: 'Rotation around Z axis' },
      ];
    case 'scale':
      return [
        { name: 'factor', label: 'Scale Factor', type: 'number', min: 0.01, step: 0.01, description: 'Uniform scale factor' },
      ];
    case 'lineararray':
      return [
        { name: 'count', label: 'Count', type: 'count', min: 2, max: 100, step: 1, description: 'Number of instances' },
        { name: 'spacing', label: 'Spacing', type: 'number', min: 0.1, step: 0.1, unit: 'mm', description: 'Distance between instances' },
      ];
    case 'circulararray':
      return [
        { name: 'count', label: 'Count', type: 'count', min: 2, max: 100, step: 1, description: 'Number of instances' },
        { name: 'angle', label: 'Total Angle', type: 'angle', min: 1, max: 360, step: 1, unit: '°', description: 'Total angle of array' },
      ];
    default:
      return [];
  }
};

interface ParameterFieldProps {
  config: ParamConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

function ParameterField({ config, value, onChange, error }: ParameterFieldProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = config.type === 'number' || config.type === 'angle' || config.type === 'count'
      ? parseFloat(e.target.value) || 0
      : e.target.value;
    onChange(newValue);
  }, [config.type, onChange]);

  const inputStyle = {
    width: '100%',
    padding: 'var(--spacing-2) var(--spacing-3)',
    border: `1px solid ${error ? 'var(--color-error-500)' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-surface-primary)',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'var(--font-family-ui)',
    transition: 'all var(--transition-fast)',
    outline: 'none',
  };

  const focusStyle = {
    borderColor: 'var(--color-primary-500)',
    boxShadow: '0 0 0 3px var(--color-primary-100)',
  };

  return (
    <div style={{ marginBottom: 'var(--spacing-3)' }}>
      <label
        style={{
          display: 'block',
          marginBottom: 'var(--spacing-2)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--color-text-primary)',
        }}
      >
        {config.label}
        {config.unit && (
          <span style={{ color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>
            {' '}({config.unit})
          </span>
        )}
      </label>

      <div style={{ position: 'relative' }}>
        <input
          type="number"
          value={value || 0}
          onChange={handleChange}
          min={config.min}
          max={config.max}
          step={config.step}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, { borderColor: error ? 'var(--color-error-500)' : 'var(--color-border)', boxShadow: 'none' })}
        />
        {config.unit && (
          <div
            style={{
              position: 'absolute',
              right: 'var(--spacing-3)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-tertiary)',
              fontSize: 'var(--font-size-xs)',
              pointerEvents: 'none',
            }}
          >
            {config.unit}
          </div>
        )}
      </div>

      {config.description && (
        <div
          style={{
            marginTop: 'var(--spacing-1)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {config.description}
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: 'var(--spacing-1)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-error-600)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-1)',
          }}
        >
          <Icon name="warning" size={12} />
          {error}
        </div>
      )}
    </div>
  );
}

export function Inspector({ selectedNode, onParamChange }: InspectorProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    parameters: true,
    preview: true,
    inputs: false,
    outputs: false
  });

  const parameterConfigs = useMemo(() => {
    return selectedNode ? getNodeParameterConfig(selectedNode.type) : [];
  }, [selectedNode?.type]);

  const validateParams = useCallback((paramValues: Record<string, any>): Record<string, string> => {
    const validationErrors: Record<string, string> = {};

    parameterConfigs.forEach(config => {
      const value = paramValues[config.name];

      if (value === undefined || value === null || value === '') {
        validationErrors[config.name] = `${config.label} is required`;
        return;
      }

      if (typeof value === 'number') {
        if (isNaN(value)) {
          validationErrors[config.name] = `${config.label} must be a number`;
          return;
        }

        if (config.min !== undefined && value < config.min) {
          validationErrors[config.name] = `${config.label} must be at least ${config.min}`;
          return;
        }

        if (config.max !== undefined && value > config.max) {
          validationErrors[config.name] = `${config.label} must be at most ${config.max}`;
          return;
        }
      }
    });

    return validationErrors;
  }, [parameterConfigs]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const formatNodeType = useCallback((type: string) => {
    const parts = type.split('::');
    return parts[parts.length - 1];
  }, []);

  if (!selectedNode) {
    return (
      <div className="inspector">
        <div className="inspector-empty">
          Select a node to view properties
        </div>
      </div>
    );
  }

  const handleParamChange = useCallback((paramName: string, value: any) => {
    const newParams = { ...selectedNode.params, [paramName]: value };

    // Real-time validation
    const fieldErrors = validateParams({ [paramName]: value });
    if (!fieldErrors[paramName] && validationErrors[paramName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[paramName];
        return newErrors;
      });
    }

    // Update immediately for live editing
    onParamChange(selectedNode.id, {
      params: newParams,
      dirty: true,
    });
  }, [selectedNode, validateParams, validationErrors, onParamChange]);




  return (
    <div className="inspector">
      <div className="inspector-header">
        <h3>{formatNodeType(selectedNode.type)}</h3>
        <div className="inspector-type">{selectedNode.type}</div>
        <div className="inspector-id">{selectedNode.id}</div>
        <div className="inspector-status">
          <StatusIcon
            status={selectedNode.state?.error ? 'error' : selectedNode.dirty ? 'computing' : 'success'}
            size={16}
          />
          <span>
            {selectedNode.state?.error ? 'Error' : selectedNode.dirty ? 'Dirty' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Geometry Preview Section */}
      <div className="inspector-section">
        <div
          className="inspector-section-header"
          onClick={() => toggleSection('preview')}
        >
          <h4>Preview</h4>
          <span className={`expand-icon ${expandedSections.preview ? 'expanded' : ''}`}>▼</span>
        </div>
        {expandedSections.preview && (
          <div className="inspector-section-content">
            <div className="inspector-preview-container">
              <div className="geometry-preview-placeholder">
                <div className="preview-icon">📐</div>
                <div className="preview-text">Geometry Preview</div>
                <div className="preview-note">Preview will be available in future release</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Parameters Section */}
      {parameterConfigs.length > 0 && (
        <div className="inspector-section">
          <div
            className="inspector-section-header"
            onClick={() => toggleSection('parameters')}
          >
            <h4>Parameters</h4>
            <span className={`expand-icon ${expandedSections.parameters ? 'expanded' : ''}`}>▼</span>
          </div>
          {expandedSections.parameters && (
            <div className="inspector-section-content">
              {parameterConfigs.map(config => (
                <ParameterField
                  key={config.name}
                  config={config}
                  value={selectedNode.params?.[config.name]}
                  onChange={(value) => handleParamChange(config.name, value)}
                  error={validationErrors[config.name]}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inputs Section */}
      {selectedNode.inputs && Object.keys(selectedNode.inputs).length > 0 && (
        <div className="inspector-section">
          <div
            className="inspector-section-header"
            onClick={() => toggleSection('inputs')}
          >
            <h4>Inputs</h4>
            <span className={`expand-icon ${expandedSections.inputs ? 'expanded' : ''}`}>▼</span>
          </div>
          {expandedSections.inputs && (
            <div className="inspector-section-content">
              {Object.entries(selectedNode.inputs).map(([key, value]) => (
                <div key={key} className="inspector-field">
                  <label>{key}</label>
                  <div className="inspector-value">
                    <StatusIcon status={value ? 'success' : 'error'} size={12} />
                    <span>{value ? 'Connected' : 'Disconnected'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Outputs Section */}
      {selectedNode.outputs && (
        <div className="inspector-section">
          <div
            className="inspector-section-header"
            onClick={() => toggleSection('outputs')}
          >
            <h4>Outputs</h4>
            <span className={`expand-icon ${expandedSections.outputs ? 'expanded' : ''}`}>▼</span>
          </div>
          {expandedSections.outputs && (
            <div className="inspector-section-content">
              {Object.entries(selectedNode.outputs).map(([key, value]) => (
                <div key={key} className="inspector-field">
                  <label>{key}</label>
                  <div className="inspector-value">
                    <StatusIcon status={value ? 'success' : 'computing'} size={12} />
                    <span>{value ? 'Computed' : 'Pending'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Position Section */}
      <div className="inspector-section">
        <h4>Position</h4>
        <div className="inspector-section-content">
          <div className="inspector-field">
            <label>X</label>
            <input
              type="number"
              value={Math.round(selectedNode.position?.x || 0)}
              readOnly
              className="param-input readonly"
            />
          </div>
          <div className="inspector-field">
            <label>Y</label>
            <input
              type="number"
              value={Math.round(selectedNode.position?.y || 0)}
              readOnly
              className="param-input readonly"
            />
          </div>
        </div>
      </div>
    </div>
  );
}