function isExternalLink(node) {
  const href = node.properties?.href;

  return (
    node.type === "element" &&
    node.tagName === "a" &&
    typeof href === "string" &&
    /^(https?:)?\/\//i.test(href)
  );
}

function updateFootnoteLinks(node, insideFootnotes = false) {
  if (!node || typeof node !== "object") return;

  const startsFootnotes = Object.prototype.hasOwnProperty.call(
    node.properties ?? {},
    "dataFootnotes",
  );
  const inFootnotes = insideFootnotes || startsFootnotes;

  if (inFootnotes && isExternalLink(node)) {
    node.properties.target = "_blank";
    node.properties.rel = ["noopener", "noreferrer"];
  }

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => updateFootnoteLinks(child, inFootnotes));
  }
}

export default function rehypeFootnoteLinks() {
  return updateFootnoteLinks;
}
