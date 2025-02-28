import { ipcRenderer } from 'electron';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const nextCount = count + 1;

    setCount(nextCount);
    ipcRenderer.send('message', `current count value is: ${nextCount}`);
  };

  return (
    <button className="btn" onClick={handleClick}>
      Send count
    </button>
  );
}
