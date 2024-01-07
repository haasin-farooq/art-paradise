"use client";

import { useAuth } from "@/contexts/AuthContext";
import { unclaimArt } from "@/utils/apis";
import { Art } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { BaseSyntheticEvent, FC, useEffect, useState } from "react";

const getData = async (id: number) => {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

interface ArtWorkProps {
  art: Art;
  claimed?: boolean;
  onUnclaim?: () => void;
  className: string;
}

export const ArtWork: FC<ArtWorkProps> = ({
  art,
  claimed,
  onUnclaim,
  className = "",
}) => {
  const { currentUser } = useAuth();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(art.id);
      setImageUrl(
        `${res.config.iiif_url}/${res.data.image_id}/full/843,/0/default.jpg`,
      );
    };
    fetchData();
  }, []);

  const handleUnclaim = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (currentUser) {
      await unclaimArt(currentUser, art.id);
      onUnclaim?.();
    }
  };

  return (
    <div
      className={`hover:bg-art-gray-hover rounded-md border border-art-gray-stroke bg-white shadow-md transition duration-100 ${className}`}
    >
      <Link
        href={`/artwork/${art.id}`}
        className="flex flex-col space-y-4 p-4 text-start"
      >
        <h2 className="text-lg font-medium">{art.title}</h2>
        <Image
          src={imageUrl ?? art.thumbnail.lqip}
          alt={`Thumbnail of ${art.title}`}
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL={art.thumbnail.lqip}
          layout="responsive"
        />
        <p className="text-art-gray-light">{art.artist_display}</p>
      </Link>
      {claimed ? (
        <button
          className="px-4 pb-4 text-start text-red-500 underline"
          onClick={(e) => handleUnclaim(e)}
        >
          Unclaim
        </button>
      ) : null}
    </div>
  );
};
