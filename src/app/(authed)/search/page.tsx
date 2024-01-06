import { ArtWork } from "@/components/ArtWork";
import React from "react";

async function getData() {
  const res = await fetch("https://api.artic.edu/api/v1/artworks");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface ArtPiece {
  id: number;
  title: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text?: string;
  };
  artist_display: string;
}

const SearchPage = async () => {
  const data = await getData();
  const artworks: ArtPiece[] = data.data;

  return (
    <>
      <h1 className="mb-8 text-3xl font-medium text-art-gray-dark">
        Art Works
      </h1>
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
        {artworks.map((art) => (
          <ArtWork key={art.id} className="break-inside-avoid" art={art} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
