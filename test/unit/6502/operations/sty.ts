import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import sinon = require('sinon')
import IBus from '../../../../src/bus/ibus'
import { testOperation } from '../../../helpers/6502'
import sty from '../../../../src/6502/pure/operations/sty'
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('sty', () => {
            it('should store the value in the y register at the address specified by parameter', () => {
                const writeStub = sinon.stub()
                const bus = {
                    read: sinon.stub(),
                    write: writeStub
                } as IBus
                const expected = 0x12
                const address = 0x5678

                testOperation(sty(), { y: expected }, {}, address, bus)

                expect(writeStub).to.have.been.calledWith({ address, value: expected })
            })
        })
    })
})
