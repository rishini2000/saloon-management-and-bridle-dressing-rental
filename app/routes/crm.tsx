import React, { useState } from 'react';
import { PlusOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import type { FilterConfig } from '../components/FilterComponent';
import type { ActionButton } from '../components/ActionPanel';

export default function CRM() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);

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

  const columns: DataTableColumn[] = [
    { id: 'name', header: 'Name', width: 150, sort: true },
    { id: 'email', header: 'Email', width: 200, sort: true },
    { id: 'phone', header: 'Phone', width: 130 },
    { id: 'lastVisit', header: 'Last Visit', width: 120, type: 'date', sort: true },
    { id: 'totalSpent', header: 'Total Spent', width: 120, type: 'string', sort: true },
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
      label: 'New Customer',
      icon: <PlusOutlined />,
      type: 'primary',
      onClick: () => setShowDrawer(true)
    },
    {
      key: 'contact',
      label: 'Contact Selected',
      icon: <PhoneOutlined />,
      disabled: selectedCustomers.length === 0,
      onClick: () => console.log('Contact customers:', selectedCustomers)
    }
  ];

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedCustomers(selectedIds);
  };

  const handleRowClick = (rowData: any) => {
    console.log('Customer clicked:', rowData);
    setShowDrawer(true);
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Customer Relationship Manager"
        filterConfig={filterConfig}
        actions={actions}
        showDrawer={showDrawer}
        onDrawerClose={() => setShowDrawer(false)}
        drawerTitle="Customer Details"
        drawerWidth={400}
      >
        <DataTable
          data={customerData}
          columns={columns}
          onSelectionChange={handleSelectionChange}
          onRowClick={handleRowClick}
          height={500}
        />
      </AbstractPageView>
    </div>
  );
}