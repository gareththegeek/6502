import IBus from "./ibus";

export default class implements IBus {
    
    public write(address: number, data: number): void {

    }

    public read(address: number): number {
        return 0
    }
}