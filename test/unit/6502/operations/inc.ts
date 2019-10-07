import inc from '../../../../src/6502/pure/operations/inc'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(chaiSubset)
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('inc', () => {
            it('should increment value at address specified by parameter', () => {
                const readStub = sinon.stub()
                const writeStub = sinon.stub()
                const bus = {
                    read: readStub,
                    write: writeStub
                }
                const address = 0x1234
                const expected = 0x31
                readStub.returns(expected - 1)

                testOperation(inc(), {}, {}, address, bus)

                expect(readStub).to.have.been.calledWith({ address })
                expect(writeStub).to.have.been.calledWith({ address, value: expected })
            })

            it('should set zero flag if incremented value is zero', () => {
                const readStub = sinon.stub()
                const writeStub = sinon.stub()
                const bus = {
                    read: readStub,
                    write: writeStub
                }
                const address = 0x1234
                readStub.returns(0xff)

                const actual = testOperation(inc(), {}, { zero: false }, address, bus)

                expect(actual.status.zero).to.be.true
            })

            it('should clear zero and negative flags if incremented value is positive', () => {
                const readStub = sinon.stub()
                const writeStub = sinon.stub()
                const bus = {
                    read: readStub,
                    write: writeStub
                }
                const address = 0x1234
                readStub.returns(0x10)

                const actual = testOperation(inc(), {}, { zero: true, negative: true }, address, bus)

                expect(actual.status.zero).to.be.false
                expect(actual.status.negative).to.be.false
            })

            it('should set negative flag if incremented value is negative', () => {
                const readStub = sinon.stub()
                const writeStub = sinon.stub()
                const bus = {
                    read: readStub,
                    write: writeStub
                }
                const address = 0x1234
                readStub.returns(0xf6)

                const actual = testOperation(inc(), {}, { negative: false }, address, bus)

                expect(actual.status.negative).to.be.true
            })
        })
    })
})
