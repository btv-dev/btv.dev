// solution taken from here: https://github.com/tailwindlabs/tailwindcss/issues/13791#issuecomment-2494383246

declare module "tailwindcss/lib/util/flattenColorPalette" {
  export default function flattenColorPalette(
    pallette: Record<string, string>
  ): Record<string, string>;
}
