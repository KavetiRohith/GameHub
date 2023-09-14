import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any[],
  keepPreviousData: boolean = false
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(-1);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      if (!keepPreviousData) setData([]);
      setError("");
      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          keepPreviousData
            ? setData([...data, ...res.data.results])
            : setData(res.data.results);
          setLoading(false);
          setCount(res.data.count);
        })
        .catch((err) => {
          if (err instanceof CanceledError) {
            return;
          }

          setError(err.message);
          setLoading(false);
        });

      return () => {
        controller.abort();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : []
  );

  return { data, count, error, isLoading };
};

export default useData;
