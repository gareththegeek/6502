import pubSubFactory from './pubsub/factory'
import busFactory from './bus/factory'
import cpuFactory from './6502/factory'
import memoryFactory from './memory/factory'
import romFactory from './rom/factory'
import rangeFactory from './rangedcomponent/factory'
import I6502 from './6502/I6502'
import IRangedComponent from './rangedcomponent/irangedcomponent'

export interface I6502System {
    cpu: I6502
    memory: IRangedComponent
    rom: IRangedComponent
}

export default (): I6502System => {
    const pubsub = pubSubFactory()
    const bus = busFactory(pubsub)
    const cpu = cpuFactory(bus)
    const memory = rangeFactory(pubsub, memoryFactory({ from: 0x0000, to: 0x4000 }))
    const rom = rangeFactory(pubsub, romFactory({ from: 0x8000, to: 0xffff }))

    return {
        cpu,
        memory: memory.component,
        rom: rom.component
    }
}
