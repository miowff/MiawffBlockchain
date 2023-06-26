export interface UserSignUpModel {
  steamId: string;
  matchHistoryAuthCode: string;
  latestMatchCode: string;
}
export interface SignInModel {
  steamId: string;
  password: string;
}

export interface GetBySteamId {
  steamId: string;
}
export interface UpdateLastMatchCode {
  steamId: string;
  matchCode: string;
}
