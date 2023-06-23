import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import api from "./api";
import GameCardList from "./GameCardList";
import Search from "./Search";
import { CircularProgress, Snackbar } from "@mui/material";

/*
@author Lucas Emanuel
*/

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

type Query = {
  genres: string[];
  searchStr: string;
};
type Errors = "TIMEOUT" | "SERVER_ERR" | "UNEXPECTED";

const SERVER_ERRORS_5XX = [500, 502, 503, 504, 507, 508, 509];

function App() {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");

  /**
   * obtem o tipo de erro
   * @param error erro emitido pelo axios
   * @returns {Errors} tipo de erro str
   */
  function getRequestErrType(error: AxiosError): Errors {
    const code = error?.code;
    const status = error?.response?.status || 0;

    // request timeout
    if (code === "ECONNABORTED") return "TIMEOUT";
    // server error
    if (SERVER_ERRORS_5XX.includes(status)) return "SERVER_ERR";

    return "UNEXPECTED";
  }

  /**
   * Pelo tipo de erro identificado notifica o usuario
   * @param errorType
   */
  function handleReqType(errorType: Errors) {
    switch (errorType) {
      // notifica usuario sobre o ocorrido
      case "TIMEOUT":
        setError("O servidor demorou para responder, tente mais tarde");
        break;
      case "UNEXPECTED":
        setError(
          "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde"
        );
        break;
      // recarrega a pagina
      case "SERVER_ERR":
        setError("O servidor fahou em responder, tente recarregar a página");
        break;
      default:
        setError("O servidor demorou para responder, tente mais tarde");
        break;
    }
  }

  async function getData() {
    setLoading(true);
    try {
      const { data = Array<Game> } = await api.get("/data/", {
        headers: {
          "dev-email-address": "teste@gmail.com",
        },
      });
      setDataList(data);
      setFilteredData(data);
    } catch (error: any) {
      handleReqType(getRequestErrType(error));
    } finally {
      setLoading(false);
    }
  }
  function getGenreOptions() {
    let uniqueGenres: string[] = [];
    dataList.map((game: Game) => {
      if (!uniqueGenres.includes(game.genre)) {
        uniqueGenres.push(game.genre);
      }
    });

    return uniqueGenres;
  }

  // COMPONENTS CALLBACKS

  function onSearch(query: Query) {
    const { genres, searchStr } = query;
    // filtra pela pesquisa e pelos generos dos jogos
    const filtered = dataList.filter((game: Game) => {
      if (genres.length) {
        let contain = !!(
          game.title.toLowerCase().includes(searchStr.toLowerCase()) &&
          genres.includes(game.genre)
        );

        return contain;
      }

      return game.title.toLowerCase().includes(searchStr.toLowerCase());
    });

    setFilteredData(filtered);
  }

  const genreOptions: string[] = getGenreOptions();
  // tenta obter os dados iniciais
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={!!error}
        message={error}
      />
      {loading ? (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Search onSearch={onSearch} genreOptions={genreOptions} />
          <GameCardList dataList={filteredData} />{" "}
        </div>
      )}
    </div>
  );
}

export default App;
