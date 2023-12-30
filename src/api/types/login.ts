export type TLoginResType = {
  userId: number;
  email: string;
  nickname: string;
  imageUrl: string;
  accessToken: string;
  refreshToken: string;
  character?: {
    characterId: number;
    name: string;
    content: string;
    imageUrl: string;
    getDate: string;
  };
};
