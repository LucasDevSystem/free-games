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
    <Card title="nato" style={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 60, height: 60 }} src={cardData.thumbnail} />
        }
        action={
          <IconButton href={cardData.game_url} aria-label="settings">
            <ArrowForwardIcon />
          </IconButton>
        }
        title={
          <Typography sx={{ fontWeight: "bold", fontSize: 18 }} noWrap>
            {cardData.title}
          </Typography>
        }
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
