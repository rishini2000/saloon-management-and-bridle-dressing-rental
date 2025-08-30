import { Typography } from "antd";

const { Title } = Typography;

export default function Settings() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ 
        fontFamily: 'var(--font-heading)', 
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--theme-text)'
      }}>
        Settings
      </Title>
      <p style={{ 
        fontFamily: 'var(--font-primary)', 
        color: 'var(--theme-text-secondary)' 
      }}>
        Configure your salon settings, preferences, and system options.
      </p>
    </div>
  );
}
