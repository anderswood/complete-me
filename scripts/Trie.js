import Node from './Node'

export default class Trie {
  constructor (name) {
    this.root = new Node(name);
    this.children = {};
    this.counter;
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

  // filterKeys (counter, currentNode) {
  //   if (!this.children) {
  //     return //if no children
  //   } else {
  //     let keys = Object.keys(this.children)
  //
  //     keys.forEach(letter =>{
  //       this.children[letter].isWord ? counter++ : null
  //       currentNode = currentNode.chilren[letter];
  //     })
  //     currentNode.filterKeys(counter, currentNode);
  //     return counter;
  //   }
  //
  // }

  count () {
    // this.counter = 0;
    let counter = 0;
    let currentNode = this.root

    const filterKeys = function(counter, currentNode) {
      console.log('this: ', this)

      if (!this.children) {
        return //if no children
      } else {
        Object.keys(this.children).forEach(letter =>{
          this.children[letter].isWord ? counter++ : null
          currentNode = currentNode.chilren[letter];
          console.log('letter: ', letter)
          console.log('this: ', this)
          console.log('counter: ', counter)
          return filterKeys(counter, currentNode)
        })
      }
      return counter
    }
    return counter;
  }


  suggest () {

  }


}
