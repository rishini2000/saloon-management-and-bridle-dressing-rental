import React, { useState } from 'react';
import { Table, Checkbox } from 'antd';

export interface DataTableColumn {
  id: string;
  header: string;
  width?: number;
  minWidth?: number;
  sort?: boolean;
  resize?: boolean;
  type?: 'string' | 'number' | 'date' | 'boolean';
}

export interface DataTableProps {
  data: any[];
  columns: DataTableColumn[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onRowClick?: (rowData: any) => void;
  height?: number;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onSelectionChange,
  onRowClick,
  height = 400,
  className
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const antColumns = columns.map(col => ({
    title: col.header,
    dataIndex: col.id,
    key: col.id,
    width: col.width || 150,
    sorter: col.sort ? (a: any, b: any) => {
      const aVal = a[col.id];
      const bVal = b[col.id];
      if (typeof aVal === 'string') return aVal.localeCompare(bVal);
      return aVal - bVal;
    } : false,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      const keys = selectedKeys as string[];
      setSelectedRowKeys(keys);
      if (onSelectionChange) {
        onSelectionChange(keys);
      }
    },
  };

  const handleRowClick = (record: any) => {
    if (onRowClick) {
      onRowClick(record);
    }
  };

  return (
    <div 
      className={className}
      style={{ 
        height: height,
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'var(--theme-surface)'
      }}
    >
      <Table
        columns={antColumns}
        dataSource={data.map(item => ({ ...item, key: item.id }))}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={false}
        scroll={{ y: height - 60 }}
        size="small"
      />
    </div>
  );
};
