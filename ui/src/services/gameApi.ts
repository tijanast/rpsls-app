import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

interface PlayGameRequest {
  playerName: string;
  playerChoice: string;
}

interface PlayGameResponse {
  result: string;
  computerChoice: string;
}

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5001/api/" }),
  endpoints: (builder) => ({
    playGame: builder.mutation<PlayGameResponse, PlayGameRequest>({
      query: ({ playerName, playerChoice }) => ({
        url: "Game/play",
        method: "POST",
        data: { playerName, playerChoice },
      }),
    }),
    getMoves: builder.query<string[], void>({
      query: () => ({ url: "Game/choices", method: "GET" }),
      transformResponse: (response: string[]) => response,
    }),
  }),
});

export const { usePlayGameMutation, useGetMovesQuery } = gameApi;
