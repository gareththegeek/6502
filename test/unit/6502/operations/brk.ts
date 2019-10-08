import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import brk from '../../../../src/6502/pure/operations/brk'
import { IRQ_VECTOR } from '../../../../src/6502/state/vectors'
import IBus from '../../../../src/bus/ibus'
import { build6502State } from '../../../helpers/factories'
import { B_BRK } from '../../../../src/6502/state/bflags'
chai.use(chaiSubset)
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('brk', () => {
            it('should perform an interrupt with the IRQ vector and break flag set', () => {
                const interrupt = sinon.stub()
                const previous = build6502State()
                const expected = build6502State()
                interrupt.returns(expected)
                const bus = {} as IBus

                const uut = brk(interrupt)
                const actual = uut(previous, bus, 0x00)

                expect(interrupt).to.be.calledWith(previous, bus, IRQ_VECTOR, B_BRK)
                expect(actual).to.be.equal(expected)
            })
        })
    })
})
