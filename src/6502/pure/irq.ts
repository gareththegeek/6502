import IState from '../state/istate'
import { TStateMachine } from '../typings';

export default (): TStateMachine =>
    (state: IState): IState =>
        state.status.irqDisable
            ? { ...state }
            : { ...state, irq: true }
