import pla from '../../../../src/6502/pure/operations/pla'
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
        describe('pla', () => {
            it('should load data at stack pointer into accumulator, increment stack pointer and set negative and zero flags', () => {
                const readStub = sinon.stub()
                const bus = {
                    write: sinon.stub(),
                    read: readStub
                }
                readStub.returns(0x93)

                const actual = testOperation(pla(), { a: 0x54, sp: 0x87 }, { zero: true, negative: false }, 0x00, bus)

                expect(readStub).to.have.been.calledWith({ address: 0x0188 })
                expect(actual).to.containSubset({
                    a: 0x93,
                    sp: 0x88,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
