function isOpeningTag(tag) {
  return /<[^\/].*>/.test(tag);
}

function matchTags(tags) {
  const [opening, closing] = tags.map((t, i) => t.slice(i + 1, t.length - 1));
  return opening.startsWith(closing);
}

export function addLineBreaks(htmlStr) {
  const tokens = htmlStr.split(/(?=<\/?[^>]*>)|(?<=<\/?[^>]*>)/g),
    stack = [];
  tokens.forEach((token) => {
    if (token.startsWith("</")) {
      let line = token,
        lastToken = stack.pop();
      while (!isOpeningTag(lastToken) || !matchTags([lastToken, token])) {
        line = lastToken + line;
        lastToken = stack.pop();
      }
      stack.push(lastToken + line);
    } else {
      stack.push(token);
    }
  });

  return stack.map((tag) => tag.replace(/<p>(.*)<\/p>/, "$1")).join("<br>");
}
