import I6502 from './I6502'
import clock from './pure/clock'
import initialise from './pure/initialise'
import fetchInstruction from './pure/fetchInstruction'
import irq from './pure/irq'
import nmi from './pure/nmi'
import reset from './pure/reset'
import IBus from '../bus/ibus'
import connect from '../state/connect'
import fetchOperand from './pure/fetchOperand'
import addressingMode from './pure/getAddressingMode'
import ADDRESSING_MODE_TABLE from './pure/addressingModes/table'
import getOperation from './pure/getoperation'
import OPERATION_TABLE from './pure/operations/table'
import INSTRUCTION_TABLE from './pure/instructiontable'
import interrupt from './pure/interrupt'

export default (bus: IBus): I6502 =>
    connect(
        {
            clock: clock(
                initialise(bus),
                interrupt(),
                fetchInstruction(INSTRUCTION_TABLE),
                fetchOperand(),
                addressingMode(ADDRESSING_MODE_TABLE),
                getOperation(OPERATION_TABLE),
                bus
            ),
            irq: irq(),
            nmi: nmi(),
            reset: reset()
        },
        { state: null }
    ) as I6502
