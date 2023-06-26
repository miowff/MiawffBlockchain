import * as Elliptic from "elliptic";
const elliptic = new Elliptic.ec("secp256k1");
export const genWalletKeys = () => {
  const keys = elliptic.genKeyPair();
  const publicKey = keys.getPublic("hex");
  const privateKey = keys.getPrivate("hex");
  return { publicKey, privateKey };
};
export const getPairFromPrivateKey = (privateKey: string) => {
  return elliptic.keyFromPrivate(privateKey);
};
export const getFromPublicKey = (publicKey: string) => {
  return elliptic.keyFromPublic(publicKey, "hex");
};
