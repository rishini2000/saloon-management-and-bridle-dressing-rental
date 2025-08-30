import { Typography } from "antd";

const { Title } = Typography;

export default function ServiceManager() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ 
        fontFamily: 'var(--font-heading)', 
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--theme-text)'
      }}>
        Service Manager
      </Title>
      <p style={{ 
        fontFamily: 'var(--font-primary)', 
        color: 'var(--theme-text-secondary)' 
      }}>
        Create services, assign to employees, manage products and rentals.
      </p>
    </div>
  );
}
