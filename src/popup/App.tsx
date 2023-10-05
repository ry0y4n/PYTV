import { useState, useEffect } from 'react'
import './App.css'
import { api_endpoint } from '../../endpoint.json'
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';

function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isValidURL, setIsValidURL] = useState(false);
  // const apiUrl: string = api_endpoint;
  const apiUrl: string = "https://tweet-youtube-clip-api.onrender.com/post";

  // 依存関係を空にすることで，起動時に一度だけ実行される
  useEffect(() => {
    setCurrentTabInfo();
  }, []);

  async function setCurrentTabInfo(): Promise<void> {
    const res = await chrome.runtime.sendMessage({ action: 'post' });

    if (res.url.startsWith('https://www.youtube.com/watch?v=')) {
      setIsValidURL(true);
      setTitle(res.title);
      setUrl(res.url);
    } else {
      setTitle("Invalid URL: Please open with the YouTube video URL.");
      setUrl("Invalid URL: Please open with the YouTube video URL.");
    }
  }

  async function post(): Promise<void> {
    // // 疎通確認用
    // await fetch(`${apiUrl}`);
    // 本番用
    await fetch(`${apiUrl}?url=${url}`);
    
    window.close();
  }

  return (
    <div className="App">
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
        <PostButton isValidURL={isValidURL} isClicked={isClicked} setIsClicked={setIsClicked} post={post} />
      </div>
      <Annotation isClicked={isClicked} />
    </div>
  )
}

interface PostButtonProps {
  isValidURL: boolean;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  post: () => Promise<void>;
}

function PostButton({isValidURL, isClicked, setIsClicked, post}: PostButtonProps): JSX.Element {
  async function handleClick(): Promise<void> {
    setIsClicked(true);
    await post();
  }

  if (isClicked) {
    return (
      <button className="post-button__clicked" disabled>
        <FaCheckCircle size={20} color={'#FFF'} />
      </button>
    );
  } else {
    return (
      <button
        className={isValidURL ? "post-button" : "post-button invalid"}
        id="postButton"
        onClick={handleClick}
        disabled={!isValidURL}
      >
        {isValidURL ? 'Post Video' : <FcCancel size={30} />}
      </button>
    );
  }
}

function Annotation({isClicked}: {isClicked: boolean}): JSX.Element | null {
  if (isClicked) {
    return (
      <p className="annotation"><FaInfoCircle color={"#FFCC01"} /> Posting is done asynchronously, so it takes about one minute. Posting will continue without any problems even if this popup is closed.</p>
    );
  }
  return null;
}

export default App
