import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Star } from "@mui/icons-material";

import "./starAnimation.css";
import { Game } from ".";
import { colors } from "../../global/colors";

// resultado avaliar (strela) ou favoritar
type actionResponse = "SUCCES" | "ERROR";
type GameCardProps = {
  cardData: Game;
  onStar: (stars: number) => Promise<actionResponse>;
  onFavorite: (isFav: boolean) => Promise<actionResponse>;
};

const GameCard: React.FC<GameCardProps> = ({
  cardData,
  onStar,
  onFavorite,
}) => {
  const [stars, setStars] = useState(cardData.stars);
  const [isFavorite, setIsFavorite] = useState(cardData.isFavorite);
  const [isStarSuccess, setIsStarSuccess] = useState(false);

  async function handleStar(stars: number) {
    const result: any = await onStar(stars);
    if (result === "SUCCES") {
      setStars(stars);
      setIsStarSuccess(!isStarSuccess);
    }
  }

  async function handleFavorite() {
    const result: any = await onFavorite(!isFavorite);

    if (result === "SUCCES") {
      setIsFavorite(!isFavorite);
    }
  }

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        position: "relative",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 240, width: "100%" }}
        image={cardData.thumbnail}
        title={cardData.title}
      />
      <CardContent
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {cardData.title}
        </Typography>
        <Button
          color="info"
          variant="contained"
          size="small"
          style={{
            textTransform: "none",
            padding: 0,
            color: colors.white,
            backgroundColor: colors.lightCard,
          }}
          disabled={true}
        >
          {cardData.genre}
        </Button>
      </CardContent>
      <CardActions>
        <div
          style={{
            display: "flex",
            borderRadius: 8,
            margin: 10,
            marginRight: "auto",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              onClick={() => handleStar(index + 1)}
              style={{ color: stars > index ? colors.gold : colors.white }}
              className={`star ${stars > index ? "selected" : ""}`}
            >
              <Star />
            </div>
          ))}
        </div>
        <IconButton onClick={() => handleFavorite()} aria-label="settings">
          {!isFavorite ? (
            <FavoriteBorderIcon
              style={{
                width: 36,
                height: 36,
                color: colors.white,
              }}
            />
          ) : (
            <FavoriteIcon
              style={{
                width: 36,
                height: 36,
                color: colors.red,
              }}
            />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default GameCard;
