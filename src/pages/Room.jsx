import React, { useEffect, useState, useRef } from 'react';
import CodeEditor from '../components/CodeEditor';
import { useWebSocket } from '../hooks/useWebSocket';

const Room = ({ roomId }) => {
  const [code, setCode] = useState('// Start coding...');
  const { connect, sendMessage, disconnect } = useWebSocket(roomId, setCode);
  const connectedRef = useRef(false);

  useEffect(() => {
    connect();
    connectedRef.current = true;

    return () => {
      if (connectedRef.current) {
        disconnect();
        connectedRef.current = false;
      }
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    sendMessage(newCode);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Room ID: {roomId}</h2>
      <CodeEditor code={code} onCodeChange={handleCodeChange} />
    </div>
  );
};

export default Room;
