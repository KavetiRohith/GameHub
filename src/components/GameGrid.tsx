import { SimpleGrid, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";

interface GameGridProps {
  gameQuery: GameQuery;
  next: () => void;
}

const GameGrid = ({ gameQuery, next }: GameGridProps) => {
  const { games, error } = useGames(gameQuery);

  if (error) return <Text>{error}</Text>;

  return (
    <InfiniteScroll
      dataLength={games.length} // This is important field to render the next data
      next={next}
      hasMore={true}
      loader={
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          padding="10px"
        >
          {[0, 1, 2, 3, 4, 5].map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        </SimpleGrid>
      }
      endMessage={<Text textAlign="center">Yay! You have seen it all</Text>}
    >
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game}></GameCard>
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
