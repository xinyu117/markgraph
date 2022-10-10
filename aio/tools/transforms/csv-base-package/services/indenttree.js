function getIndentTree(text, indent = ' ') {
    let terms = [
        'grand',
        ' father',
        '  me',
        '  sister',
        ' uncle',
        '  brother'
    ];
    let tree = new indentTree(null, null, terms);
    console.log(tree);
}
function isChild(parentTerm, term) {
    if (!parentTerm) return true;
    return indentLength(term) > indentLength(parentTerm) ? true : false;

}
function indentLength(str, indent = ' ') {
    let charts = [...str];
    for (let i = 0; i < charts.length; i++) {
        if (charts[i] != indent) {
            return i;
        }
    }
}
function indentTree(parent, term, terms) {
    if (parent == null) {
        let rootTerm = terms[0];
        let root = new indentTree('root', rootTerm, terms);
        root.addChildren(0);
        return root;
    }
    this.parentNode = parent;
    this.term = term;
    this.terms = terms;
    this.children = [];
   // indentTree.prototype.terms99 = terms;
}
indentTree.prototype.addChildren = function (row) {
    let terms = this.terms;
    let term = terms[row + 1];
    if (!term) return;
    let childFlg = isChild(this.term, term);
    if (childFlg) {
        let child = new indentTree(this, term, terms);
        this.children.push(child);
        child.addChildren(row + 1);
    } else {
        let parent = this.parentNode;
        parent.addChildren(row);
    }
};