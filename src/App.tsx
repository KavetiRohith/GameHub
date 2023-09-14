import {
  Box,
  Grid,
  GridItem,
  HStack,
  Show,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string | null;
  searchQuery: string | null;
  page: number;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({
    page: 1,
  } as GameQuery);
  const { colorMode } = useColorMode();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <Box
          position="fixed"
          top="0"
          width="100%"
          zIndex="sticky"
          backgroundColor={colorMode === "dark" ? "gray.900" : "white"}
        >
          <NavBar
            onSearch={(searchQuery) =>
              setGameQuery({ searchQuery, page: 1 } as GameQuery)
            }
          />
        </Box>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} marginTop={20}>
          <GenreList
            onSelectGenre={(genre) =>
              setGameQuery({ ...gameQuery, genre, page: 1 })
            }
            selectedGenre={gameQuery.genre}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={3} marginTop={20}>
          <GameHeading gameQuery={gameQuery} />
          <HStack spacing={5} marginBottom={5}>
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
              onSelectPlatform={(platform: Platform) =>
                setGameQuery({ ...gameQuery, platform, page: 1 })
              }
            />
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder, page: 1 })
              }
            />
          </HStack>
        </Box>
        <GameGrid
          gameQuery={gameQuery}
          next={() => {
            setGameQuery({ ...gameQuery, page: gameQuery.page + 1 });
          }}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
