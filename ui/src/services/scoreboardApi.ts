import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type { Method } from 'axios';

interface AxiosBaseQueryArgs {
    url: string;
    method: Method;
    data?: any;
}

export interface ScoreEntry {
    id: string;
    playerName: string;
    playerChoice: string;
    computerChoice: string;
    result: string;
    createdAt: string;
}

interface SaveScoreRequest {
    playerName: string;
    playerChoice: string;
    computerChoice: string;
    result: string;
}

const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string }) =>
        async ({ url, method, data }: AxiosBaseQueryArgs) => {
            try {
                const result = await axios({ url: baseUrl + url, method, data });
                return { data: result.data };
            } catch (axiosError: any) {
                return {
                    error: {
                        status: axiosError.response?.status,
                        data: axiosError.response?.data || axiosError.message,
                    },
                };
            }
        };

export const scoreboardApi = createApi({
    reducerPath: 'scoreboardApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5002/api/' }),
    endpoints: (builder) => ({
        getScores: builder.query<ScoreEntry[], number | void>({
            query: (take = 10) => ({ url: `Scoreboard?take=${take}`, method: 'GET' }),
        }),
        resetScores: builder.mutation<void, void>({
            query: () => ({ url: 'Scoreboard', method: 'DELETE' }),
        }),
        saveScore: builder.mutation<ScoreEntry, SaveScoreRequest>({
            query: (score) => ({
                url: 'Scoreboard',
                method: 'POST',
                data: score,
            }),
        }),
    }),
});

export const {
    useGetScoresQuery,
    useResetScoresMutation,
    useSaveScoreMutation,
} = scoreboardApi;
