export function richTextToPlain(value: any) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value.type === "doc" && Array.isArray(value.content)) {
    return value.content
      .map((block: any) => {
        if (block.type === "paragraph") {
          return (block.content || []).map((c: any) => c.text || "").join("");
        }
        return "";
      })
      .join("\n");
  }
  return String(value);
}
