import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0E1B33",
    theme_color: "#0E1B33",
    lang: "en-ZA",
    icons: [
      {
        src: absoluteUrl("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: absoluteUrl("/apple-icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
