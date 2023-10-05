async function getCurrentTab(): Promise<chrome.tabs.Tab> {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener((request, sender, respond) => {
  switch (request.action) {
    case "post": {
      getCurrentTab()
      .then((currentTab: chrome.tabs.Tab) => {
        const responseData = { title: currentTab.title, url: currentTab.url };
        console.log(responseData);
        respond(responseData);
      });
      break;
    }
    default: {
      throw new Error(`no action: ${request.action}`);
    }
  }
  return true;
});

// TypeScriptにファイルをモジュールとして認識させるための記述
export {};
