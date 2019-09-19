export default interface IBus {
    write(address: number, data: number): void
    read(address: number): number
}
