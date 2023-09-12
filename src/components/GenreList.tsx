import {
  HStack,
  Image,
  List,
  Text,
  ListItem,
  Button,
  Spinner,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface GenreListProps {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: GenreListProps) => {
  const { genres, isLoading, error } = useGenres();
  if (isLoading) return <Spinner />;

  return (
    <>
      {error && <Text>{error}</Text>}
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id} paddingY={"5px"}>
            <HStack>
              <Image
                src={getCroppedImageUrl(genre.image_background)}
                boxSize={"32px"}
                borderRadius={"8px"}
              />
              <Button
                onClick={() => onSelectGenre(genre)}
                fontSize={"lg"}
                variant={"link"}
              >
                <Text
                  fontWeight={
                    genre.id === selectedGenre?.id ? "bold" : "normal"
                  }
                  overflow={"hidden"}
                >
                  {genre.name}
                </Text>
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default GenreList;
