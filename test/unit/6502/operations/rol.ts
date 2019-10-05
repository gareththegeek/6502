import rol from "../../../../src/6502/pure/operations/rol"
import { build6502State } from "../../../helpers/factories"
import IBus from "../../../../src/bus/ibus"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('rol', () => {
            it('should shift data left one bit with carry flag going into low bit and lost bit going into carry flag', () => {
                const expected = 0xab
                const previous = build6502State()
                previous.status.carry = true

                const uut = rol()
                const actual = uut(previous, {} as IBus, 0xd5)

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
