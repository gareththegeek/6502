import { expect } from "chai"
import pubSubFactory from '../../../src/pubsub/factory'
import busFactory from '../../../src/bus/factory'
import cpuFactory from '../../../src/6502/factory'
import memoryFactory from '../../../src/memory/factory'
import romFactory from '../../../src/rom/factory'
import rangeFactory from '../../../src/rangedcomponent/factory'
import I6502 from "../../../src/6502/I6502"

describe('6502.and integration', () => {
    const build = () => {
        const pubsub = pubSubFactory()
        const bus = busFactory(pubsub)
        const cpu = cpuFactory(bus)
        const memory = rangeFactory(pubsub, memoryFactory({ from: 0x2000, to: 0x4000 }))
        const rom = rangeFactory(pubsub, romFactory({ from: 0xfffa, to: 0xfffd }))

        return {
            cpu,
            memory,
            rom
        }
    }

    const initialiseCpu = (cpu: I6502) => {
        cpu.reset()
        cpu.clock()
        cpu.clock()
        cpu.clock()
        cpu.clock()
        cpu.clock()
        cpu.clock()
        cpu.clock()
    }

    it('should ', () => {
        const fixture = build()
        fixture.memory.initialise(0x1)
        fixture.rom.initialise([0x09, 0xf0, 0xfa, 0xff])
        initialiseCpu(fixture.cpu)
        
        fixture.cpu.clock()
        const actual = fixture.cpu.store.state

        expect(actual.a).to.be.equal(0xf0)
        expect(actual.status.zero).to.be.false
        expect(actual.status.negative).to.be.true
    })
})