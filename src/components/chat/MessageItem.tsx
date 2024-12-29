import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Message } from './types';

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  const isUserMessage = !message.isAdmin;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isUserMessage ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: '8px',
        width: '100%',
      }}
    >
      <Avatar
        icon={<UserOutlined />}
        style={{
          backgroundColor: message.isAdmin ? '#1890ff' : '#f56a00',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUserMessage ? 'flex-end' : 'flex-start',
          maxWidth: '70%',
        }}
      >
        <div
          style={{
            padding: message.type === 'text' ? '8px 12px' : '4px',
            borderRadius: '12px',
            backgroundColor: message.isAdmin ? '#f0f0f0' : '#1890ff',
            color: message.isAdmin ? 'black' : 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {message.type === 'text' ? (
            message.content
          ) : (
            <Image
              src={message.content}
              alt="Message image"
              style={{
                maxWidth: '100%',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              preview={{
                mask: null,
                maskClassName: 'custom-mask',
              }}
            />
          )}
        </div>
        <span
          style={{
            fontSize: '12px',
            color: '#999',
            marginTop: '4px',
          }}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};
