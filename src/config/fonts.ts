import {
  Inter,
  Montserrat_Alternates,
  Poppins,
  Montserrat,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "700"],
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});
