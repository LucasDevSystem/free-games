import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profrile_url: string;
};

type GameCardProps = {
  cardData: Game;
};

const GameCard: React.FC<GameCardProps> = ({ cardData }) => (
  <div>
    <Card
      title={cardData.title}
      style={{ width: "100%", backgroundColor: "#222327", borderRadius: 25 }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ width: 60, height: 60 }} src={cardData.thumbnail} />
        }
        action={
          <IconButton href={cardData.game_url} aria-label="settings">
            <ArrowForwardIcon sx={{ color: "#27b4a4" }} />
          </IconButton>
        }
        title={
          <Typography
            color={"white"}
            sx={{ fontWeight: "bold", fontSize: 18 }}
            noWrap
          >
            {cardData.title}
          </Typography>
        }
        subheader={
          <div>
            <Button
              color="info"
              variant="contained"
              size="small"
              style={{
                textTransform: "none",
                padding: 0,
                color: "white",
                backgroundColor: "gray",
              }}
              disabled={true}
            >
              {cardData.genre}
            </Button>
            <Typography color={"white"}>{cardData.release_date}</Typography>
          </div>
        }
      />
    </Card>
  </div>
);

export default GameCard;
