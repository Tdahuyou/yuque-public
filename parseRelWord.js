const { SUB_TITLE } = require('./const')

/* -- 同根词部分 -- */
/*
# ${SUB_TITLE.relWord}

*/
function parseRelWord(word) {
  let text = ''

  if (word.relWord && word.relWord.rels && word.relWord.rels.length > 0) {
    const rels = word.relWord.rels
    for (let i = 0; i < rels.length; i++) {
      const r = rels[i];
      const words = r.words.map(w => `- \`${w.hwd}\` ${w.tran.trim()}`).join('\n')
      text += `${r.pos}.` + '\n' + words + '\n\n';
    }
  }

  return text ? `# ${SUB_TITLE.relWord}

${text}` : ''
}

exports.parseRelWord = parseRelWord;