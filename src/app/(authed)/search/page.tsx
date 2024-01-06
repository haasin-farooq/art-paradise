import { ArtWork } from "@/components/ArtWork";
import { Art } from "@/utils/types";
import React from "react";

async function getData() {
  const res = await fetch("https://api.artic.edu/api/v1/artworks");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const SearchPage = async () => {
  const data = await getData();
  const artworks: Art[] = data.data;

  return (
    <>
      <h1 className="mb-8 text-3xl font-medium">Art Works</h1>
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
        {artworks.map((art) => (
          <ArtWork key={art.id} className="break-inside-avoid" art={art} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
