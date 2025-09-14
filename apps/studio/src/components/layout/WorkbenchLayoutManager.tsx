import React, { useEffect, useMemo } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { ResizablePanel, WorkbenchLayout } from './ResizablePanel';
import { LayoutControls } from './LayoutControls';
import { useLayoutStore } from '../../store/layout-store';
import type { PanelId } from '../../types/layout';
import './layout.css';

interface WorkbenchLayoutManagerProps {
  children: {
    nodePanel?: React.ReactNode;
    nodeEditor?: React.ReactNode;
    viewport3d?: React.ReactNode;
    inspector?: React.ReactNode;
    console?: React.ReactNode;
    toolbar?: React.ReactNode;
  };
  controlsPosition?: 'top' | 'bottom' | 'floating';
}

interface PanelComponentProps {
  panelId: PanelId;
  children?: React.ReactNode;
}

const PanelComponent: React.FC<PanelComponentProps> = ({ panelId, children }) => (
  <ResizablePanel id={panelId}>
    {children}
  </ResizablePanel>
);

export const WorkbenchLayoutManager: React.FC<WorkbenchLayoutManagerProps> = ({
  children,
  controlsPosition = 'floating'
}) => {
  const {
    currentLayout,
    focusMode,
    updateScreenSize,
    getScreenSize,
    isInitialized
  } = useLayoutStore();

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const newScreenSize = getScreenSize();
      updateScreenSize(newScreenSize);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getScreenSize, updateScreenSize]);

  // Get visible panels in order (including minimized ones)
  const visiblePanels = useMemo(() => {
    return Object.entries(currentLayout.panels)
      .filter(([_, panel]) => panel.visible)
      .sort(([_, a], [__, b]) => a.order - b.order)
      .map(([id]) => id as PanelId);
  }, [currentLayout.panels]);

  // If focus mode is active, render focused panel only
  if (focusMode.focusedPanel) {
    const focusedPanelContent = children[focusMode.focusedPanel];
    return (
      <div className="workbench-layout focus-mode">
        <LayoutControls position={controlsPosition} />
        <PanelComponent panelId={focusMode.focusedPanel}>
          {focusedPanelContent}
        </PanelComponent>
      </div>
    );
  }

  // Render normal layout if not initialized yet
  if (!isInitialized) {
    return (
      <div className="workbench-layout">
        <div className="loading-layout">
          Loading workspace...
        </div>
      </div>
    );
  }

  // Calculate panel sizes and structure
  const leftPanels = visiblePanels.filter(id => currentLayout.panels[id].position === 'left');
  const rightPanels = visiblePanels.filter(id => currentLayout.panels[id].position === 'right');
  const centerPanels = visiblePanels.filter(id => currentLayout.panels[id].position === 'center');
  const bottomPanels = visiblePanels.filter(id => currentLayout.panels[id].position === 'bottom');
  const topPanels = visiblePanels.filter(id => currentLayout.panels[id].position === 'top');

  return (
    <div className="workbench-layout">
      <LayoutControls position={controlsPosition} />

      <PanelGroup direction="vertical" className="main-layout-container">
        {/* Top panels (toolbar) */}
        {topPanels.length > 0 && (
          <>
            <Panel
              id="top-area"
              defaultSize={5}
              minSize={3}
              maxSize={10}
              collapsible={false}
            >
              <div className="top-panels-container">
                {topPanels.map(panelId => (
                  <PanelComponent key={panelId} panelId={panelId}>
                    {children[panelId]}
                  </PanelComponent>
                ))}
              </div>
            </Panel>
            <PanelResizeHandle className="panel-resize-handle horizontal" />
          </>
        )}

        {/* Main content area */}
        <Panel id="main-area" minSize={40}>
          <PanelGroup direction="horizontal" className="main-panel-group">
            {/* Left sidebar */}
            {leftPanels.length > 0 && (
              <>
                <Panel
                  id="left-sidebar"
                  defaultSize={leftPanels.reduce((acc, id) =>
                    acc + (currentLayout.panels[id].size.width as number || 280), 0
                  )}
                  minSize={200}
                  maxSize={500}
                  collapsible
                >
                  <div className="left-panels-container">
                    {leftPanels.map(panelId => (
                      <PanelComponent key={panelId} panelId={panelId}>
                        {children[panelId]}
                      </PanelComponent>
                    ))}
                  </div>
                </Panel>
                <PanelResizeHandle className="panel-resize-handle" />
              </>
            )}

            {/* Center content area */}
            {centerPanels.length > 0 && (
              <Panel id="center-area" minSize={30}>
                <PanelGroup direction="vertical" className="center-content-group">
                  {centerPanels.map((panelId, index) => (
                    <React.Fragment key={panelId}>
                      <Panel
                        id={`center-${panelId}`}
                        defaultSize={
                          typeof currentLayout.panels[panelId].size.height === 'string'
                            ? parseFloat(currentLayout.panels[panelId].size.height as string)
                            : 50
                        }
                        minSize={15}
                        maxSize={85}
                      >
                        <PanelComponent panelId={panelId}>
                          {children[panelId]}
                        </PanelComponent>
                      </Panel>
                      {index < centerPanels.length - 1 && (
                        <PanelResizeHandle className="panel-resize-handle horizontal" />
                      )}
                    </React.Fragment>
                  ))}
                </PanelGroup>
              </Panel>
            )}

            {/* Right sidebar */}
            {rightPanels.length > 0 && (
              <>
                <PanelResizeHandle className="panel-resize-handle" />
                <Panel
                  id="right-sidebar"
                  defaultSize={rightPanels.reduce((acc, id) =>
                    acc + (currentLayout.panels[id].size.width as number || 320), 0
                  )}
                  minSize={200}
                  maxSize={500}
                  collapsible
                >
                  <div className="right-panels-container">
                    {rightPanels.map(panelId => (
                      <PanelComponent key={panelId} panelId={panelId}>
                        {children[panelId]}
                      </PanelComponent>
                    ))}
                  </div>
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>

        {/* Bottom panels (console) */}
        {bottomPanels.length > 0 && (
          <>
            <PanelResizeHandle className="panel-resize-handle horizontal" />
            <Panel
              id="bottom-area"
              defaultSize={bottomPanels.reduce((acc, id) =>
                acc + (currentLayout.panels[id].size.height as number || 120), 0
              )}
              minSize={80}
              maxSize={400}
              collapsible
            >
              <div className="bottom-panels-container">
                {bottomPanels.map(panelId => (
                  <PanelComponent key={panelId} panelId={panelId}>
                    {children[panelId]}
                  </PanelComponent>
                ))}
              </div>
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
};

export default WorkbenchLayoutManager;