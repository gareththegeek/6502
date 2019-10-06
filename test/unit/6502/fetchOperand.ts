import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import fetchOperand from '../../../src/6502/pure/fetchOperand'
import sinon = require('sinon')
import IBus from '../../../src/bus/ibus'
import IBusReadProps from '../../../src/bus/state/ibusreadprops'
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('fetchOperand', () => {
            it('should read the specified number of bytes from the specified address', () => {
                const address = 0xbeef
                const size = 4
                const expected = [7, 8, 9, 10]
                const bus = {
                    write: sinon.stub(),
                    read: (props: IBusReadProps): number => expected[props.address - address]
                } as IBus

                const uut = fetchOperand()
                const actual = uut(bus, address, size)

                expect(actual).to.deep.equal(expected)
            })
        })
    })
})
