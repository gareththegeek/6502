import jmp from "../../../../src/6502/pure/operations/jmp"
import { build6502State } from "../../../helpers/factories"
import IBus from "../../../../src/bus/ibus"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('jmp', () => {
            it('should set program counter equal to parameter', () => {
                const expected = 0x1234
                const previous = build6502State()
                previous.pc = 0x4321

                const uut = jmp()
                const actual = uut(previous, {} as IBus, expected)

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
