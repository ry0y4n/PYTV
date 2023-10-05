# ![](banner-github.jpeg)
## What is PYTV?

PYTV is an extension for posting [YouTube](https://www.youtube.com/) videos to [X (formerly Twitter)](https://x.com/). 

Normally, when you post a video using the YouTube share function, the video information and thumbnail are shared, but the video itself cannot be shared. However, there are many cases where you want to post a video to spread the attractiveness of the video. Until now, I had to download the video first and then upload it manually to X. 

PYTV makes it easy to do so. With this extension, you can now share your favorite videos with ease.

## How to Install

> ***Extensions are not yet available in the store because the implementation for securing API confidentiality has not been completed. Therefore, it is necessary for users to build locally and install extensions manually.***

0. Set API Endpoint

    Contact me([@AnoTensai](https://twitter.com/AnoTensai)) to obtain a configuration file (`endpoint.json`) containing the API endpoints and place it in the root directory.

1. Build

    ```
    npm run build
    ```

2. Install the Extension

    1. Go to the Extensions page (`chrome://extensions`).
    2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
    3. Click the **Load unpacked** button and select the `dist/` directory.
