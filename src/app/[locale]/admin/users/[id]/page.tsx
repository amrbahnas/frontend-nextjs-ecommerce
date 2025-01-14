"use client";
import React, { use } from "react";
import { useGetAdminUserReport } from "./_api/query";
import { useAdminEditUser } from "../_api/actions";
import {
  Avatar,
  Card,
  Tabs,
  Table,
  Tag,
  Spin,
  Typography,
  Statistic,
  Row,
  Col,
  List,
  Descriptions,
  Button,
  Select,
  Switch,
  Tooltip,
  TableProps,
} from "antd";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBox,
  FaStar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaClipboardList,
  FaComments,
  FaAddressCard,
  FaUserCog,
  FaToggleOn,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import { formatPrice } from "@/utils/priceDisplay";
import { useConfirmModal } from "@/hooks/global/useConfirmModal";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Define icon colors
const iconColors = {
  user: "#1890ff", // Blue
  orders: "#52c41a", // Green
  money: "#722ed1", // Purple
  cart: "#fa8c16", // Orange
  star: "#faad14", // Gold
  comments: "#eb2f96", // Pink
  address: "#13c2c2", // Cyan
};

const Page = ({ params }: { params: Params }) => {
  const { id } = use(params);
  const { userReport: user, isLoading, refetch } = useGetAdminUserReport(id);
  const {
    changeUserRole,
    changeUserRoleLoading,
    toggleActive,
    toggleActiveLoading,
  } = useAdminEditUser(id);
  const { showConfirmModal, ConfirmModalComponent } = useConfirmModal();

  const handleRoleChange = async (newRole: string) => {
    showConfirmModal({
      title: "Change User Role",
      action: "change role",
      itemName: "user role",
      onConfirm: async () => {
        try {
          changeUserRole(
            { role: newRole },
            {
              onSuccess: refetch,
            }
          );
        } catch (error) {
          console.error("Failed to change user role:", error);
        }
      },
      isLoading: changeUserRoleLoading,
    });
  };

  const handleToggleActive = async () => {
    showConfirmModal({
      title: user?.active ? "Deactivate User" : "Activate User",
      action: user?.active ? "deactivate" : "activate",
      itemName: "user",
      onConfirm: async () => {
        try {
          toggleActive(
            {},
            {
              onSuccess: refetch,
            }
          );
        } catch (error) {
          console.error("Failed to toggle user status:", error);
        }
      },
      isLoading: toggleActiveLoading,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) return null;

  const orderColumns: TableProps<any>["columns"] = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <Text strong>#{id.slice(-5)}</Text>,
    },
    {
      title: "Address",
      dataIndex: ["address", "address"],
      key: "address",
      render: (address: string) => {
        return (
          <Tooltip title={address}>
            <Text strong className="truncate !block !w-40">
              {address}
            </Text>
          </Tooltip>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "success" ? "success" : "processing"}>
          {status}
        </Tag>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaCreditCard /> <span>Payment Status</span>
        </div>
      ),
      dataIndex: "isPaid",
      key: "isPaid",
      align: "center",
      render: (isPaid: boolean) => (
        <div className="flex items-center justify-center gap-2">
          {isPaid ? (
            <FaCheckCircle className="text-green-500 text-lg" />
          ) : (
            <FaTimesCircle className="text-red-500 text-lg" />
          )}
          <span>{isPaid ? "Paid" : "Not Paid"}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaCreditCard /> <span>Payment Method</span>
        </div>
      ),
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
      render: (method: string) => (
        <div className="flex items-center justify-center gap-2">
          <FaCreditCard className="text-gray-500" />
          <span>{method}</span>
        </div>
      ),
    },

    {
      title: (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <FaTruck /> <span>Delivery Status</span>
        </div>
      ),
      dataIndex: "isDelivered",
      key: "isDelivered",
      align: "center",
      render: (isDelivered: boolean) => (
        <div className="flex items-center justify-center gap-2">
          {isDelivered ? (
            <FaCheckCircle className="text-green-500 text-lg" />
          ) : (
            <FaTimesCircle className="text-red-500 text-lg" />
          )}
          <span>{isDelivered ? "Delivered" : "Not Delivered"}</span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "totalOrderPrice",
      key: "total",
      align: "right" as const,
      render: (total: number) => <Text strong>{formatPrice(total)}</Text>,
    },
  ];

  const cartColumns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right" as const,
      render: (price: number, record: any) => (
        <Text>{formatPrice(+price * record.quantity)}</Text>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* User Header Card */}
      <Card>
        <Row gutter={[24, 24]} align="middle">
          <Col>
            <Avatar
              size={96}
              src={user.profileImg}
              icon={<FaUser color={iconColors.user} />}
            />
          </Col>
          <Col flex="1">
            <Title level={2} style={{ marginBottom: 4 }}>
              {user.name}
            </Title>
            <Text type="secondary">{user.email}</Text>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-4">
                <Tag color={user.active ? "success" : "default"}>
                  {user.active ? "Active" : "Inactive"}
                </Tag>
                <Tag color="blue">{user.role}</Tag>
              </div>
              <div className="flex items-center gap-4">
                <Select
                  style={{ width: 120 }}
                  value={user.role}
                  onChange={handleRoleChange}
                  loading={changeUserRoleLoading}
                >
                  <Option value="user">User</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="manager">Manager</Option>
                </Select>
                <Button
                  type={user.active ? "default" : "primary"}
                  onClick={handleToggleActive}
                  loading={toggleActiveLoading}
                  icon={
                    <Switch
                      size="small"
                      className="mr-2"
                      checked={user.active}
                    />
                  }
                >
                  {user.active ? "Deactivate" : "Activate"} User
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Total Orders"
                    value={user.stats.totalOrders}
                    prefix={
                      <FaBox
                        className="mr-2"
                        style={{ color: iconColors.orders }}
                      />
                    }
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Total Spent"
                    value={formatPrice(user.stats.totalSpent)}
                    prefix={
                      <FaMoneyBillWave
                        className="mr-2"
                        style={{ color: iconColors.money }}
                      />
                    }
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Avg Order Value"
                    value={formatPrice(user.stats.averageOrderValue)}
                    prefix={
                      <FaShoppingCart
                        className="mr-2"
                        style={{ color: iconColors.cart }}
                      />
                    }
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Avg Rating"
                    value={user.stats.averageRating.toFixed(1)}
                    suffix="⭐"
                    prefix={
                      <FaStar
                        className="mr-2"
                        style={{ color: iconColors.star }}
                      />
                    }
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Tabs Section */}
      <Card>
        <Tabs defaultActiveKey="orders" type="card">
          <TabPane
            tab={
              <span>
                <FaClipboardList
                  className="mr-2"
                  style={{ color: iconColors.orders }}
                />
                Orders ({user.orders.length})
              </span>
            }
            key="orders"
          >
            <Table
              scroll={{ x: "max-content" }}
              columns={orderColumns}
              dataSource={user.orders}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane
            tab={
              <span>
                <FaComments
                  className="mr-2"
                  style={{ color: iconColors.comments }}
                />
                Reviews ({user.reviews.length})
              </span>
            }
            key="reviews"
          >
            <List
              itemLayout="vertical"
              dataSource={user.reviews}
              pagination={{ pageSize: 5 }}
              renderItem={(review) => (
                <List.Item
                  key={review.id}
                  extra={
                    <Tag color="blue">
                      {review.rating}{" "}
                      <FaStar
                        style={{ color: iconColors.star }}
                        className="ml-1"
                      />
                    </Tag>
                  }
                >
                  <List.Item.Meta
                    title={review.product.title}
                    description={new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  />
                  <Text>{review.comment}</Text>
                </List.Item>
              )}
            />
          </TabPane>

          <TabPane
            tab={
              <span>
                <FaAddressCard
                  className="mr-2"
                  style={{ color: iconColors.address }}
                />
                Addresses ({user.addresses.length})
              </span>
            }
            key="addresses"
          >
            <Row gutter={[16, 16]}>
              {user.addresses.map((address) => (
                <Col key={address.id} xs={24} md={12}>
                  <Card size="small">
                    <Descriptions
                      title={
                        <span>
                          <FaMapMarkerAlt
                            className="mr-2"
                            style={{ color: iconColors.address }}
                          />
                          {address.address}
                        </span>
                      }
                      column={1}
                    >
                      <Descriptions.Item>{address.city}</Descriptions.Item>
                      <Descriptions.Item>
                        {address.city}, {address.state} {address.zipCode}
                      </Descriptions.Item>
                      <Descriptions.Item>{address.country}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span>
                <FaShoppingCart
                  className="mr-2"
                  style={{ color: iconColors.cart }}
                />
                Cart ({user?.cart?.cartItems?.length})
              </span>
            }
            key="cart"
          >
            <Table
              scroll={{ x: "max-content" }}
              columns={cartColumns}
              dataSource={user?.cart?.cartItems}
              rowKey="id"
              pagination={false}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      <Text strong>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong>
                        {formatPrice(
                          user.cart.totalPriceAfterDiscount ||
                            user.cart.totalCartPrice
                        )}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
      <ConfirmModalComponent />
    </div>
  );
};

export default Page;
