import { List } from 'antd';
import { Message } from './types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <List
      className="chat-messages"
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(message) => (
        <List.Item
          key={message.id}
          style={{
            justifyContent: message.isAdmin ? "flex-start" : "flex-end",
            border: "none",
            padding: "8px 0",
          }}
        >
          <MessageItem message={message} />
        </List.Item>
      )}
      style={{
        overflowY: "auto",
        flex: 1,
        marginBottom: "1rem",
        padding: "0 10px",
      }}
    />
  );
};
