import ldx from "../../../../src/6502/pure/operations/ldx"
import IBus from "../../../../src/bus/ibus"
import { build6502State } from "../../../helpers/factories"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('ldx', () => {
            it('should load parameter into accumulator and set negative and zero flags', () => {
                const expected = 0x00
                const previous = build6502State()

                const uut = ldx()
                const actual = uut(previous, {} as IBus, expected)

                expect(actual).to.be.deep.equal({
                    ...previous,
                    ...{
                        x: expected,
                        status: {
                            ...previous.status,
                            negative: false,
                            zero: true
                        }
                    }
                })
            })
        })
    })
})
