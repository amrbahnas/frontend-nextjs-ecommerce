"use client";
import { useLogout } from "@/hooks/global/useLogout";
import useUserStore from "@/store/useUserStore";
import {
  DashboardOutlined,
  GiftOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu, Popconfirm, theme, Drawer } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CiShop } from "react-icons/ci";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Admin = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const { isPending, logout } = useLogout();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key !== "logout") {
      router.push(key);
      if (isMobile) {
        setDrawerVisible(false);
      }
    }
  };

  const handleLogout = (e: React.MouseEvent<HTMLElement> | undefined) => {
    if (e) {
      e.preventDefault();
    }
    logout("/auth/login");
  };

  const LogoutLabel = () => (
    <Popconfirm
      title="Logout"
      description="Are you sure you want to logout?"
      okText="Yes"
      cancelText="No"
      onConfirm={handleLogout}
      okButtonProps={{ loading: isPending }}
    >
      <div className="flex items-center gap-2 hover:text-white">
        <LogoutOutlined />
        <span>Logout</span>
      </div>
    </Popconfirm>
  );

  const mainMenuItems: MenuItem[] = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
    },
    {
      key: "/admin/products",
      icon: <ShoppingOutlined />,
      label: "All Products",
    },
    {
      key: "/admin/categories",
      icon: <TagOutlined />,
      label: "Categories",
    },
    {
      key: "/admin/sub-category",
      icon: <TagsOutlined />,
      label: "Sub-Category",
    },

    {
      key: "/admin/coupons",
      icon: <GiftOutlined />,
      label: "Coupons",
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Users",
    },
    // {
    //   key: "/admin/settings",
    //   icon: <SettingOutlined />,
    //   label: "Settings",
    // },
    { type: "divider" },
    {
      key: "logout",
      label: <LogoutLabel />,
      danger: true,
      className: "mt-auto",
    },
  ];

  return (
    <Layout className="min-h-screen">
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="min-h-screen shadow-lg flex flex-col"
        >
          <div className="p-4 flex items-center justify-center">
            <h1 className="text-white text-xl font-bold">
              {collapsed ? "AP" : "Admin Panel"}
            </h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname || ""]}
            items={mainMenuItems}
            className="flex-1 border-r-0"
            onClick={handleMenuClick}
          />
        </Sider>
      )}

      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          styles={{
            body: {
              padding: 0,
              height: "100%",
            },
          }}
          width={250}
        >
          <div className="p-4 flex items-center justify-center">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[pathname || ""]}
            items={mainMenuItems}
            className="flex-1 border-r-0"
            onClick={handleMenuClick}
          />
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="shadow-sm flex items-center"
        >
          {!isMobile &&
            React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger px-6 text-xl",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          {isMobile && (
            <MenuUnfoldOutlined
              className="trigger px-6 text-xl"
              onClick={() => setDrawerVisible(true)}
            />
          )}
          <div className=" pr-6 sm:px-6 h-full flex justify-between items-center w-full">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-black"
              title="Profile"
            >
              <Avatar src={user?.profileImg} alt="user" />
              <h2 className="text-lg font-semibold hidden sm:block">
                Welcome, {user?.name}
              </h2>
            </Link>
            <Link href="/" title="Home">
              <CiShop size={40} className="text-primary/90" />
            </Link>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            // padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="p-4 sm:p-6"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
