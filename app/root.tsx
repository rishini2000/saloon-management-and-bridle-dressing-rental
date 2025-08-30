import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Layout as AntLayout, Menu, Avatar, Dropdown, Typography } from "antd";
import {
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  ToolOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const { Header, Sider, Content } = AntLayout;
const { Title } = Typography;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTitle, setCurrentTitle] = useState("Dashboard");

  // Menu items configuration
  const menuItems = [
    {
      key: "/appointments",
      icon: <CalendarOutlined />,
      label: "Appointments",
      title: "Appointment Manager"
    },
    {
      key: "/invoicing",
      icon: <FileTextOutlined />,
      label: "Invoicing",
      title: "Invoicing"
    },
    {
      key: "/crm",
      icon: <TeamOutlined />,
      label: "CRM",
      title: "CRM"
    },
    {
      key: "/employees",
      icon: <UserOutlined />,
      label: "Employees",
      title: "Employee Manager"
    },
    {
      key: "/services",
      icon: <ToolOutlined />,
      label: "Services",
      title: "Service Manager"
    }
  ];

  // Update title based on current route
  useEffect(() => {
    const currentItem = menuItems.find(item => item.key === location.pathname);
    if (currentItem) {
      setCurrentTitle(currentItem.title);
    } else {
      setCurrentTitle("Dashboard");
    }
  }, [location.pathname]);

  // User profile dropdown menu
  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsed={true} 
        theme="dark"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo placeholder */}
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #303030'
        }}>
          <div style={{ 
            width: 32, 
            height: 32, 
            backgroundColor: '#1890ff', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            S
          </div>
        </div>
        
        {/* Navigation Menu - Centered */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            style={{ 
              border: 'none',
              backgroundColor: 'transparent'
            }}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label
            }))}
          />
        </div>
      </Sider>
      
      <AntLayout>
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Title level={3} style={{ margin: 0 }}>
            {currentTitle}
          </Title>
          
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['hover']}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.3s'
            }}>
              <Avatar 
                size="small" 
                icon={<UserOutlined />} 
                style={{ marginRight: 8 }}
              />
              <span>John Doe</span>
            </div>
          </Dropdown>
        </Header>
        
        <Content style={{ 
          margin: '24px',
          background: '#fff',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
