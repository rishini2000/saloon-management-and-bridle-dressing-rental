import React, { useState } from 'react';
import { PlusOutlined, ExportOutlined, DollarOutlined, FileOutlined, ImportOutlined, SettingOutlined, InboxOutlined, UserOutlined, CalendarOutlined, CreditCardOutlined, SendOutlined, PrinterOutlined, MailOutlined } from '@ant-design/icons';
import { AbstractPageView } from '../components/AbstractPageView';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import type { FilterConfig } from '../components/FilterComponent';
import type { ActionButton } from '../components/ActionPanel';
import type { DrawerSection, DrawerVisualArea, DrawerActionButton } from '../components/RightSideDrawer';
import { Input, Form, Select, DatePicker, Space, Tag, Divider } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function Invoicing() {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

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
    { id: 'date', header: 'Date', width: 120, type: 'date' as const, sort: true },
    { id: 'amount', header: 'Amount', width: 120, sort: true },
    { id: 'status', header: 'Status', width: 100 },
    { id: 'dueDate', header: 'Due Date', width: 120, type: 'date' as const, sort: true }
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
      onClick: () => console.log('Archive invoices')
    },
    {
      key: 'export',
      label: 'Export',
      icon: <ExportOutlined />,
      iconOnly: true,
      onClick: () => console.log('Export invoices')
    },
    {
      key: 'send',
      label: 'Send Selected',
      icon: <DollarOutlined />,
      disabled: selectedInvoices.length === 0,
      onClick: () => console.log('Send invoices:', selectedInvoices)
    }
  ];

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedInvoices(selectedIds);
  };

  const handleRowClick = (rowData: any) => {
    setSelectedInvoice(rowData);
    setShowDrawer(true);
  };

  // Quick action buttons for invoice drawer
  const getInvoiceQuickActions = (): DrawerActionButton[] => {
    if (!selectedInvoice) return [];
    return [
      { key: 'send', label: 'Send Invoice', icon: <SendOutlined />, onClick: () => console.log('Sending invoice:', selectedInvoice.invoiceNumber) },
      { key: 'print', label: 'Print Invoice', icon: <PrinterOutlined />, onClick: () => console.log('Printing invoice:', selectedInvoice.invoiceNumber) },
      { key: 'email', label: 'Email Customer', icon: <MailOutlined />, onClick: () => console.log('Emailing customer about:', selectedInvoice.invoiceNumber) }
    ];
  };

  // Invoice details drawer configuration
  const getInvoiceVisualArea = (): DrawerVisualArea | undefined => {
    if (!selectedInvoice) return undefined;
    
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'paid': return 'green';
        case 'pending': return 'orange';
        case 'overdue': return 'red';
        default: return 'blue';
      }
    };
    
    return {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--theme-text)', marginBottom: '4px' }}>
            {selectedInvoice.invoiceNumber}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
            {selectedInvoice.customer}
          </div>
          <Space>
            <Tag color={getStatusColor(selectedInvoice.status)}>
              {selectedInvoice.status}
            </Tag>
            <Tag color="blue">
              {selectedInvoice.amount}
            </Tag>
          </Space>
        </div>
      ),
      height: 120
    };
  };

  const getInvoiceSections = (): DrawerSection[] => {
    if (!selectedInvoice) return [];
    
    return [
      {
        key: 'details',
        title: 'Invoice Details',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Invoice Number">
              <Input 
                prefix={<FileOutlined />} 
                value={selectedInvoice.invoiceNumber} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Customer">
              <Input 
                prefix={<UserOutlined />} 
                value={selectedInvoice.customer} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Amount">
              <Input 
                prefix={<DollarOutlined />} 
                value={selectedInvoice.amount} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Issue Date">
              <Input 
                prefix={<CalendarOutlined />} 
                value={dayjs(selectedInvoice.date).format('MMM DD, YYYY')} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Due Date">
              <Input 
                prefix={<CalendarOutlined />} 
                value={dayjs(selectedInvoice.dueDate).format('MMM DD, YYYY')} 
                readOnly 
              />
            </Form.Item>
          </Form>
        ),
        defaultOpen: true
      },
      {
        key: 'services',
        title: 'Services & Items',
        content: (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Haircut & Styling</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Qty: 1 × $65.00</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Color Treatment</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Qty: 1 × $45.00</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--theme-background)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>Products</div>
                <div style={{ fontSize: '12px', color: 'var(--theme-text-secondary)' }}>Hair care kit × $15.00</div>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>{selectedInvoice.amount}</span>
              </div>
            </Space>
          </div>
        )
      },
      {
        key: 'payment',
        title: 'Payment Information',
        content: (
          <Form layout="vertical" size="middle">
            <Form.Item label="Payment Method">
              <Input 
                prefix={<CreditCardOutlined />} 
                value="Credit Card (****1234)" 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Transaction ID">
              <Input value="TXN-789456123" readOnly />
            </Form.Item>
            <Form.Item label="Payment Date">
              <Input 
                value={selectedInvoice.status === 'Paid' ? dayjs(selectedInvoice.date).format('MMM DD, YYYY') : 'Not paid'} 
                readOnly 
              />
            </Form.Item>
            <Form.Item label="Notes">
              <TextArea 
                value="Payment processed successfully. Customer satisfied with service." 
                readOnly 
                rows={2}
              />
            </Form.Item>
          </Form>
        )
      }
    ];
  };

  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 120px)' }}>
      <AbstractPageView
        title="Invoicing"
        filterConfig={filterConfig}
        actions={actions}
        drawerOpen={showDrawer}
        onDrawerClose={() => {
          setShowDrawer(false);
          setSelectedInvoice(null);
        }}
        drawerTitle={selectedInvoice ? `Invoice ${selectedInvoice.invoiceNumber}` : 'New Invoice'}
        drawerWidth={450}
        drawerVisualArea={getInvoiceVisualArea()}
        drawerQuickActions={getInvoiceQuickActions()}
        drawerSections={getInvoiceSections()}
        showSaveDiscardPanel={false}
      >
        <DataTable
          columns={columns}
          data={invoiceData}
          onSelectionChange={handleSelectionChange}
          onRowClick={handleRowClick}
          height="100%"
        />
      </AbstractPageView>
    </div>
  );
}