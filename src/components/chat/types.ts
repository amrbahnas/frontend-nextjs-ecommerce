export type MessageType = "text" | "image";

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  isAdmin: boolean;
  timestamp?: string;
}
