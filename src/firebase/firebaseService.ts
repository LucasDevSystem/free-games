import { onValue, ref, set } from "firebase/database";
import { database } from "./firebase";

/* 
   Cada usuario tem seus jogos em seu userID, 
   ficando assim 1 pra N, um usuario pra muitos jogos.
*/

export const readFavorites = async (userId: string) => {
  const favoritesRef = ref(database, `favorites/${userId}`);
  // com await fica mais  bunito
  return new Promise((resolve, reject) => {
    onValue(
      favoritesRef,
      (snapshot) => {
        const favoriteGames = snapshot.val();

        // como e collection,vou jogar todo mundo pra um array
        let arr = [];
        for (const favoriteGame in favoriteGames) {
          arr.push(favoriteGames[favoriteGame]);
        }
        resolve(arr);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

interface Favorite {
  stars: number;
  isFavorite: boolean;
  gameId: number;
}

export const favorite = async (userId: string, gameData: Favorite) => {
  try {
    await set(
      ref(database, `/favorites/${userId}/${gameData.gameId}`),
      gameData
    );
  } catch (error) {
    console.log(error);
  }
};
