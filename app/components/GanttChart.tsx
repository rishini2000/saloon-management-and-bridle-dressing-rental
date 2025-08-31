import React, { useState } from 'react';
import { Card, Timeline, Button } from 'antd';

export interface GanttTask {
  id: string;
  text: string;
  start: Date;
  end: Date;
  progress?: number;
  resourceId: string;
  type?: 'task' | 'project' | 'milestone';
}

export interface GanttResource {
  id: string;
  name: string;
  type: 'employee' | 'service';
  color?: string;
}

export interface GanttProps {
  tasks: GanttTask[];
  resources: GanttResource[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onTaskClick?: (taskData: GanttTask) => void;
  height?: number | string;
  className?: string;
}

export const GanttChart: React.FC<GanttProps> = ({
  tasks,
  resources,
  onSelectionChange,
  onTaskClick,
  height = 500,
  className
}) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleTaskClick = (task: GanttTask) => {
    const newSelection = selectedTasks.includes(task.id)
      ? selectedTasks.filter(id => id !== task.id)
      : [...selectedTasks, task.id];
    
    setSelectedTasks(newSelection);
    
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
    
    if (onTaskClick) {
      onTaskClick(task);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress: number = 0) => {
    if (progress < 30) return 'var(--theme-error)';
    if (progress < 70) return 'var(--theme-warning)';
    return 'var(--theme-success)';
  };

  const getResourceColor = (resource: GanttResource) => {
    if (resource.color) return resource.color;
    return resource.type === 'employee' ? 'var(--theme-primary)' : 'var(--theme-success)';
  };

  // Group tasks by resource
  const groupedTasks = resources.map(resource => ({
    resource,
    tasks: tasks.filter(task => task.resourceId === resource.id)
  }));

  return (
    <div 
      className={className}
      style={{ 
        height: height,
        borderRadius: '8px',
        overflow: 'auto',
        backgroundColor: 'var(--theme-surface)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <h4>Resource Timeline (Gantt Chart)</h4>
        <p style={{ color: 'var(--theme-text-secondary)', fontSize: '12px' }}>
          Appointments organized by employee/service. Click on appointments to select them.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, minHeight: 0 }}>
        {groupedTasks.map(({ resource, tasks: resourceTasks }) => (
          <div key={resource.id} style={{ marginBottom: '8px' }}>
            {/* Resource Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              padding: '8px 12px',
              backgroundColor: 'var(--theme-primary-light)',
              borderRadius: '6px',
              borderLeft: `4px solid ${getResourceColor(resource)}`
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getResourceColor(resource)
              }} />
              <h5 style={{ margin: 0, fontWeight: 'bold' }}>
                {resource.name} ({resource.type})
              </h5>
              <span style={{ 
                fontSize: '11px', 
                color: 'var(--theme-text-secondary)',
                marginLeft: 'auto'
              }}>
                {resourceTasks.length} appointment{resourceTasks.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Resource Tasks */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              marginLeft: '16px'
            }}>
              {resourceTasks.length === 0 ? (
                <div style={{
                  padding: '16px',
                  textAlign: 'center',
                  color: 'var(--theme-text-secondary)',
                  fontStyle: 'italic',
                  backgroundColor: 'var(--theme-background)',
                  borderRadius: '4px'
                }}>
                  No appointments scheduled
                </div>
              ) : (
                resourceTasks.map((task) => {
                  const isSelected = selectedTasks.includes(task.id);
                  const progressColor = getProgressColor(task.progress);
                  const resourceColor = getResourceColor(resource);
                  
                  return (
                    <Card
                      key={task.id}
                      size="small"
                      style={{
                        cursor: 'pointer',
                        border: isSelected ? `2px solid ${resourceColor}` : '1px solid var(--theme-border)',
                        backgroundColor: isSelected ? `${resourceColor}08` : 'var(--theme-surface)',
                        boxShadow: isSelected ? `0 2px 8px ${resourceColor}20` : '0 1px 3px rgba(0,0,0,0.05)'
                      }}
                      onClick={() => handleTaskClick(task)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                            {task.text}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
                            {formatDate(task.start)} {formatTime(task.start)} - {formatTime(task.end)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: progressColor,
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}>
                            {task.progress || 0}%
                          </div>
                          {isSelected && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: resourceColor
                            }} />
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
