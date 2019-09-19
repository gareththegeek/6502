import Bus from './bus/bus'
import reset from './6502/pure/reset'
import clock from './6502/pure/clock'
import irq from './6502/pure/irq'
import nmi from './6502/pure/nmi'
import initialise from './6502/pure/initialise'
import fetchInstruction from './6502/pure/fetchInstruction'
import IStore from './6502/store/istore'
import connect from './connectors/connect'
import I6502 from './6502/I6502'

function main(): void {
    // const element = document.createElement('div')

    // element.innerHTML = foo()
    // return element
    const bus = new Bus()
    const store: IStore = { state: null }

    const cpu: I6502 = connect(
        {
            reset: reset(),
            clock: clock(initialise(), fetchInstruction(), bus),
            irq: irq(),
            nmi: nmi()
        },
        store
    ) as I6502

    cpu.reset()
    console.log(store.state)
    cpu.clock()
    console.log(store.state)
    cpu.clock()
    console.log(store.state)
}
main()
//document.body.appendChild(component())
