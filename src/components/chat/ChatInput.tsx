import { Input, Button } from 'antd';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { MessageType } from './types';

interface ChatInputProps {
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: (type: MessageType, content: string) => void;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChatInput = ({
  newMessage,
  onMessageChange,
  onSendMessage,
  onImageSelect,
}: ChatInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ padding: '10px', display: 'flex', gap: '8px', borderTop: '1px solid #f0f0f0' }}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={onImageSelect}
      />
      <Button
        shape="circle"
        icon={<PictureOutlined />}
        onClick={() => fileInputRef.current?.click()}
        size="large"
      />
      <Input
        value={newMessage}
        onChange={(e) => onMessageChange(e.target.value)}
        onPressEnter={() => onSendMessage('text', newMessage)}
        placeholder="Type your message..."
        style={{ borderRadius: '20px' }}
        size="large"
      />
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        onClick={() => onSendMessage('text', newMessage)}
        size="large"
      />
    </div>
  );
};
