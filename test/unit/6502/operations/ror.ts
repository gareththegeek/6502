import ror from "../../../../src/6502/pure/operations/ror"
import { build6502State } from "../../../helpers/factories"
import IBus from "../../../../src/bus/ibus"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('ror', () => {
            it('should shift data right one bit with carry flag going into high bit and lost bit going into carry flag', () => {
                const expected = 0xaa
                const previous = build6502State()
                previous.status.carry = true

                const uut = ror()
                const actual = uut(previous, {} as IBus, 0x55)

                expect(actual).to.be.deep.equal({
                    ...previous,
                    a: expected,
                    status: {
                        ...previous.status,
                        negative: true,
                        zero: false,
                        carry: true
                    }
                })
            })
        })
    })
})
