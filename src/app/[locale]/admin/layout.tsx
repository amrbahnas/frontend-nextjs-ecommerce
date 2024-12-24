"use client";
import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TagsOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from "next/navigation";

const { Header, Content, Sider } = Layout;

const menuItems = [
  { 
    key: '/admin', 
    icon: <DashboardOutlined />, 
    label: 'Dashboard',
  },
  { 
    key: '/admin/products', 
    icon: <ShoppingOutlined />, 
    label: 'All Products',
  },
  { 
    key: '/admin/categories', 
    icon: <TagOutlined />, 
    label: 'Categories',
  },
  { 
    key: '/admin/sub-category', 
    icon: <TagsOutlined />, 
    label: 'Sub-Category',
  },
  { 
    key: '/admin/orders', 
    icon: <ShoppingCartOutlined />, 
    label: 'Orders',
  },
  { 
    key: '/admin/customers', 
    icon: <UserOutlined />, 
    label: 'Customers',
  },
  { 
    key: '/admin/coupons', 
    icon: <GiftOutlined />, 
    label: 'Coupons',
  },
  { 
    key: '/admin/settings', 
    icon: <SettingOutlined />, 
    label: 'Settings',
  },
];

const Admin = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="min-h-screen shadow-lg"
      >
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-white text-xl font-bold">
            {collapsed ? 'AP' : 'Admin Panel'}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header 
          style={{ 
            padding: 0, 
            background: colorBgContainer,
          }}
          className="shadow-sm flex items-center"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger px-6 text-xl',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="px-6 h-full flex items-center">
            <h2 className="text-lg font-semibold">Welcome, Admin</h2>
          </div>
        </Header>
        <Content className="m-6">
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="shadow-sm"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
