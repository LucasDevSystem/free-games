import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import api from "./api";

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
type Errors = "TIMEOUT" | "SERVER_ERR" | "UNEXPECTED";

const SERVER_ERRORS_5XX = [500, 502, 503, 504, 507, 508, 509];

function App() {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

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
        break;
      case "UNEXPECTED":
        break;
      // recarrega a pagina
      case "SERVER_ERR":
        break;

      default:
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
      console.log(data);
    } catch (error: any) {
      console.log(error);
      handleReqType(getRequestErrType(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;
