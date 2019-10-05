import ldy from "../../../../src/6502/pure/operations/ldy"
import IBus from "../../../../src/bus/ibus"
import { build6502State } from "../../../helpers/factories"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('ldy', () => {
            it('should load parameter into accumulator and set negative and zero flags', () => {
                const expected = 0x80
                const previous = build6502State()

                const uut = ldy()
                const actual = uut(previous, {} as IBus, expected)

                expect(actual).to.be.deep.equal({
                    ...previous,
                    ...{
                        y: expected,
                        status: {
                            ...previous.status,
                            negative: true,
                            zero: false
                        }
                    }
                })
            })
        })
    })
})
