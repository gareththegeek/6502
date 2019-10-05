import lsr from "../../../../src/6502/pure/operations/lsr"
import { build6502State } from "../../../helpers/factories"
import IBus from "../../../../src/bus/ibus"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('lsr', () => {
            it('should shift data right one bit with lost bit going into carry flag', () => {
                const expected = 0x2a
                const previous = build6502State()

                const uut = lsr()
                const actual = uut(previous, {} as IBus, 0x55)

                expect(actual).to.be.deep.equal({
                    ...previous,
                    a: expected,
                    status: {
                        ...previous.status,
                        negative: false,
                        zero: false,
                        carry: true
                    }
                })
            })
        })
    })
})
