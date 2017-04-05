import {assert} from 'chai'
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
require('locus')

const text = "/usr/share/dict/words"
let fs = require('fs')
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie Tests (Phase II & III)', () => {

  it('should be an instance of Trie', () => {
    let newTrie = new Trie;

    assert.instanceOf(newTrie, Trie);
  })

  let newTrie = new Trie;

  it('should make a dictionary trie with "pizza" and "xylophone" in it', () => {
    newTrie.populate(dictionary)
    assert.equal(newTrie.findNode('pizza').isWord, true);
    assert.equal(newTrie.findNode('xylophone').isWord, true);
  })

  it('should create a dictionary with 235,886 words in it', () => {
    assert.equal(newTrie.count(), 235886);
  })

  it('should have suggest func work with dictionary', () => {
    let suggestions = newTrie.suggest('piz')

    assert.deepEqual(suggestions, ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
  })

  it('should update suggestions with feedback from select func', () => {
    let suggestions = newTrie.suggest('piz')

    assert.deepEqual(suggestions, ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

    newTrie.select("piz", "pizzeria")
    suggestions = newTrie.suggest('piz')

    assert.deepEqual(suggestions, ["pizzeria", "pize", "pizza", "pizzicato", "pizzle"]);
  })


})
