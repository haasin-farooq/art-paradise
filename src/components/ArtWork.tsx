"use client";

import { Art } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

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
  className: string;
}

export const ArtWork: FC<ArtWorkProps> = ({ art, className = "" }) => {
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

  return (
    <Link
      href={`/artwork/${art.id}`}
      className={`trasition hover:bg-art-gray-hover flex flex-col space-y-4 rounded-md border border-art-gray-stroke bg-white p-4 text-start shadow-md duration-100 ${className}`}
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
  );
};
