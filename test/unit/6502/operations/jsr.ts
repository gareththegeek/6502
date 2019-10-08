import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import sinon = require('sinon')
import jsr from '../../../../src/6502/pure/operations/jsr'
import IBus from '../../../../src/bus/ibus'
import { testOperation } from '../../../helpers/6502'
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('jsr', () => {
            it('should push the program counter to the stack and set program counter equal to parameter', () => {
                const writeStub = sinon.stub()
                const bus = {
                    read: sinon.stub(),
                    write: writeStub
                } as IBus

                const actual = testOperation(jsr(), { pc: 0x1234, sp: 0x78 }, {}, 0x4321, bus)

                expect(writeStub.getCall(0).args[0]).to.be.deep.equal({ address: 0x0178, value: 0x12 })
                expect(writeStub.getCall(1).args[0]).to.be.deep.equal({ address: 0x0177, value: 0x34 - 1 })
                expect(actual.sp).to.be.equal(0x78 - 2)
                expect(actual.pc).to.be.equal(0x4321)
            })
        })
    })
})
