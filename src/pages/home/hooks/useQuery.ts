import { Game, Query } from "..";

export function useQuery(query: Query, dataList: Game[]): Game[] {
  const { filters, sort } = query;
  // filtra por genero , favorito e texto
  const filtered = dataList.filter((game: Game) => {
    const { genre, favorite, searchStr, genres } = filters;
    const favOpt = game.isFavorite ? "Favoritos" : "Não favoritos";

    if (favorite !== undefined && favorite !== favOpt && favorite !== "Todos") {
      return false;
    }

    if (genre && game.genre !== genre && genre !== "Todos") {
      return false;
    }

    if (genres?.length && !genres.includes(game.genre)) {
      return false;
    }

    if (
      searchStr &&
      !game.title.toLowerCase().includes(searchStr.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // ordena pela availacao
  if (sort && sort.rating) {
    const sortOption = sort.rating;
    if (sortOption === "Melhores") {
      filtered.sort((a: Game, b: Game) => b.stars - a.stars);
    } else if (sortOption === "Piores") {
      filtered.sort((a: Game, b: Game) => a.stars - b.stars);
    }
  }

  return filtered;
}
