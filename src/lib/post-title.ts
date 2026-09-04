export type TitlePart = { text: string; code: boolean };

/** Parse Markdown code spans; all other title text stays literal. */
export function parsePostTitle(title: string): TitlePart[] {
  const runs = [...title.matchAll(/`+/g)];
  const parts: TitlePart[] = [];
  let cursor = 0;

  for (let index = 0; index < runs.length; index++) {
    const opening = runs[index];
    const closingIndex = runs.findIndex((run, candidate) =>
      candidate > index && run[0].length === opening[0].length,
    );
    if (closingIndex < 0) continue;

    const closing = runs[closingIndex];
    if (opening.index > cursor) {
      parts.push({ text: title.slice(cursor, opening.index), code: false });
    }
    let text = title.slice(opening.index + opening[0].length, closing.index).replace(/\r\n?|\n/g, " ");
    if (text.startsWith(" ") && text.endsWith(" ") && /[^ ]/.test(text)) {
      text = text.slice(1, -1);
    }
    parts.push({ text, code: true });
    cursor = closing.index + closing[0].length;
    index = closingIndex;
  }

  if (cursor < title.length) parts.push({ text: title.slice(cursor), code: false });
  return parts;
}

export function plainPostTitle(title: string): string {
  return parsePostTitle(title).map(({ text }) => text).join("");
}
