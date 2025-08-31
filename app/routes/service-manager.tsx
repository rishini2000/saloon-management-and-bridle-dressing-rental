import React, { useState } from 'react';
import { PlusOutlined, CalendarOutlined, UserOutlined, EditOutlined, TagOutlined, ExportOutlined, DollarOutlined, ToolOutlined, ImportOutlined, SettingOutlined, InboxOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import type { FilterConfig } from '../components/FilterComponent';
import type { ActionButton } from '../components/ActionPanel';

export default function ServiceManager() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);

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
    console.log('Service clicked:', rowData);
    setShowDrawer(true);
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Service Manager"
        filterConfig={filterConfig}
        actions={actions}
        showDrawer={showDrawer}
        onDrawerClose={() => setShowDrawer(false)}
        drawerTitle="Service Details"
        drawerWidth={400}
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
