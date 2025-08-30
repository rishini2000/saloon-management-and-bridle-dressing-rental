import React, { useState, useCallback } from 'react';
import { Layout } from 'antd';
import { FilterComponent, type FilterConfig, type FilterValues } from './FilterComponent';
import { ActionPanel, type ActionButton } from './ActionPanel';
import { RightSideDrawer, type DrawerSection } from './RightSideDrawer';

const { Content } = Layout;

export interface AbstractPageViewProps {
  title?: string;
  filterConfig?: FilterConfig;
  actions?: ActionButton[];
  children: React.ReactNode;
  drawerContent?: React.ReactNode;
  drawerSections?: DrawerSection[];
  drawerTitle?: string;
  drawerWidth?: number;
  showDrawer?: boolean;
  onDrawerClose?: () => void;
  onFiltersChange?: (filters: FilterValues) => void;
  className?: string;
}

export const AbstractPageView: React.FC<AbstractPageViewProps> = ({
  title,
  filterConfig,
  actions = [],
  children,
  drawerContent,
  drawerSections,
  drawerTitle,
  drawerWidth,
  showDrawer = false,
  onDrawerClose,
  onFiltersChange,
  className
}) => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync drawer state with prop
  React.useEffect(() => {
    setDrawerOpen(showDrawer);
  }, [showDrawer]);

  // Event broker functions
  const handleFiltersChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  }, [onFiltersChange]);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
    if (onDrawerClose) {
      onDrawerClose();
    }
  }, [onDrawerClose]);

  const handleDrawerSave = useCallback(() => {
    setHasUnsavedChanges(false);
    // Emit save event that parent can listen to
  }, []);

  const handleDrawerDiscard = useCallback(() => {
    setHasUnsavedChanges(false);
    // Emit discard event that parent can listen to
  }, []);

  // Public methods for parent components to control drawer
  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const markDrawerAsModified = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  // Expose control methods via ref (if needed)
  // Note: This would typically be used with forwardRef for parent component access

  return (
    <div className={className} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Filters and Actions */}
      {(filterConfig || actions.length > 0) && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {/* Filter Component */}
          <div style={{ flex: 1 }}>
            {filterConfig && (
              <FilterComponent
                config={filterConfig}
                onFiltersChange={handleFiltersChange}
              />
            )}
          </div>

          {/* Action Panel */}
          {actions.length > 0 && (
            <div style={{ flexShrink: 0 }}>
              <ActionPanel actions={actions} />
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <Content style={{ 
        flex: 1,
        backgroundColor: 'var(--theme-surface)',
        borderRadius: '8px',
        border: '1px solid var(--theme-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </Content>

      {/* Right Side Drawer */}
      <RightSideDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        title={drawerTitle}
        width={drawerWidth}
        sections={drawerSections}
        showActionPanel={true}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleDrawerSave}
        onDiscard={handleDrawerDiscard}
      >
        {drawerContent}
      </RightSideDrawer>
    </div>
  );
};
