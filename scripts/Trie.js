import Node from './Node'


export default class Trie {
  constructor () {
    this.root = new Node('');
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

    const filterKeys = (currentNode) => {
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

  suggest (suggestion) {
    let suggestionArr = [];
    let currentNode = this.findNode(suggestion);

    if (currentNode.isWord) {
      suggestionArr.push(suggestion);
    }

    if (!currentNode.children) {
      return;
    } else {
      Object.keys(currentNode.children).forEach(letter => {
        suggestionArr = suggestionArr.concat(this.suggest(suggestion + letter));
      })
    }
    return suggestionArr;
  }

  populate (dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select (suggestion, selection) {
    
  }

}
