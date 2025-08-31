import React, { useState } from 'react';
import { PlusOutlined, CalendarOutlined, ExportOutlined, ImportOutlined, SettingOutlined, InboxOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { GanttChart } from '../components/GanttChart';
import type { GanttTask, GanttResource } from '../components/GanttChart';
import type { FilterConfig } from '../components/FilterComponent';
import type { ActionButton } from '../components/ActionPanel';

export default function AppointmentManager() {
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);

  // Sample resources (employees and services)
  const resources: GanttResource[] = [
    { id: 'emp1', name: 'John Smith', type: 'employee', color: '#1890ff' },
    { id: 'emp2', name: 'Jane Doe', type: 'employee', color: '#722ed1' },
    { id: 'emp3', name: 'Bob Wilson', type: 'employee', color: '#13c2c2' },
    { id: 'svc1', name: 'Haircut Service', type: 'service', color: '#52c41a' },
    { id: 'svc2', name: 'Color Treatment', type: 'service', color: '#fa8c16' }
  ];

  // Sample appointment data
  const appointmentTasks: GanttTask[] = [
    {
      id: '1',
      text: 'Sarah Johnson - Haircut',
      start: new Date(2024, 0, 15, 9, 0),
      end: new Date(2024, 0, 15, 10, 0),
      progress: 100,
      resourceId: 'emp1',
      type: 'task'
    },
    {
      id: '2',
      text: 'Mike Chen - Beard Trim',
      start: new Date(2024, 0, 15, 10, 30),
      end: new Date(2024, 0, 15, 11, 0),
      progress: 50,
      resourceId: 'emp1',
      type: 'task'
    },
    {
      id: '3',
      text: 'Emma Davis - Color Treatment',
      start: new Date(2024, 0, 15, 14, 0),
      end: new Date(2024, 0, 15, 16, 0),
      progress: 0,
      resourceId: 'emp2',
      type: 'task'
    },
    {
      id: '4',
      text: 'Lisa Brown - Styling',
      start: new Date(2024, 0, 15, 11, 0),
      end: new Date(2024, 0, 15, 12, 0),
      progress: 75,
      resourceId: 'emp2',
      type: 'task'
    },
    {
      id: '5',
      text: 'Walk-in Consultation',
      start: new Date(2024, 0, 15, 13, 0),
      end: new Date(2024, 0, 15, 13, 30),
      progress: 100,
      resourceId: 'emp3',
      type: 'task'
    }
  ];

  const filterConfig: FilterConfig = {
    textSearch: {
      enabled: true,
      placeholder: 'Search appointments...'
    },
    dateRange: {
      enabled: true,
      presets: ['today', 'thisWeek', 'thisMonth']
    },
    searchSelect: [
      {
        key: 'employee',
        placeholder: 'Select Employee',
        options: [
          { label: 'John Smith', value: 'john' },
          { label: 'Jane Doe', value: 'jane' },
          { label: 'Bob Wilson', value: 'bob' }
        ]
      },
      {
        key: 'service',
        placeholder: 'Select Service',
        options: [
          { label: 'Haircut', value: 'haircut' },
          { label: 'Beard Trim', value: 'beard' },
          { label: 'Color Treatment', value: 'color' }
        ]
      }
    ]
  };

  const actions: ActionButton[] = [
    {
      key: 'new',
      label: 'New',
      icon: <PlusOutlined />,
      type: 'primary',
      onClick: () => setShowDrawer(true)
    },
    {
      key: 'archive',
      label: 'Archive',
      icon: <InboxOutlined />,
      iconOnly: true,
      onClick: () => console.log('Archive appointments')
    },
    {
      key: 'export',
      label: 'Export',
      icon: <ExportOutlined />,
      iconOnly: true,
      onClick: () => console.log('Export appointments')
    },
    {
      key: 'reschedule',
      label: 'Reschedule Selected',
      icon: <CalendarOutlined />,
      disabled: selectedAppointments.length === 0,
      onClick: () => console.log('Reschedule appointments:', selectedAppointments)
    }
  ];

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedAppointments(selectedIds);
  };

  const handleTaskClick = (taskData: GanttTask) => {
    console.log('Task clicked:', taskData);
    setShowDrawer(true);
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Appointment Manager"
        filterConfig={filterConfig}
        actions={actions}
        showDrawer={showDrawer}
        onDrawerClose={() => setShowDrawer(false)}
        drawerTitle="Appointment Details"
        drawerWidth={400}
      >
        <GanttChart
          tasks={appointmentTasks}
          resources={resources}
          onSelectionChange={handleSelectionChange}
          onTaskClick={handleTaskClick}
          height="100%"
        />
      </AbstractPageView>
    </div>
  );
}