import IState from "../../src/6502/state/istate";
import I6502 from "../../src/6502/I6502";
import pubSubFactory from '../../src/pubsub/factory'
import busFactory from '../../src/bus/factory'
import cpuFactory from '../../src/6502/factory'
import memoryFactory from '../../src/memory/factory'
import romFactory from '../../src/rom/factory'
import rangeFactory from '../../src/rangedcomponent/factory'
import IRangedComponent from "../../src/rangedcomponent/irangedcomponent";

export const build6502State = (): IState => ({
    pc: 1,
    a: 2,
    x: 3,
    y: 4,
    sp: 5,
    status: {
        negative: true,
        overflow: true,
        break: true,
        decimal: true,
        irqDisable: true,
        zero: true,
        carry: true
    },
    initialised: true,
    cycles: 7
})

export interface I6502System {
    cpu: I6502,
    memory: IRangedComponent,
    zeroPage: IRangedComponent
    rom: IRangedComponent
}

export const build6502system = (): I6502System => {
    const pubsub = pubSubFactory()
    const bus = busFactory(pubsub)
    const cpu = cpuFactory(bus)
    const memory = rangeFactory(pubsub, memoryFactory({ from: 0x2000, to: 0x4000 }))
    const zeroPage = rangeFactory(pubsub, memoryFactory({ from: 0x00, to: 0xff }))
    const rom = rangeFactory(pubsub, romFactory({ from: 0xff00, to: 0xffff }))

    return {
        cpu,
        memory,
        zeroPage,
        rom
    }
}
