import { Badge, Divider, Grid, Typography } from "@mui/material";

import GameCard from "./GameCard";
import { Favorite, Game } from ".";
import { colors } from "../../global/colors";

type actionResponse = "SUCCES" | "ERROR";

interface GameCardListProps {
  dataList: Game[];
  onFavorite: (favData: Favorite) => Promise<actionResponse>;
}
// Lista dos cards dos jogos responsivas
const GameCardList = ({ dataList = [], onFavorite }: GameCardListProps) => {
  const cardsData = dataList;

  function onFavoriteAdapter(isFavorite: boolean, game: Game) {
    return onFavorite({
      stars: game.stars,
      isFavorite: isFavorite,
      gameId: game.id,
    });
  }

  function onStarAdapter(stars: number, game: Game) {
    return onFavorite({
      stars: stars,
      isFavorite: game.isFavorite,
      gameId: game.id,
    });
  }
  if (!dataList.length) return null;
  
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: 30 }}>
        <Badge badgeContent={dataList.length} max={999} color="success">
          <Typography variant="h4" fontWeight={"bold"}>
            Jogos
          </Typography>
        </Badge>
        <Divider
          sx={{
            width: "100%",
            color: colors.darkGreen,
          }}
        />
      </div>
      <Grid container spacing={6}>
        {cardsData.map((item: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <GameCard
              cardData={item}
              onStar={(stars) => onStarAdapter(stars, item)}
              onFavorite={(isFav) => onFavoriteAdapter(isFav, item)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default GameCardList;
