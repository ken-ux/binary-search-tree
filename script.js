class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root;
  }

  // Remove duplicates and sort array
  sortArray() {
    const uniqueValues = [...new Set(this.arr)];
    this.arr = uniqueValues;
    this.arr.sort((a, b) => a - b);
  }

  buildTree(start = 0, end = this.arr.length - 1) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(this.arr[mid]);

    root.left = this.buildTree(start, mid - 1);
    root.right = this.buildTree(mid + 1, end);

    this.root = root;
    return root;
  }

  insert(value) {}

  delete(value) {}

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}

// Initialize tree
let test = new Tree([1, 5, 2, 21, 100, 53, 1, 2, 3, 3, 4, 2, 72]);

// Remove duplicates and sort array
test.cleanArray();
console.log(test.arr);

// Create tree
test.buildTree();
console.dir(test.root, { depth: null });
