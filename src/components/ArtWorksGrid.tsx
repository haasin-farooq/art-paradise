import { Art } from "@/utils/types";
import { ArtWork } from "./ArtWork";
import { FC } from "react";

interface ArtWorksGridProps {
  artworks: Art[];
  claimed?: boolean;
  onUnclaim?: () => void;
}

export const ArtWorksGrid: FC<ArtWorksGridProps> = ({
  artworks,
  claimed,
  onUnclaim,
}) => {
  return (
    <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
      {artworks.map((art) => (
        <ArtWork
          key={art.id}
          className="break-inside-avoid"
          art={art}
          claimed={claimed}
          onUnclaim={onUnclaim}
        />
      ))}
    </div>
  );
};
