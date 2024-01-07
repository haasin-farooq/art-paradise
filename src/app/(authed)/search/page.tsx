import { ArtWorksGrid } from "@/components/ArtWorksGrid";
import { Art } from "@/utils/types";
import React from "react";

const getData = async () => {
  const res = await fetch("https://api.artic.edu/api/v1/artworks");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const SearchPage = async () => {
  const res = await getData();
  const artworks: Art[] = res.data;

  return (
    <>
      <h1 className="mb-8 text-3xl font-medium">Art Works</h1>
      <ArtWorksGrid artworks={artworks} />
    </>
  );
};

export default SearchPage;
