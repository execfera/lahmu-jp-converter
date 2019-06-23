const combineMap = {
  "...": "…",
  "--": "—",
  "2@": "ぶ",
  "2[": "ぷ",
  "-@": "ぼ",
  "-[": "ぽ",
  "^@": "べ",
  "^[": "ぺ",
  "q@": "だ",
  "w@": "で",
  "r@": "ず",
  "t@": "が",
  "p@": "ぜ",
  "a@": "ぢ",
  "s@": "ど",
  "d@": "じ",
  "f@": "ば",
  "f[": "ぱ",
  "g@": "ぎ",
  "h@": "ぐ",
  ":@": "げ",
  "z@": "づ",
  "x@": "ざ",
  "c@": "ぞ",
  "v@": "び",
  "v[": "ぴ",
  "b@": "ご",
};
const map = {
  "1": "ぬ",
  "2": "ふ",
  "3": "あ",
  "#": "ぁ",
  "4": "う",
  "$": "ぅ",
  "5": "え",
  "%": "ぇ",
  "6": "お",
  "&": "ぉ",
  "7": "や",
  "'": "ゃ",
  "8": "ゆ",
  "(": "ゅ",
  "9": "よ",
  ")": "ょ",
  "0": "わ",
  "-": "ほ",
  "^": "へ",
  "¥": "ー",
  "q": "た",
  "w": "て",
  "e": "い",
  "E": "ぃ",
  "r": "す",
  "t": "か",
  "y": "ん",
  "u": "な",
  "i": "に",
  "o": "ら",
  "p": "せ",
  "a": "ち",
  "s": "と",
  "d": "し",
  "f": "は",
  "g": "き",
  "h": "く",
  "j": "ま",
  "k": "の",
  "l": "り",
  ";": "れ",
  ":": "け",
  "]": "む",
  "z": "つ",
  "Z": "っ",
  "x": "さ",
  "c": "そ",
  "v": "ひ",
  "b": "こ",
  "n": "み",
  "m": "も",
  "<": "、",
  ">": "。",
  // "?": "・",
  ",": "ね",
  ".": "る",
  "/": "め",
  "\\": "ろ",
}
const combineMapInvert = Object.entries(combineMap).reduce((obj, entry) => {
  const [key, value] = entry;
  obj[value] = key;
  return obj;
}, {});
const mapInvert = Object.entries(map).reduce((obj, entry) => {
  const [key, value] = entry;
  obj[value] = key;
  return obj;
}, {});

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function init() {
  /** @type {HTMLTextAreaElement} */
  const lahmuArea = document.querySelector('#lahmu');
  /** @type {HTMLTextAreaElement} */
  const jpArea = document.querySelector('#japanese');

  document.querySelector('#lahmu2jp').addEventListener('click', () => {
    const lahmuText = lahmuArea.value;
    const firstReplace = Object.entries(combineMap).reduce((text, entry) => {
      const [key, value] = entry;
      return text.replace(new RegExp(escapeRegExp(key), 'g'), value);
    }, lahmuText);
    const secondReplace = Object.entries(map).reduce((text, entry) => {
      const [key, value] = entry;
      return text.replace(new RegExp(escapeRegExp(key), 'g'), value);
    }, firstReplace);
    console.log(`Japanese text: ${secondReplace}`);
    jpArea.value = secondReplace;
  });
  
  document.querySelector('#jp2lahmu').addEventListener('click', () => {
    const jpText = jpArea.value;
    const firstReplace = Object.entries(combineMapInvert).reduce((text, entry) => {
      const [key, value] = entry;
      return text.replace(new RegExp(key, 'g'), value);
    }, jpText);
    const secondReplace = Object.entries(mapInvert).reduce((text, entry) => {
      const [key, value] = entry;
      return text.replace(new RegExp(key, 'g'), value);
    }, firstReplace);
    console.log(`Lahmu text: ${secondReplace}`);
    lahmuArea.value = secondReplace;
  });
}

window.onload = init;