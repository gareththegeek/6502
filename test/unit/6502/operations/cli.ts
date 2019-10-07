import cli from '../../../../src/6502/pure/operations/cli'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('cli', () => {
            it('should clear interrupt disable flag without affecting other state', () => {
                const actual = testOperation(cli(), {}, { irqDisable: true }, 0x00)

                expect(actual).to.containSubset({
                    status: {
                        irqDisable: false
                    }
                })
            })
        })
    })
})
