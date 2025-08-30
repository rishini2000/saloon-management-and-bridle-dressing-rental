import React, { useState } from 'react';
import { PlusOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import type { FilterConfig } from '../components/FilterComponent';
import type { ActionButton } from '../components/ActionPanel';

export default function Invoicing() {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);

  // Sample invoice data
  const invoiceData = [
    {
      id: '1',
      invoiceNumber: 'INV-001',
      customer: 'Sarah Johnson',
      date: '2024-01-15',
      amount: '$125.00',
      status: 'Paid',
      dueDate: '2024-01-30'
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      customer: 'Mike Chen',
      date: '2024-01-14',
      amount: '$85.00',
      status: 'Pending',
      dueDate: '2024-01-29'
    },
    {
      id: '3',
      invoiceNumber: 'INV-003',
      customer: 'Emma Davis',
      date: '2024-01-12',
      amount: '$200.00',
      status: 'Overdue',
      dueDate: '2024-01-27'
    }
  ];

  const columns: DataTableColumn[] = [
    { id: 'invoiceNumber', header: 'Invoice #', width: 120, sort: true },
    { id: 'customer', header: 'Customer', width: 150, sort: true },
    { id: 'date', header: 'Date', width: 120, type: 'date', sort: true },
    { id: 'amount', header: 'Amount', width: 120, sort: true },
    { id: 'status', header: 'Status', width: 100 },
    { id: 'dueDate', header: 'Due Date', width: 120, type: 'date', sort: true }
  ];

  const filterConfig: FilterConfig = {
    textSearch: {
      enabled: true,
      placeholder: 'Search invoices...'
    },
    dateRange: {
      enabled: true,
      presets: ['today', 'thisWeek', 'thisMonth']
    },
    searchSelect: [
      {
        key: 'status',
        placeholder: 'Select Status',
        options: [
          { label: 'Paid', value: 'paid' },
          { label: 'Pending', value: 'pending' },
          { label: 'Overdue', value: 'overdue' },
          { label: 'Draft', value: 'draft' }
        ]
      }
    ]
  };

  const actions: ActionButton[] = [
    {
      key: 'new',
      label: 'New Invoice',
      icon: <PlusOutlined />,
      type: 'primary',
      onClick: () => setShowDrawer(true)
    },
    {
      key: 'payment',
      label: 'Record Payment',
      icon: <DollarOutlined />,
      disabled: selectedInvoices.length === 0,
      onClick: () => console.log('Record payment for:', selectedInvoices)
    },
    {
      key: 'export',
      label: 'Export',
      icon: <FileTextOutlined />,
      onClick: () => console.log('Export invoices')
    }
  ];

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedInvoices(selectedIds);
  };

  const handleRowClick = (rowData: any) => {
    console.log('Invoice clicked:', rowData);
    setShowDrawer(true);
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Invoicing"
        filterConfig={filterConfig}
        actions={actions}
        showDrawer={showDrawer}
        onDrawerClose={() => setShowDrawer(false)}
        drawerTitle="Invoice Details"
        drawerWidth={400}
      >
        <DataTable
          data={invoiceData}
          columns={columns}
          onSelectionChange={handleSelectionChange}
          onRowClick={handleRowClick}
          height={500}
        />
      </AbstractPageView>
    </div>
  );
}