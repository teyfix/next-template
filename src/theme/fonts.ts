import { Noto_Sans, Source_Code_Pro } from "next/font/google";

export const fontSans = Noto_Sans({
  variable: "--font-app-sans",
  subsets: ["latin-ext"],
});

export const fontMono = Source_Code_Pro({
  variable: "--font-app-mono",
  subsets: ["latin-ext"],
});
