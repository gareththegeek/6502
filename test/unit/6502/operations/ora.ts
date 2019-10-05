import ora from "../../../../src/6502/pure/operations/ora"
import IBus from "../../../../src/bus/ibus"
import { build6502State } from "../../../helpers/factories"
import { expect } from "chai"

describe('6502.ora', () => {
    it('should bitwise or parameter with accumulator and set negative and zero flags', () => {
        const expected = 0xff
        const previous = build6502State()
        previous.a = 0x55

        const uut = ora()
        const actual = uut(previous, {} as IBus, 0xaa)

        expect(actual).to.be.deep.equal({
            ...previous,
            ...{
                a: expected,
                status: {
                    ...previous.status,
                    negative: true,
                    zero: false
                }
            }
        })
    })
})