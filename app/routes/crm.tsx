import React, { useState } from 'react';
import { Button, Tag, Avatar, Space, Input, Select, Form, Divider } from 'antd';
import { PlusOutlined, ExportOutlined, InboxOutlined, PhoneOutlined, UserOutlined, MailOutlined, PhoneOutlined as PhoneIcon, CalendarOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable } from '../components/DataTable';
import type { ActionButton } from '../components/ActionPanel';
import type { FilterConfig } from '../components/FilterComponent';
import type { DrawerSection, DrawerVisualArea, DrawerActionButton } from '../components/RightSideDrawer';

const { TextArea } = Input;
const { Option } = Select;

export default function CRM() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Customer details drawer configuration
  const getCustomerVisualArea = (): DrawerVisualArea | undefined => {
    if (!selectedCustomer) return undefined;
    
    return {
      content: (
        <div style={{ textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--theme-text)' }}>
            {selectedCustomer.name}
          </div>
          <Tag color={selectedCustomer.status === 'Active' ? 'green' : 'orange'}>
            {selectedCustomer.status}
          </Tag>
        </div>
      ),
      height: 140
    };
  };

  const getCustomerQuickActions = (): DrawerActionButton[] => {
    if (!selectedCustomer) return [];
    
    return [
      {
        key: 'call',
        label: 'Call Customer',
        icon: <PhoneOutlined />,
        onClick: () => console.log('Calling customer:', selectedCustomer.phone)
      },
      {
        key: 'email',
        label: 'Send Email',
        icon: <MailOutlined />,
        onClick: () => console.log('Emailing customer:', selectedCustomer.email)
      },
      {
        key: 'schedule',
        label: 'Schedule Appointment',
        icon: <CalendarOutlined />,
        onClick: () => console.log('Scheduling appointment for:', selectedCustomer.name)
      }
    ];
  };

  const getCustomerSections = (): DrawerSection[] => {
    if (!selectedCustomer) return [];
    
    return [
      {
        key: 'contact',
        title: 'Contact Information',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Email">
              <Input 
                prefix={<MailOutlined />} 
                value={selectedCustomer.email} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input 
                prefix={<PhoneIcon />} 
                value={selectedCustomer.phone} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Address">
              <TextArea 
                value="123 Main St, City, State 12345" 
                readOnly 
                rows={2}
              />
            </Form.Item>
          </Form>
        ),
        defaultOpen: true
      },
      {
        key: 'preferences',
        title: 'Preferences',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Preferred Services">
              <Select mode="multiple" value={['Haircut', 'Styling']} disabled>
                <Option value="haircut">Haircut</Option>
                <Option value="styling">Styling</Option>
                <Option value="coloring">Coloring</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Preferred Staff">
              <Select value="sarah" disabled>
                <Option value="sarah">Sarah Johnson</Option>
                <Option value="mike">Mike Wilson</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Notes">
              <TextArea 
                value="Regular customer, prefers morning appointments" 
                readOnly 
                rows={3}
              />
            </Form.Item>
          </Form>
        )
      },
      {
        key: 'history',
        title: 'Appointment History',
        content: (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Haircut & Styling</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Dec 15, 2024 - Sarah Johnson</div>
                <div style={{ fontSize: '12px' }}>$85.00</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Color Treatment</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Nov 20, 2024 - Mike Wilson</div>
                <div style={{ fontSize: '12px' }}>$150.00</div>
              </div>
            </Space>
          </div>
        )
      }
    ];
  };

  // Sample customer data
  const customerData = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      lastVisit: '2024-01-10',
      totalSpent: '$450.00',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '(555) 234-5678',
      lastVisit: '2024-01-08',
      totalSpent: '$320.00',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '(555) 345-6789',
      lastVisit: '2023-12-15',
      totalSpent: '$180.00',
      status: 'Inactive'
    }
  ];

  const columns = [
    { id: 'name', header: 'Name', width: 150, sort: true },
    { id: 'email', header: 'Email', width: 200, sort: true },
    { id: 'phone', header: 'Phone', width: 130 },
    { id: 'lastVisit', header: 'Last Visit', width: 120, type: 'date' as const, sort: true },
    { id: 'totalSpent', header: 'Total Spent', width: 120, sort: true },
    { id: 'status', header: 'Status', width: 100 }
  ];

  const filterConfig: FilterConfig = {
    textSearch: {
      enabled: true,
      placeholder: 'Search customers...'
    },
    dateRange: {
      enabled: true,
      presets: ['thisWeek', 'thisMonth', 'lastMonth']
    },
    searchSelect: [
      {
        key: 'status',
        placeholder: 'Select Status',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'VIP', value: 'vip' }
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
      onClick: () => console.log('Archive customers')
    },
    {
      key: 'export',
      label: 'Export',
      icon: <ExportOutlined />,
      iconOnly: true,
      onClick: () => console.log('Export customers')
    },
    {
      key: 'contact',
      label: 'Contact Selected',
      icon: <PhoneOutlined />,
      disabled: selectedRowKeys.length === 0,
      onClick: () => console.log('Contact customers:', selectedRowKeys)
    }
  ];

  const handleRowSelect = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleRowClick = (record: any) => {
    setSelectedCustomer(record);
    setDrawerOpen(true);
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Customer Relationship Manager"
        filterConfig={filterConfig}
        actions={actions}
        drawerOpen={drawerOpen}
        onDrawerClose={() => {
          setDrawerOpen(false);
          setSelectedCustomer(null);
        }}
        drawerTitle={selectedCustomer ? `${selectedCustomer.name} Details` : 'Customer Details'}
        drawerWidth={450}
        drawerVisualArea={getCustomerVisualArea()}
        drawerQuickActions={getCustomerQuickActions()}
        drawerSections={getCustomerSections()}
        showSaveDiscardPanel={false}
      >
        <DataTable
          columns={columns}
          data={customerData}
          onSelectionChange={handleRowSelect}
          onRowClick={handleRowClick}
          height="100%"
        />
      </AbstractPageView>
    </div>
  );
}