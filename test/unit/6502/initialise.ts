import { expect } from "chai"
import initialise from "../../../src/6502/pure/initialise"
import sinon = require("sinon")
import IBus from "../../../src/bus/ibus"
import IBusReadProps from "../../../src/bus/state/ibusreadprops"

describe('6502.initialise', () => {
    it('should return an initialise state for the 6502 with correct number of initialisation cycles', () => {
        const bus = {
            read: sinon.stub(),
            write: sinon.stub()
        } as IBus

        const uut = initialise(bus)
        const actual = uut()

        expect(actual.a).to.be.equal(0)
        expect(actual.x).to.be.equal(0)
        expect(actual.y).to.be.equal(0)
        expect(actual.sp).to.be.equal(0xff)
        expect(actual.status.break).to.be.false
        expect(actual.status.carry).to.be.false
        expect(actual.status.decimal).to.be.false
        expect(actual.status.irqDisable).to.be.false
        expect(actual.status.negative).to.be.false
        expect(actual.status.overflow).to.be.false
        expect(actual.status.zero).to.be.false
        expect(actual.initialised).to.be.true
        expect(actual.cycles).to.be.equal(6)
    })

    it('should read the initial value for the pc from addresses 0xfffc and 0fffd on the bus', () => {
        const expected = 0x1234
        const bus = {
            read: (props: IBusReadProps): number => {
                switch (props.address) {
                    case 0xfffc:
                        return 0x34
                    case 0xfffd:
                        return 0x12
                    default:
                        return 0x00
                }
            },
            write: sinon.stub()
        } as IBus

        const uut = initialise(bus)
        const actual = uut()

        expect(actual.pc).to.be.equal(expected)
    })
})