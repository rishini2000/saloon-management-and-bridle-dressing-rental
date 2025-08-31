import React, { useState, useEffect, useCallback } from 'react';
import { Input, Select, DatePicker, Button, Space, Dropdown, Menu, Tooltip } from 'antd';
import { SearchOutlined, CalendarOutlined, ReloadOutlined, FilterOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

export interface FilterConfig {
  textSearch?: {
    placeholder?: string;
    enabled: boolean;
  };
  dateRange?: {
    enabled: boolean;
    presets?: string[];
  };
  searchSelect?: Array<{
    key: string;
    placeholder: string;
    options: Array<{ label: string; value: string | number }>;
    multiple?: boolean;
  }>;
}

export interface FilterValues {
  textSearch?: string;
  dateRange?: [Dayjs | null, Dayjs | null] | null;
  searchSelect?: Record<string, any>;
}

interface FilterComponentProps {
  config: FilterConfig;
  onFiltersChange: (filters: FilterValues) => void;
  className?: string;
}

const DATE_PRESETS = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Week', value: 'thisWeek' },
  { label: 'Last Week', value: 'lastWeek' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'This Year', value: 'thisYear' },
  { label: 'Custom Range', value: 'custom' }
];

export const FilterComponent: React.FC<FilterComponentProps> = ({
  config,
  onFiltersChange,
  className
}) => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [datePreset, setDatePreset] = useState<string>('');

  const getDateRangeFromPreset = (preset: string): [Dayjs, Dayjs] | null => {
    const now = dayjs();
    switch (preset) {
      case 'today':
        return [now.startOf('day'), now.endOf('day')];
      case 'yesterday':
        const yesterday = now.subtract(1, 'day');
        return [yesterday.startOf('day'), yesterday.endOf('day')];
      case 'this-week':
        return [now.startOf('week'), now.endOf('week')];
      case 'last-week':
        const lastWeek = now.subtract(1, 'week');
        return [lastWeek.startOf('week'), lastWeek.endOf('week')];
      case 'this-month':
        return [now.startOf('month'), now.endOf('month')];
      case 'last-month':
        const lastMonth = now.subtract(1, 'month');
        return [lastMonth.startOf('month'), lastMonth.endOf('month')];
      case 'this-year':
        return [now.startOf('year'), now.endOf('year')];
      default:
        return null;
    }
  };

  const handleDatePresetSelect = (preset: string) => {
    setDatePreset(preset);
    if (preset === 'custom') {
      return;
    }
    
    const range = getDateRangeFromPreset(preset);
    const newFilters = { ...filters, dateRange: range };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    checkForChanges(newFilters);
  };

  const handleTextSearchChange = (value: string) => {
    const newFilters = { ...filters, textSearch: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    checkForChanges(newFilters);
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    const newFilters = { ...filters, dateRange: dates };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    checkForChanges(newFilters);
    if (dates) {
      setDatePreset('custom');
    }
  };

  const handleSearchSelectChange = (key: string, value: any) => {
    const newFilters = {
      ...filters,
      searchSelect: { ...filters.searchSelect, [key]: value }
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    checkForChanges(newFilters);
  };

  const checkForChanges = useCallback((currentFilters: FilterValues) => {
    const hasTextSearch = currentFilters.textSearch && currentFilters.textSearch.trim() !== '';
    const hasDateRange = currentFilters.dateRange && currentFilters.dateRange[0] && currentFilters.dateRange[1];
    const hasSearchSelect = currentFilters.searchSelect && 
      Object.values(currentFilters.searchSelect).some(val => 
        val !== undefined && val !== null && val !== '' && 
        (Array.isArray(val) ? val.length > 0 : true)
      );
    
    const hasAnyChanges = Boolean(hasTextSearch || hasDateRange || hasSearchSelect);
    setHasChanges(prev => prev !== hasAnyChanges ? hasAnyChanges : prev);
  }, []);

  const handleResetFilters = () => {
    const emptyFilters: FilterValues = {};
    setFilters(emptyFilters);
    setDatePreset('');
    onFiltersChange(emptyFilters);
    setHasChanges(false);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  const dateRangeMenu = (
    <Menu
      onClick={({ key }) => handleDatePresetSelect(key)}
      items={[
        // Current period group
        { key: 'today', label: 'Today' },
        { key: 'this-week', label: 'This Week' },
        { key: 'this-month', label: 'This Month' },
        { type: 'divider' },
        // Previous period group
        { key: 'yesterday', label: 'Yesterday' },
        { key: 'last-week', label: 'Last Week' },
        { key: 'last-month', label: 'Last Month' },
        { type: 'divider' },
        // Custom range
        { key: 'custom', label: 'Custom Range' }
      ]}
    />
  );

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '8px 12px',
      backgroundColor: 'var(--theme-surface)',
      borderRadius: '6px'
    }}>
      <Space size="small" wrap>
        {/* Text Search */}
        {config.textSearch?.enabled && (
          <Input
            placeholder={config.textSearch.placeholder || 'Search...'}
            prefix={<SearchOutlined />}
            value={filters.textSearch || ''}
            onChange={(e) => handleTextSearchChange(e.target.value)}
            style={{ width: 180 }}
            size="small"
            allowClear
          />
        )}

        {/* Date Range */}
        {config.dateRange?.enabled && (
          <Space.Compact>
            <Dropdown overlay={dateRangeMenu} trigger={['click']}>
              <Button icon={<CalendarOutlined />} size="small">
                {datePreset ? (
                  datePreset === 'today' ? 'Today' :
                  datePreset === 'yesterday' ? 'Yesterday' :
                  datePreset === 'this-week' ? 'This Week' :
                  datePreset === 'last-week' ? 'Last Week' :
                  datePreset === 'this-month' ? 'This Month' :
                  datePreset === 'last-month' ? 'Last Month' :
                  datePreset === 'custom' ? 'Custom Range' :
                  'Date Range'
                ) : 'Date Range'}
              </Button>
            </Dropdown>
            {datePreset === 'custom' && (
              <RangePicker
                value={filters.dateRange}
                onChange={handleDateRangeChange}
                format="MM/DD/YYYY"
                size="small"
              />
            )}
          </Space.Compact>
        )}

        {/* Search Select Filters */}
        {config.searchSelect?.map((selectConfig) => (
          <Select
            key={selectConfig.key}
            placeholder={selectConfig.placeholder}
            style={{ minWidth: 130 }}
            size="small"
            allowClear
            mode={selectConfig.multiple ? 'multiple' : undefined}
            value={filters.searchSelect?.[selectConfig.key]}
            onChange={(value) => {
              handleSearchSelectChange(selectConfig.key, value);
            }}
            options={selectConfig.options}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        ))}

        {/* Reset and Apply Filters */}
        <Tooltip title="Reset Filters">
          <Button 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={handleResetFilters}
          />
        </Tooltip>
        
        <Tooltip title="Apply Filters">
          <Button 
            icon={<CheckOutlined />} 
            size="small"
            type="primary"
            onClick={handleApplyFilters}
          />
        </Tooltip>
      </Space>
    </div>
  );
};
