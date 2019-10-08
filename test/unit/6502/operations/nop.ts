import nop from '../../../../src/6502/pure/operations/nop'
import { build6502State } from '../../../helpers/factories'
import IBus from '../../../../src/bus/ibus'
import { expect } from 'chai'

describe('Unit', () => {
    describe('6502', () => {
        describe('nop', () => {
            it('should not modify state', () => {
                const previous = build6502State()

                const uut = nop()
                const actual = uut(previous, {} as IBus, 0x00)

                expect(actual).to.be.deep.equal(previous)
                expect(actual).not.to.be.equal(previous)
            })
        })
    })
})
