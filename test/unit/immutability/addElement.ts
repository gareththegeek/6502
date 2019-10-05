import addElement from '../../../src/immutability/addElement'
import { expect } from 'chai'

describe('immutability.addElement', () => {
    it('should return an array with the new element', () => {
        const array: Array<{ foo: string }> = []
        const expected = { foo: 'bar' }

        const actual = addElement(array, expected)

        expect(actual.length).to.be.equal(1)
        expect(actual[0]).to.be.equal(expected)
    })

    it('should not mutate original array', () => {
        const array: Array<{ foo: string }> = []
        const expected = { foo: 'bar' }

        addElement(array, expected)

        expect(array.length).to.be.equal(0)
    })

    it('should preserve existing array values', () => {
        const array = [{ foo: 'bario' }, { foo: 'bar1' }]
        const expected = { foo: 'bar' }

        const actual = addElement(array, expected)

        expect(array.length).to.be.equal(2)
        expect(actual.length).to.be.equal(3)
        array.forEach(element => expect(actual.includes(element)).to.be.true)
    })
})
