export interface GameList{
  gameId: string;
  gameName: string;
  gameDesc: string;
  gameRating: number;
  userId: string;
  categoryId: string;
  category: {
    categoryName: string;
  }
}
