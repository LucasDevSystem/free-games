import { useState } from "react";
import { Favorite, SearchRounded, Star } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import CustomSelect from "../../components/CustomSelect";
import { Query } from ".";
import { colors } from "../../global/colors";

type SearchProps = {
  onSearch: (query: Query) => void;
  genreOptions: string[];
};

const FAV_OPTIONS = ["Todos", "Favoritos", "Não favoritos"];
const RATING_OPTIONS = ["Todos", "Melhores", "Piores"];

const Search: React.FC<SearchProps> = ({ genreOptions, onSearch }) => {
  const [text, setText] = useState("");
  const [genre, setGenre] = useState<string>("Todos");
  const [favorite, setFavorite] = useState("Todos");
  const [rating, setRating] = useState("Todos");

  function onUpdate(
    nextTxt: string,
    nextGenre: string,
    nextFav: string,
    nextRating: string
  ) {
    onSearch({
      filters: {
        genre: nextGenre,
        searchStr: nextTxt,
        isFavorite: nextFav !== "Todos" ? nextFav === "Favoritos" : undefined,
      },
      sort: {
        rating: nextRating,
      },
    });
  }

  const onChangeTxt = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
    onUpdate(value, genre, favorite, rating);
  };

  const onChangeGenre = (event: any) => {
    const value = event.target.value;
    setGenre(value);
    onUpdate(text, value, favorite, rating);
  };

  const onChangeFav = (event: any) => {
    const value = event.target.value;
    setFavorite(value);
    onUpdate(text, genre, value, rating);
  };

  const onChangeRating = (event: any) => {
    const value = event.target.value;
    setRating(value);
    onUpdate(text, genre, favorite, value);
  };

  return (
    <div>
      <div style={{ marginTop: 30 }}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: "#edecec" }} />
              </InputAdornment>
            ),
          }}
          style={{
            width: 300,
            float: "right",
            backgroundColor: colors.lightCard,
            borderRadius: 20,
            borderWidth: 0,
          }}
          sx={{
            "& fieldset": { border: "none" },
            input: { color: "white" },
            m: 1,
          }}
          onInput={onChangeTxt}
          value={text}
          variant="outlined"
          placeholder="Pesquisar..."
          size="medium"
        />
        <CustomSelect
          value={rating}
          label="Avaliação"
          onChange={onChangeRating}
          icon={<Star sx={{ height: 20, width: 20 }} fontSize="small" />}
          options={RATING_OPTIONS}
        />

        <CustomSelect
          value={favorite}
          label="Favoritos"
          onChange={onChangeFav}
          icon={<Favorite sx={{ height: 20, width: 20 }} fontSize="small" />}
          options={FAV_OPTIONS}
        />
        <CustomSelect
          value={genre}
          label="Gênero"
          icon={
            <SportsEsportsIcon
              sx={{ height: 20, width: 20 }}
              fontSize="small"
            />
          }
          onChange={onChangeGenre}
          options={genreOptions}
        />
      </div>
    </div>
  );
};

export default Search;
