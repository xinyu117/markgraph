const bktree = require('../services/bktree');
module.exports = function test() {
  return {
    $runAfter: ['renderDocsProcessor'],
    $runBefore: ['writeFilesProcessor'],


    terms: [
      'accommodate', 'accommodation', 'achieve', 'across',
      'aggression', 'aggressive', 'apparently', 'appearance',
      'argument', 'assassination', 'basically', 'beginning',
      'believe', 'bizarre', 'business', 'calendar',
      'caribbean', 'cemetery', 'chauffeur', 'colleague',
      'coming', 'committee', 'completely', 'conscious',
      'curiosity', 'definitely', 'dilemma', 'disappear',
      'disappoint', 'ecstasy', 'embarrass', 'environment',
      'existence', 'fahrenheit', 'familiar', 'finally',
      'fluorescent', 'foreign', 'foreseeable', 'forty',
      'forward', 'friend', 'further', 'gist',
      'glamorous', 'government', 'guard', 'happened',
      'harass', 'harassment', 'honorary', 'humorous',
      'idiosyncrasy', 'immediately', 'incidentally', 'independent',
      'interrupt', 'irresistible', 'knowledge', 'liaise',
      'liaison', 'lollipop', 'millennia', 'millennium',
      'neanderthal', 'necessary', 'noticeable', 'occasion',
      'occurred', 'occurrence', 'occurring', 'pavilion',
      'persistent', 'pharaoh', 'piece', 'politician',
      'portuguese', 'possession', 'preferred', 'preferring',
      'propaganda', 'publicly', 'really', 'receive',
      'referred', 'referring', 'religious', 'remember',
      'resistance', 'sense', 'separate', 'siege',
      'successful', 'supersede', 'surprise', 'tattoo',
      'tendency', 'therefore', 'threshold', 'tomorrow',
      'tongue', 'truly', 'unforeseen', 'unfortunately',
      'until', 'weird', 'wherever', 'which'
    ],


    $process(docs) {

      // Build the tree
      const tree = new bktree(this.terms);

      // Get correctly spelled words at distance <= 3
      const r = tree.query('refered', 3);
      // [ 'referred', 'preferred' ]
      console.log(r);

      // Return closest
      const r2 = tree.query('refered', 3, 1);
      console.log(r2);

      return docs.filter(doc => doc.docType !== 'cli-command' || doc.hidden !== true);
    }
  };
};
