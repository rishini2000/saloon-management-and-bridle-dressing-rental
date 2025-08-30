import { Typography } from "antd";

const { Title } = Typography;

export default function Inventory() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ 
        fontFamily: 'var(--font-heading)', 
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--theme-text)'
      }}>
        Inventory Management
      </Title>
      <p style={{ 
        fontFamily: 'var(--font-primary)', 
        color: 'var(--theme-text-secondary)' 
      }}>
        Manage your salon inventory, products, and supplies.
      </p>
    </div>
  );
}
