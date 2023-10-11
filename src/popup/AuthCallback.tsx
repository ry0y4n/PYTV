import { useState, useEffect } from 'react';
import './AuthCallback.css';

function AuthCallback(): JSX.Element {
  const [oauthToken, setOauthToken] = useState('');
  const [oauthVerifier, setOauthVerifier] = useState('');
  const [oauthTokenSecret, setOauthTokenSecret] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const apiUrl =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:3001'
      : 'https://tweet-youtube-clip-api.onrender.com';

  // クエリパラメータを取得
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const oauthToken = searchParams.get('oauth_token');
    const oauthVerifier = searchParams.get('oauth_verifier');

    if (oauthToken === null || oauthVerifier === null) {
      console.error('OAuth token and/or verifier is missing in the URL');
    } else {
      setOauthToken(oauthToken);
      setOauthVerifier(oauthVerifier);
    }

    chrome.storage.sync
      .get(['oauth_token_secret'])
      .then((data) => {
        setOauthTokenSecret(data.oauth_token_secret);
      })
      .catch((err) => {
        console.log(err);
      });

    // コンポーネントがマウントされたときにbody要素に'auth-callback'クラスを追加
    document.body.classList.add('auth-callback');

    // コンポーネントがアンマウントされたときに'auth-callback'クラスを削除
    return () => {
      document.body.classList.remove('auth-callback');
    };
  }, []);

  // クエリパラメータを保存
  useEffect(() => {
    chrome.storage.sync
      .set({
        oauthToken,
        oauthVerifier,
      })
      .catch((err) => {
        console.log(err);
      });
  }, [oauthToken, oauthVerifier]);

  // アクセストークンを取得し，Chromeストレージに保存
  useEffect(() => {
    console.log(oauthToken, oauthVerifier, oauthTokenSecret);
    console.log(
      typeof oauthToken,
      typeof oauthVerifier,
      typeof oauthTokenSecret,
    );
    // いずれかが空文字だったら何もしない
    if (oauthToken === '' || oauthVerifier === '' || oauthTokenSecret === '')
      return;
    setAccessTokens().catch((err) => {
      console.log(err);
    });
  }, [oauthToken, oauthVerifier, oauthTokenSecret]);

  async function setAccessTokens(): Promise<void> {
    const res = await fetch(
      `${apiUrl}/login?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}&oauth_token_secret=${oauthTokenSecret}`,
    );
    const data = await res.json();

    if (data.accessToken !== undefined && data.accessSecret !== undefined) {
      setLoginStatus('Authentication Succeeded');
      setLoginMessage(
        `You're logged in! Now, please try accessing the extension again.`,
      );

      await chrome.storage.sync.set({
        accessToken: data.accessToken,
        accessSecret: data.accessSecret,
      });
    } else {
      setLoginStatus('Authentication Failed');
      setLoginMessage(`Please try again.`);
    }
  }

  return (
    <div className="CallBackWrapper">
      <h1 className="status">{loginStatus}</h1>
      <p className="message">{loginMessage}</p>
    </div>
  );
}

export default AuthCallback;
