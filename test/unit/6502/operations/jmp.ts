import jmp from '../../../../src/6502/pure/operations/jmp'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('jmp', () => {
            it('should set program counter equal to parameter', () => {
                const actual = testOperation(jmp(), { pc: 0x4321 }, {}, 0x1234)

                expect(actual).to.containSubset({
                    pc: 0x1234
                })
            })
        })
    })
})
