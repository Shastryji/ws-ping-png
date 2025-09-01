import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [response, setResponse] = useState<string>("hi");
    const inputRef = useRef<HTMLInputElement>(null);
    
    function sendMessage() {
      if(!socket || !inputRef.current) {
        return;
      }
      const message = inputRef.current.value;
      socket.send(message);
    }

    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8080");
      setSocket(ws);

      ws.onmessage = (ev: MessageEvent) => {
        setResponse(ev.data);
      }

      return () => {
        ws.close();
      }
    }, []);

    return (
      <>
        <input type="text" placeholder='Message' ref={inputRef}></input>
        <button onClick={sendMessage}>Send</button>
        <br/>
        <input type='text' placeholder='Response' value={response} readOnly></input>
      </>
    )
}

export default App