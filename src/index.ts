import Bus from './bus/bus'
import reset from './6502/pure/reset'
import clock from './6502/pure/clock'
import irq from './6502/pure/irq'
import nmi from './6502/pure/nmi'
import initialise from './6502/pure/initialise'
import fetchInstruction from './6502/pure/fetchInstruction'
import IStore from './state/istore'
import connect from './state/connect'
import I6502 from './6502/I6502'
import ICpuState from './6502/state/istate'
import IMemoryState from './memory/state/istate'
import IMemory from './memory/IMemory'
import read from './memory/pure/read'
import write from './memory/pure/write'
import getPageAddress from './memory/pure/getPageAddress'
import getPageIndex from './memory/pure/getPageIndex'
import initialiseMemory from './memory/pure/initialise'

function main(): void {
    // const element = document.createElement('div')

    // element.innerHTML = foo()
    // return element
    const bus = new Bus()

    const cpuStore: IStore<ICpuState> = { state: null }
    const cpu: I6502 = connect(
        {
            reset: reset(),
            clock: clock(initialise(), fetchInstruction(), bus),
            irq: irq(),
            nmi: nmi()
        },
        cpuStore
    ) as I6502

    const memoryStore: IStore<IMemoryState> = { state: null }
    const memory: IMemory = connect(
        {
            initialise: initialiseMemory(),
            read: read(getPageIndex(), getPageAddress()),
            write: write(getPageIndex(), getPageAddress())
        },
        memoryStore
    ) as IMemory

    cpu.reset()
    console.log(cpuStore.state)
    cpu.clock()
    console.log(cpuStore.state)
    cpu.clock()
    console.log(cpuStore.state)

    memory.initialise()
    console.log(memoryStore.state)
    memory.write(1, 2) TODO read and write do not have correct signature for connect
    console.log(memoryStore.state)
    console.log(memory.read(1))
    console.log(memoryStore.state)
}
main()
//document.body.appendChild(component())
