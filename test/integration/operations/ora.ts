import { expect } from 'chai'
import { build6502system } from '../../helpers/factories'
import { initialiseSystem, loadRom } from '../../helpers/6502'

describe('Integration', () => {
    describe('6502', () => {
        describe('ora', () => {
            it('should correctly execute the ora command with immediate addressing', () => {
                const system = build6502system()
                system.memory.initialise(0x1)
                loadRom(system.rom, [0x09, 0xf0])
                initialiseSystem(system)

                system.cpu.clock()
                const actual = system.cpu.store.state

                expect(actual.a).to.be.equal(0xf0)
                expect(actual.status.zero).to.be.false
                expect(actual.status.negative).to.be.true
            })
        })
    })
})
