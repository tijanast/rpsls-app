import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export interface ScoreEntry {
  id: string;
  playerName: string;
  playerChoice: string;
  computerChoice: string;
  result: string;
  createdAt: string;
}

export const scoreboardApi = createApi({
  reducerPath: "scoreboardApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5002/api/" }),
  endpoints: (builder) => ({
    getScores: builder.query<ScoreEntry[], number | void>({
      query: (take = 10) => ({ url: `Scoreboard?take=${take}`, method: "GET" }),
    }),
    resetScores: builder.mutation<void, void>({
      query: () => ({ url: "Scoreboard", method: "DELETE" }),
    })
  }),
});

export const {
  useGetScoresQuery,
  useResetScoresMutation
} = scoreboardApi;
