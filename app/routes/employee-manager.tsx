import React, { useState } from 'react';
import { PlusOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import type { FilterConfig } from '../components/FilterComponent';
import type { ActionButton } from '../components/ActionPanel';

export default function EmployeeManager() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);

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

  const columns: DataTableColumn[] = [
    { id: 'name', header: 'Name', width: 150, sort: true },
    { id: 'position', header: 'Position', width: 140, sort: true },
    { id: 'email', header: 'Email', width: 200 },
    { id: 'phone', header: 'Phone', width: 130 },
    { id: 'hireDate', header: 'Hire Date', width: 120, type: 'date', sort: true },
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
      label: '+ New',
      icon: <PlusOutlined />,
      type: 'primary',
      onClick: () => setShowDrawer(true)
    },
    {
      key: 'export',
      label: 'Export',
      icon: <UserOutlined />,
      iconOnly: true,
      onClick: () => console.log('Export employees')
    },
    {
      key: 'schedule',
      label: 'View Schedule',
      icon: <CalendarOutlined />,
      disabled: selectedEmployees.length === 0,
      onClick: () => console.log('View schedule for:', selectedEmployees)
    }
  ];

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedEmployees(selectedIds);
  };

  const handleRowClick = (rowData: any) => {
    console.log('Employee clicked:', rowData);
    setShowDrawer(true);
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Employee Manager"
        filterConfig={filterConfig}
        actions={actions}
        showDrawer={showDrawer}
        onDrawerClose={() => setShowDrawer(false)}
        drawerTitle="Employee Details"
        drawerWidth={400}
      >
        <DataTable
          columns={columns}
          data={employeeData}
          onSelectionChange={handleSelectionChange}
          onRowClick={handleRowClick}
          height="100%"
        />
      </AbstractPageView>
    </div>
  );
}