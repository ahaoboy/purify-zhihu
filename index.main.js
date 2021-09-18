// ==UserScript==
// @name         purify-zhihu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽知乎首页视频
// @author       You
// @match        https://www.zhihu.com/
// @icon         https://pic4.zhimg.com/80/v2-88158afcff1e7f4b8b00a1ba81171b61_720w.png
// @grant        none
// ==/UserScript==
const q = ".Card.TopstoryItem.TopstoryItem > .Feed ";
const inv = 1000 * 60 * 1; // 1 min
const f = () => {
  const list = Array.from(document.querySelectorAll(q));
  for (const item of list) {
    if (item.querySelector(".ContentItem")) {
      item.parentElement?.remove?.();
    }
  }
};

(function () {
  "use strict";
  f();
  setInterval(f, inv);
})();
