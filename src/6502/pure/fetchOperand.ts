import IBus from '../../bus/ibus'
import { TFetchOperand } from '../typings'

export default (): TFetchOperand => (bus: IBus, address: number, size: number): Array<number> =>
    (new Array(size).fill(0)).map((_, index) => bus.read({ address: address + index }))
