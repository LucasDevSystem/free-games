import { Button, TextField, debounce } from "@mui/material";
import { useCallback, useState } from "react";

type Query = {
  genres: string[];
  searchStr: string;
};

type SearchProps = {
  onSearch: (query: Query) => void;
  genreOptions: string[];
};

const Search: React.FC<SearchProps> = ({ genreOptions, onSearch }) => {
  const [text, setText] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  function onSelectGenre(genre = "") {
    let newGenreArr: string[] = [];
    // se existe ele remove
    if (selectedGenres.includes(genre)) {
      newGenreArr = selectedGenres.filter(
        (genreToRemove: string) => genreToRemove !== genre
      );
    } else {
      newGenreArr = [...selectedGenres, genre];
    }
    onSearch({ genres: newGenreArr, searchStr: text });
    setSelectedGenres(newGenreArr);
  }

  // dispara o evento apos 500 milissegundos
  // o usecallback foi ultilizado para nao criar varias funcoes a cada renderizacao
  // entao com apens uma funcao nao dispara a callback multiplas vezes, apenas a ultima
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch({ genres: genreOptions, searchStr: value });
    }, 500),
    [onSearch]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <TextField
          sx={{ width: "50%" }}
          onInput={handleChange}
          id="outlined-basic"
          value={text}
          variant="outlined"
          placeholder="Pesquise o jogo..."
          size="medium"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: 0 }}>
        {genreOptions.map((genre: string) => (
          <Button
            key={genre}
            color="info"
            variant="contained"
            size="small"
            style={{
              textTransform: "none",
              marginRight: 5,
              backgroundColor: selectedGenres.includes(genre) ? "blue" : "gray",
            }}
            onClick={() => onSelectGenre(genre)}
          >
            {genre}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Search;
