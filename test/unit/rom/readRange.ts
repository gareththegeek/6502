import { expect } from 'chai'
import readRange from '../../../src/rom/pure/readRange'

describe('Unit', () => {
    describe('rom', () => {
        describe('readRange', () => {
            it('should return byte values at requested addresses accounting for memory mapped range', () => {
                const expected = [3, 4, 5]
                const from = 0x1200
                const to = 0x1500
                const state = {
                    data: [5, 4, ...expected],
                    value: null as number,
                    read: false,
                    write: false
                }
                const uut = readRange({ from, to }, { state })
                const actual = uut({ range: { from: 0x2 + from, to: 0x4 + from } })

                expect(actual.data).to.be.deep.equal(expected)
            })
        })
    })
})
