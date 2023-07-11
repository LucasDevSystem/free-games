import { useState } from "react";
import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import { Query } from ".";
import CustomSelect from "../../components/CustomSelect";

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
      <div style={{ paddingTop: 20 }}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: "#edecec" }} />
              </InputAdornment>
            ),
          }}
          style={{
            minWidth: 300,
            maxWidth: 300,
            float: "right",
            backgroundColor: "#222327",
            borderRadius: 20,
            textDecorationColor: "red",
            border: "none",
            borderColor: "red",
            borderWidth: 0,
          }}
          sx={{ "& fieldset": { border: "none" }, input: { color: "white" } }}
          onInput={onChangeTxt}
          id="outlined-basic"
          value={text}
          variant="outlined"
          placeholder="Pesquisar..."
          size="medium"
        />
        <CustomSelect
          value={favorite}
          label="Favoritos"
          onChange={onChangeFav}
          options={FAV_OPTIONS}
        />
        <CustomSelect
          value={rating}
          label="Avaliacao"
          onChange={onChangeRating}
          options={RATING_OPTIONS}
        />
        <CustomSelect
          value={genre}
          label="Genero"
          onChange={onChangeGenre}
          options={genreOptions}
        />
      </div>
    </div>
  );
};

export default Search;
