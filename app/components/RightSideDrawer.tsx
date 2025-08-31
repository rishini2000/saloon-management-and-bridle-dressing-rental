import React, { useState, useEffect } from 'react';
import { Drawer, Button, Space, Collapse, Divider } from 'antd';
import { SaveOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ActionPanel, type ActionButton } from './ActionPanel';

const { Panel } = Collapse;

export interface DrawerSection {
  key: string;
  title: string;
  content: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export interface DrawerVisualArea {
  content: React.ReactNode;
  height?: number;
  backgroundColor?: string;
}

export interface DrawerActionButton {
  key: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface RightSideDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  children?: React.ReactNode;
  // Visual area at the top (e.g., status indicators, images, etc.)
  visualArea?: DrawerVisualArea;
  // Action buttons area (below visual area)
  actionButtons?: ActionButton[];
  // Quick action buttons below visual area (gray borderless link buttons)
  quickActionButtons?: DrawerActionButton[];
  // Collapsible content sections
  sections?: DrawerSection[];
  // Save/Discard area at bottom
  showSaveDiscardPanel?: boolean;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  onDiscard?: () => void;
  className?: string;
  // Legacy props for backward compatibility
  showActionPanel?: boolean;
  drawerActions?: ActionButton[];
}

export const RightSideDrawer: React.FC<RightSideDrawerProps> = ({
  open,
  onClose,
  title = 'Details',
  width = 400,
  children,
  visualArea,
  actionButtons = [],
  quickActionButtons = [],
  sections = [],
  showSaveDiscardPanel = false,
  hasUnsavedChanges = false,
  onSave,
  onDiscard,
  className,
  // Legacy props
  showActionPanel = false,
  drawerActions = []
}) => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    // Set default open sections
    if (sections && sections.length > 0) {
      const defaultOpenSections = sections
        .filter(section => section.defaultOpen !== false)
        .map(section => section.key);
      setActiveKeys(prev => {
        // Only update if the keys are different to prevent infinite loops
        const prevSet = new Set(prev);
        const newSet = new Set(defaultOpenSections);
        if (prevSet.size !== newSet.size || [...prevSet].some(key => !newSet.has(key))) {
          return defaultOpenSections;
        }
        return prev;
      });
    }
  }, [sections?.length]);

  const handleCollapseChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const handleDiscard = () => {
    if (onDiscard) {
      onDiscard();
    }
  };

  const renderVisualArea = () => {
    return visualArea && (
      <div 
        style={{ 
          height: visualArea.height || 120, 
          backgroundColor: visualArea.backgroundColor || 'var(--theme-background)', 
          borderBottom: '1px solid var(--theme-border)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '16px'
        }}
      >
        {visualArea.content}
      </div>
    );
  };

  const renderActionButtons = () => {
    const buttons = actionButtons.length > 0 ? actionButtons : drawerActions;
    if (buttons.length === 0) return null;

    return (
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--theme-border)',
        backgroundColor: 'var(--theme-surface)'
      }}>
        <ActionPanel actions={buttons} />
      </div>
    );
  };

  const renderQuickActionButtons = () => {
    if (quickActionButtons.length === 0) return null;

    return (
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--theme-border)',
        backgroundColor: 'var(--theme-background)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Space wrap size="small">
          {quickActionButtons.map((button) => (
            <Button
              key={button.key}
              type="link"
              size="small"
              icon={button.icon}
              onClick={button.onClick}
              style={{
                color: 'var(--theme-text-secondary)',
                padding: '4px 8px',
                height: 'auto',
                border: 'none',
                fontSize: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--theme-text)';
                e.currentTarget.style.backgroundColor = 'var(--theme-border)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--theme-text-secondary)';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {button.label}
            </Button>
          ))}
        </Space>
      </div>
    );
  };

  const renderSaveDiscardPanel = () => {
    if (!showSaveDiscardPanel && !showActionPanel) return null;

    return (
      <div style={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'var(--theme-surface)',
        borderTop: '1px solid var(--theme-border)',
        padding: '16px',
        marginTop: 'auto'
      }}>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={handleDiscard} disabled={!hasUnsavedChanges}>
            Discard
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
          >
            Save Changes
          </Button>
        </Space>
      </div>
    );
  };

  const renderContentSections = () => {
    if (sections.length === 0 && !children) return null;

    return (
      <div className="drawer-content-scrollable" style={{ flex: 1, overflow: 'auto', paddingLeft: '12px', paddingRight: '12px', direction: 'rtl' }}>
        {/* Collapsible sections */}
        {sections.length > 0 && (
          <Collapse
            activeKey={activeKeys}
            onChange={handleCollapseChange}
            ghost
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              marginTop: '0px',
              direction: 'ltr'
            }}
          >
            {sections.map((section) => (
              <Panel
                key={section.key}
                header={section.title}
                style={{
                  fontFamily: 'var(--font-primary)',
                  backgroundColor: 'transparent',
                  marginBottom: '0px',
                  borderRadius: '0px',
                  border: 'none',
                  borderBottom: section.key === sections[sections.length - 1]?.key ? 'none' : '1px solid var(--theme-border)'
                }}
                className="custom-collapse-panel"
              >
                <div style={{ padding: '8px 0px' }}>
                  {section.content}
                </div>
              </Panel>
            ))}
          </Collapse>
        )}

        {/* Custom children content */}
        {children && (
          <div style={{ 
            padding: sections.length > 0 ? '16px 0 0 0' : '0',
            flex: 1
          }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          .custom-collapse-panel {
            border-radius: 0 !important;
          }
          .custom-collapse-panel .ant-collapse-header {
            border-bottom: 1px solid var(--theme-border) !important;
            background-color: transparent !important;
            border-radius: 0 !important;
          }
          .custom-collapse-panel .ant-collapse-content {
            border-top: none !important;
            background-color: transparent !important;
            border-radius: 0 !important;
          }
          .custom-collapse-panel .ant-collapse-content-box {
            border-top: none !important;
          }
          .custom-collapse-panel:last-child {
            border-radius: 0 !important;
          }
          .custom-collapse-panel:last-child .ant-collapse-header {
            border-radius: 0 !important;
            border-bottom: none !important;
          }
          .custom-collapse-panel:last-child .ant-collapse-content {
            border-radius: 0 !important;
          }
          /* Custom scrollbar styling for sharp edges */
          .drawer-content-scrollable::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .drawer-content-scrollable::-webkit-scrollbar-track {
            background: var(--theme-surface);
            border-radius: 0;
          }
          .drawer-content-scrollable::-webkit-scrollbar-thumb {
            background: var(--theme-border);
            border-radius: 0;
          }
          .drawer-content-scrollable::-webkit-scrollbar-thumb:hover {
            background: var(--theme-primary);
          }
        `}
      </style>
      <Drawer
        title={null}
        placement="right"
        onClose={onClose}
        open={open}
        width={width}
        className={className}
      styles={{
        body: { 
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderLeft: '1px solid var(--theme-border)'
        },
        header: {
          borderBottom: 'none',
          backgroundColor: 'var(--theme-background)',
          borderLeft: '1px solid var(--theme-border)'
        }
      }}
      closeIcon={<CloseOutlined />}
    >
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {/* Visual Area */}
        {renderVisualArea()}
        
        {/* Quick Action Buttons */}
        {renderQuickActionButtons()}
        
        {/* Action Buttons Area */}
        {renderActionButtons()}
        
        {/* Content Sections */}
        <div style={{ 
          flex: 1, 
          padding: '0', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden'
        }}>
          {renderContentSections()}
        </div>
        
        {/* Save/Discard Panel */}
        {renderSaveDiscardPanel()}
      </div>
    </Drawer>
    </>
  );
};
