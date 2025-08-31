import React, { useState } from 'react';
import { Button, Tag, Space, Input, Select, Form, TimePicker, DatePicker } from 'antd';
import { PlusOutlined, ExportOutlined, InboxOutlined, ClockCircleOutlined, UserOutlined, ScissorOutlined, CalendarOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { GanttChart } from '../components/GanttChart';
import type { ActionButton } from '../components/ActionPanel';
import type { FilterConfig } from '../components/FilterComponent';
import type { GanttTask, GanttResource } from '../components/GanttChart';
import type { DrawerSection, DrawerVisualArea, DrawerActionButton } from '../components/RightSideDrawer';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function AppointmentManager() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Appointment details drawer configuration
  const getAppointmentVisualArea = (): DrawerVisualArea | undefined => {
    if (!selectedAppointment) return undefined;
    
    return {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--theme-text)', marginBottom: '4px' }}>
            {selectedAppointment.text}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
            {dayjs(selectedAppointment.start).format('MMM DD, YYYY • h:mm A')}
          </div>
          <Tag color="blue">
            {Math.round((selectedAppointment.end - selectedAppointment.start) / (1000 * 60))} minutes
          </Tag>
        </div>
      ),
      height: 120
    };
  };

  const getAppointmentQuickActions = (): DrawerActionButton[] => {
    if (!selectedAppointment) return [];
    
    return [
      {
        key: 'reschedule',
        label: 'Reschedule',
        icon: <CalendarOutlined />,
        onClick: () => console.log('Rescheduling appointment:', selectedAppointment.text)
      },
      {
        key: 'checkin',
        label: 'Check In Customer',
        icon: <UserOutlined />,
        onClick: () => console.log('Checking in customer for:', selectedAppointment.text)
      },
      {
        key: 'start',
        label: 'Start Service',
        icon: <ScissorOutlined />,
        onClick: () => console.log('Starting service for:', selectedAppointment.text)
      }
    ];
  };

  const getAppointmentSections = (): DrawerSection[] => {
    if (!selectedAppointment) return [];
    
    return [
      {
        key: 'details',
        title: 'Appointment Details',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Customer">
              <Input 
                prefix={<UserOutlined />} 
                value="Sarah Johnson" 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Service">
              <Input 
                prefix={<ScissorOutlined />} 
                value={selectedAppointment.text} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Staff Member">
              <Input 
                value={resources.find(r => r.id === selectedAppointment.resourceId)?.name || 'Unknown'} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Duration">
              <Input 
                value={`${Math.round((selectedAppointment.end - selectedAppointment.start) / (1000 * 60))} minutes`} 
                readOnly 
              />
            </Form.Item>
          </Form>
        ),
        defaultOpen: true
      },
      {
        key: 'customer',
        title: 'Customer Information',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Phone">
              <Input value="(555) 123-4567" readOnly />
            </Form.Item>
            <Form.Item label="Email">
              <Input value="sarah.johnson@email.com" readOnly />
            </Form.Item>
            <Form.Item label="Notes">
              <TextArea 
                value="Regular customer, prefers Sarah as stylist" 
                readOnly 
                rows={2}
              />
            </Form.Item>
          </Form>
        )
      },
      {
        key: 'history',
        title: 'Service History',
        content: (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Previous Visit</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Dec 15, 2024 - Haircut & Styling</div>
                <div style={{ fontSize: '12px' }}>$85.00</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Preferred Services</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Haircut, Styling, Color Touch-up</div>
              </div>
            </Space>
          </div>
        )
      }
    ];
  };

  const handleTaskClick = (task: GanttTask) => {
    setSelectedAppointment(task);
    setDrawerOpen(true);
  };

  // Sample resources (employees and services)
  const resources: GanttResource[] = [
    { id: 'emp1', name: 'John Smith', type: 'employee', color: '#1890ff' },
    { id: 'emp2', name: 'Jane Doe', type: 'employee', color: '#722ed1' },
    { id: 'emp3', name: 'Bob Wilson', type: 'employee', color: '#13c2c2' },
    { id: 'svc1', name: 'Haircut Service', type: 'service', color: '#52c41a' },
    { id: 'svc2', name: 'Color Treatment', type: 'service', color: '#fa8c16' }
  ];

  // Sample appointment data
  const tasks: GanttTask[] = [
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
      onClick: () => setDrawerOpen(true)
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
      disabled: selectedRowKeys.length === 0,
      onClick: () => console.log('Reschedule appointments:', selectedRowKeys)
    }
  ];

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Appointment Manager"
        filterConfig={filterConfig}
        actions={actions}
        drawerOpen={drawerOpen}
        onDrawerClose={() => {
          setDrawerOpen(false);
          setSelectedAppointment(null);
        }}
        drawerTitle={selectedAppointment ? 'Appointment Details' : 'New Appointment'}
        drawerWidth={450}
        drawerVisualArea={getAppointmentVisualArea()}
        drawerQuickActions={getAppointmentQuickActions()}
        drawerSections={getAppointmentSections()}
        showSaveDiscardPanel={false}
      >
        <GanttChart
          tasks={tasks}
          resources={resources}
          height="100%"
          onTaskClick={handleTaskClick}
        />
      </AbstractPageView>
    </div>
  );
}