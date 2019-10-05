import { expect } from 'chai'
import write from '../../../src/memory/pure/write'
import getPageIndex from '../../../src/memory/pure/getPageIndex'
import getPageAddress from '../../../src/memory/pure/getPageAddress'

describe('Unit', () => {
    describe('memory', () => {
        describe('write', () => {
            it('should update the value at the specified address accounting for memory mapped range', () => {
                const from = 0x1200
                const to = 0x1300
                const expected = 7
                const unexpected = expected + 1

                const state = {
                    pages: [{ data: [] }, { data: [5, 4, unexpected, 2, 1] }, { data: [] }],
                    value: null as number,
                    read: false,
                    write: false
                }

                const uut = write({ from, to }, getPageIndex(), getPageAddress())

                const actual = uut(state, { address: 0x0102 + from, value: expected })

                expect(actual.pages[1].data[2]).to.be.equal(expected)
                expect(actual.value).to.be.equal(null)
                expect(actual.read).to.be.false
                expect(actual.write).to.be.true
            })

            it('should not mutate previous state', () => {
                const from = 0x1200
                const to = 0x1300
                const expected = 3
                const unexpected = expected + 1

                const state = {
                    pages: [{ data: [] }, { data: [5, 4, expected, 2, 1] }, { data: [] }],
                    value: null as number,
                    read: false,
                    write: false
                }

                const uut = write({ from, to }, getPageIndex(), getPageAddress())

                const actual = uut(state, { address: 0x0102 + from, value: unexpected })

                expect(actual).not.to.be.equal(state)
                expect(actual.pages.length).to.be.equal(state.pages.length)
                actual.pages.forEach((page, index) => {
                    expect(page.data.length).to.be.equal(state.pages[index].data.length)
                })
                expect(state.pages[1].data[2]).to.be.equal(expected)
            })
        })
    })
})
