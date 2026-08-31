const headingNames = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function getText(node) {
  if (node.type === "text") return node.value;
  if (!Array.isArray(node.children)) return "";

  return node.children.map(getText).join("");
}

function addHeadingLinks(node) {
  if (!node || typeof node !== "object") return;

  const classes = Array.isArray(node.properties?.className)
    ? node.properties.className
    : [];
  const id = node.properties?.id;

  if (
    node.type === "element" &&
    headingNames.has(node.tagName) &&
    typeof id === "string" &&
    !classes.includes("sr-only")
  ) {
    const label = getText(node).trim();

    node.children.push({
      type: "element",
      tagName: "a",
      properties: {
        ariaLabel: `Permalink to ${label}`,
        className: ["heading-anchor"],
        href: `#${id}`,
      },
      children: [{ type: "text", value: "#" }],
    });
  }

  if (Array.isArray(node.children)) {
    node.children.forEach(addHeadingLinks);
  }
}

export default function rehypeHeadingLinks() {
  return addHeadingLinks;
}
