import IState from '../state/istate'
import { TInitialise } from '../typings'

const INITIALISATION_CYCLES = 6

export default (): TInitialise => (): IState => ({
    pc: 0xfffc,
    a: 0,
    x: 0,
    y: 0,
    sp: 0xff,
    status: {
        negative: false,
        overflow: false,
        break: false,
        decimal: false,
        irqDisable: false,
        zero: false,
        carry: false
    },
    initialised: true,
    cycles: INITIALISATION_CYCLES
})
