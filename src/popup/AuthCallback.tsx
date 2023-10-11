import { useState, useEffect } from 'react'
import './AuthCallback.css'

function AuthCallback(): JSX.Element {
  const [oauth_token, setOauthToken] = useState('');
  const [oauth_verifier, setOauthVerifier] = useState('');
  const [oauth_token_secret, setOauthTokenSecret] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const apiUrl: string = "https://tweet-youtube-clip-api.onrender.com";

  // クエリパラメータを取得
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setOauthToken(searchParams.get('oauth_token')!);
    setOauthVerifier(searchParams.get('oauth_verifier')!);

    chrome.storage.sync.get(['oauth_token_secret'])
    .then(data => {setOauthTokenSecret(data.oauth_token_secret)});

    // コンポーネントがマウントされたときにbody要素に'auth-callback'クラスを追加
    document.body.classList.add('auth-callback');

    // コンポーネントがアンマウントされたときに'auth-callback'クラスを削除
    return () => {
      document.body.classList.remove('auth-callback');
    };
  }, []);

  // クエリパラメータを保存
  useEffect(() => {
    chrome.storage.sync.set({
      oauth_token,
      oauth_verifier
    });
  }, [oauth_token, oauth_verifier]);

  // アクセストークンを取得し，Chromeストレージに保存
  useEffect(() => {
    // いずれかが空文字だったら何もしない
    if (!oauth_token || !oauth_verifier || !oauth_token_secret) return;
    setAccessTokens();
  }, [oauth_token, oauth_verifier, oauth_token_secret]);

  async function setAccessTokens(): Promise<void> {
    const res = await fetch(`${apiUrl}/login?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}&oauth_token_secret=${oauth_token_secret}`);
    const data = await res.json();

    if (data.accessToken && data.accessSecret) {
      setLoginStatus('Authentication Succeeded');
      setLoginMessage(`You're logged in! Now, please try accessing the extension again.`)
    } else {
      setLoginStatus('Authentication Failed');
      setLoginMessage(`Please try again.`);
    }

    chrome.storage.sync.set({
      accessToken: data.accessToken,
      accessSecret: data.accessSecret
    });
  }

  return (
    <div className="CallBackWrapper">
      <h1 className="status">{loginStatus}</h1>
      <p className="message">{loginMessage}</p>
    </div>
  )
}

export default AuthCallback;
