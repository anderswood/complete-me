import {assert} from 'chai'
import Trie from '../scripts/Trie'
require('locus')

const text = "/usr/share/dict/words"
let fs = require('fs')
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie Tests (Phase II & III)', () => {

  it('1. should be an instance of Trie', () => {
    let newTrie = new Trie;

    assert.instanceOf(newTrie, Trie);
  })

  let newTrie = new Trie;

  it('2. should make a dictionary trie with "pants" and' +
      '"xylophone" in it', () => {
    newTrie.populate(dictionary)
    assert.equal(newTrie.findNode('pants').isWord, true);
    assert.equal(newTrie.findNode('xylophone').isWord, true);
  })

  it('3. should create a dictionary with 235,886 words in it', () => {
    assert.equal(newTrie.count(), 235886);
  })

  it('4. should have suggest func work with dictionary', () => {
    let suggestions = newTrie.suggest('applej')

    assert.deepEqual(suggestions, ['applejack', 'applejohn']);
  })

  it('5. should update suggestSelected property on searched node', () => {

    newTrie.select("app", "apple")
    let foundNode = newTrie.findNode('app')

    assert.deepEqual(!!foundNode.suggestSelected, true)
  })

  it('6. should update suggestSelected property on searched node' +
      'with an object', () => {

    newTrie.select("piz", "pizzeria")
    newTrie.select("piz", "pizzeria")
    newTrie.select("piz", "pizzeria")
    newTrie.select("piz", "pizzle")
    newTrie.select("piz", "pizza")
    newTrie.select("piz", "pizza")
    let foundNode = newTrie.findNode('piz')
    let expectedObj = {pizzeria: 3, pizzle: 1, pizza: 2};

    assert.deepEqual(foundNode.suggestSelected, expectedObj)
  })

  it('7. should return list of words sorted by priority', () => {
    let suggestionArr = newTrie.suggest('piz');
    let fixedArr = ["pizzeria", "pizza", "pizzle", "pize", "pizzicato"];

    assert.deepEqual(suggestionArr, fixedArr)
  })

  it('8. should update suggestions with feedback from select func', () => {
    let newTrie = new Trie;

    newTrie.populate(dictionary)
    let suggestions = newTrie.suggest('piz')

    assert.deepEqual(suggestions,
      ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

    newTrie.select("piz", "pizzeria")
    suggestions = newTrie.suggest('piz')

    assert.deepEqual(suggestions,
      ["pizzeria", "pize", "pizza", "pizzicato", "pizzle"]);
  })

  it('9. should not update suggestions if suggest word is different', () => {
    let suggestions = newTrie.suggest('piz')

    suggestions = newTrie.suggest('pizz')

    assert.deepEqual(suggestions, ["pizza", "pizzeria", "pizzicato", "pizzle"]);
  })


})
