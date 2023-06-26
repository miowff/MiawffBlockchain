import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
export const generatePassword = async () => {
  const password = randomUUID();
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return { password, passwordHash };
};
export const validatePassword = async (
  password: string,
  passwordHash: string
) => {
  return await bcrypt.compare(password, passwordHash);
};
