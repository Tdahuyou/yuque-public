const fs = require('fs');

/* 章节自测列表 */
function generateChapterMD(all_words, file_path) {
  let checkString = '';
  all_words.map((h, i) => {
    const chapterNum = Math.floor(i / 20 + 1);
    const encodedFileName = encodeURIComponent(h); // 正确应用编码
    if (i % 20 === 0) {
      return `\n# Chapter ${chapterNum.toString().padStart(3, '0')}\n\n` + `- [ ] [${h}](./${encodedFileName}.md)\n`;
    } else {
      return `- [ ] [${h}](./${encodedFileName}.md)\n`;
    }
  }).forEach((w, i) => {
    checkString += w;
    if (i === all_words.length - 1) {
      fs.writeFileSync(file_path, checkString);
    }
  });
}

exports.generateChapterMD = generateChapterMD;