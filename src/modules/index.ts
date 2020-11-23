import locale from './locale';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  locale
});

export default rootReducer;
export type RootReducerTypes = ReturnType<typeof rootReducer>;
