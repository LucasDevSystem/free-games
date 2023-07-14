import { ApiGame, Favorite } from ".";

// FUNCOES ULTILITARIAS

export const mergeData = (dataList: ApiGame[], favorites: Favorite[]) => {
  const gameListData = dataList.map((game: ApiGame) => {
    const defaultFav = { stars: 0, isFavorite: false, gameId: 0 };
    const favorite: Favorite =
      favorites.find((fav: Favorite) => fav.gameId === game.id) || defaultFav;

    return { ...game, stars: favorite.stars, isFavorite: favorite.isFavorite };
  });

  return gameListData;
};

export const getGenreOptions = (data: ApiGame[]) => {
  let uniqueGenres: string[] = [];

  data.forEach((game: ApiGame) => {
    if (!uniqueGenres.includes(game.genre)) {
      uniqueGenres.push(game.genre);
    }
  });

  return uniqueGenres;
};
