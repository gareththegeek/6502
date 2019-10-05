import bne from "../../../../src/6502/pure/operations/bne"
import { build6502State } from "../../../helpers/factories"
import IBus from "../../../../src/bus/ibus"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('bne', () => {
            it('should add parameter to program counter if zero status flag is not set', () => {
                const expected = 0x1006
                const previous = build6502State()
                previous.status.zero = false
                previous.pc = 0x1000

                const uut = bne()
                const actual = uut(previous, {} as IBus, 0x06)

                expect(actual).to.be.deep.equal({
                    ...previous,
                    pc: expected,
                    status: {
                        ...previous.status
                    }
                })
            })

            it('should not add parameter to program counter if zero status flag is set', () => {
                const expected = 0x1000
                const previous = build6502State()
                previous.status.zero = true
                previous.pc = expected

                const uut = bne()
                const actual = uut(previous, {} as IBus, 0x06)

                expect(actual).to.be.deep.equal({
                    ...previous,
                    pc: expected,
                    status: {
                        ...previous.status
                    }
                })
            })
        })
    })
})
