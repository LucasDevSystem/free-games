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
  thumbnails: string;
  short_description: string;
  gamer_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profrile_url: string;
};

// exemplo de dados
const cardData = {
  id: 540,
  title: "Overwatch 2",
  thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
  short_description:
    "A hero-focused first-person team shooter from Blizzard Entertainment.",
  game_url: "https://www.freetogame.com/open/overwatch-2",
  genre: "Shooter",
  platform: "PC (Windows)",
  publisher: "Activision Blizzard",
  developer: "Blizzard Entertainment",
  release_date: "2022-10-04",
  freetogame_profile_url: "https://www.freetogame.com/overwatch-2",
};

const GameCard = () => (
  <div>
    <Card title="nato" style={{ width: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 60, height: 60 }} src={cardData.thumbnail} />
        }
        action={
          <IconButton href={cardData.game_url} aria-label="settings">
            <ArrowForwardIcon />
          </IconButton>
        }
        title={cardData.title}
        titleTypographyProps={{ style: { fontWeight: "bold", fontSize: 18 } }}
        subheader={
          <div>
            <Button
              color="info"
              variant="contained"
              size="small"
              style={{ textTransform: "none", padding: 0 }}
              disabled={true}
            >
              {cardData.genre}
            </Button>
            <Typography>{cardData.release_date}</Typography>
          </div>
        }
      />
    </Card>
  </div>
);

export default GameCard;
