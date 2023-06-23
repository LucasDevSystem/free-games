import { Grid } from "@mui/material";
import GameCard from "./GameCard";

// Lista dos cards dos jogos responsivas
const GameCardList = ({ dataList = [] }) => {
  return (
    <div style={{ padding: 50, justifyContent: "center" }}>
      <Grid container spacing={2}>
        {dataList.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <GameCard cardData={item}></GameCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default GameCardList;
