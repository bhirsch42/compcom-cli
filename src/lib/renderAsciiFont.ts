import figlet, { Fonts } from "figlet";

const IS_FONT_LOADED = new Map<Fonts, boolean>();

export default function renderAsciiFont(text: string, font: Fonts): string {
  if (!IS_FONT_LOADED.get(font)) {
    figlet.loadFontSync(font);
    IS_FONT_LOADED.set(font, true);
  }

  return figlet.textSync(text, font);
}
