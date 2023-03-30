import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import appReducer from "./app-Reducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

const reducers = combineReducers({
    app: appReducer
})

type reducersType = typeof reducers
export type appStateType = ReturnType<reducersType>

// типизация для actions 
type propertiseType<T> = T extends {[key:string]: infer U} ? U : never
export type actionsType<T extends {[key:string]: (...arg: any[]) => any}> = ReturnType<propertiseType<T>>

// типизация для thunk 
export type BaseThunkType< A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store
