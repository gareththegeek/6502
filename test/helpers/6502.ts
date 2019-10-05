import { I6502System } from "./factories"
import IRangedComponent from "../../src/rangedcomponent/irangedcomponent"

export const initialiseSystem = (system: I6502System): void => {
    system.cpu.reset()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
}

export const loadRom = (rom: IRangedComponent, program: Array<number>): void => {
    const data = [...program, ...(new Array(0xfc - program.length).fill(0)), 0x00, 0xff]
    rom.initialise(data)
}

export const loadMemory = (memory: IRangedComponent, data: Array<number>): void => {
    data.forEach((byte, index) => memory.write({ address: memory.range.from + index, value: byte }))
}
