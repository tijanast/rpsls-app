import { configureStore } from '@reduxjs/toolkit';
import { gameApi } from './services/gameApi';
import { scoreboardApi } from './services/scoreboardApi';

export const store = configureStore({
    reducer: {
        [gameApi.reducerPath]: gameApi.reducer,
        [scoreboardApi.reducerPath]: scoreboardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(gameApi.middleware)
            .concat(scoreboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;