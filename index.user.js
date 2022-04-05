// ==UserScript==
// @name         purify-zhihu
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  屏蔽知乎首页视频
// @author       You
// @match        https://www.zhihu.com/*
// @icon         https://pic4.zhimg.com/80/v2-88158afcff1e7f4b8b00a1ba81171b61_720w.png
// @grant        none

//0. 更新地址: https://purify-zhihu.vercel.app/index.user.js
//1. 去除非登录下的弹框
//2. 去除视频推送
//3. 去除登录框和视频回答
// ==/UserScript==
const inv = 1000 * 1; // 1 s

// 去除视频
const f1 = () => {
  const hasVideo = (div) => {
    // 根据类型信息判断
    const info = div.getAttribute("data-za-extra-module");
    return info && JSON.parse(info)?.card?.has_video;
  };
  const q = ".Card.TopstoryItem.TopstoryItem > .Feed ";
  const check = (dom) => {
    const div = dom.querySelector(".ContentItem");
    if (dom.classList.contains("Modal-wrapper")) return true;
    if (hasVideo(dom) || hasVideo(div)) {
      return true;
    }
    return false;
  };
  const list = Array.from(document.querySelectorAll(q));
  for (const item of list) {
    if (check(item)) {
      item.parentElement?.remove?.();
    }
  }
};

// 去除登录弹框
const f2 = () => {
  const q = ".Modal-wrapper";
  const dom = document.querySelector(q);
  if (!dom) return;
  // 不是登录框
  if (!dom.querySelector(".signFlowModal-container")) return;
  const s = ".Button.Modal-closeButton.Button--plain";
  const b = document.querySelector(s);
  // 只去除登录框, 不去除评论等弹窗
  b?.click?.();
};

// 去除广告
const f3 = () => {
  const adList = Array.from(
    document.querySelectorAll(".TopstoryItem--advertCard")
  );
  for (const item of adList) {
    // item.parentElement?.remove?.();
    item.innerHTML = "";
  }
};

// 去除视频回答
const f4 = () => {
  const list = Array.from(document.querySelector("div[role='list']")?.children);

  for (const item of list) {
    // 包含视频回答的, svg封面, 可以直接点开播放
    if (item.querySelectorAll(".RichContent-cover-play")) {
      item.remove();
    }
  }
};

const run = () => {
  [f1, f2, f3, f4].forEach((f) => f());
};
(function () {
  "use strict";
  run();
  setInterval(run, inv);
})();
