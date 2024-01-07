import { Art } from "@/utils/types";
import { ArtWork } from "./ArtWork";
import { FC } from "react";

interface ArtWorksGridProps {
  artworks: Art[];
}

export const ArtWorksGrid: FC<ArtWorksGridProps> = ({ artworks }) => {
  return (
    <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
      {artworks.map((art) => (
        <ArtWork key={art.id} className="break-inside-avoid" art={art} />
      ))}
    </div>
  );
};
