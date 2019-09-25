import pubSubFactory from './pubsub/factory'
import busFactory from './bus/factory'
import cpuFactory from './6502/factory'
import memoryFactory from './memory/factory'

function main(): void {
    const pubsub = pubSubFactory()
    const bus = busFactory(pubsub)
    const cpu = cpuFactory(bus)
    const memory = memoryFactory({ from: 0x2000, to: 0x4000 }, 0x20)

    // const bus = new Bus()

    // const cpuStore: IStore<ICpuState> = { state: null }
    // const cpu: I6502 = connect(
    //     {
    //         reset: reset(),
    //         clock: clock(initialise(), fetchInstruction(), bus),
    //         irq: irq(),
    //         nmi: nmi()
    //     },
    //     cpuStore
    // ) as I6502

    // const memoryStore: IStore<IMemoryState> = { state: null }
    // const memory: IMemory = connect(
    //     {
    //         initialise: initialiseMemory(),
    //         read: read(0, getPageIndex(), getPageAddress()),
    //         write: write(getPageIndex(), getPageAddress())
    //     },
    //     memoryStore
    // ) as IMemory

    cpu.reset()
    cpu.clock()
    cpu.clock()

    memory.initialise()
    memory.write({ address: 0x2002, value: 0xbe })
    const actual = memory.read({ address: 0x2002 })
    console.log(actual)

    // memory.initialise()
    // console.log(memoryStore.state)
    // memory.write(1, 2) //TODO read and write do not have correct signature for connect
    // console.log(memoryStore.state)
    // console.log(memory.read(1))
    // console.log(memoryStore.state)
}
main()
//document.body.appendChild(component())
