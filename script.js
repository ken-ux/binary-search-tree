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

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      let root = this.root;
      while (root) {
        if (newNode.value < root.value) {
          if (root.left) {
            root = root.left;
          } else {
            root.left = newNode;
            break;
          }
        } else {
          if (root.right) {
            root = root.right;
          } else {
            root.right = newNode;
            break;
          }
        }
      }
    }
  }

  delete(value) {
    let root = this.root;

    // Removing leaf node
    while (root) {
      if (value < root.value) {
        if (root.left.value === value) {
          root.left = null;
        }
        root = root.left;
      } else {
        if (root.right.value === value) {
          root.right = null;
        }
        root = root.right;
      }
    }
  }

  find(value) {
    let root = this.root;
    while (root) {
      if (root.value === value) {
        return root;
      }

      if (value < root.value) {
        root = root.left;
      } else {
        root = root.right;
      }
    }
    return null;
  }

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {
    let root = this.root;

    let depth = 0;
    while (root) {
      if (root.value === node.value) {
        return depth;
      }
      if (node.value < root.value) {
        root = root.left;
      } else {
        root = root.right;
      }
      depth++;
    }
    return null;
  }

  isBalanced() {}

  rebalance() {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Initialize tree
let test = new Tree([1, 5, 2, 21, 100, 53, 1, 2, 3, 3, 4, 2, 72]);

// Remove duplicates and sort array
test.sortArray();

// Create tree
test.buildTree();

let testNode = new Node(1);
console.log(test.depth(testNode));

// Print tree
prettyPrint(test.root);
