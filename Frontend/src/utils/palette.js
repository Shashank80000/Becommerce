// The site's colour family. `c` is the strong colour (icons, tags, borders),
// `soft` a pale tint for card backgrounds. Text on both stays ink-dark.
// Kept free of imports so data files can use it too.
export const palette = [
  { name: "lime", c: "#a8d63f", soft: "#f0f8d8" },
  { name: "coral", c: "#ff7a59", soft: "#fff0e2" },
  { name: "sky", c: "#3fb4e8", soft: "#e2f4fc" },
  { name: "violet", c: "#8a72f0", soft: "#eeeafe" },
  { name: "sun", c: "#ffbf3c", soft: "#fff4d6" },
  { name: "blue", c: "#4f7cff", soft: "#e6edff" },
  { name: "mint", c: "#2fc495", soft: "#dcf6ec" },
];

export const colorAt = (index) =>
  palette[((index % palette.length) + palette.length) % palette.length];
