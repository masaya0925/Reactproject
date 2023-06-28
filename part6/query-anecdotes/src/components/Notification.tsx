import React, { useEffect } from "react";
import { useNotification } from "../NotificationContext";

export const Notification = () => {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5
    };

    const { state, dispatch } = useNotification();

    useEffect(() => {
      if(state.isOpen) {
        const timer = setTimeout(() => {
          dispatch({ type: 'remove', payload: '' });
        }, 5000);

        return () => clearTimeout(timer);
      }
    },[state.isOpen, dispatch]);

   return (
    <>
    {state.isOpen && (
      <div style = {style}>
        <p>{state.message}</p>
      </div>
    )}
    </>
   );
};