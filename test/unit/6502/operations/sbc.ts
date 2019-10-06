import { build6502State } from "../../../helpers/factories"
import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
import sbc from "../../../../src/6502/pure/operations/sbc"
import IBus from "../../../../src/bus/ibus"
import IState from "../../../../src/6502/state/istate"
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('sbc', () => {
            const testSbc = (a: number, b: number, carry: boolean): IState => {
                const previous = build6502State()
                previous.a = a
                previous.status.carry = carry

                const uut = sbc()
                return uut(previous, {} as IBus, b)
            }

            it('should subtract parameter from the accumulator', () => {
                const actual = testSbc(0x50, 0x10, false)
                
                expect(actual).to.containSubset({
                    a: 0x40,
                    status: {
                        zero: false,
                        negative: false,
                        carry: true,
                        overflow: false
                    }
                })
            })

            it('should subtract carry bit from the accumulator', () => {
                const actual = testSbc(0x50, 0x0f, true)

                expect(actual).to.containSubset({
                    a: 0x40,
                    status: {
                        zero: false,
                        negative: false,
                        carry: true,
                        overflow: false
                    }
                })
            })

            it('should set the zero flag when the result is zero', () => {
                const actual = testSbc(0x10, 0x10, false)

                expect(actual).to.containSubset({
                    a: 0x00,
                    status: {
                        zero: true,
                        negative: false,
                        carry: true,
                        overflow: false
                    }
                })
            })

            it('should set the negative flag when the result is negative and borrow out', () => {
                const actual = testSbc(0xd0, 0xf0, false)

                expect(actual).to.containSubset({
                    a: 0xe0,
                    status: {
                        zero: false,
                        negative: true,
                        carry: false,
                        overflow: false
                    }
                })
            });

            [
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
                    const actual = testSbc(item.a, item.b, false)

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