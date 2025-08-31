import React, { useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';

export interface ActionButton {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  danger?: boolean;
  onClick: () => void;
  visible?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
}

interface ActionPanelProps {
  actions: ActionButton[];
  className?: string;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ actions, className }) => {
  const [visibleActions, setVisibleActions] = useState<Record<string, boolean>>({});

  const getVisibleActions = () => {
    const filtered = actions.filter(action => {
      const isVisible = action.visible !== false && (visibleActions[action.key] !== false);
      return isVisible;
    });

    // Sort buttons: Archive first, New last, others by priority/importance
    return filtered.sort((a, b) => {
      // Archive button goes first (leftmost)
      if (a.key.toLowerCase().includes('archive')) return -1;
      if (b.key.toLowerCase().includes('archive')) return 1;
      
      // New button goes last (rightmost)
      if (a.key.toLowerCase().includes('new')) return 1;
      if (b.key.toLowerCase().includes('new')) return -1;
      
      // For other buttons, maintain original order or sort by importance
      // Primary buttons come before default buttons
      if (a.type === 'primary' && b.type !== 'primary') return 1;
      if (b.type === 'primary' && a.type !== 'primary') return -1;
      
      return 0;
    });
  };

  const handleActionClick = (action: ActionButton) => {
    action.onClick();
  };

  return (
    <div className={className} style={{ 
      display: 'flex', 
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '8px'
    }}>
      <Space size="small">
        {getVisibleActions().map((action) => {
          const button = (
            <Button
              key={action.key}
              type={action.type || 'default'}
              icon={action.icon}
              danger={action.danger}
              disabled={action.disabled}
              onClick={() => handleActionClick(action)}
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              {!action.iconOnly && action.label}
            </Button>
          );

          return action.iconOnly ? (
            <Tooltip key={action.key} title={action.label}>
              {button}
            </Tooltip>
          ) : button;
        })}
      </Space>
    </div>
  );
};
