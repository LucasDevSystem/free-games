import { useState } from "react";
import { Divider, Grid } from "@mui/material";

import GameCard from "./GameCard";
import FloatingPagination from "./FloatingPagination";
import { Favorite, Game } from ".";

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

  // dados visiveis da pagina
  const cardsData = dataList.filter(
    (game: Game, index: number) =>
      index <= curentPage * CARDS_PER_PAGE &&
      index >= (curentPage - 1) * CARDS_PER_PAGE
  );

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

  return (
    <div
      style={{
        paddingTop: 8,
        justifyContent: "center",
      }}
    >
      <Divider
        sx={{
          width: "80%",
          margin: "auto",
          paddingBottom: 3,
        }}
      >
        {`${dataList.length} resultados`}
      </Divider>
      <Grid container spacing={4}>
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
      <FloatingPagination
        maxPages={maxPages}
        onChagePage={(nexPage: number) => setCurentPage(nexPage)}
      />
    </div>
  );
};
export default GameCardList;
