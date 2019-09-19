export default interface I6502 {
    reset: () => void
    clock: () => void
    irq: () => void
    nmi: () => void
}
