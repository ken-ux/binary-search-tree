# binary-search-tree

This is an implementation of a balanaced binary search tree (BST). The script for this project contains two classes: Node, which holds a value and pointers to left and right Node, and a Tree that holds Node instances. The Tree class has the following methods:

- buildTree(): Builds a balanced BST based on the array of data passed into the Tree constructor.
- insert(value): Inserts a Node with the given value into the BST.
- delete(value): Deletes a Node with the given value from the BST.
- find(value): Finds and returns a Node with the given value from the BST.
- levelOrder(callback): Traverses the tree in breadth-first level order and provides each Node's value as an argument to the callback. Returns an array of the Node values after being passed through the callback. If no callback is provided, returns an array of the Node values.
- inOrder(callback), preOrder(callback), postOrder(callback): Traverses the tree in depth-first order and provides each Node's value as an argument to the callback. Returns an array of the Node values after being passed through the callback. If no callback is provided, returns an array of the Node values.
- height(node): Accepts a node and returns its height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
- depth(node): Accepts a node and returns its depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
- isBalanced(): Checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
- rebalance(): Rebalances an unbalanced tree.

There are also a few utility methods I made that support the main methods:

- sortArray(): Removes duplicate values and sorts the array passed into the Tree constructor. This ensures that the buildTree() method produces a balanced BST.
- inOrderRec(stack, node): Uses recursion to push the node values of the BST to a stack in inorder traversal.
- postOrderRec(stack, node): Uses recursion to push the node values of the BST to a stack in postorder traversal.
- heightRec(node): Uses recursion to find the longest path from a given node to one of its leaf nodes. This is used inside the height() method after the target node has been found in the BST.

## Lessons Learned

- Assessing situations for using _Math.floor()_ vs. _Math.round()_, such as receiving the midpoint of an array. I also learned about the more uniform distribution of randomized numbers in the former.
- Setting null to a pointer means it no longer points anywhere, but that does not change the structure of the list or tree it references. Changing the structure involves preemptively tracking the next Node, rather than the current Node, to cut off that portion of the tree or list.
- Traversing a BST breadth-first vs. depth-first. For depth-first traversal, learning to print nodes preorder, inorder, or postorder.
- Implementing BST traversal using recursive vs. iterative methods. In this project, I used iteration for printing the nodes preorder and recursion for printing them inorder and postorder.

## Future Considerations

- Currently, the delete() method has only been implemented with 2 out of the 3 cases that can occur.
  - The first case is a leaf node i.e. a node with no children.
  - The second case is a node with only one child.
  - The third case is a node with both a left and right child. This has not been added into the delete() method, but notes on its implementation have been included in the method and will be added at a later time.
