import IPage from './ipage'
import IBusResult from '../../bus/state/ibusresult'

export default interface IState extends IBusResult {
    pages: Array<IPage>
}
