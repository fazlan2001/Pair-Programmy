import { useState } from 'react';
import Room from './pages/Room';

function App() {
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (roomId.trim()) {
      setJoined(true);
    }
  };

  return (
    <div className="p-8">
      {!joined ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Join a Room</h1>
          <input
            type="text"
            className="border px-4 py-2 rounded"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Join Room
          </button>
        </div>
      ) : (
        <Room roomId={roomId} />
      )}
    </div>
  );
}

export default App;
