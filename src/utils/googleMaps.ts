import { LoadScriptProps } from "@react-google-maps/api";

// Replace with your actual Google Maps API key
export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
console.log(
  "🚀 ~ file: googleMaps.ts:5 ~ GOOGLE_MAPS_API_KEY:",
  GOOGLE_MAPS_API_KEY
);

export const defaultLoadScriptProps: LoadScriptProps = {
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
  id: "google-maps-script",
};
