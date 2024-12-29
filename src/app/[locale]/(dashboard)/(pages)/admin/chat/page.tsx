'use client';

import { useState } from 'react';
import { Card, List, Input, Button, Avatar, Tabs, Badge } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

interface Message {
  id: string;
  content: string;
  isAdmin: boolean;
  timestamp: string;
}

interface Conversation {
  id: string;
  userName: string;
  userEmail: string;
  unread: number;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    unread: 2,
    lastMessage: 'I have a question about my order',
    lastMessageTime: '2 mins ago',
    messages: [
      {
        id: '1',
        content: 'Hello, I have a question about my order',
        isAdmin: false,
        timestamp: '2 mins ago'
      },
      {
        id: '2',
        content: 'What seems to be the problem?',
        isAdmin: true,
        timestamp: '1 min ago'
      }
    ]
  },
  {
    id: '2',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    unread: 1,
    lastMessage: 'When will my order arrive?',
    lastMessageTime: '5 mins ago',
    messages: [
      {
        id: '3',
        content: 'When will my order arrive?',
        isAdmin: false,
        timestamp: '5 mins ago'
      }
    ]
  }
];

export default function AdminChatPage() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isAdmin: true,
      timestamp: 'Just now'
    };

    setSelectedConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, newMsg]
    }));
    setNewMessage('');
  };

  return (
    <div className="p-4 flex h-[calc(100vh-100px)]">
      {/* Conversations List */}
      <div className="w-1/3 border-r pr-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Conversations</h2>
        <List
          dataSource={conversations}
          renderItem={(conversation) => (
            <Card
              className={`mb-2 cursor-pointer hover:shadow-md transition-shadow ${
                selectedConversation?.id === conversation.id ? 'border-primary border-2' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar icon={<UserOutlined />} />
                  <div>
                    <div className="font-semibold">{conversation.userName}</div>
                    <div className="text-sm text-gray-500">{conversation.userEmail}</div>
                  </div>
                </div>
                {conversation.unread > 0 && (
                  <Badge count={conversation.unread} />
                )}
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-600">{conversation.lastMessage}</div>
                <div className="text-xs text-gray-400 mt-1">{conversation.lastMessageTime}</div>
              </div>
            </Card>
          )}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 pl-4 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="bg-white p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedConversation.userName}</h3>
              <p className="text-sm text-gray-500">{selectedConversation.userEmail}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <List
                dataSource={selectedConversation.messages}
                renderItem={(message) => (
                  <List.Item
                    style={{
                      justifyContent: message.isAdmin ? 'flex-end' : 'flex-start',
                      border: 'none',
                      padding: '4px 0',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '70%',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        backgroundColor: message.isAdmin ? '#1890ff' : '#f0f0f0',
                        color: message.isAdmin ? 'white' : 'black',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <div>{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  placeholder="Type your message..."
                  style={{ borderRadius: '20px' }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
