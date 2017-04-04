import {assert} from 'chai'
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
require('locus')

describe('Trie Tests', () => {

  it('should be an instance of Trie', () => {
    let newTrie = new Trie('a');

    assert.instanceOf(newTrie, Trie);
  })

  it('should have a property root which is an instance of a node', () => {
    let name = 'b';
    let newTrie = new Trie(name);
    let newNode = new Node(name);

    assert.deepEqual(newTrie.root, newNode);
  })

  it('should add a word to the tree', () => {
    let newTrie = new Trie('t');

    newTrie.insert('at');

    assert.deepEqual(newTrie.root.children.a.name, 'a');
    assert.deepEqual(newTrie.root.children.a.children.t.name, 't');
    assert.deepEqual(newTrie.root.children.a.children.t.children, {});
  })

  it('should add new branches to the tree when adding certain words', () => {
    let newTrie = new Trie('z');

    newTrie.insert('at');
    newTrie.insert('ats');

    assert.deepEqual(newTrie.root.children.a.children.t.children.s.name, 's');
  })

  it('should update the "isWord" property to be true', () => {
    let newTrie = new Trie('a');

    newTrie.insert('at');

    assert.equal(newTrie.root.children.a.children.t.isWord, true);
  })

  it('should update the "address" property to reflect the word', () => {
    let newTrie = new Trie('a');

    newTrie.insert('at');

    assert.equal(newTrie.root.children.a.children.t.address, 'at');
  })

  it('should locate and return a node based on the string in the address property', () => {
    let newTrie = new Trie('b');
    let newWord = 'at';

    newTrie.insert(newWord);
    let foundNode = newTrie.findNode(newWord);

    assert.equal(foundNode, newTrie.root.children.a.children.t);
  })

  it('should return undefined if find method called with string that cant be found', () => {
    let newTrie = new Trie('b');
    let newWord = 'at';

    newTrie.insert(newWord);
    let foundNode = newTrie.findNode('hippo');

    assert.equal(foundNode, undefined);
  })

  it('should return the quantity of complete words in the trie', () => {
    let newTrie = new Trie('b');

    newTrie.insert('art');
    // newTrie.insert('butt');
    assert.equal(newTrie.count(), 1);
    newTrie.insert('are');
    assert.equal(newTrie.count(), 2);
    newTrie.insert('artsy');
    assert.equal(newTrie.count(), 3);
  })


})
