const fs = require('fs')
const path = require('path')

/* 章节自测列表 */
function generateChapterMD(all_words, result_folder_path) {
  let checkString = '';
  all_words.map((h, i) => {
    const chapterNum = Math.floor(i / 20 + 1);
    if (i % 20 === 0) return `\n# Chapter ${chapterNum.toString().padStart(3, '0')}\n\n` + `- [ ] ${h}\n`
    else return `- [ ] ${h}\n`
  }).forEach((w, i) => {
    const chapterNum = Math.floor(i / 20 + 1);
    checkString += w;
    if (chapterNum % 10 === 0 && i === chapterNum * 20 - 1) {
      fs.writeFileSync(path.join(result_folder_path, `./${(chapterNum - 9).toString().padStart(3, '0')}~${chapterNum.toString().padStart(3, '0')}.md`), checkString)
      checkString = '';
    }
    if (i === all_words.length - 1) {
      fs.writeFileSync(path.join(result_folder_path, `./${(Math.floor(chapterNum / 10) * 10 + 1).toString().padStart(3, '0')}~${chapterNum.toString().padStart(3, '0')}.md`), checkString)
      checkString = '';
    }
  });
}

exports.generateChapterMD = generateChapterMD