import rti from '../../../../src/6502/pure/operations/rti'
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
        describe('rti', () => {
            it('should pop and restore the program counter and status register from the stack', () => {
                const sp = 0x80
                const pc = 0xbeef
                const status = 0xff

                const bus = {
                    write: sinon.stub(),
                    read: (props: IBusReadProps): number => {
                        switch (props.address) {
                            case 0x0181:
                                return status
                            case 0x0182:
                                return 0xef
                            case 0x0183:
                                return 0xbe
                            default:
                                return 0x00
                        }
                    }
                }

                const actual = testOperation(
                    rti(),
                    { sp, pc: 0x1234 },
                    {
                        zero: false,
                        carry: false,
                        irqDisable: false,
                        decimal: false,
                        overflow: false,
                        negative: false
                    },
                    0x00,
                    bus
                )

                expect(actual).to.containSubset({
                    pc,
                    sp: 0x83,
                    status: {
                        zero: true,
                        carry: true,
                        irqDisable: true,
                        decimal: true,
                        overflow: true,
                        negative: true
                    }
                })
            })
        })
    })
})
