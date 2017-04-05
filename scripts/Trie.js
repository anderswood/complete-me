import Node from './Node'


export default class Trie {
  constructor () {
    this.root = new Node('');
    this.children = {};
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
    
    return currentNode;
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

    if (currentNode.suggestSelected) {
      suggestionArr = this.sortSuggestionArr(suggestionArr, currentNode);
    }

    return suggestionArr;
  }

  sortSuggestionArr (suggestionArr, currentNode) {
    let suggestSelectedObj = currentNode.suggestSelected;

    //sort suggestSelected objects in descending order by key values
    let priorityArr = Object.keys(suggestSelectedObj).reduce((acc, next) => {
      if (!acc.length) {
        acc.push(next)
      } else {
        let i = 0

        while (suggestSelectedObj[next] < suggestSelectedObj[acc[i]]) {
          i++
        }
        acc.splice(i, 0, next)
      }

      return acc;
    }, [])

    //move prioritized words to beginning of suggestionArr
    suggestionArr = priorityArr.reduce((acc, next, i) => {
      acc.splice(acc.indexOf(next), 1)

      if (i === priorityArr.length - 1) {
        acc = priorityArr.concat(acc);
      }

      return acc;
    }, suggestionArr)

    return suggestionArr;
  }

  populate (dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select (suggestion, selection) {
    let suggestionNode = this.findNode(suggestion);

    if (!suggestionNode.suggestSelected) {
      suggestionNode.suggestSelected = {}
    }

    if (!suggestionNode.suggestSelected[selection]) {
      suggestionNode.suggestSelected[selection] = 1;
    } else {
      suggestionNode.suggestSelected[selection]++;
    }
  }

}
