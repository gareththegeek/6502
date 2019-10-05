import asl from "../../../../src/6502/pure/operations/asl"
import { build6502State } from "../../../helpers/factories"
import IBus from "../../../../src/bus/ibus"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('asl', () => {
            it('should shift data left one bit with lost bit going into carry flag', () => {
                const expected = 0x54
                const previous = build6502State()

                const uut = asl()
                const actual = uut(previous, {} as IBus, 0xaa)

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
