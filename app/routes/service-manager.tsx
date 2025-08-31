import React, { useState } from 'react';
import { PlusOutlined, CalendarOutlined, UserOutlined, EditOutlined, TagOutlined, ExportOutlined, DollarOutlined, ToolOutlined, ImportOutlined, SettingOutlined, InboxOutlined, ScissorOutlined, ClockCircleOutlined, BookOutlined, BarChartOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import type { FilterConfig } from '../components/FilterComponent';
import type { ActionButton } from '../components/ActionPanel';
import type { DrawerSection, DrawerVisualArea, DrawerActionButton } from '../components/RightSideDrawer';
import { Input, Form, Select, Space, Tag, Divider, InputNumber } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export default function ServiceManager() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Sample service data
  const serviceData = [
    {
      id: '1',
      name: 'Haircut & Style',
      category: 'Hair Services',
      price: '$65.00',
      duration: '60 min',
      description: 'Professional haircut with styling',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Hair Color',
      category: 'Color Services',
      price: '$120.00',
      duration: '120 min',
      description: 'Full hair coloring service',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Beard Trim',
      category: 'Grooming',
      price: '$25.00',
      duration: '30 min',
      description: 'Professional beard trimming and shaping',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Deep Conditioning',
      category: 'Hair Treatment',
      price: '$45.00',
      duration: '45 min',
      description: 'Intensive hair conditioning treatment',
      status: 'Inactive'
    }
  ];

  const columns: DataTableColumn[] = [
    { id: 'name', header: 'Service Name', width: 180, sort: true },
    { id: 'category', header: 'Category', width: 140, sort: true },
    { id: 'price', header: 'Price', width: 100, sort: true },
    { id: 'duration', header: 'Duration', width: 100 },
    { id: 'description', header: 'Description', width: 200 },
    { id: 'status', header: 'Status', width: 100 }
  ];

  const filterConfig: FilterConfig = {
    textSearch: {
      enabled: true,
      placeholder: 'Search services...'
    },
    searchSelect: [
      {
        key: 'category',
        placeholder: 'Select Category',
        options: [
          { label: 'Hair Services', value: 'hair-services' },
          { label: 'Color Services', value: 'color-services' },
          { label: 'Grooming', value: 'grooming' },
          { label: 'Hair Treatment', value: 'hair-treatment' }
        ]
      },
      {
        key: 'status',
        placeholder: 'Select Status',
        options: [
          { label: 'Active', value: 'active' },
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
      onClick: () => setShowDrawer(true)
    },
    {
      key: 'archive',
      label: 'Archive',
      icon: <InboxOutlined />,
      iconOnly: true,
      onClick: () => console.log('Archive services')
    },
    {
      key: 'export',
      label: 'Export',
      icon: <ExportOutlined />,
      iconOnly: true,
      onClick: () => console.log('Export services')
    },
    {
      key: 'edit',
      label: 'Edit Selected',
      icon: <EditOutlined />,
      disabled: selectedServices.length !== 1,
      onClick: () => console.log('Edit service:', selectedServices[0])
    },
    {
      key: 'pricing',
      label: 'Update Pricing',
      icon: <TagOutlined />,
      disabled: selectedServices.length === 0,
      onClick: () => console.log('Update pricing for:', selectedServices)
    }
  ];


  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedServices(selectedIds);
  };

  const handleRowClick = (rowData: any) => {
    setSelectedService(rowData);
    setShowDrawer(true);
  };

  // Quick action buttons for service drawer
  const getServiceQuickActions = (): DrawerActionButton[] => {
    if (!selectedService) return [];
    return [
      { key: 'book', label: 'Book Service', icon: <BookOutlined />, onClick: () => console.log('Booking service:', selectedService.name) },
      { key: 'pricing', label: 'Update Pricing', icon: <TagOutlined />, onClick: () => console.log('Updating pricing for:', selectedService.name) },
      { key: 'analytics', label: 'View Analytics', icon: <BarChartOutlined />, onClick: () => console.log('Viewing analytics for:', selectedService.name) }
    ];
  };

  // Service details drawer configuration
  const getServiceVisualArea = (): DrawerVisualArea | undefined => {
    if (!selectedService) return undefined;
    
    const getStatusColor = (status: string) => {
      return status.toLowerCase() === 'active' ? 'green' : 'orange';
    };
    
    return {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--theme-text)', marginBottom: '4px' }}>
            {selectedService.name}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
            {selectedService.category}
          </div>
          <Space>
            <Tag color={getStatusColor(selectedService.status)}>
              {selectedService.status}
            </Tag>
            <Tag color="blue">
              {selectedService.price}
            </Tag>
            <Tag color="purple">
              {selectedService.duration}
            </Tag>
          </Space>
        </div>
      ),
      height: 120
    };
  };

  const getServiceSections = (): DrawerSection[] => {
    if (!selectedService) return [];
    
    return [
      {
        key: 'details',
        title: 'Service Details',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Service Name">
              <Input 
                prefix={<ScissorOutlined />} 
                value={selectedService.name} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Category">
              <Input 
                prefix={<TagOutlined />} 
                value={selectedService.category} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input 
                prefix={<DollarOutlined />} 
                value={selectedService.price} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Duration">
              <Input 
                prefix={<ClockCircleOutlined />} 
                value={selectedService.duration} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea 
                value={selectedService.description} 
                readOnly 
                rows={2}
              />
            </Form.Item>
          </Form>
        ),
        defaultOpen: true
      },
      {
        key: 'pricing',
        title: 'Pricing & Availability',
        content: (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Base Price</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>{selectedService.price}</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Peak Hours Surcharge</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>+$10.00 (Weekends)</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Staff Availability</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>3 stylists qualified</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Booking Buffer</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>15 minutes between appointments</div>
              </div>
            </Space>
          </div>
        )
      },
      {
        key: 'analytics',
        title: 'Service Analytics',
        content: (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>This Month</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>42 bookings • $2,730 revenue</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Average Rating</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>4.8/5.0 (38 reviews)</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Popular Times</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Saturdays 10AM-2PM</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Repeat Customers</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>73% return rate</div>
              </div>
            </Space>
          </div>
        )
      }
    ];
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Service Manager"
        filterConfig={filterConfig}
        actions={actions}
        drawerOpen={showDrawer}
        onDrawerClose={() => {
          setShowDrawer(false);
          setSelectedService(null);
        }}
        drawerTitle={selectedService ? selectedService.name : 'New Service'}
        drawerWidth={450}
        drawerVisualArea={getServiceVisualArea()}
        drawerQuickActions={getServiceQuickActions()}
        drawerSections={getServiceSections()}
        showSaveDiscardPanel={false}
      >
        <DataTable
          columns={columns}
          data={serviceData}
          onSelectionChange={handleSelectionChange}
          onRowClick={handleRowClick}
          height="100%"
        />
      </AbstractPageView>
    </div>
  );
}
