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
    let prev;
    let curr = this.root;

    while (curr) {
      // Traverse tree until node is found
      if (value < curr.value) {
        prev = curr;
        curr = curr.left;
      } else if (value > curr.value) {
        prev = curr;
        curr = curr.right;
      }

      // Only reaches when node is found
      if (curr.value === value) {
        // Handle leaf nodes
        if (!curr.right && !curr.left) {
          if (prev.left && prev.left.value === value) {
            prev.left = null;
          } else {
            prev.right = null;
          }
          // Handle node with one child
        } else if ((curr.right && !curr.left) || (!curr.right && curr.left)) {
          if (prev.left && prev.left.value === value) {
            if (curr.right) {
              prev.left = curr.right;
            } else {
              prev.left = curr.left;
            }
          } else {
            if (curr.right) {
              prev.right = curr.right;
            } else {
              prev.right = curr.left;
            }
          }
          // Handle node with children on both sides
        } else {
          // Find the inorder successor
          // 2. Then replace the target node with its inorder successor
          // 3. Then delete the original node, probably by recursively calling this function on the target node's value
        }

        break;
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

  levelOrder(callback) {
    const queue = [];
    const result = [];

    if (this.root) {
      queue.push(this.root);
    }

    // Add nodes to queue and their values into an array
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }

    // Perform callback on array elements, if provided
    if (callback) {
      return result.map(callback);
    }

    return result;
  }

  inOrder(callback) {
    let results = [];
    this.inOrderRec(results, this.root);

    if (callback) {
      return results.map(callback);
    }
    return results;
  }

  inOrderRec(stack, root) {
    if (root === null) {
      return;
    }
    this.inOrderRec(stack, root.left);
    stack.push(root.value);
    this.inOrderRec(stack, root.right);
  }

  preOrder(callback) {
    const stack = [this.root];
    const result = [];

    while (stack.length > 0) {
      const current = stack.pop();
      result.push(current.value);
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }
    }

    if (callback) {
      return result.map(callback);
    }

    return result;
  }

  postOrder(callback) {
    let results = [];
    this.postOrderRec(results, this.root);

    if (callback) {
      return results.map(callback);
    }
    return results;
  }

  postOrderRec(stack, root) {
    if (root === null) {
      return;
    }
    this.postOrderRec(stack, root.left);
    this.postOrderRec(stack, root.right);
    stack.push(root.value);
  }

  height(node) {
    let root = this.root;
    let node_reached = false;

    // Find the node's position in the tree
    while (!node_reached) {
      if (root.value === node.value) {
        node_reached = true;
      } else if (node.value < root.value) {
        root = root.left;
      } else {
        root = root.right;
      }
    }

    let height = this.heightRec(root);

    return height.length - 1;
  }

  // Given a root node, return an array of the longest path to a leaf node
  heightRec(root) {
    if (!root) {
      return [];
    }

    let right = this.heightRec(root.right);
    let left = this.heightRec(root.left);

    // Compare the size of the arrays
    // and insert current node accordingly
    if (right.length < left.length) {
      left.push(root.value);
    } else {
      right.push(root.value);
    }

    return left.length > right.length ? left : right;
  }

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

  isBalanced() {
    let left = this.heightRec(this.root.left);
    let right = this.heightRec(this.root.right);

    if (Math.abs(left.length - right.length) <= 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    const arr = this.inOrder();
    this.arr = arr;
    this.buildTree();
  }
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

// Test deletions
// test.delete(100);
// test.delete(4);
// test.delete(21);
// test.delete(53);

// Test height
// let testNode = new Node(2);
// console.log(test.height(testNode));

// Test levelOrder
// console.log(test.levelOrder());
// console.log(test.levelOrder((num) => num * 2));

// Test inOrder
// console.log(test.inOrder());
// console.log(test.inOrder((num) => num * 2));

// Test preOrder
// console.log(test.preOrder());
// console.log(test.preOrder((num) => num * 2));

// Test postOrder
// console.log(test.postOrder());
// console.log(test.postOrder((num) => num * 2));

// Test isBalanced
// test.delete(4);
// test.delete(3);
// test.delete(1);
// console.log(test.isBalanced());

// Test rebalance
// test.rebalance();
// console.log(test.isBalanced());

// Print tree
prettyPrint(test.root);
