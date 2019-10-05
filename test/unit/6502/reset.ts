import { expect } from "chai"
import reset from "../../../src/6502/pure/reset"

describe('6502.reset', () => {
    it('should clear initialise and cycles while preserving other state', () => {
        const previous = {
            pc: 1,
            a: 2,
            x: 3,
            y: 4,
            sp: 5,
            status: {
                negative: true,
                overflow: true,
                break: true,
                decimal: true,
                irqDisable: true,
                zero: true,
                carry: true
            },
            initialised: true,
            cycles: 7
        }

        const uut = reset()
        const actual = uut(previous)

        expect(actual).not.to.be.equal(previous)
        expect(actual.pc).to.be.equal(previous.pc)
        expect(actual.a).to.be.equal(previous.a)
        expect(actual.x).to.be.equal(previous.x)
        expect(actual.y).to.be.equal(previous.y)
        expect(actual.sp).to.be.equal(previous.sp)
        expect(actual.status).to.be.deep.equal(previous.status)
        expect(actual.initialised).to.be.false
        expect(actual.cycles).to.be.equal(0)
    })
})