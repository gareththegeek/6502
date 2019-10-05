import fetchInstruction from "../../../src/6502/pure/fetchInstruction"
import sinon = require("sinon")
import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import Instruction from "../../../src/6502/state/instruction"
import IBus from "../../../src/bus/ibus"
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('fetchInstruction', () => {
            it('should return the entry from the instruction table which matches the opcode at specified address', () => {
                const expected = new Instruction(0x06, 'EXP', 'IMM', 1, 2)
                const unexpected = new Instruction(0x00, 'UNX', 'IMM', 2, 3)
                const table = {
                    0x00: unexpected,
                    0x06: expected
                }
                const expectedAddress = 0x123
                const readStub = sinon.stub()
                readStub.returns(expected.opcode)
                const bus = {
                    write: sinon.stub(),
                    read: readStub
                } as IBus

                const uut = fetchInstruction(table)
                const actual = uut(bus, expectedAddress)

                expect(readStub).to.have.been.calledWith({ address: expectedAddress })
                expect(actual).to.deep.equal(expected)
            })

            it('should return zero instruction if invalid opcode is located at specified adderss', () => {
                const expected = new Instruction(0x00, 'EXP', 'IMM', 1, 2)
                const unexpected = new Instruction(0x06, 'UNX', 'IMM', 2, 3)
                const table = {
                    0x00: expected,
                    0x06: unexpected
                }
                const expectedAddress = 0x123
                const readStub = sinon.stub()
                readStub.returns(expected.opcode + 1)
                const bus = {
                    write: sinon.stub(),
                    read: readStub
                } as IBus

                const uut = fetchInstruction(table)
                const actual = uut(bus, expectedAddress)

                expect(readStub).to.have.been.calledWith({ address: expectedAddress })
                expect(actual).to.deep.equal(expected)
            })
        })
    })
})
