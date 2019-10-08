import { build6502system } from "../helpers/factories"
import { expect } from "chai"
import IRom from "../../src/rom/irom"

describe('Integration', () => {
    describe('rom', () => {
        describe('write', () => {
            it('should not modify state when written to', () => {
                const system = build6502system()
                const rom = system.rom.component as IRom
                rom.initialise([1, 2, 3, 4])

                rom.write({ address: 0xffff, value: 100 })
                
                expect(rom.store.state.data).to.be.deep.equal([1, 2, 3, 4])
            })
        })
    })
})