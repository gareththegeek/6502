/*eslint @typescript-eslint/no-explicit-any: "off"*/
import IState from '../state/istate'
import IRangedComponent from '../irangedcomponent'

export default (component: IRangedComponent) => (_: IState, ...args: any): IState => 
    component.initialise(...args)

