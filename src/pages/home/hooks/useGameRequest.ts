import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { ApiGame } from "..";
import api from "../../../api";

type Errors = "TIMEOUT" | "SERVER_ERR" | "UNEXPECTED";

const SERVER_ERRORS_5XX = [500, 502, 503, 504, 507, 508, 509];

export const useGameRequest = (shouldUpdate: string) => {
  const [data, setData] = useState<ApiGame[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    (async function () {
      if (loading) return;
      setLoading(true);
      try {
        const { data = Array<ApiGame> } = await api.get("/games");

        setData(data);
      } catch (error: any) {
        handleReqType(getRequestErrType(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [shouldUpdate]);

  return { data, error, loading };
};
