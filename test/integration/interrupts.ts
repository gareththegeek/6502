import { build6502system } from "../helpers/factories"
import { expect } from "chai"

describe('Integration', () => {
    describe('6502', () => {
        describe('irq', () => {
            it('should trigger the interrupt procedure when the clock tick reaches zero', () => {
                const system = build6502system()
                system.memory.initialise(0x1)
                system.rom.initialise([0xfe, 0xff])

                system.cpu.reset()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.irq()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.clock()
                
                expect(system.cpu.store.state.irq).to.be.true
                expect(system.cpu.store.state.sp).to.be.equal(0xff)
                expect(system.cpu.store.state.status.irqDisable).to.be.false

                system.cpu.clock()

                expect(system.cpu.store.state.irq).to.be.false
                expect(system.cpu.store.state.sp).to.be.equal(0xfc)
                expect(system.cpu.store.state.status.irqDisable).to.be.true
            })
        })

        describe('nmi', () => {
            it('should trigger the interrupt procedure when the clock tick reaches zero', () => {
                const system = build6502system()
                system.memory.initialise(0x1)
                system.rom.initialise([0xfe, 0xff])

                system.cpu.reset()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.nmi()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.clock()
                system.cpu.clock()
                
                expect(system.cpu.store.state.nmi).to.be.true
                expect(system.cpu.store.state.sp).to.be.equal(0xff)
                expect(system.cpu.store.state.status.irqDisable).to.be.false

                system.cpu.clock()

                expect(system.cpu.store.state.nmi).to.be.false
                expect(system.cpu.store.state.sp).to.be.equal(0xfc)
                expect(system.cpu.store.state.status.irqDisable).to.be.true
            })
        })
    })
})