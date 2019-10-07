import IState from '../state/istate'
import { TInitialise } from '../typings'
import IBus from '../../bus/ibus'
import littleEndian from '../../bitwise/littleEndian'
import { RESET_VECTOR } from '../state/vectors'

const INITIALISATION_CYCLES = 6

export default (bus: IBus): TInitialise => (): IState => {
    const lo = bus.read({ address: RESET_VECTOR + 0 })
    const hi = bus.read({ address: RESET_VECTOR + 1 })
    const pc = littleEndian([lo, hi])
    return {
        pc,
        a: 0,
        x: 0,
        y: 0,
        sp: 0xff,
        status: {
            negative: false,
            overflow: false,
            decimal: false,
            irqDisable: false,
            zero: false,
            carry: false
        },
        initialised: true,
        cycles: INITIALISATION_CYCLES
    }
}
