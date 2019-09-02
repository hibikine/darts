import { createStore, applyMiddleware, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const exampleInitialState: State = {
  lastUpdate: 0,
  count: 0,
};

export enum ActionTypes {
  TICK = 'TICK',
  INCREMENT = 'INCREMENT',
}
export type TickAction = { type: ActionTypes.TICK; ts: number };
export type IncrementAction = { type: ActionTypes.INCREMENT };
export type Action = IncrementAction | TickAction;
export type State = { lastUpdate: number; count: number };

// REDUCERS
export const reducer: Reducer<State, Action> = (
  state = exampleInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.TICK:
      return { ...state, lastUpdate: action.ts };
    case ActionTypes.INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

// ACTIONS
export const serverRenderClock = (): TickAction => {
  return { type: ActionTypes.TICK, ts: Date.now() };
};

export const incrementCount = (): IncrementAction => {
  return { type: ActionTypes.INCREMENT };
};

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
