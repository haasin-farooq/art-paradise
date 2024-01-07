"use client";

import { ArtWorksGrid } from "@/components/ArtWorksGrid";
import { Back } from "@/components/Back";
import Loader from "@/components/Loader";
import { fetchClaimedArtworkIds } from "@/utils/apis";
import { Art } from "@/utils/types";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState<Art[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const getData = async (page: number) => {
    setLoading(true);

    const claimedArtworksRes = await fetchClaimedArtworkIds();
    if (!claimedArtworksRes.ok) {
      throw new Error("Failed to fetch claimed artworks");
    }
    const artworkIds = await claimedArtworksRes.json();

    const artworksRes = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}`,
    );
    if (!artworksRes.ok) {
      throw new Error("Failed to fetch artworks");
    }
    const artworksData = await artworksRes.json();

    const data = artworksData.data.filter(
      (artwork: Art) => !artworkIds.includes(artwork.id),
    );
    const totalPages = artworksData.pagination.total_pages;
    const currentPage = artworksData.pagination.current_page;

    setArtworks(data);
    setTotalPages(totalPages);
    setPage(currentPage);
    setLoading(false);
  };

  useEffect(() => {
    getData(1);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col space-y-8">
        <Back />
        <h1 className="text-3xl font-medium">Artworks</h1>
        <ArtWorksGrid artworks={artworks} />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          {page > 1 ? (
            <PaginationButton
              icon={<ChevronLeftIcon />}
              onClick={() => getData(page - 1)}
            />
          ) : null}
          <p>Page {page}</p>
          {page < totalPages ? (
            <PaginationButton
              icon={<ChevronRightIcon />}
              onClick={() => getData(page + 1)}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

interface PaginationButtonProps {
  icon: ReactElement;
  onClick: () => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      className="flex items-center justify-center space-x-2 rounded-md border border-art-primary p-3 text-art-primary"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default SearchPage;
