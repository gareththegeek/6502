import { expect } from 'chai'
import read from '../../src/memory/pure/read'
import getPageIndex from '../../src/memory/pure/getPageIndex'
import getPageAddress from '../../src/memory/pure/getPageAddress'

describe('memory.read', () => {
    it('should not mutate paged memory', () => {
        const state = {
            pages: [
                {
                    data: [0, 0, 0, 0, 0]
                }
            ],
            value: null as number,
            read: false,
            write: false
        }
        const uut = read({ from: 0, to: 0 }, _ => 0, _ => 0)
        const actual = uut(state, { address: 0 })

        expect(state).to.not.be.equal(actual)
        expect(state.pages).to.be.deep.equal(actual.pages)
    })

    it('should return byte value at requested address accounting for memory mapped range', () => {
        const expected = 3
        const from = 0x1200
        const to = 0x1300
        const state = {
            pages: [{ data: [] }, { data: [5, 4, expected, 2, 1] }, { data: [] }],
            value: null as number,
            read: false,
            write: false
        }
        const uut = read({ from, to }, getPageIndex(), getPageAddress())
        const actual = uut(state, { address: 0x0102 + from })

        expect(actual.value).to.be.equal(expected)
        expect(actual.read).to.be.true
        expect(actual.write).to.be.false
    })
})
