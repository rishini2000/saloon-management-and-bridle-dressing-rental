import type { Route } from "./+types/home";
import { Card, Row, Col, Statistic, Typography, Divider } from 'antd';
import { CalendarOutlined, TeamOutlined, DollarOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saloon System Dashboard" },
    { name: "description", content: "Welcome to Saloon Management System!" },
  ];
}

export default function Home() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ fontFamily: '"Montagu Slab", serif', marginBottom: '8px' }}>
        Dashboard
      </Title>
      <Paragraph style={{ fontFamily: '"Figtree", sans-serif', marginBottom: '32px', color: 'var(--theme-text-secondary)' }}>
        Welcome to your Saloon Management System. Here's an overview of your business.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="saloon-card" style={{ textAlign: 'center' }}>
            <Statistic
              title="Today's Appointments"
              value={12}
              prefix={<CalendarOutlined style={{ color: 'var(--theme-primary)' }} />}
              valueStyle={{ fontFamily: '"Montagu Slab", serif', color: 'var(--theme-text)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="saloon-card" style={{ textAlign: 'center' }}>
            <Statistic
              title="Active Clients"
              value={248}
              prefix={<TeamOutlined style={{ color: 'var(--theme-primary)' }} />}
              valueStyle={{ fontFamily: '"Montagu Slab", serif', color: 'var(--theme-text)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="saloon-card" style={{ textAlign: 'center' }}>
            <Statistic
              title="Monthly Revenue"
              value={15420}
              prefix={<DollarOutlined style={{ color: 'var(--theme-primary)' }} />}
              precision={2}
              valueStyle={{ fontFamily: '"Montagu Slab", serif', color: 'var(--theme-text)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="saloon-card" style={{ textAlign: 'center' }}>
            <Statistic
              title="Services Completed"
              value={89}
              prefix={<TrophyOutlined style={{ color: 'var(--theme-primary)' }} />}
              valueStyle={{ fontFamily: '"Montagu Slab", serif', color: 'var(--theme-text)' }}
            />
          </Card>
        </Col>
      </Row>

      <Divider className="saloon-divider" style={{ margin: '32px 0' }} />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            className="saloon-card"
            title={
              <span style={{ fontFamily: '"Montagu Slab", serif', color: 'var(--theme-text)' }}>
                Recent Activity
              </span>
            }
          >
            <div style={{ fontFamily: '"Figtree", sans-serif' }}>
              <p className="saloon-border-light" style={{ padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
                <strong>Sarah Johnson</strong> booked a haircut appointment for tomorrow at 2:00 PM
              </p>
              <p className="saloon-border-light" style={{ padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
                <strong>Mike Chen</strong> completed a beard trim service - $35.00
              </p>
              <p className="saloon-border-light" style={{ padding: '12px', borderRadius: '6px', marginBottom: '0' }}>
                <strong>Emma Davis</strong> rescheduled her color treatment to next week
              </p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            className="saloon-card"
            title={
              <span style={{ fontFamily: '"Montagu Slab", serif', color: 'var(--theme-text)' }}>
                Quick Actions
              </span>
            }
          >
            <div style={{ fontFamily: '"Figtree", sans-serif' }}>
              <div className="saloon-border-prominent" style={{ padding: '16px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
                <strong>New Appointment</strong>
                <br />
                <small style={{ color: 'var(--theme-text-secondary)' }}>Schedule a client visit</small>
              </div>
              <div className="saloon-border-medium" style={{ padding: '16px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
                <strong>Add Client</strong>
                <br />
                <small style={{ color: 'var(--theme-text-secondary)' }}>Register new customer</small>
              </div>
              <div className="saloon-border-medium" style={{ padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <strong>View Reports</strong>
                <br />
                <small style={{ color: 'var(--theme-text-secondary)' }}>Business analytics</small>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
