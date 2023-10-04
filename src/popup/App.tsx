import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { api_endpoint } from '../../endpoint.json'

function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const apiUrl = api_endpoint;

  // 依存関係を空にすることで，起動時に一度だけ実行される
  useEffect(() => {
    setCurrentTabInfo();
  }, []);

  async function setCurrentTabInfo() {
    console.log('post');
    console.log(api_endpoint);
    const res = await chrome.runtime.sendMessage({ action: 'post' });
    console.log(res.title);
    setTitle(res.title);
    setUrl(res.url);
  }

  function post() {
    fetch(`${apiUrl}&url=${url}`);
    setTimeout(() => {
      window.close();
    }, 1000);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header> */}
      <h1 className="App-name">PYTV</h1>
      <p className="title__text">Title</p>
      {/* <p className="title__value">{title}</p> */}
      <div className="value-wrapper">
        <input className="title__value" type="text" value={title} readOnly />
      </div>
      <p className="url__text">URL</p>
      {/* <p className="url__value">{url}</p> */}
      <div className="value-wrapper">
        <input className="url__value" type="text" value={url} readOnly />
      </div>
      <div className="button-wrapper">
        <button className="post-button" onClick={post}>Post Video</button>
      </div>
    </div>
  )
}

export default App
