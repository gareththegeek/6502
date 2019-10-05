import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import * as sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
import { build6502system } from '../helpers/factories'
import { initialiseSystem, loadRom, loadMemory } from '../helpers/6502'
chai.use(sinonChai)
chai.use(chaiSubset)
const expect = chai.expect

describe('Integration', () => {
    describe('6502', () => {
        describe('lda', () => {
            [
                { program: [0xa9, 0x10], memory: [], expectation: { a: 0x10 }, mode: 'immediate' },
                { program: [0xad, 0x02, 0x20], memory: [5, 6, 7, 8, 9], expectation: { a: 7 }, mode: 'absolute' }
            ].forEach(item => {
                it(`should execute lda with ${item.mode} addressing mode`, () => {
                    const system = build6502system()
                    system.memory.initialise(0x1)
                    loadMemory(system.memory, item.memory)
                    loadRom(system.rom, item.program)
                    initialiseSystem(system)

                    system.cpu.clock()
                    expect(system.cpu.store.state).to.containSubset(item.expectation)
                })
            })
        })
    })
})