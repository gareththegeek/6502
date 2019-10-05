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
                // lda #$10
                { mode: 'immediate', instructionCount: 1, program: [0xa9, 0x10], memory: [], expectation: { a: 0x10 } },
                // lda $2002
                { mode: 'absolute', instructionCount: 1, program: [0xad, 0x02, 0x20], memory: [5, 6, 7, 8, 9], expectation: { a: 7 } },
                // ldx #$02; lda $2001,X
                { mode: 'absolute,x', instructionCount: 2, program: [0xa2, 0x02, 0xbd, 0x01, 0x20], memory: [5, 6, 7, 8, 9], expectation: { a: 8, x: 2 } },
                // ldy #$02; lda $2001,Y
                { mode: 'absolute,y', instructionCount: 2, program: [0xa0, 0x02, 0xb9, 0x01, 0x20], memory: [5, 6, 7, 8, 9], expectation: { a: 8, y: 2 } },
                // lda $02
                { mode: 'zero-page', instructionCount: 1, program: [0xa5, 0x02], zeroPage: [5, 6, 7, 8, 9], expectation: { a: 7 } },
                // ldx #$02 lda $01,x
                { mode: 'zero-page,x', instructionCount: 2, program: [0xa2, 0x02, 0xb5, 0x01], zeroPage: [5, 6, 7, 8, 9], expectation: { a: 8, x: 2 } },
                // ldy #$02 ldx $01,y
                { mode: 'zero-page,y', instructionCount: 2, program: [0xa0, 0x02, 0xb6, 0x01], zeroPage: [5, 6, 7, 8, 9], expectation: { x: 8, y: 2 } },
                // ldx #$02 lda ($01,x)
                { mode: '(ind,x)', instructionCount: 2, program: [0xa2, 0x02, 0xa1, 0x01], zeroPage: [5, 6, 7, 0x04, 0x20], memory: [9, 8, 7, 6, 5, 4], expectation: { a: 5, x: 2 } },
                // ldy #$02 lda ($01),y
                { mode: '(ind),y', instructionCount: 2, program: [0xa0, 0x02, 0xb1, 0x01], zeroPage: [5, 0x02, 0x20, 8, 9], memory: [9, 8, 7, 6, 5, 4], expectation: { a: 5, y: 2 } },
            ].forEach(item => {
                it(`should execute lda with ${item.mode} addressing mode`, () => {
                    const system = build6502system()
                    system.memory.initialise(0x1)
                    system.zeroPage.initialise(0x1)
                    if (item.memory) {
                        loadMemory(system.memory, item.memory)
                    }
                    if (item.zeroPage) {
                        loadMemory(system.zeroPage, item.zeroPage)
                    }
                    loadRom(system.rom, item.program)
                    initialiseSystem(system)

                    for (let i = 0; i < item.instructionCount; i++) {
                        system.cpu.clock()
                        while (system.cpu.store.state.cycles > 0) {
                            system.cpu.clock()
                        }
                    }
                    expect(system.cpu.store.state).to.containSubset(item.expectation)
                })
            })
        })
    })
})