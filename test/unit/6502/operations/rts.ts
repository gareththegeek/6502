import rts from '../../../../src/6502/pure/operations/rts'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import IBusReadProps from '../../../../src/bus/state/ibusreadprops'
chai.use(chaiSubset)
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('rts', () => {
            it('should pop and restore the program counter from the stack', () => {
                const sp = 0x81
                const pc = 0xbeef + 1

                const bus = {
                    write: sinon.stub(),
                    read: (props: IBusReadProps): number => {
                        switch (props.address) {
                            case 0x0182:
                                return 0xef
                            case 0x0183:
                                return 0xbe
                            default:
                                return 0x00
                        }
                    }
                }

                const actual = testOperation(rts(), { sp, pc: 0x1234 }, {}, 0x00, bus)

                expect(actual).to.containSubset({
                    pc,
                    sp: 0x83
                })
            })
        })
    })
})
