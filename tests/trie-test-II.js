import {assert} from 'chai'
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
require('locus')

describe('Trie Tests (Phase II)', () => {

  it('should be an instance of Trie', () => {
    let newTrie = new Trie;

    assert.instanceOf(newTrie, Trie);
  })

  it('should create a dictionary trie with "pizza" in it', () => {
    let newTrie = new Trie;

    newTrie.populate(dictionary)
    assert.instanceOf(newTrie.findNode('pizza').isWord, true);
  })

  it('should create a dictionary with 235,886 words in it', () => {
    let newTrie = new Trie
    newTrie.populate(dictionary)
    assert.instanceOf(newTrie.count(), 235886);
  })

})
