import IState from "../../src/6502/state/istate";

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
