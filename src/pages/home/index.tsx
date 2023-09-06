import React, { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Box, CircularProgress, Snackbar, Toolbar } from "@mui/material";

import GameCardList from "./GameCardList";
import TopBar from "./TopBar";
import { favorite, readFavorites } from "../../firebase/firebaseService";
import { useQuery } from "./hooks/useQuery";
import { AuthContext } from "../../App";
import { getGenreOptions, mergeData } from "./utils";
import AlertModal from "./AlertModal";
import { useGameRequest } from "./hooks/useGameRequest";
import ResponsiveDrawer from "./ResponsiveDrawer";
/*
 @author Lucas Emanuel
*/
export interface ApiGame {
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
}

// dados o firebase
export interface Game extends ApiGame {
  stars: number;
  isFavorite: boolean;
}

// dados gerados da barra de pesquisa
export interface Query {
  filters: {
    genre?: string;
    genres: string[];
    stars?: number;
    favorite?: string;
    searchStr?: string;
  };
  sort: {
    rating?: string;
  };
}

export interface Favorite {
  stars: number;
  isFavorite: boolean;
  gameId: number; // identificador do jogo
}

interface ApiRequestHook {
  loading: boolean;
  error: string;
  data: ApiGame[];
}
interface Props {
  window?: () => Window;
}
function HomePage(props: Props) {
  const authContext = useContext(AuthContext); // dados da autenticacao firebase
  const shouldReload = authContext?.currentUser?.uid; // sempre quando mudar usuario precisa atualizar
  const [query, setQuery] = useState<Query>({
    filters: {
      genres: [],
    },
    sort: {},
  }); // filtros por campos
  const [favorites, setFavorites] = useState<Favorite[]>([]); // dados do firebase db
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, loading, error }: ApiRequestHook = useGameRequest(shouldReload);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [firebaseLoading, setFirebaseLoading] = useState(false);

  const dbOrApiLoading = loading || firebaseLoading;
  
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // merge entre api e firebase
  // atualiza a lista apenas quando as dependencias mudarem
  const mergedData: Game[] = useMemo(
    () => mergeData(data, favorites),
    [favorites, data]
  );
  //     DADOS TRATADOS PARA COMPONENTES
  // aplica os filtros nos dados
  const filteredData = useQuery(query, mergedData);
  // lista de generos
  const genreOptions: string[] = getGenreOptions(data);

  //lista de jogos favoritados
  async function getFavorites() {
    try {
      setFirebaseLoading(true);
      const userId: string = authContext?.currentUser?.uid;

      if (!userId) {
        setFavorites([]); // reseta favoritos
        return;
      }
      const response: any = await readFavorites(userId);

      setFavorites(response);
    } catch (error) {
      console.log(error);
    } finally {
      setFirebaseLoading(false);
    }
  }

  //           CALLBACKS DOS COMPONENTES

  // retorna se foi bem sucedido ou nao, para animacao do card
  async function favoriteGame(gameData: Favorite) {
    try {
      const userId = authContext.currentUser.uid;
      // token expirou ou nao tem conta
      if (!userId) {
        setIsModalOpen(true);
        return "ERROR";
      }

      favorite(userId, gameData);

      // atualiza
      setFavorites((prev) => {
        let next = [...prev];
        let toUpdateIndex = favorites.findIndex(
          (item) => item?.gameId === gameData.gameId
        );

        if (toUpdateIndex < 0) {
          next.push(gameData);
        } else {
          next[toUpdateIndex] = gameData;
        }

        return next;
      });

      return "SUCCES";
    } catch (error) {
      console.log(error);
    }
    return "ERROR";
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    getFavorites();
  }, [shouldReload]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AlertModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={!!error}
          message={error}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
        <TopBar
          onDrawerToggle={handleDrawerToggle}
          user={authContext.currentUser}
          onChangeQuery={(nextQuery: Query) => setQuery(nextQuery)}
          query={query}
        />
        {dbOrApiLoading && (
          <div style={{ position: "fixed", top: "50%", left: "50%" }}>
            <CircularProgress />
          </div>
        )}
        <ResponsiveDrawer
          onChangeQuery={(nextQuery: Query) => setQuery(nextQuery)}
          genreOptions={genreOptions}
          onDrawerToggle={handleDrawerToggle}
          query={query}
          container={container}
          mobileOpen={mobileOpen}
        />
        {!dbOrApiLoading && (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${240}px)` },
            }}
          >
            <Toolbar />
            <GameCardList dataList={filteredData} onFavorite={favoriteGame} />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default HomePage;
