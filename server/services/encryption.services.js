import { createHash } from "crypto";

export const encryptPin = (pin) => {
  const hash = createHash("sha256");
  hash.update(pin.toString());

  // This will return a fixed size of encrypted hash - 6
  const hashedPin = hash.digest("hex").slice(0, 6);
  return hashedPin;
};

export const isEncryptedPinMatch = (encryptedPin, pin) => {
  const encryptedActualPin = encryptPin(pin);
  return encryptedPin === encryptedActualPin;
};
