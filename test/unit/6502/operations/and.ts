import and from "../../../../src/6502/pure/operations/and"
import IBus from "../../../../src/bus/ibus"
import { build6502State } from "../../../helpers/factories"
import { expect } from "chai"

describe('6502.and', () => {
    it('should bitwise and parameter with accumulator and set negative and zero flags', () => {
        const expected = 0x30
        const previous = build6502State()
        previous.a = 0xf0

        const uut = and()
        const actual = uut(previous, {} as IBus, 0x3c)

        expect(actual).to.be.deep.equal({
            ...previous,
            ...{
                a: expected,
                status: {
                    ...previous.status,
                    negative: false,
                    zero: false
                }
            }
        })
    })
})