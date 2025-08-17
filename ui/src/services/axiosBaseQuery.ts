import axios from "axios";
import type { Method } from "axios";

export interface AxiosBaseQueryArgs {
  url: string;
  method: Method;
  data?: any;
}

export const axiosBaseQuery =
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
