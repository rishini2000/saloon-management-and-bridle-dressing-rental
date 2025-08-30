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
import { Layout as AntLayout, Menu, Avatar, Dropdown, Typography, Button, Drawer } from "antd";
import {
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  ToolOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { ModeToggle } from "./components/ModeToggle";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montagu+Slab:opsz,wght@16..144,100..900&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap",
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Menu items configuration (without logout)
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

  // Handle mobile breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // User profile dropdown menu
  const userMenuItems = [
    {
      key: 'mode-toggle',
      label: <ModeToggle />,
      disabled: true,
      style: { padding: 0, margin: 0 }
    },
    {
      key: 'theme-switcher',
      label: <ThemeSwitcher />,
      disabled: true,
      style: { padding: 0, margin: 0 }
    },
    {
      type: 'divider' as const,
      style: { margin: 0, borderColor: 'var(--theme-border)' }
    },
    {
      key: 'profile',
      icon: <ProfileOutlined style={{ fontSize: '18px' }} />,
      label: <span style={{ fontSize: '16px', padding: '4px 0' }}>Profile</span>,
      style: { padding: '12px 16px' }
    },
    {
      key: 'settings',
      icon: <SettingOutlined style={{ fontSize: '18px' }} />,
      label: <span style={{ fontSize: '16px', padding: '4px 0' }}>Settings</span>,
      style: { padding: '12px 16px' }
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    if (isMobile) {
      setMobileMenuVisible(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider 
          collapsed={true} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--theme-sider)',
            borderRight: '1px solid var(--theme-border)',
          }}
        >
          {/* Logo placeholder */}
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid var(--theme-border)'
        }}>
          <div style={{ 
            width: 32, 
            height: 32, 
            backgroundColor: 'var(--theme-primary)', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: '"Montagu Slab", serif'
          }}>
            S
          </div>
        </div>
        
        {/* Navigation Menu - Vertically centered on screen */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)' // Account for logo area height
        }}>
          <div>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              onClick={handleMenuClick}
              style={{ 
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--theme-text)'
              }}
              items={menuItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: item.label
              }))}
            />
          </div>
          
          {/* Logout button at bottom */}
          <div style={{ paddingBottom: '20px' }}>
            <Menu
              mode="inline"
              onClick={handleMenuClick}
              style={{ 
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--theme-text)'
              }}
              items={[{
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout'
              }]}
            />
          </div>
        </div>
        </Sider>
      )}
      
      {/* Mobile Drawer Menu */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              backgroundColor: 'var(--theme-primary)', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              marginRight: 12,
              fontFamily: '"Montagu Slab", serif'
            }}>
              S
            </div>
            <span>Saloon System</span>
          </div>
        }
        placement="left"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
        styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column', height: '100%' } }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            style={{ border: 'none', flex: 1 }}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label
            }))}
          />
          
          {/* Logout button at bottom of mobile drawer */}
          <div style={{ borderTop: '1px solid #f0f0f0', padding: '8px 0' }}>
            <Menu
              mode="inline"
              onClick={handleMenuClick}
              style={{ border: 'none' }}
              items={[{
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout'
              }]}
            />
          </div>
        </div>
      </Drawer>
      
      <AntLayout>
        <Header style={{ 
          padding: '0 24px', 
          background: 'var(--theme-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--theme-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={toggleMobileMenu}
                style={{ marginRight: 16 }}
              />
            )}
            <Title level={3} style={{ margin: 0, fontFamily: '"Montagu Slab", serif', color: 'var(--theme-text)' }}>
              {currentTitle}
            </Title>
          </div>
          
          <Dropdown
            menu={{ 
              items: userMenuItems
            }}
            placement="bottomRight"
            trigger={['hover']}
            dropdownRender={(menu) => (
              <div style={{ 
                minWidth: '280px',
                fontSize: '16px',
                border: '1px solid var(--theme-border)',
                borderRadius: '8px',
                backgroundColor: 'var(--theme-surface)',
                boxShadow: 'none'
              }}>
                {menu}
              </div>
            )}
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
                style={{ marginRight: 8, backgroundColor: 'var(--theme-primary)' }}
              />
              <span style={{ color: 'var(--theme-text)', fontFamily: '"Figtree", sans-serif' }}>John Doe</span>
            </div>
          </Dropdown>
        </Header>
        
        <Content style={{ 
          margin: '24px',
          background: 'var(--theme-surface)',
          borderRadius: '8px',
          overflow: 'auto',
          border: '1px solid var(--theme-border)'
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
