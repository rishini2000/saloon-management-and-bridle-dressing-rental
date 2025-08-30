import { Typography } from "antd";

const { Title } = Typography;

export default function Reports() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ 
        fontFamily: 'var(--font-heading)', 
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--theme-text)'
      }}>
        Reports & Analytics
      </Title>
      <p style={{ 
        fontFamily: 'var(--font-primary)', 
        color: 'var(--theme-text-secondary)' 
      }}>
        View business reports, analytics, and performance metrics.
      </p>
    </div>
  );
}
