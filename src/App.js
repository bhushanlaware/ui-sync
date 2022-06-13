import { useState, useEffect } from 'react';

import './App.css';
import './collab/mutationObserver';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('useEffect', name)
  }, [name]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="name" onFocus={() => console.log('name is in focus')} />
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="email" />
        <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="phone" />
        <select value={selected} onChange={(e) => { setSelected(e.target.value) }}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input type="checkbox" checked={checked} onChange={(e) => { setChecked(e.target.checked) }} />
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>
        {checked && <p>on Check we will show this</p>}
        <button onClick={() => { setCounter(counter + 1) }}>+1</button>
        <p>{counter}</p>
        <button onClick={() => { setCounter(counter - 1) }}> -1</button>
      </header>
    </div>
  );
}

export default App;
