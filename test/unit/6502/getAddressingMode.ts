import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import getAddressingMode from '../../../src/6502/pure/getAddressingMode'
import sinon = require('sinon')
import IBus from '../../../src/bus/ibus'
import IDataRegisters from '../../../src/6502/state/idataregisters'
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('getAddressingMode', () => {
            it('should return the result of the addressing mode matching the requested type', () => {
                const expected = 8
                const expectedStub = sinon.stub()
                expectedStub.returns(expected)
                const unexpectedStub = sinon.stub()
                const table = {
                    expected: expectedStub,
                    unexpected: unexpectedStub
                }
                const bus = {} as IBus
                const operand = [0]
                const registers = {} as IDataRegisters

                const uut = getAddressingMode(table)
                const actual = uut(bus, 'EXPECTED', operand, registers)

                expect(actual).to.be.equal(expected)
                expect(expectedStub).to.have.been.calledWith(bus, operand, registers)
            })
        })
    })
})
