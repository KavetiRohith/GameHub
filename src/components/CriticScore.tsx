import { Badge } from "@chakra-ui/react";

interface CriticScoreProps {
  score: number;
}

const CriticScore = ({ score }: CriticScoreProps) => {
  const color = score > 75 ? "green" : score > 60 ? "yellow" : "";
  return (
    <Badge fontSize="14px" paddingX="2" borderRadius="4px" colorScheme={color}>
      {score}
    </Badge>
  );
};

export default CriticScore;
