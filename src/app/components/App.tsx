import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';
import Canvas from './Canvas';
function App() {
  const textbox = React.useRef<HTMLInputElement>(undefined);

  //Values to pass to the canvas components and the p5.js sketch (will update at every input change)
  const [count, setCount] = useState(5);
  const maxCount = 1000;

  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  //when the input changes the value sent to canvas component is updated and a max limit in this case is set, to avoid freezing the canvas
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > maxCount) {
      setCount(maxCount);
    } else {
      setCount(value);
    }
  };

  const onCreate = () => {
    const count = parseInt(textbox.current.value, 10);
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <Canvas inputVal={count}></Canvas>
      <img src={logo} />
      <h2>Rectangle Creator</h2>
      <p>
        Count: <input ref={countRef} onChange={handleInputChange} min="10" max={maxCount} />
      </p>
      <button id="create" onClick={onCreate}>
        Create
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
