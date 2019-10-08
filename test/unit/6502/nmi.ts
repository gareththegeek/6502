import { build6502State } from '../../helpers/factories'
import nmi from '../../../src/6502/pure/nmi'
import { expect } from 'chai'

describe('Unit', () => {
    describe('6502', () => {
        describe('nmi', () => {
            it('should set nmi to true if interrupts are enabled', () => {
                const previous = build6502State()
                previous.status.irqDisable = false

                const uut = nmi()
                const actual = uut(previous)

                expect(actual.nmi).to.be.true
            })

            it('should set nmi to true if interrupts are disabled', () => {
                const previous = build6502State()
                previous.status.irqDisable = true

                const uut = nmi()
                const actual = uut(previous)

                expect(actual.nmi).to.be.true
            })
        })
    })
})
