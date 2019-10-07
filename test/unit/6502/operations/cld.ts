import cld from '../../../../src/6502/pure/operations/cld'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('cld', () => {
            it('should clear decimal flag without affecting other state', () => {
                const actual = testOperation(cld(), {}, { decimal: true }, 0x00)

                expect(actual).to.containSubset({
                    status: {
                        decimal: false
                    }
                })
            })
        })
    })
})
