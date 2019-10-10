import beq from '../../../../src/6502/pure/operations/beq'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import branch from '../../../../src/6502/pure/branch'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('beq', () => {
            it('should add parameter to program counter and increment cycles if zero status flag is set', () => {
                const actual = testOperation(beq(branch()), { cycles: 5, pc: 0x1000 }, { zero: true }, 0x06)

                expect(actual).to.containSubset({
                    pc: 0x1006,
                    cycles: 6
                })
            })

            it('should not add parameter to program counter or increment cycles if zero status flag is not set', () => {
                const actual = testOperation(beq(branch()), { cycles: 5, pc: 0x1000 }, { zero: false }, 0x06)

                expect(actual).to.containSubset({
                    pc: 0x1000,
                    cycles: 5
                })
            })

            it('should increment cycles by 2 if zero flag set and page boundary crossed', () => {
                const actual = testOperation(beq(branch()), { cycles: 5, pc: 0x10ff }, { zero: true }, 0x01)

                expect(actual.cycles).to.be.equal(7)
            })
        })
    })
})
