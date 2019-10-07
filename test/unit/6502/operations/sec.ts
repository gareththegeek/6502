import sec from '../../../../src/6502/pure/operations/sec'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('sec', () => {
            it('should set carry flag without affecting other state', () => {
                const actual = testOperation(sec(), {}, { carry: false }, 0x00)

                expect(actual).to.containSubset({
                    status: {
                        carry: true
                    }
                })
            })
        })
    })
})
