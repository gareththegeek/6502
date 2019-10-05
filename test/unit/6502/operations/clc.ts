import clc from "../../../../src/6502/pure/operations/clc"
import IBus from "../../../../src/bus/ibus"
import { build6502State } from "../../../helpers/factories"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('lda', () => {
            it('should clear carry flag without affecting other state', () => {
                const previous = build6502State()
                previous.status.carry = true

                const uut = clc()
                const actual = uut(previous, {} as IBus, 0)

                expect(actual).to.be.deep.equal({
                    ...previous,
                    ...{
                        status: {
                            ...previous.status,
                            carry: false
                        }
                    }
                })
            })
        })
    })
})
