import { TReset, TClock, TIrq, TNmi } from "./pure/typings";

export default interface I6502 {
    reset: TReset
    clock: TClock
    irq: TIrq
    nmi: TNmi
}

export const factory = (
    reset: TReset,
    clock: TClock,
    irq: TIrq,
    nmi: TNmi): I6502 => ({
        reset,
        clock,
        irq,
        nmi
    })