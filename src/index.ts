import pubSubFactory from './pubsub/factory'
import busFactory from './bus/factory'
import cpuFactory from './6502/factory'
import memoryFactory from './memory/factory'
import romFactory from './rom/factory'
import rangeFactory from './rangedcomponent/factory'

function main(): void {
    const pubsub = pubSubFactory()
    const bus = busFactory(pubsub)
    const cpu = cpuFactory(bus)
    const memory = rangeFactory(pubsub, memoryFactory({ from: 0x2000, to: 0x4000 }))
    const rom = rangeFactory(pubsub, romFactory({ from: 0xfffc, to: 0xfffd }))

    memory.initialise(0x20)
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
