import { usersRepository } from "src/db/repositories/usersRepository";
import { SignInResult } from "src/db/schema/user";
import {
  SignInModel,
  UpdateLastMatchCode,
  UserSignUpModel,
} from "src/models/user";
import { generatePassword, validatePassword } from "src/utils/password";

class UsersService {
  createUser = async (user: UserSignUpModel) => {
    const { steamId: steamId64, matchHistoryAuthCode, latestMatchCode } = user;
    const { password, passwordHash } = await generatePassword();
    await usersRepository.addNew({
      latestMatchCode,
      matchHistoryAuthCode,
      steamId64,
      passwordHash,
    });
    return { password };
  };
  isUserCredValid = async (
    signInRequest: SignInModel
  ): Promise<SignInResult | boolean> => {
    const { steamId, password } = signInRequest;
    const user = await usersRepository.getBySteamId64(steamId);
    if (!user) {
      return false;
    }
    const isPasswordCorrect = await validatePassword(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      return false;
    }
    const result: SignInResult = Object.assign({}, user, {
      id: undefined,
      passwordHash: undefined,
      steamId32: undefined,
    });
    return result;
  };
  isUserWithSteamIdExists = async (steamId64: string) => {
    const user = await usersRepository.getBySteamId64(steamId64);
    if (!user) {
      return false;
    }
    return true;
  };
  updateLastMatchCode = async (model: UpdateLastMatchCode) => {
    const { steamId, matchCode } = model;
    await usersRepository.updateLastMatchCode(steamId, matchCode);
  };
}

export const usersService = new UsersService();
