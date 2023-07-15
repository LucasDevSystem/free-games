import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { colors } from "../../global/colors";
import { ArrowDownward, ArrowUpward, Star } from "@mui/icons-material";
import { Query } from ".";

interface DrawerFiltersProps {
  genreOptions: string[];
  query: Query;
  onChangeQuery: (qr: Query) => void;
}
const DrawerFilters = ({
  genreOptions,
  query,
  onChangeQuery,
}: DrawerFiltersProps) => {
  const genres = query?.filters?.genres || [];
  const favorite = query?.filters?.favorite || "";
  const rating = query?.sort?.rating;

  const onCheckGenre = (genre: string) => {
    let nextQuery = { ...query };
    const index = nextQuery.filters?.genres.indexOf(genre);

    // remove
    if (index > -1) {
      nextQuery.filters?.genres?.splice(index, 1);
    } else {
      //adiciona
      nextQuery.filters?.genres.push(genre);
    }

    onChangeQuery(nextQuery);
  };

  const onSort = () => {
    let nextQuery = { ...query };
    nextQuery.sort.rating =
      nextQuery?.sort?.rating === "Melhores" ? "Piores" : "Melhores";

    onChangeQuery(nextQuery);
  };
  const onCheckFavorite = (opt: string) => {
    let nextQuery = { ...query };
    nextQuery.filters.favorite = opt;

    onChangeQuery(nextQuery);
  };

  return (
    <div
      style={{
        minWidth: 220,
        padding: 20,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 80,
        overflowY: "auto",
        height: "100%",
        borderRadius: 16,
        backgroundColor: "#1A1A1A",
        scrollbarWidth: "thin",
      }}
    >
      <Typography fontWeight={"bold"} fontSize={20}>
        Ordenar
      </Typography>
      <Button
        sx={{
          minWidth: 130,
          borderWidth: 0,
          textTransform: "none",
          fontWeight: "bold",
          fontSize: 16,
          color: colors.defaultGray,
          backgroundColor: colors.background,
          borderRadius: 3,
          ":hover": {
            bgcolor: colors.lightCard,
          },
          float: "left",
        }}
        onClick={() => onSort()}
        startIcon={
          <Star
            sx={{
              height: 20,
              width: 20,
              color: rating === "Melhores" ? colors.gold : colors.white,
            }}
            fontSize="small"
          />
        }
        endIcon={rating === "Melhores" ? <ArrowUpward /> : <ArrowDownward />}
        size="medium"
      >
        Avaliação
      </Button>
      <Typography fontWeight={"bold"} fontSize={20}>
        Favorito
      </Typography>
      {["Todos", "Favoritos", "Não favoritos"].map((opt) => (
        <FormControlLabel
          checked={opt === favorite}
          onClick={() => onCheckFavorite(opt)}
          control={
            <Checkbox sx={{ margin: 0, padding: 0.4, color: "#354039" }} />
          }
          sx={{ margin: 0, display: "flex" }}
          label={<Typography color={colors.ligthGray}>{opt}</Typography>}
        />
      ))}
      <Typography fontWeight={"bold"} fontSize={20}>
        Generos
      </Typography>
      {
        <FormGroup>
          {genreOptions.map((genre: any) => (
            <FormControlLabel
              key={genre}
              checked={genres.includes(genre)}
              onClick={() => onCheckGenre(genre)}
              control={
                <Checkbox sx={{ margin: 0, padding: 0.4, color: "#354039" }} />
              }
              sx={{ margin: 0 }}
              label={<Typography color={colors.ligthGray}>{genre}</Typography>}
            />
          ))}
        </FormGroup>
      }
    </div>
  );
};

export default DrawerFilters;
