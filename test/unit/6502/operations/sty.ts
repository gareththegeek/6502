import * as chai from "chai"
import * as sinonChai from 'sinon-chai'
import sinon = require("sinon")
import sty from "../../../../src/6502/pure/operations/sty"
import { build6502State } from "../../../helpers/factories"
import IBus from "../../../../src/bus/ibus"
chai.use(sinonChai)
const expect = chai.expect

describe('6502.sty', () => {
    it('should store the value in the y register at the address specified by parameter', () => {
        const expected = 0x12
        const address = 0x5678
        const previous = build6502State()
        previous.y = expected
        const writeStub = sinon.stub()
        const bus = {
            read: sinon.stub(),
            write: writeStub
        } as IBus

        const uut = sty()
        const actual = uut(previous, bus, address)

        expect(actual).not.to.be.be.equal(previous)
        expect(actual).to.be.deep.equal(previous)
        expect(writeStub).to.have.been.calledWith({ address, value: expected})
    })
})
