import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type { Method } from 'axios';

interface AxiosBaseQueryArgs {
  url: string;
  method: Method;
  data?: any;
}

interface PlayGameRequest {
  playerName: string;
  playerChoice: string;
}

interface PlayGameResponse {
  result: string;
  computerChoice: string;
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

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5001/api/' }),
  endpoints: (builder) => ({
    playGame: builder.mutation<PlayGameResponse, PlayGameRequest>({
      query: ({ playerName, playerChoice }) => ({
        url: 'Game/play',
        method: 'POST',
        data: { playerName, playerChoice },
      }),
    }),
    getMoves: builder.query<string[], void>({
      query: () => ({ url: 'Game/choices', method: 'GET' }),
      transformResponse: (response: string[]) => response,
    }),
  }),
});

export const { usePlayGameMutation, useGetMovesQuery } = gameApi;
