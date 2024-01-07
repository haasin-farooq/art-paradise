import { Art } from "@/utils/types";
import { Artwork } from "./Artwork";
import { FC } from "react";

interface ArtworksGridProps {
  artworks: Art[];
  onUnclaim?: () => void;
}

export const ArtworksGrid: FC<ArtworksGridProps> = ({
  artworks,
  onUnclaim,
}) => {
  return (
    <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
      {artworks.map((art) => (
        <Artwork
          key={art.id}
          className="break-inside-avoid"
          art={art}
          onUnclaim={onUnclaim}
        />
      ))}
    </div>
  );
};
