import { Skeleton, List } from "antd";

export const ConversationsSkeleton = () => {
  return (
    <div className="w-[300px]   border-gray-200 overflow-auto">
      <List
        dataSource={[1, 2, 3, 4, 5]}
        renderItem={(item) => (
          <List.Item
            key={item}
            style={{
              padding: "12px 16px",
            }}
          >
            <List.Item.Meta
              avatar={<Skeleton.Avatar active size="large" />}
              title={
                <Skeleton.Input style={{ width: 120 }} active size="small" />
              }
              description={
                <Skeleton.Input style={{ width: 180 }} active size="small" />
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
