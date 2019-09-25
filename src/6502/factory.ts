import I6502 from './I6502'
import clock from './pure/clock'
import initialise from './pure/initialise'
import fetchInstruction from './pure/fetchInstruction'
import irq from './pure/irq'
import nmi from './pure/nmi'
import reset from './pure/reset'
import IBus from '../bus/ibus'
import connect from '../state/connect'

export default (bus: IBus): I6502 =>
    connect(
        {
            clock: clock(initialise(), fetchInstruction(), bus),
            irq: irq(),
            nmi: nmi(),
            reset: reset()
        },
        { state: null }
    ) as I6502
