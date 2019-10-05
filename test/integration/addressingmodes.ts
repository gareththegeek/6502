import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import { build6502system } from '../helpers/factories'
import { initialiseSystem, loadRom, loadMemory, testProgram } from '../helpers/6502'
chai.use(chaiSubset)
const expect = chai.expect

describe('Integration', () => {
    describe('6502', () => {
        describe('lda', () => {
            [
                // lda #$10
                { name: 'immediate', instructionCount: 1, program: [0xa9, 0x10], memory: [], expectation: { a: 0x10 } },
                // lda $2002
                { name: 'absolute', instructionCount: 1, program: [0xad, 0x02, 0x20], memory: [5, 6, 7, 8, 9], expectation: { a: 7 } },
                // ldx #$02; lda $2001,X
                { name: 'absolute,x', instructionCount: 2, program: [0xa2, 0x02, 0xbd, 0x01, 0x20], memory: [5, 6, 7, 8, 9], expectation: { a: 8, x: 2 } },
                // ldy #$02; lda $2001,Y
                { name: 'absolute,y', instructionCount: 2, program: [0xa0, 0x02, 0xb9, 0x01, 0x20], memory: [5, 6, 7, 8, 9], expectation: { a: 8, y: 2 } },
                // lda $02
                { name: 'zero-page', instructionCount: 1, program: [0xa5, 0x02], zeroPage: [5, 6, 7, 8, 9], expectation: { a: 7 } },
                // ldx #$02 lda $01,x
                { name: 'zero-page,x', instructionCount: 2, program: [0xa2, 0x02, 0xb5, 0x01], zeroPage: [5, 6, 7, 8, 9], expectation: { a: 8, x: 2 } },
                // ldx #$02 lda ($01,x)
                { name: '(ind,x)', instructionCount: 2, program: [0xa2, 0x02, 0xa1, 0x01], zeroPage: [5, 6, 7, 0x04, 0x20], memory: [9, 8, 7, 6, 5, 4], expectation: { a: 5, x: 2 } },
                // ldy #$02 lda ($01),y
                { name: '(ind),y', instructionCount: 2, program: [0xa0, 0x02, 0xb1, 0x01], zeroPage: [5, 0x02, 0x20, 8, 9], memory: [9, 8, 7, 6, 5, 4], expectation: { a: 5, y: 2 } },
            ].forEach(item => {
                it(`should execute lda with ${item.name} addressing mode`, () => {
                    testProgram(item)
                })
            })
        })

        describe('ldx', () => {
            [
                // ldy #$02 ldx $01,y
                { name: 'zero-page,y', instructionCount: 2, program: [0xa0, 0x02, 0xb6, 0x01], zeroPage: [5, 6, 7, 8, 9], expectation: { x: 8, y: 2 } },
            ].forEach(item => {
                it(`should execute ldx with ${item.name} addressing mode`, () => {
                    testProgram(item)
                })
            })
        })

        describe('lsr', () => {
            [
                // lda #$0xfe; lsr a
                { name: 'accumulator', instructionCount: 2, program: [0xa9, 0xfe, 0x4a], expectation: { a: 0x7f } }
            ].forEach(item => {
                it(`should execute lsr with ${item.name} addressing mode`, () => {
                    testProgram(item)
                })
            })
        })

        describe('clc', () => {
            [
                // lda #$0x80; asl a; clc
                { name: 'implied', instructionCount: 3, program: [0xa9, 0x80, 0x0a, 0x18], expectation: { status: { carry: false } } }
            ].forEach(item => {
                it(`should execute clc with ${item.name} addressing mode`, () => {
                    testProgram(item)
                })
            })
        })

        describe('bne', () => {
            [
                // bne $04
                { name: 'relative', instructionCount: 1, program: [0xd0, 0x04], expectation: { pc: 0xff06 } }
            ].forEach(item => {
                it(`should execute bne with ${item.name} addressing mode`, () => {
                    testProgram(item)
                })
            })
        })
    })
})