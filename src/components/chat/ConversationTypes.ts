export interface Conversation {
  id: string;
  userName: string;
  userImage?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
}
