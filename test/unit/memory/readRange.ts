import { expect } from 'chai'
import readRange from '../../../src/memory/pure/readRange'

describe('Unit', () => {
    describe('memory', () => {
        describe('readRange', () => {
            it('should return byte values at requested addresses accounting for memory mapped range', () => {
                const expected = [3, 4, 5]
                const from = 0x1200
                const to = 0x1500
                const state = {
                    pages: [{ data: Array(0x100).fill(0) }, { data: [5, 4, ...expected] }, { data: [] }],
                    value: null as number,
                    read: false,
                    write: false
                }
                const uut = readRange({ from, to }, { state })
                const actual = uut({ range: { from: 0x0102 + from, to: 0x0104 + from } })

                expect(actual.data).to.be.deep.equal(expected)
            })
        })
    })
})
