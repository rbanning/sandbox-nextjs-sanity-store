export type MessageType = 'info' | 'success' | 'warn' | 'error';

export interface IMessage {
  id: string;           //used to uniquely identify a message (e.g. for removing a message)
  category: string;     //used to subscribe to messages of a specific category
  type: MessageType;    //defaults to info
  title: string;
  text: string;
}

export type MessageCreateDTO = Partial<IMessage>;

export const createMessage = (message: MessageCreateDTO): IMessage => {
  return {
    id: message.id || `${Math.floor(Math.random() * 99999)}`,
    category: message.category ?? '',
    type: message.type || 'info',
    title: message.title || message.type || 'FYI',
    text: message.text || ''
  };
}