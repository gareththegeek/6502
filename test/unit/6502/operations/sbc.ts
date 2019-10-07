import sbc from '../../../../src/6502/pure/operations/sbc'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('sbc', () => {
            const BORROW = false
            const NO_BORROW = true

            it('should subtract parameter from the accumulator', () => {
                const actual = testOperation(sbc(), { a: 0x50 }, { carry: NO_BORROW }, 0x10)

                expect(actual).to.containSubset({
                    a: 0x40,
                    status: {
                        zero: false,
                        negative: false,
                        carry: NO_BORROW,
                        overflow: false
                    }
                })
            })

            it('should subtract borrow bit from the accumulator', () => {
                const actual = testOperation(sbc(), { a: 0x50 }, { carry: BORROW }, 0x0f)

                expect(actual).to.containSubset({
                    a: 0x40,
                    status: {
                        zero: false,
                        negative: false,
                        carry: NO_BORROW,
                        overflow: false
                    }
                })
            })

            it('should set the zero flag when the result is zero', () => {
                const actual = testOperation(sbc(), { a: 0x10 }, { carry: NO_BORROW }, 0x10)

                expect(actual).to.containSubset({
                    a: 0x00,
                    status: {
                        zero: true,
                        negative: false,
                        carry: NO_BORROW,
                        overflow: false
                    }
                })
            })

            it('should set the negative flag when the result is negative and borrow out', () => {
                const actual = testOperation(sbc(), { a: 0xd0 }, { carry: NO_BORROW }, 0xf0)

                expect(actual).to.containSubset({
                    a: 0xe0,
                    status: {
                        zero: false,
                        negative: true,
                        carry: BORROW,
                        overflow: false
                    }
                })
            })
                ;[
                    { a: 0x50, b: 0xf0, result: 0x60, overflow: false },
                    { a: 0x50, b: 0xb0, result: 0xa0, overflow: true },
                    { a: 0x50, b: 0x70, result: 0xe0, overflow: false },
                    { a: 0x50, b: 0x30, result: 0x20, overflow: false },
                    { a: 0xd0, b: 0xf0, result: 0xe0, overflow: false },
                    { a: 0xd0, b: 0xb0, result: 0x20, overflow: false },
                    { a: 0xd0, b: 0x70, result: 0x60, overflow: true },
                    { a: 0xd0, b: 0x30, result: 0xa0, overflow: false }
                ].forEach(item => {
                    it(`should set overflow to ${item.overflow} for ${item.a} - ${item.b} = ${item.result}`, () => {
                        const actual = testOperation(sbc(), { a: item.a }, { carry: NO_BORROW }, item.b)

                        expect(actual).to.containSubset({
                            a: item.result,
                            status: {
                                overflow: item.overflow
                            }
                        })
                    })
                })
        })
    })
})
