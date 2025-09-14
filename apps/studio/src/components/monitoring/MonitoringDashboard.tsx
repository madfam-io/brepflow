/**
 * Monitoring dashboard component for development and debugging
 */

import React, { useState, useEffect, useCallback } from 'react';
import { MonitoringSystem } from '../../lib/monitoring/monitoring-system';
import { HealthAlert } from '../../lib/monitoring/health-monitor';
import { BrepFlowError } from '../../lib/error-handling/types';

interface MonitoringDashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

export const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({
  isVisible,
  onClose
}) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<'health' | 'errors' | 'metrics' | 'logs'>('health');
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);

  const refreshData = useCallback(() => {
    try {
      const monitoringSystem = MonitoringSystem.getInstance();
      const data = monitoringSystem.getMonitoringDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to refresh monitoring data:', error);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      refreshData();

      // Auto-refresh every 5 seconds when visible
      const interval = setInterval(refreshData, 5000);
      setRefreshInterval(interval);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    } else if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
  }, [isVisible, refreshData]);

  if (!isVisible || !dashboardData) {
    return null;
  }

  const formatBytes = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const renderHealthTab = () => (
    <div className="monitoring-tab-content">
      <div className="health-overview">
        <h3>System Health</h3>
        <div className="health-metrics">
          <div className="metric">
            <label>Memory Usage:</label>
            <span>{formatBytes(dashboardData.systemHealth.memoryUsage)}</span>
          </div>
          <div className="metric">
            <label>Error Rate:</label>
            <span style={{ color: dashboardData.systemHealth.errorRate > 5 ? '#dc2626' : '#10b981' }}>
              {formatPercent(dashboardData.systemHealth.errorRate)}
            </span>
          </div>
          <div className="metric">
            <label>Avg Response Time:</label>
            <span style={{ color: dashboardData.systemHealth.averageResponseTime > 1000 ? '#f59e0b' : '#10b981' }}>
              {dashboardData.systemHealth.averageResponseTime.toFixed(0)}ms
            </span>
          </div>
          <div className="metric">
            <label>Active Workers:</label>
            <span>{dashboardData.systemHealth.activeWorkers}</span>
          </div>
        </div>
      </div>

      <div className="active-alerts">
        <h3>Active Alerts ({dashboardData.activeAlerts.length})</h3>
        {dashboardData.activeAlerts.length === 0 ? (
          <p className="no-alerts">✅ No active alerts</p>
        ) : (
          <div className="alerts-list">
            {dashboardData.activeAlerts.map((alert: HealthAlert) => (
              <div
                key={alert.id}
                className="alert-item"
                style={{ borderLeft: `4px solid ${getSeverityColor(alert.severity)}` }}
              >
                <div className="alert-header">
                  <span className="alert-type">{alert.type}</span>
                  <span className="alert-severity" style={{ color: getSeverityColor(alert.severity) }}>
                    {alert.severity}
                  </span>
                  <span className="alert-time">{formatTime(alert.timestamp)}</span>
                </div>
                <div className="alert-message">{alert.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderErrorsTab = () => (
    <div className="monitoring-tab-content">
      <div className="errors-overview">
        <h3>Recent Errors ({dashboardData.activeErrors.length} active)</h3>
        {dashboardData.activeErrors.length === 0 ? (
          <p className="no-errors">✅ No active errors</p>
        ) : (
          <div className="errors-list">
            {dashboardData.activeErrors.slice(0, 10).map((error: BrepFlowError) => (
              <div key={error.id} className="error-item">
                <div className="error-header">
                  <span className="error-code">{error.code}</span>
                  <span className="error-severity" style={{ color: getSeverityColor(error.severity) }}>
                    {error.severity}
                  </span>
                  <span className="error-time">{formatTime(error.occurredAt.getTime())}</span>
                </div>
                <div className="error-message">{error.userMessage}</div>
                {error.context.nodeId && (
                  <div className="error-context">Node: {error.context.nodeId}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderMetricsTab = () => (
    <div className="monitoring-tab-content">
      <div className="metrics-overview">
        <h3>Performance Metrics</h3>

        <div className="metrics-section">
          <h4>Counters</h4>
          <div className="metrics-grid">
            {Object.entries(dashboardData.metrics.counters).map(([key, value]) => (
              <div key={key} className="metric-item">
                <label>{key}:</label>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="metrics-section">
          <h4>Gauges</h4>
          <div className="metrics-grid">
            {Object.entries(dashboardData.metrics.gauges).map(([key, value]) => (
              <div key={key} className="metric-item">
                <label>{key}:</label>
                <span>
                  {typeof value === 'number' ?
                    (key.includes('bytes') ? formatBytes(value as number) : value) :
                    String(value)
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="metrics-section">
          <h4>Response Times</h4>
          <div className="metrics-grid">
            {Object.entries(dashboardData.metrics.histograms).map(([key, stats]: [string, any]) => (
              <div key={key} className="histogram-item">
                <label>{key}:</label>
                <div className="histogram-stats">
                  <span>Avg: {stats.avg.toFixed(1)}ms</span>
                  <span>P95: {stats.p95.toFixed(1)}ms</span>
                  <span>Count: {stats.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogsTab = () => (
    <div className="monitoring-tab-content">
      <div className="logs-overview">
        <h3>System Logs</h3>
        <p>Logs are available in the browser console. Enable remote logging to view them here.</p>
        <div className="log-controls">
          <button onClick={() => console.clear()}>Clear Console</button>
          <button onClick={() => window.open('', '_blank')?.console?.log('Console opened')}>
            Open Console
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="monitoring-dashboard-overlay">
      <div className="monitoring-dashboard">
        <div className="dashboard-header">
          <h2>🔧 Monitoring Dashboard</h2>
          <div className="dashboard-controls">
            <button onClick={refreshData} className="refresh-btn">
              🔄 Refresh
            </button>
            <button onClick={onClose} className="close-btn">
              ✕
            </button>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab ${selectedTab === 'health' ? 'active' : ''}`}
            onClick={() => setSelectedTab('health')}
          >
            Health
          </button>
          <button
            className={`tab ${selectedTab === 'errors' ? 'active' : ''}`}
            onClick={() => setSelectedTab('errors')}
          >
            Errors ({dashboardData.activeErrors.length})
          </button>
          <button
            className={`tab ${selectedTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setSelectedTab('metrics')}
          >
            Metrics
          </button>
          <button
            className={`tab ${selectedTab === 'logs' ? 'active' : ''}`}
            onClick={() => setSelectedTab('logs')}
          >
            Logs
          </button>
        </div>

        <div className="dashboard-content">
          {selectedTab === 'health' && renderHealthTab()}
          {selectedTab === 'errors' && renderErrorsTab()}
          {selectedTab === 'metrics' && renderMetricsTab()}
          {selectedTab === 'logs' && renderLogsTab()}
        </div>
      </div>

      <style jsx>{`
        .monitoring-dashboard-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .monitoring-dashboard {
          background: white;
          border-radius: 8px;
          width: 90vw;
          height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .dashboard-header h2 {
          margin: 0;
          color: #1f2937;
        }

        .dashboard-controls {
          display: flex;
          gap: 0.5rem;
        }

        .refresh-btn, .close-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .refresh-btn:hover, .close-btn:hover {
          background: #f3f4f6;
        }

        .dashboard-tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .tab {
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          font-weight: 500;
          color: #6b7280;
        }

        .tab:hover {
          background: #f3f4f6;
        }

        .tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
          background: white;
        }

        .dashboard-content {
          flex: 1;
          overflow: auto;
          padding: 1.5rem;
        }

        .monitoring-tab-content h3 {
          margin: 0 0 1rem 0;
          color: #1f2937;
        }

        .health-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .metric {
          padding: 1rem;
          background: #f9fafb;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric label {
          font-weight: 500;
          color: #374151;
        }

        .metric span {
          font-weight: 600;
          color: #1f2937;
        }

        .no-alerts, .no-errors {
          color: #10b981;
          font-weight: 500;
          text-align: center;
          padding: 2rem;
          background: #f0fdf4;
          border-radius: 6px;
        }

        .alerts-list, .errors-list {
          space-y: 0.5rem;
        }

        .alert-item, .error-item {
          padding: 1rem;
          background: #f9fafb;
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .alert-header, .error-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .alert-type, .error-code {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          color: #374151;
        }

        .alert-severity, .error-severity {
          font-weight: 500;
          text-transform: capitalize;
          font-size: 0.875rem;
        }

        .alert-time, .error-time {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .alert-message, .error-message {
          color: #374151;
          font-size: 0.875rem;
        }

        .error-context {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        .metrics-section {
          margin-bottom: 2rem;
        }

        .metrics-section h4 {
          margin: 0 0 0.75rem 0;
          color: #374151;
          font-size: 1rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.75rem;
        }

        .metric-item, .histogram-item {
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .histogram-stats {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }

        .histogram-stats span {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .logs-overview {
          text-align: center;
          padding: 2rem;
        }

        .log-controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .log-controls button {
          padding: 0.75rem 1.5rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .log-controls button:hover {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
};