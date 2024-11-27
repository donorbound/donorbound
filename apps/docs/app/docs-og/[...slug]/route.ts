import { metadataImage } from "@/lib/metadata";
import { generateOGImage } from "fumadocs-ui/og";

export const GET = metadataImage.createAPI((page) => {
  return generateOGImage({
    description: page.data.description,
    title: page.data.title,
  });
});

export function generateStaticParams() {
  return metadataImage.generateParams();
}
