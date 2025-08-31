import React, { useState } from 'react';
import { Button, Tag, Avatar, Space, Input, Select, Form, Rate, Progress } from 'antd';
import { PlusOutlined, ExportOutlined, InboxOutlined, CalendarOutlined, UserOutlined, MailOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable } from '../components/DataTable';
import type { ActionButton } from '../components/ActionPanel';
import type { FilterConfig } from '../components/FilterComponent';
import type { DrawerSection, DrawerVisualArea, DrawerActionButton } from '../components/RightSideDrawer';

const { TextArea } = Input;
const { Option } = Select;

export default function EmployeeManager() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Employee details drawer configuration
  const getEmployeeVisualArea = (): DrawerVisualArea | undefined => {
    if (!selectedEmployee) return undefined;
    
    return {
      content: (
        <div style={{ textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--theme-text)' }}>
            {selectedEmployee.name}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
            {selectedEmployee.position}
          </div>
          <Tag color={selectedEmployee.status === 'Active' ? 'green' : selectedEmployee.status === 'On Leave' ? 'orange' : 'red'}>
            {selectedEmployee.status}
          </Tag>
        </div>
      ),
      height: 160
    };
  };

  const getEmployeeQuickActions = (): DrawerActionButton[] => {
    if (!selectedEmployee) return [];
    
    return [
      {
        key: 'schedule',
        label: 'View Schedule',
        icon: <CalendarOutlined />,
        onClick: () => console.log('Viewing schedule for:', selectedEmployee.name)
      },
      {
        key: 'contact',
        label: 'Contact Employee',
        icon: <PhoneOutlined />,
        onClick: () => console.log('Contacting employee:', selectedEmployee.phone)
      },
      {
        key: 'timeoff',
        label: 'Manage Time Off',
        icon: <ClockCircleOutlined />,
        onClick: () => console.log('Managing time off for:', selectedEmployee.name)
      }
    ];
  };

  const getEmployeeSections = (): DrawerSection[] => {
    if (!selectedEmployee) return [];
    
    return [
      {
        key: 'personal',
        title: 'Personal Information',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Email">
              <Input 
                prefix={<MailOutlined />} 
                value={selectedEmployee.email} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input 
                prefix={<PhoneOutlined />} 
                value={selectedEmployee.phone} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Hire Date">
              <Input 
                value={selectedEmployee.hireDate} 
                readOnly 
              />
            </Form.Item>
          </Form>
        ),
        defaultOpen: true
      },
      {
        key: 'performance',
        title: 'Performance & Skills',
        content: (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <div style={{ marginBottom: '8px' }}>Overall Rating</div>
                <Rate disabled value={4.5} allowHalf />
                <span style={{ marginLeft: '8px', color: 'var(--theme-text-secondary)' }}>4.5/5</span>
              </div>
              <div>
                <div style={{ marginBottom: '8px' }}>Customer Satisfaction</div>
                <Progress percent={92} size="small" />
              </div>
              <div>
                <div style={{ marginBottom: '8px' }}>Skills</div>
                <Space wrap>
                  <Tag>Haircuts</Tag>
                  <Tag>Styling</Tag>
                  <Tag>Coloring</Tag>
                  <Tag>Treatments</Tag>
                </Space>
              </div>
            </Space>
          </div>
        )
      },
      {
        key: 'schedule',
        title: 'Schedule & Availability',
        content: (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>This Week</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Mon-Fri: 9:00 AM - 6:00 PM</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Sat: 9:00 AM - 4:00 PM</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Upcoming Appointments</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Today: 8 appointments</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Tomorrow: 6 appointments</div>
              </div>
            </Space>
          </div>
        )
      }
    ];
  };

  // Sample employee data
  const employeeData = [
    {
      id: '1',
      name: 'John Smith',
      position: 'Senior Stylist',
      email: 'john.smith@saloon.com',
      phone: '(555) 111-2222',
      hireDate: '2022-03-15',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Jane Doe',
      position: 'Colorist',
      email: 'jane.doe@saloon.com',
      phone: '(555) 333-4444',
      hireDate: '2023-01-10',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      position: 'Barber',
      email: 'bob.wilson@saloon.com',
      phone: '(555) 555-6666',
      hireDate: '2021-08-20',
      status: 'On Leave'
    }
  ];

  const columns = [
    { id: 'name', header: 'Name', width: 150, sort: true },
    { id: 'position', header: 'Position', width: 140, sort: true },
    { id: 'email', header: 'Email', width: 200 },
    { id: 'phone', header: 'Phone', width: 130 },
    { id: 'hireDate', header: 'Hire Date', width: 120, type: 'date' as const, sort: true },
    { id: 'status', header: 'Status', width: 100 }
  ];

  const filterConfig: FilterConfig = {
    textSearch: {
      enabled: true,
      placeholder: 'Search employees...'
    },
    dateRange: {
      enabled: true,
      presets: ['thisWeek', 'thisMonth', 'thisYear']
    },
    searchSelect: [
      {
        key: 'position',
        placeholder: 'Select Position',
        options: [
          { label: 'Senior Stylist', value: 'senior-stylist' },
          { label: 'Stylist', value: 'stylist' },
          { label: 'Colorist', value: 'colorist' },
          { label: 'Barber', value: 'barber' }
        ]
      },
      {
        key: 'status',
        placeholder: 'Select Status',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'On Leave', value: 'on-leave' },
          { label: 'Inactive', value: 'inactive' }
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
      onClick: () => console.log('Archive employees')
    },
    {
      key: 'export',
      label: 'Export',
      icon: <ExportOutlined />,
      iconOnly: true,
      onClick: () => console.log('Export employees')
    },
    {
      key: 'schedule',
      label: 'View Schedule',
      icon: <CalendarOutlined />,
      disabled: selectedRowKeys.length === 0,
      onClick: () => console.log('View schedule for:', selectedRowKeys)
    }
  ];

  const handleRowSelect = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleRowClick = (record: any) => {
    setSelectedEmployee(record);
    setDrawerOpen(true);
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Employee Manager"
        filterConfig={filterConfig}
        actions={actions}
        drawerOpen={drawerOpen}
        onDrawerClose={() => {
          setDrawerOpen(false);
          setSelectedEmployee(null);
        }}
        drawerTitle={selectedEmployee ? `${selectedEmployee.name} Details` : 'Employee Details'}
        drawerWidth={450}
        drawerVisualArea={getEmployeeVisualArea()}
        drawerQuickActions={getEmployeeQuickActions()}
        drawerSections={getEmployeeSections()}
        showSaveDiscardPanel={false}
      >
        <DataTable
          columns={columns}
          data={employeeData}
          onSelectionChange={handleRowSelect}
          onRowClick={handleRowClick}
          height="100%"
        />
      </AbstractPageView>
    </div>
  );
}