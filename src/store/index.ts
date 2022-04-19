import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { cardArrayReducer, commentArrayReducer, columnArrayReducer, openedCardReducer, nameReducer } from './ducks'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
	cardArray: cardArrayReducer,
	commentArray: commentArrayReducer,
	columnArray: columnArrayReducer,
	openedCard: openedCardReducer,
	name: nameReducer,
})

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
