import React, { useState, useCallback } from 'react';
import { Layout } from 'antd';
import { FilterComponent, type FilterConfig, type FilterValues } from './FilterComponent';
import { ActionPanel, type ActionButton } from './ActionPanel';
import { RightSideDrawer, type DrawerSection, type DrawerVisualArea, type DrawerActionButton } from './RightSideDrawer';

const { Content } = Layout;

export interface AbstractPageViewProps {
  title?: string;
  filterConfig?: FilterConfig;
  actions?: ActionButton[];
  drawerActions?: ActionButton[];
  children: React.ReactNode;
  drawerContent?: React.ReactNode;
  drawerSections?: DrawerSection[];
  drawerTitle?: string;
  drawerWidth?: number;
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
  onFiltersChange?: (filters: FilterValues) => void;
  className?: string;
  // New enhanced drawer props
  drawerVisualArea?: DrawerVisualArea;
  drawerQuickActions?: DrawerActionButton[];
  showSaveDiscardPanel?: boolean;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  onDiscard?: () => void;
  // Legacy prop for backward compatibility
  showDrawer?: boolean;
}

export const AbstractPageView: React.FC<AbstractPageViewProps> = ({
  title,
  filterConfig,
  actions = [],
  drawerActions = [],
  children,
  drawerContent,
  drawerSections = [],
  drawerTitle = 'Details',
  drawerWidth = 400,
  drawerOpen = false,
  onDrawerClose,
  onFiltersChange,
  className,
  // New enhanced drawer props
  drawerVisualArea,
  drawerQuickActions = [],
  showSaveDiscardPanel = false,
  hasUnsavedChanges = false,
  onSave,
  onDiscard,
  // Legacy prop
  showDrawer = false
}) => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [internalDrawerOpen, setInternalDrawerOpen] = useState(false);
  
  // Use external drawerOpen prop if provided, otherwise use internal state
  const isDrawerOpen = drawerOpen !== undefined ? drawerOpen : (showDrawer !== undefined ? showDrawer : internalDrawerOpen);
  const [hasUnsavedChangesState, setHasUnsavedChanges] = useState(hasUnsavedChanges);

  // Sync drawer state with prop
  React.useEffect(() => {
    setInternalDrawerOpen(drawerOpen);
  }, [drawerOpen]);

  // Event broker functions
  const handleFiltersChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  }, [onFiltersChange]);

  const handleDrawerClose = useCallback(() => {
    setInternalDrawerOpen(false);
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
    setInternalDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setInternalDrawerOpen(false);
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
        open={isDrawerOpen}
        onClose={() => {
          if (drawerOpen !== undefined) {
            onDrawerClose?.();
          } else {
            setInternalDrawerOpen(false);
            onDrawerClose?.();
          }
        }}
        title={drawerTitle}
        width={drawerWidth}
        sections={drawerSections}
        visualArea={drawerVisualArea}
        actionButtons={drawerActions}
        quickActionButtons={drawerQuickActions}
        showSaveDiscardPanel={showSaveDiscardPanel}
        hasUnsavedChanges={hasUnsavedChangesState}
        onSave={onSave || handleDrawerSave}
        onDiscard={onDiscard || handleDrawerDiscard}
        // Legacy props for backward compatibility
        showActionPanel={drawerActions.length > 0}
        drawerActions={drawerActions}
      >
        {drawerContent}
      </RightSideDrawer>
    </div>
  );
};
