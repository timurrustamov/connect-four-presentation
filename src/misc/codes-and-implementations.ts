export const Redux = `

// Redux implementation goes here:

let listeners: Function[] = []
let state = undefined

function dispatch<T>(action: T): T {
  const newState = reducer(state, action)
  listeners.slice().forEach(l => l())
  return action
}

function getState() {
  return state
}

function subscribe(listener: Function): Function {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter(l => l !== listener)
  }
}
`;

export const State = `
// this state is extracted from [EER] 🛡 project

export class State {

  readonly user: Readonly<{
    firstname?: string,
    lastname?: string,
    nationality: string
    ...
  }> = {
    nationality: 'FRANCAISE',
    ...
  }
  readonly loading = {
    state: false,
    pendingRequests: 0
  }
  readonly isAuthenticated = false
  ...
}
`;

export const Action = `
// create action to set user's firstname

export interface SetFirstname {
  type: 'USER_SET_FIRSTNAME',
  payload: string
}
export const SetFirstname =
  (payload: string): SetFirstname => ({
    type: 'USER_SET_FIRSTNAME',
    payload
  })

// SetFirstname('Jean-Jacques') <==> {
//   type: 'USER_SET_FIRSTNAME,
//   payload: 'Jean-Jacques'
// }
//
`;

export const TrixAction = `
// reduce boilerplate

export interface SetData {
  type: 'USER_SET_DATA',
  payload: Partial<User>
}
export const SetData =
  (payload: SetData['payload']): SetData => ({
    type: 'USER_SET_DATA',
    payload
  })

// SetData({ firstname: 'Jean', lastname: 'Jacques' })
`;

export const Reducer = `
// sorry for javascript! 🙈

const userReducer = (user, action) => {
  switch (action.type) {
    case 'USER_SET_FIRSTNAME':
      return {
        ...user,
        firstname: action.payload
      }
    case 'USER_SET_DATA':
    default:
      return state
  }
}

export default userReducer
`;

export const ComposableReducer = `
// composable reducers

const addressReducer = (adress, action) => { ... }

const userReducer = (user, action) => {
  switch (action.type) {
    case 'USER_SET_CITY':
    case 'USER_SET_STREET_NAME':
    case 'USER_SET_ZIPCODE':
      return {
        ...user,
        adress: addressReducer(user.address, action)
      }
    ...
  }
}

export default userReducer
`;

export const CombineReducers = `
// combine those reducers into a root reducer

import { combineReducers } from 'redux'

export default combineReducers({
  user: userReducer,
  router: routerReducer,
  ...
})
`;

export const Reselect = `
// memoize does some memoization :P

@memoize()
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}
`;

export const Undoable = `
const undoable = (reducer) => {
  // call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {})
  }
  // return a reducer that handles undo
  return (state = initialState, action) => {
    const { past, present, future } = state
    if (action.type === 'UNDO') {
      return {
        past: past.slice(0, -1),
        present: past[past.length - 1]
      }
    }
    return {
      past: [ ...past, present ],
      present: reducer(present, action)
    }
  }
}
`;

export const Middleware = `
const logger = state => next => action => {
  console.log('Previous state', state)
  const nextState = next(action)
  console.log('With action', action)
  console.log('Is new state', nextState)
  return nextState
}

const appendMeta = state => next => action => (
  next({
    ...action,
    meta: action.meta || { data: 'myMetadata' }
  })
)
`;

export const React = `
import * as React from 'react'
import { bindActionCreators } from 'redux'

export type ComponentProps = { counter: number }

class App extends React.Component<ComponentProps> {

  state = reducer(undefined, {})
  actions = bindActionCreators(actions, this.dispatch)

  dispatch = (action) => {
    this.setState(state => reducer(state, action))
  }

  render() {
    return <MyComponent { ...this.state } { ...this.actions } />
  }
}
`;

export const ConnectFourState = `
export const createState =
  (gridWidth = 7, gridHeight = 6): State => ({
    board: {
      grid: Array(gridHeight * gridWidth).fill(null),
      dimensions: {
        gridHeight,
        gridWidth
      }
    },
    currentPlayer: 0,
    match: {
      state: MatchState.Menu,
      winningSequence: []
    },
    illegalMoves: [],
    options: {
      players: 2
    },
    theme: {
      id: 0,
      ...themes[0]
    }
  });
`;

export const ActionDeclarations = `
export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P extends Object>
  extends Action<T> {
  payload: P;
}

/**
 * Creates an action creator
 * @param type Actions type
 */
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P extends Object>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P extends Object>(
  type: T,
  payload?: P
) {
  return payload === undefined ? { type } : { type, payload };
}

export default createAction;
`;

export const ActionExample = `
export const MAKE_A_MOVE = '[game/users epic] Make A Move';
/**
 * This action conditionally triggers the effect ADD_CHECKER in an EPIC
 * @param columnId a column to place the checker for current player
 */
export const makeAMove = (columnId: number) =>
  createAction(MAKE_A_MOVE, { columnId });
export type makeAMove = ReturnType<typeof makeAMove>;
`;

export const EpicExample = `
/**
 * This epic changes the player after a successful move
 * @param action$ Stream of actions
 * @param state Current state
 */
export const ChangeCurrentPlayerEpic = (
  action$: ActionsObservable<Actions>,
  state: Store<State>
) =>
  action$.ofType(ADD_CHECKER).mergeMap((): Observable<Actions> => {
    const { currentPlayer, options } = state.getState();
    return Observable.of(
      changeCurrentPlayer((currentPlayer + 1) % options.players)
    );
  });
`;
