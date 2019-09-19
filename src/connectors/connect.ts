import IStore from '../6502/store/istore'
import connectPure from './connectPure'

export default (target: { [key: string]: any }, store: IStore): { [key: string]: any } => {
    const result: { [key: string]: any } = {}
    Object.keys(target).map(key => (result[key] = connectPure(store, target[key])))
    return result
}
