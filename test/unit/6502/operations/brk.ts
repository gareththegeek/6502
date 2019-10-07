import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { testOperation } from '../../../helpers/6502'
import brk from '../../../../src/6502/pure/operations/brk'
import IBusReadProps from '../../../../src/bus/state/ibusreadprops'
import { IRQ_VECTOR } from '../../../../src/6502/state/vectors'
chai.use(chaiSubset)
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('brk', () => {
            it('should push the program counter and status register to the stack', () => {
                const writeStub = sinon.stub()
                const bus = {
                    write: writeStub,
                    read: sinon.stub()
                }

                const actual = testOperation(brk(), { pc: 0x1234, sp: 0xff }, {
                    carry: false,
                    zero: true,
                    irqDisable: false,
                    decimal: true,
                    overflow: false,
                    negative: true
                }, 0x00, bus)

                expect(writeStub.getCall(0).args[0]).to.be.deep.equal({ address: 0x01ff, value: 0x34 })
                expect(writeStub.getCall(1).args[0]).to.be.deep.equal({ address: 0x01fe, value: 0x12 })
                expect(writeStub.getCall(2).args[0]).to.be.deep.equal({ address: 0x01fd, value: 0xba })
                expect(actual.sp).to.be.equal(0xfc)
            })

            it('should set the program counter to the addressed stored by the IRQ vector', () => {
                const bus = {
                    write: sinon.stub(),
                    read: (props: IBusReadProps) => {
                        switch (props.address) {
                            case IRQ_VECTOR + 0:
                                return 0x65
                            case IRQ_VECTOR + 1:
                                return 0x87
                            default:
                                return 0x00
                        }
                    }
                }

                const actual = testOperation(brk(), { pc: 0x1234, sp: 0xff }, {}, 0x00, bus)

                expect(actual.pc).to.be.equal(0x8765)
            })

            it('should set disable interrupt flag', () => {
                const bus = {
                    write: sinon.stub(),
                    read: sinon.stub()
                }

                const actual = testOperation(brk(), { pc: 0x1234, sp: 0xff }, {}, 0x00, bus)

                expect(actual.status.irqDisable).to.be.true
            })
        })
    })
})