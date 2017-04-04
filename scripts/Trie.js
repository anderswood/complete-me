import Node from './Node'

export default class Trie {
  constructor (name) {
    this.root = new Node(name);
    this.children = {};
  }

  insert (userInput) {
    let currentNode = this.root

    userInput.split('').forEach(letter => {
      if (currentNode.children[letter]) {
        return currentNode = currentNode.children[letter];
      }
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
    })
    currentNode.isWord = true;
    currentNode.address = userInput;
  }

  findNode (word) {
    let currentNode = this.root;

    word.split('').forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
      }
    })

    if (currentNode.address === word) {
      return currentNode;
    }
  }

  count () {

  }

  suggest () {

  }


}
