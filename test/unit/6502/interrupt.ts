import * as sinon from 'sinon'
import * as chai from 'chai'
import interrupt from "../../../src/6502/pure/interrupt"
import { build6502State } from "../../helpers/factories"
import IBusReadProps from '../../../src/bus/state/ibusreadprops'
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('interrupt', () => {
            it('should push the program counter and status register to the stack', () => {
                const writeStub = sinon.stub()
                const bus = {
                    write: writeStub,
                    read: sinon.stub()
                }
                const previous = build6502State()
                previous.pc = 0x1234
                previous.sp = 0xff
                previous.status = {
                    carry: false,
                    zero: true,
                    irqDisable: false,
                    decimal: true,
                    overflow: false,
                    negative: true
                }

                const uut = interrupt()
                const actual = uut(previous, bus, 0x8765, 0x30)

                expect(writeStub.getCall(0).args[0]).to.be.deep.equal({ address: 0x01ff, value: 0x34 })
                expect(writeStub.getCall(1).args[0]).to.be.deep.equal({ address: 0x01fe, value: 0x12 })
                expect(writeStub.getCall(2).args[0]).to.be.deep.equal({ address: 0x01fd, value: 0xba })
                expect(actual.sp).to.be.equal(0xfc)
            })

            it('should set the program counter to the addressed stored by the specified vector', () => {
                const vector = 0x4545
                const bus = {
                    write: sinon.stub(),
                    read: (props: IBusReadProps): number => {
                        switch (props.address) {
                            case vector + 0:
                                return 0x65
                            case vector + 1:
                                return 0x87
                            default:
                                return 0x00
                        }
                    }
                }
                const previous = build6502State()
                previous.pc = 0x1234
                previous.sp = 0xff

                const uut = interrupt()
                const actual = uut(previous, bus, vector, 0)

                expect(actual.pc).to.be.equal(0x8765)
            })

            it('should set disable interrupt flag and clear the irq and nmi flags', () => {
                const bus = {
                    write: sinon.stub(),
                    read: sinon.stub()
                }
                const previous = build6502State()
                previous.irq = true
                previous.nmi = true
                previous.pc = 0x1234
                previous.sp = 0xff

                const uut = interrupt()
                const actual = uut(previous, bus, 0x4343, 0)

                expect(actual.status.irqDisable).to.be.true
                expect(actual.irq).to.be.false
                expect(actual.nmi).to.be.false
            })
        })
    })
})