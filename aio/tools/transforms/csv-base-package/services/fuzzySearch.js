const bktree = require('../services/bktree');
const levenshtein = (s, t) => {
    let str = ['', ...s, ''].join('.*') + '?'; //转化成正则格式的字符串
    const mathchCount = t.match(new RegExp(str,'g'));
    if (mathchCount.length > 10 ) {
        return 100;
    }
  //  let reg = new RegExp(str); //正则
   // reg.test(t); //去匹配待查询的字符串


          // Build the tree
          const tree = new bktree(mathchCount);
          const r = tree.query('refered', 3);
          console.log(r);
};