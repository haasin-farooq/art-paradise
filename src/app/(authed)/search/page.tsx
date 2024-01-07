"use client";

import { ArtWorksGrid } from "@/components/ArtWorksGrid";
import { Back } from "@/components/Back";
import Loader from "@/components/Loader";
import { fetchClaimedArtworkIds } from "@/utils/apis";
import { Art } from "@/utils/types";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState<Art[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const claimedArtworksRes = await fetchClaimedArtworkIds();
      if (!claimedArtworksRes.ok) {
        throw new Error("Failed to fetch claimed artworks");
      }
      const artworkIds = await claimedArtworksRes.json();

      const artworksRes = await fetch("https://api.artic.edu/api/v1/artworks");
      if (!artworksRes.ok) {
        throw new Error("Failed to fetch artworks");
      }
      const artworksData = await artworksRes.json();

      const data = artworksData.data.filter(
        (artwork: Art) => !artworkIds.includes(artwork.id),
      );

      setArtworks(data);
      setLoading(false);
    };
    getData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col space-y-8">
      <Back />
      <h1 className="text-3xl font-medium">Art Works</h1>
      <ArtWorksGrid artworks={artworks} />
    </div>
  );
};

export default SearchPage;
