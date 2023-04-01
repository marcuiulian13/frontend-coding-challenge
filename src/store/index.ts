import { createStore, applyMiddleware, Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppDispatch = () => store.dispatch as AppDispatch;

export default store;
