import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
import adc from "../../../../src/6502/pure/operations/adc"
import { testOperation } from "../../../helpers/6502"
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('adc', () => {
            it('should add parameter to the accumulator', () => {
                const actual = testOperation(adc(), { a: 0x50 }, { carry: false }, 0x10)

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
                const actual = testOperation(adc(), { a: 0x4f }, { carry: true }, 0xd0)

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
                const actual = testOperation(adc(), { a: 0x10 }, { carry: false }, 0xf0)

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
                const actual = testOperation(adc(), { a: 0x10 }, { carry: false }, 0xef)

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
                    const actual = testOperation(adc(), { a: item.a }, { carry: false }, item.b)

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