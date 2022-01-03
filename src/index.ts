import pubSubFactory from './pubsub/factory'
import busFactory from './bus/factory'
import cpuFactory from './6502/factory'
import memoryFactory from './memory/factory'
import romFactory from './rom/factory'
import rangeFactory from './rangedcomponent/factory'
import I6502 from './6502/I6502'
import IRangedComponent from './rangedcomponent/irangedcomponent'
import IRange from './rangedcomponent/state/irange'

export interface I6502System {
    cpu: I6502
    components: IRangedComponent[]
    // memory: IRangedComponent
    // rom: IRangedComponent
}

export enum ComponentType {
    Ram = 'ram',
    Rom = 'rom'
}

export interface ComponentConfig {
    type: ComponentType
    range: IRange
}

const componentFactory = ({ range, type }: ComponentConfig): IRangedComponent => {
    switch (type) {
        case ComponentType.Ram:
            return memoryFactory(range)
        case ComponentType.Rom:
            return romFactory(range)
        default:
            throw new Error(`Unknown component type requested ${type}`)
    }
}

export default (config: ComponentConfig[]): I6502System => {
    const pubsub = pubSubFactory()
    const bus = busFactory(pubsub)
    const cpu = cpuFactory(bus)

    const components = config.map(x => rangeFactory(pubsub, componentFactory(x)))

    return {
        cpu,
        components
    }
}
