import { Card, Skeleton, Table } from "antd";
import Container from "@/components/ui/container";

const AllOrdersSkeleton = () => {
  const columns = [
    { title: "Order ID", dataIndex: "id" },
    { title: "Date", dataIndex: "date" },
    { title: "Total", dataIndex: "total" },
    { title: "Payment Status", dataIndex: "payment" },
    { title: "Delivery Status", dataIndex: "delivery" },
    { title: "Actions", dataIndex: "actions" },
  ];

  const data = Array(5).fill({
    id: <Skeleton.Input style={{ width: 100 }} active size="small" />,
    date: <Skeleton.Input style={{ width: 100 }} active size="small" />,
    total: <Skeleton.Input style={{ width: 80 }} active size="small" />,
    payment: <Skeleton.Input style={{ width: 80 }} active size="small" />,
    delivery: <Skeleton.Input style={{ width: 100 }} active size="small" />,
    actions: <Skeleton.Input style={{ width: 100 }} active size="small" />,
  });

  return (
    <Container>
      <div className="mb-6">
        <Skeleton.Input style={{ width: 200 }} active size="large" />
        <div className="mt-2">
          <Skeleton.Input style={{ width: 300 }} active />
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            position: ["bottomCenter"],
            showSizeChanger: false,
          }}
        />
      </Card>
    </Container>
  );
};

export default AllOrdersSkeleton;
