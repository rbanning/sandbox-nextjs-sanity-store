import { IMessage, MessageType } from "@/types/message.model";
import { useState } from "react";

export type Message = Omit<IMessage, 'category'>;
export type ToastMessageProp = {
  message: Message,
  onClick?: (message: Message) => void
};

type Colors = { bg: string, text: string };
const toastColors = (type: MessageType): Colors => {
  switch (type) {
    case 'error':
      return {
        bg: 'bg-rose-100',
        text: 'text-rose-700'
      };
    case 'warn':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-600'
      };
    case 'success':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700'
      };
    case 'info':
    default:
      return {
        bg: 'bg-sky-100',
        text: 'text-sky-700'
      };
  }
};

function ToastMessage({message, onClick}: ToastMessageProp) {
  const [color] = useState<Colors>(toastColors(message?.type || 'info'));
  

  const handleClick = () => {
    if (typeof(onClick) === 'function') {
      onClick(message);
    }
  }

  if (!message) { return null; }

  return (
    <div 
      onClick={() => handleClick()}
      className={`rounded my-2 p-4 text-lg shadow-lg max-w-sm ${color.bg} ${color.text} ${onClick ? 'cursor-pointer' : ''}`}>
      <div className="font-semibold">{message.title}</div>
      <div>{message.text}</div>
    </div>
  )
}

export default ToastMessage;