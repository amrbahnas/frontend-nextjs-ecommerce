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
import { useTranslations } from "next-intl";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Admin = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("admin.layout");
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
      title={t("logout.title")}
      description={t("logout.description")}
      okText={t("logout.confirm")}
      cancelText={t("logout.cancel")}
      onConfirm={handleLogout}
      okButtonProps={{ loading: isPending }}
    >
      <div className="flex items-center gap-2 hover:text-white">
        <LogoutOutlined />
        <span>{t("logout.title")}</span>
      </div>
    </Popconfirm>
  );

  const mainMenuItems: MenuItem[] = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: t("menu.dashboard"),
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: t("menu.orders"),
    },
    {
      key: "/admin/products",
      icon: <ShoppingOutlined />,
      label: t("menu.products"),
    },
    {
      key: "/admin/categories",
      icon: <TagOutlined />,
      label: t("menu.categories"),
    },
    {
      key: "/admin/sub-category",
      icon: <TagsOutlined />,
      label: t("menu.subCategories"),
    },
    {
      key: "/admin/coupons",
      icon: <GiftOutlined />,
      label: t("menu.coupons"),
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: t("menu.users"),
    },
    // {
    //   key: "/admin/settings",
    //   icon: <SettingOutlined />,
    //   label: t("menu.settings"),
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
              {collapsed ? t("title.short") : t("title.full")}
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
            <h1 className="text-xl font-bold">{t("title.full")}</h1>
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
          <div className="pe-6 sm:px-6 h-full flex justify-between items-center w-full">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-black"
              title={t("header.profile")}
            >
              <Avatar src={user?.profileImg} alt={user?.name || ""} />
              <h2 className="text-lg font-semibold hidden sm:block">
                {t("header.welcome", { name: user?.name || "" })}
              </h2>
            </Link>
            <Link href="/" title={t("header.home")}>
              <CiShop size={40} className="text-primary/90" />
            </Link>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
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
