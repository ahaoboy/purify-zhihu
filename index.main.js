// ==UserScript==
// @name         purify-zhihu
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  屏蔽知乎首页视频
// @author       You
// @match        https://www.zhihu.com/
// @icon         https://pic4.zhimg.com/80/v2-88158afcff1e7f4b8b00a1ba81171b61_720w.png
// @grant        none
// ==/UserScript==
const q = ".Card.TopstoryItem.TopstoryItem > .Feed ";
const inv = 1000 * 2; // 2 s
const hasVideo = (div) => {
  const info = div.getAttribute("data-za-extra-module");
  return info && JSON.parse(info)?.card?.has_video;
};
const check = (dom) => {
  const div = dom.querySelector(".ContentItem");
  if (hasVideo(dom) || hasVideo(div)) {
    return true;
  }
  return false;
};

const f = () => {
  const list = Array.from(document.querySelectorAll(q));
  for (const item of list) {
    if (check(item)) {
      item.parentElement?.remove?.();
    }
  }
};

(function () {
  "use strict";
  f();
  setInterval(f, inv);
})();
