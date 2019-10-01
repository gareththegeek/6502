import { TBusRead } from '../../bus/state/tbusread'
import { TBusWrite } from '../../bus/state/tbuswrite'

export default interface IRangedComponent {
    read: TBusRead
    write: TBusWrite
}
