"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { removeMessage } from "@/store/features/message/messageSlice";
import { useEffect } from "react";
import ToastMessage from "./toast-message";

import styles from './toastr.module.css';

function Toastr() {
  const { messages } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setInterval(() => {
      const NOW = Date.now();
      const array = [...messages];
      array.forEach((message) => {
        if (message.expires && message.expires < NOW) {
          dispatch(removeMessage(message.id));
        }
      })
    }, 1000);

    return () => { clearInterval(timeout); }
  });

  return (    
    <div className="fixed bottom-4 right-8">
      {messages.map(message => (
        <div key={message.id} className={`${styles['animate-in']} mt-4`}>
          <ToastMessage 
            message={message} 
            onClick={() => dispatch(removeMessage(message.id))} />
        </div>
      ))}
    </div>
  )
}


export default Toastr;
