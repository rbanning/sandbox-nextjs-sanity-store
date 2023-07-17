export type MessageType = 'info' | 'success' | 'warn' | 'error';

export interface IMessage {
  id: string;           //used to uniquely identify a message (e.g. for removing a message)
  category: string;     //used to subscribe to messages of a specific category
  type: MessageType;    //defaults to info
  title: string;
  text: string;
  expires?: number;
}

const DEFAULT_DELAY = 7000;
export const calcExpires = (message: IMessage, delay?: number): number => {
  delay = typeof(delay) === 'number' ? delay 
    : ((message.type) === 'error' ? 0 //no delay on errors
    : DEFAULT_DELAY);  //default 
  if (delay < 1000) { 
    delay *= 1000; //convert seconds to milliseconds
  }
  
  return delay > 0 ? (Date.now() + delay) : 0;
}

export type MessageCreateDTO = Partial<IMessage>;

export const createMessage = (message: MessageCreateDTO): IMessage => {
  const result: IMessage = {
    id: message.id || `${Math.floor(Math.random() * 99999)}`,
    category: message.category ?? '',
    type: message.type || 'info',
    title: message.title || message.type || 'FYI',
    text: message.text || '',
  };
  result.expires = calcExpires(result);

  return result;
}

