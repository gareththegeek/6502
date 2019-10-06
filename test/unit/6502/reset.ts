import { expect } from 'chai'
import reset from '../../../src/6502/pure/reset'
import { build6502State } from '../../helpers/factories'

describe('Unit', () => {
    describe('6502', () => {
        describe('reset', () => {
            it('should clear initialise and cycles while preserving other state', () => {
                const previous = build6502State()

                const uut = reset()
                const actual = uut(previous)

                expect(actual).not.to.be.equal(previous)
                expect(actual.pc).to.be.equal(previous.pc)
                expect(actual.a).to.be.equal(previous.a)
                expect(actual.x).to.be.equal(previous.x)
                expect(actual.y).to.be.equal(previous.y)
                expect(actual.sp).to.be.equal(previous.sp)
                expect(actual.status).to.be.deep.equal(previous.status)
                expect(actual.initialised).to.be.false
                expect(actual.cycles).to.be.equal(0)
            })
        })
    })
})
