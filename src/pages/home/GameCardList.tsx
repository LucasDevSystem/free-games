import { useState } from "react";
import { Badge, Divider, Grid, Typography } from "@mui/material";

import GameCard from "./GameCard";
import FloatingPagination from "./FloatingPagination";
import { Favorite, Game } from ".";
import { colors } from "../../global/colors";

const CARDS_PER_PAGE = 50;

type actionResponse = "SUCCES" | "ERROR";

interface GameCardListProps {
  dataList: Game[];
  onFavorite: (favData: Favorite) => Promise<actionResponse>;
}
// Lista dos cards dos jogos responsivas
const GameCardList = ({ dataList = [], onFavorite }: GameCardListProps) => {
  const [curentPage, setCurentPage] = useState(1);

  // faz a divisao e obtem o teto do valor
  const maxPages = Math.ceil(dataList.length / CARDS_PER_PAGE) || 1;

  // // dados visiveis da pagina
  // const cardsData = dataList.filter(
  //   (game: Game, index: number) =>
  //     index <= curentPage * CARDS_PER_PAGE &&
  //     index >= (curentPage - 1) * CARDS_PER_PAGE
  // );
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
      {/* <FloatingPagination
        maxPages={maxPages}
        onChagePage={(nexPage: number) => setCurentPage(nexPage)}
      /> */}
    </div>
  );
};
export default GameCardList;
