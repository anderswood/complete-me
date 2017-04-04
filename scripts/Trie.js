import Node from './Node'

export default class Trie {
  constructor (name) {
    this.root = new Node(name);
    this.children = {};
    this.counter;
  }

  insert (userInput) {
    let currentNode = this.root;
    let accumLetters = '';

    userInput.split('').forEach(letter => {
      accumLetters = accumLetters + letter;

      if (currentNode.children[letter]) {
        return currentNode = currentNode.children[letter];
      }

      currentNode.children[letter] = new Node(letter); //insert new node
      currentNode = currentNode.children[letter]; //update trie location

      if (!currentNode.address) {
        currentNode.address = accumLetters
      }
    })
    currentNode.isWord = true;
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
    let currentNode = this.root

    const filterKeys = function(currentNode) {

      let counter = 0

      if (currentNode.isWord) {
        counter++
      }

      if (!currentNode.children) {
        return 0 // exit recursion if no children

      } else {
        Object.keys(currentNode.children).forEach(letter =>{
          counter += filterKeys(currentNode.children[letter])
        })
      }
      return counter
    }
    return filterKeys(currentNode);
  }

  suggest () {

  }


}
