import { expect } from 'chai'
import foo from '../src/another'

describe('calculate', function() {
    it('add', function() {
        const result = 5 + 2
        expect(result).equal(7)
        expect(foo()).to.equal('bar')
    })
})
