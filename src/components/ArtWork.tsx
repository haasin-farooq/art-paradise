import { Art } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

async function getData(id: number) {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface ArtWorkProps {
  art: Art;
  className: string;
}

export const ArtWork: FC<ArtWorkProps> = async ({ art, className = "" }) => {
  const data = await getData(art.id);
  const imageUrl = `${data.config.iiif_url}/${data.data.image_id}/full/843,/0/default.jpg`;

  return (
    <Link
      href="/"
      className={`trasition hover:bg-art-gray-hover flex flex-col space-y-4 rounded-md border border-art-gray-stroke bg-white p-4 text-start shadow-md duration-100 ${className}`}
    >
      <h2 className="text-lg font-medium text-art-gray-dark">{art.title}</h2>
      <Image
        src={imageUrl}
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
