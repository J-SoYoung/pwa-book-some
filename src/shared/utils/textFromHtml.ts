export const textFromHtml = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText;
  return text;
  // return text.length > length ? text.slice(0, length) + "..." : text;
};
