export const checkIsKeyAllowed = (key) => {
  const allowedKeyCodes = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    // "space",
  ];
  return allowedKeyCodes.includes(key);
};
