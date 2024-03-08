import { useState, useEffect, useCallback, MouseEventHandler } from 'react';
import { socket } from '../socket';
import { events } from '@eco/config';

export const SocketCmp = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [value, setValue] = useState('');

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      socket.timeout(1000).emit(events.message, 'test', () => {
        console.log('Message sent', 'test');
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (message: string) => {
      console.log({ message });
    };

    socket.connect();

    socket.on(events.connect, onConnect);
    socket.on(events.disconnect, onDisconnect);
    socket.on(events.sent, onMessage);

    return () => {
      socket.disconnect();
      socket.off(events.connect, onConnect);
      socket.off(events.disconnect, onDisconnect);
      socket.off(events.sent, onMessage);
    };
  }, []);

  const onSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();

      socket.timeout(1000).emit(events.message, value, () => {
        console.log('Message sent', { value });
      });
    },
    [value]
  );

  return (
    <div style={{marginBottom: '8px'}}>
      <h2>Socket connection</h2>
      <p>Connected: {isConnected ? 'Y' : 'N'}</p>
      <div style={{ display: 'flex' }}>
        <input onChange={(e) => setValue(e.target.value)} />

        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
