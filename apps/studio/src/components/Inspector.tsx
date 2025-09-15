import React, { useState, useEffect } from 'react';
import type { NodeInstance } from '@brepflow/types';
import { StatusIcon } from './icons/IconSystem';
import './Inspector.css';

interface InspectorProps {
  selectedNode: NodeInstance | null;
  onParamChange: (nodeId: string, updates: Partial<NodeInstance>) => void;
}

interface ParamConfig {
  type: 'number' | 'text' | 'select' | 'boolean' | 'range';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  unit?: string;
  validation?: (value: any) => string | null;
}

const getParamConfig = (nodeType: string, paramKey: string): ParamConfig => {
  const configs: Record<string, Record<string, ParamConfig>> = {
    'Solid::Box': {
      length: { type: 'range', min: 0.1, max: 100, step: 0.1, unit: 'mm' },
      width: { type: 'range', min: 0.1, max: 100, step: 0.1, unit: 'mm' },
      height: { type: 'range', min: 0.1, max: 100, step: 0.1, unit: 'mm' }
    },
    'Solid::Cylinder': {
      radius: { type: 'range', min: 0.1, max: 50, step: 0.1, unit: 'mm' },
      height: { type: 'range', min: 0.1, max: 100, step: 0.1, unit: 'mm' }
    },
    'Solid::Sphere': {
      radius: { type: 'range', min: 0.1, max: 50, step: 0.1, unit: 'mm' }
    },
    'Solid::Extrude': {
      distance: { type: 'range', min: 0.1, max: 100, step: 0.1, unit: 'mm' },
      draft: { type: 'range', min: 0, max: 45, step: 1, unit: '°' }
    },
    'Features::Fillet': {
      radius: { type: 'range', min: 0.1, max: 20, step: 0.1, unit: 'mm' }
    },
    'Features::Chamfer': {
      distance: { type: 'range', min: 0.1, max: 20, step: 0.1, unit: 'mm' }
    },
    'Transform::Move': {
      x: { type: 'number', unit: 'mm' },
      y: { type: 'number', unit: 'mm' },
      z: { type: 'number', unit: 'mm' }
    },
    'Transform::Rotate': {
      angle: { type: 'range', min: -360, max: 360, step: 1, unit: '°' }
    },
    'Boolean::Union': {
      tolerance: { type: 'range', min: 0.001, max: 1, step: 0.001, unit: 'mm' }
    }
  };

  return configs[nodeType]?.[paramKey] || { type: 'number' };
};

export function Inspector({ selectedNode, onParamChange }: InspectorProps) {
  if (!selectedNode) {
    return (
      <div className="inspector">
        <div className="inspector-empty">
          Select a node to view properties
        </div>
      </div>
    );
  }

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    { parameters: true, preview: true, inputs: false, outputs: false }
  );

  const handleParamChange = (key: string, value: any) => {
    const config = getParamConfig(selectedNode.type, key);

    // Parse and validate value
    let parsedValue = value;
    let validationError: string | null = null;

    if (config.type === 'number' || config.type === 'range') {
      parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        validationError = 'Must be a valid number';
      } else if (config.min !== undefined && parsedValue < config.min) {
        validationError = `Must be at least ${config.min}`;
      } else if (config.max !== undefined && parsedValue > config.max) {
        validationError = `Must be at most ${config.max}`;
      }
    } else if (config.type === 'boolean') {
      parsedValue = Boolean(value);
    }

    if (config.validation) {
      const error = config.validation(parsedValue);
      if (error) validationError = error;
    }

    // Update validation errors
    setValidationErrors(prev => ({
      ...prev,
      [key]: validationError || ''
    }));

    // Only update if valid
    if (!validationError) {
      onParamChange(selectedNode.id, {
        params: {
          ...selectedNode.params,
          [key]: parsedValue,
        },
        dirty: true,
      });
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderParameterInput = (key: string, value: any) => {
    const config = getParamConfig(selectedNode.type, key);
    const error = validationErrors[key];

    switch (config.type) {
      case 'range':
        return (
          <div className="param-control-group">
            <div className="param-range-group">
              <input
                type="range"
                min={config.min}
                max={config.max}
                step={config.step}
                value={value || config.min || 0}
                onChange={(e) => handleParamChange(key, e.target.value)}
                className="param-range"
              />
              <input
                type="number"
                min={config.min}
                max={config.max}
                step={config.step}
                value={value || ''}
                onChange={(e) => handleParamChange(key, e.target.value)}
                className="param-number"
              />
              {config.unit && <span className="param-unit">{config.unit}</span>}
            </div>
            {error && <div className="param-error">{error}</div>}
          </div>
        );

      case 'select':
        return (
          <div className="param-control-group">
            <select
              value={value || ''}
              onChange={(e) => handleParamChange(key, e.target.value)}
              className="param-select"
            >
              {config.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && <div className="param-error">{error}</div>}
          </div>
        );

      case 'boolean':
        return (
          <div className="param-control-group">
            <label className="param-checkbox">
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => handleParamChange(key, e.target.checked)}
              />
              <span className="param-checkbox-label">Enabled</span>
            </label>
            {error && <div className="param-error">{error}</div>}
          </div>
        );

      default:
        return (
          <div className="param-control-group">
            <div className="param-input-group">
              <input
                type={config.type === 'number' ? 'number' : 'text'}
                min={config.min}
                max={config.max}
                step={config.step}
                value={value || ''}
                onChange={(e) => handleParamChange(key, e.target.value)}
                className="param-input"
              />
              {config.unit && <span className="param-unit">{config.unit}</span>}
            </div>
            {error && <div className="param-error">{error}</div>}
          </div>
        );
    }
  };

  const formatNodeType = (type: string) => {
    const parts = type.split('::');
    return parts[parts.length - 1];
  };

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
      {selectedNode.params && Object.keys(selectedNode.params).length > 0 && (
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
              {Object.entries(selectedNode.params).map(([key, value]) => (
                <div key={key} className="inspector-field">
                  <label className="param-label">{key}</label>
                  {renderParameterInput(key, value)}
                </div>
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