import { expect } from "chai"
import { build6502State } from "../../../helpers/factories"
import bit from "../../../../src/6502/pure/operations/bit"
import IBus from "../../../../src/bus/ibus"

describe('Unit', () => {
    describe('6502', () => {
        describe('bit', () => {
            it('should set the zero flag if accumulator bitwise and parameter is zero', () => {
                const previous = build6502State()
                previous.a = 0xaa
                previous.status.zero = false

                const uut = bit()
                const actual = uut(previous, {} as IBus, 0x55)

                expect(actual).containSubset({
                    a: 0xaa,
                    status: {
                        zero: true
                    }
                })
            })

            it('should set the overflow flag to bit 6 of the parameter', () => {
                const previous = build6502State()
                previous.a = 0x40
                previous.status.overflow = false
                previous.status.negative = false

                const uut = bit()
                const actual = uut(previous, {} as IBus, 0x40)

                expect(actual).containSubset({
                    a: 0x40,
                    status: {
                        zero: false,
                        overflow: true,
                        negative: false
                    }
                })
            })

            it('should set the negative flag to bit 7 of the parameter', () => {
                const previous = build6502State()
                previous.a = 0x80
                previous.status.overflow = false
                previous.status.negative = false

                const uut = bit()
                const actual = uut(previous, {} as IBus, 0x80)

                expect(actual).containSubset({
                    a: 0x80,
                    status: {
                        zero: false,
                        overflow: false,
                        negative: true
                    }
                })
            })
        })
    })
})