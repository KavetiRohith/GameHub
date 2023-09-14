import { GameQuery } from "../App";
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = (gameQuery: GameQuery) => {
  const {
    data: games,
    count: gameCount,
    isLoading,
    error,
  } = useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchQuery,
        page: gameQuery.page,
      },
    },
    [gameQuery],
    gameQuery.page !== 1 ? true : false
  );

  return { games, gameCount, error, isLoading };
};

export default useGames;
