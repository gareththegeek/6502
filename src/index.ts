import pubSubFactory from './pubsub/factory'
import busFactory from './bus/factory'
import cpuFactory from './6502/factory'
import memoryFactory from './memory/factory'
import romFactory from './rom/factory'
import rangeFactory from './rangedcomponent/factory'
import { BUS_READ, BUS_WRITE } from './bus/messageTypes'

function main(): void {
    const pubsub = pubSubFactory()
    const bus = busFactory(pubsub)
    const cpu = cpuFactory(bus)
    const memory = memoryFactory({ from: 0x2000, to: 0x4000 }, 0x20)
    const rom = romFactory({ from: 0xfffc, to: 0xfffd })

    const memoryRanged = rangeFactory({ from: 0x2000, to: 0x4000 }, memory.read, memory.write)
    const romRanged = rangeFactory({ from: 0xfffc, to: 0xfffd }, rom.read, () => ({
        value: null,
        read: false,
        write: false
    }))

    pubsub.subscribe(BUS_READ, memoryRanged.read)
    pubsub.subscribe(BUS_WRITE, memoryRanged.write)
    pubsub.subscribe(BUS_READ, romRanged.read)

    memory.initialise()
    rom.initialise([0x00, 0x20])

    cpu.reset()
    cpu.clock()
    cpu.clock()
    cpu.clock()
    cpu.clock()
    cpu.clock()
    cpu.clock()
    cpu.clock()
    cpu.clock()

    memory.write({ address: 0x2002, value: 0xbe })
    const actual = memory.read({ address: 0x2002 })
    console.log(actual)
}
main()
//document.body.appendChild(component())
