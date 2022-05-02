const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this._root = null;
    }

    root() {
        return this._root;
    }

    add(data) {
        if (!this._root) {
            this._root = new Node(data);
        } else {
            let prevNode = this._root;
            let nextNode = data < this._root.data ? this._root.left : this._root.right;
            while (nextNode) {
                prevNode = nextNode;
                nextNode = nextNode.data > data ? nextNode.left : nextNode.right;
            }
            if (data < prevNode.data) {
                prevNode.left = new Node(data);
            } else if (data > prevNode.data) {
                prevNode.right = new Node(data);
            }
        }
    }

    has(data) {
        return !!this.find(data);
    }

    find(data) {
        if (this._root.data === data) return this._root;

        let nextNode = data < this._root.data ? this._root.left : this._root.right;

        while (nextNode && nextNode.data !== data) {
            nextNode = data < nextNode.data ? nextNode.left : nextNode.right;
        }

        return nextNode;
    }

    remove(data) {
        this._remove(data, this._root);
    }

    _remove(data, node) {
        if (node) {
            if (data < node.data) {
                node.left = this._remove(data, node.left);
            } else if (data > node.data) {
                node.right = this._remove(data, node.right);
            } else if (node.left && node.right) {
                node.data = this._min(node.right);
                node.right = this._remove(node.data, node.right);
            } else {
                node = node.left || node.right;
            }
        }
        return node;
    }

    min() {
        return this._min(this._root);
    }

    _min(node) {
        if (!node) {
            node = this._root;
        }

        while (node.left) {
            node = node.left;
        }

        return node.data;
    }

    max() {
        return this._max(this._root);
    }

    _max(node) {
        if (!node) {
            node = this._root;
        }

        while (node.right) {
            node = node.right;
        }

        return node.data;
    }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
tree.remove(14);
tree.remove(8);
tree.remove(9);
var res = tree.has(128);

module.exports = {
    BinarySearchTree,
};