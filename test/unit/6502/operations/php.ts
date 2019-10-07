import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import sinon = require('sinon')
import php from '../../../../src/6502/pure/operations/php'
import IBus from '../../../../src/bus/ibus'
import { testOperation } from '../../../helpers/6502'
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('php', () => {
            [
                { status: { carry: true, zero: true, irqDisable: true, decimal: true, overflow: true, negative: true }, expectation: 0xff },
                { status: { carry: false, zero: false, irqDisable: false, decimal: false, overflow: false, negative: false }, expectation: 0x30 },
                { status: { carry: false, zero: true, irqDisable: false, decimal: true, overflow: false, negative: true }, expectation: 0xba },
                { status: { carry: true, zero: false, irqDisable: true, decimal: false, overflow: true, negative: false }, expectation: 0x75 }
            ].forEach(item => {
                it('should store the value in the status register at the address specified by stack pointer and decrement stack pointer', () => {
                    const writeStub = sinon.stub()
                    const bus = {
                        read: sinon.stub(),
                        write: writeStub
                    } as IBus

                    const actual = testOperation(php(), { sp: 0x78 }, item.status, 0x00, bus)

                    expect(writeStub).to.have.been.calledWith({ address: 0x0178, value: item.expectation })
                    expect(actual.sp).to.be.equal(0x78 - 1)
                })
            })
        })
    })
})
