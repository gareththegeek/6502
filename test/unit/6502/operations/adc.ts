import { build6502State } from "../../../helpers/factories"
import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
import adc from "../../../../src/6502/pure/operations/adc"
import IBus from "../../../../src/bus/ibus"
import IState from "../../../../src/6502/state/istate"
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('adc', () => {
            const testAdc = (a: number, b: number, carry: boolean): IState => {
                const previous = build6502State()
                previous.a = a
                previous.status.carry = carry

                const uut = adc()
                return uut(previous, {} as IBus, b)
            }

            it('should add parameter to the accumulator', () => {
                const actual = testAdc(0x50, 0x10, false)
                
                expect(actual).to.containSubset({
                    a: 0x60,
                    status: {
                        zero: false,
                        negative: false,
                        carry: false,
                        overflow: false
                    }
                })
            })

            it('should add carry bit to the accumulator and carry out', () => {
                const actual = testAdc(0x4f, 0xd0, true)

                expect(actual).to.containSubset({
                    a: 0x20,
                    status: {
                        zero: false,
                        negative: false,
                        carry: true,
                        overflow: false
                    }
                })
            })

            it('should set the zero flag when the result is zero', () => {
                const actual = testAdc(0x10, 0xf0, false)

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

            it('should set the negative flag when the result is negative', () => {
                const actual = testAdc(0x10, 0xef, false)

                expect(actual).to.containSubset({
                    a: 0xff,
                    status: {
                        zero: false,
                        negative: true,
                        carry: false,
                        overflow: false
                    }
                })
            });

            [
                { a: 0x50, b: 0x10, result: 0x60, overflow: false },
                { a: 0x50, b: 0x50, result: 0xa0, overflow: true },
                { a: 0x50, b: 0x90, result: 0xe0, overflow: false },
                { a: 0x50, b: 0xd0, result: 0x20, overflow: false },
                { a: 0xd0, b: 0x10, result: 0xe0, overflow: false },
                { a: 0xd0, b: 0x50, result: 0x20, overflow: false },
                { a: 0xd0, b: 0x90, result: 0x60, overflow: true },
                { a: 0xd0, b: 0xd0, result: 0xa0, overflow: false }
            ].forEach(item => {
                it(`should set overflow to ${item.overflow} for ${item.a} + ${item.b} = ${item.result}`, () => {
                    const actual = testAdc(item.a, item.b, false)

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