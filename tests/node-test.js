import {assert} from 'chai'
import Node from '../scripts/Node'
require('locus')

describe('Node Tests', () => {

  it('1. should be an instance of Node', () => {
    let node = new Node('a')

    assert.instanceOf(node, Node)
  })

  it('2. should have a name', () => {
    let node = new Node('b')

    assert.equal(node.name, 'b')
  })

  it('3. should have a children property default to {}', () => {
    let node = new Node('f')

    assert.deepEqual(node.children, {})
  })


})
