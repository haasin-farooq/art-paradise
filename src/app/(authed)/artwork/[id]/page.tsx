import { Button } from "@/components/Button";
import IconArrowLeft from "@/svgs/icons/arrow-left";
import { ArtDetail } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

async function getData(id: number) {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface ArtWorkPageProps {
  params: { id: number };
}

const ArtWorkPage: FC<ArtWorkPageProps> = async ({ params }) => {
  const data = await getData(params.id);
  const art: ArtDetail = data.data;
  const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;

  return (
    <div className="flex flex-col space-y-10">
      <Link
        href="/search"
        className="flex items-center space-x-2 text-art-gray-light"
      >
        <IconArrowLeft className="h-6 w-6" />
        <span>Back to artworks</span>
      </Link>
      <div className="sm:pb-50% pb-80% relative w-full">
        <Image
          src={imageUrl}
          alt={`Thumbnail of ${art.title}`}
          className="absolute left-0 top-0 h-full w-full object-contain"
          fill
          placeholder="blur"
          blurDataURL={art.thumbnail.lqip}
        />
      </div>
      <div className="flex flex-col space-y-8 sm:flex-row sm:space-y-0">
        <div className="flex basis-3/5 flex-col space-y-10 text-lg sm:pr-10">
          <h1 className="text-3xl font-medium">{art.title}</h1>
          <p className="text-art-gray-extra-light">{art.date_display}</p>
          <p className="text-art-gray-extra-light">{art.artist_display}</p>
          {art.description ? (
            <div
              className="text-art-gray-light"
              dangerouslySetInnerHTML={{ __html: art.description }}
            />
          ) : null}
        </div>
        <div className="divide basis-2/5 sm:border-l sm:pl-10">
          <Detail label="Origin" text={art.place_of_origin} />
          <hr />
          <Detail label="Medium" text={art.medium_display} />
          <hr />
          <Detail label="Dimensions" text={art.dimensions} />
          <hr />
          <Detail label="Credit Line" text={art.credit_line} />
          <hr />
          <Detail label="Reference No." text={art.main_reference_number} />
          <hr />
          <Detail label="API" text={art.api_link} />
        </div>
      </div>
    </div>
  );
};

interface DetailProps {
  label: string;
  text: string | null;
}

const Detail: FC<DetailProps> = ({ label, text }) => {
  return text ? (
    <div className="flex flex-col space-y-2 py-4 text-lg sm:flex-row sm:items-center sm:space-x-10 sm:space-y-0">
      <p className="grow font-medium">{label}</p>
      <p className="break-all text-art-gray-extra-light sm:text-right">
        {text}
      </p>
    </div>
  ) : null;
};

export default ArtWorkPage;
