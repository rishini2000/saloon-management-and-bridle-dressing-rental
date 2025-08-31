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

interface RightSideDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  children?: React.ReactNode;
  sections?: DrawerSection[];
  showActionPanel?: boolean;
  drawerActions?: ActionButton[];
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  onDiscard?: () => void;
  className?: string;
}

export const RightSideDrawer: React.FC<RightSideDrawerProps> = ({
  open,
  onClose,
  title = 'Details',
  width = 400,
  children,
  sections = [],
  showActionPanel = false,
  drawerActions = [],
  hasUnsavedChanges = false,
  onSave,
  onDiscard,
  className
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

  const renderActionPanel = () => {
    if (!showActionPanel) return null;

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

  const renderSections = () => {
    if (sections.length === 0) return children;

    const collapsibleSections = sections.filter(section => section.collapsible !== false);
    const nonCollapsibleSections = sections.filter(section => section.collapsible === false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Non-collapsible sections */}
        {nonCollapsibleSections.map((section, index) => (
          <div key={section.key}>
            {section.title && (
              <h4 style={{ 
                margin: '16px 0 12px 0',
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--theme-text)'
              }}>
                {section.title}
              </h4>
            )}
            <div style={{ marginBottom: '16px' }}>
              {section.content}
            </div>
            {index < nonCollapsibleSections.length - 1 && <Divider />}
          </div>
        ))}

        {/* Collapsible sections */}
        {collapsibleSections.length > 0 && (
          <>
            {nonCollapsibleSections.length > 0 && <Divider />}
            <Collapse
              activeKey={activeKeys}
              onChange={handleCollapseChange}
              ghost
              style={{ flex: 1 }}
            >
              {collapsibleSections.map((section) => (
                <Panel
                  key={section.key}
                  header={section.title}
                  style={{
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {section.content}
                </Panel>
              ))}
            </Collapse>
          </>
        )}

        {/* Custom children content */}
        {children && (
          <>
            <Divider />
            <div style={{ flex: 1 }}>
              {children}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Drawer
      title={title}
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
          height: '100%'
        }
      }}
      extra={
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose}
          size="small"
        />
      }
    >
      <div style={{ 
        flex: 1, 
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}>
        {renderSections()}
        
        {/* Drawer Actions */}
        {drawerActions.length > 0 && (
          <>
            <Divider />
            <div style={{ marginTop: '16px' }}>
              <ActionPanel actions={drawerActions} />
            </div>
          </>
        )}
      </div>
      {renderActionPanel()}
    </Drawer>
  );
};
