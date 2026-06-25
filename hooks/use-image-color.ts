import { useColor } from "color-thief-react";

export function useImageColor(imageUrl: string): string {
  // Use color-thief-react to get the exact dominant color from the image.
  // We use "hex" format. This library is much better at extracting the actual dominant color.
  const { data, loading, error } = useColor(imageUrl, "hex", {
    crossOrigin: "anonymous",
  });

  if (loading || error || !data) {
    return "transparent";
  }

  return data;
}
