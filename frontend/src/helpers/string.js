export const getRawText = (text) => {
  return text.replace(/<[^>]*>/g, "");
};
