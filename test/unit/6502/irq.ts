import { build6502State } from "../../helpers/factories"
import irq from "../../../src/6502/pure/irq"
import { expect } from "chai"

describe('Unit', () => {
    describe('6502', () => {
        describe('irq', () => {
            it('should set irq to true if interrupts are enabled', () => {
                const previous = build6502State()
                previous.status.irqDisable = false

                const uut = irq()
                const actual = uut(previous)

                expect(actual.irq).to.be.true
            })

            it('should not set irq to true if interrupts are disabled', () => {
                const previous = build6502State()
                previous.status.irqDisable = true

                const uut = irq()
                const actual = uut(previous)

                expect(actual.irq).to.be.false
            })
        })
    })
})