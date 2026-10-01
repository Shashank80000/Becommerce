import { categories, industries } from "./mockData";
import { colorAt, palette } from "./palette";

export { colorAt, palette };

// Same category => same colour everywhere on the site.
export const categoryColor = (name) => colorAt(Math.max(0, categories.indexOf(name)));
export const industryColor = (name) => colorAt(Math.max(0, industries.indexOf(name)) + 3);

// Inline CSS variables for an element tinted with one palette colour.
export const tint = (color) => ({ "--c": color.c, "--c-soft": color.soft });
