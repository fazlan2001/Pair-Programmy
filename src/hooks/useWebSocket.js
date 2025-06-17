import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useRef } from 'react';

export const useWebSocket = (roomId, onMessageReceived) => {
  const clientRef = useRef(null);

  const connect = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe(`/topic/code/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          onMessageReceived(body.content);
        });
      },
    });

    client.activate();
    clientRef.current = client;
  };

  const sendMessage = (content) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/app/code.send/${roomId}`,
        body: JSON.stringify({ content }),
      });
    }
  };

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }
  };

  return { connect, sendMessage, disconnect };
};
