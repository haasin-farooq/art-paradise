"use client";

import { Back } from "@/components/Back";
import { Button, ButtonWidth } from "@/components/Button";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { claimArt, fetchUserData, unclaimArt } from "@/utils/apis";
import { Art, ArtDetail } from "@/utils/types";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

const getArtData = async (id: number) => {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch artwork data");
  }
  return res.json();
};

const getUserData = async (username: string) => {
  const res = await fetchUserData(username);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

interface ArtworkPageProps {
  params: { id: number };
}

const ArtworkPage: FC<ArtworkPageProps> = ({ params }) => {
  const { currentUser } = useAuth();

  const [art, setArt] = useState<ArtDetail | null>(null);
  const [claimedArtworkIds, setClaimedArtworkIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArtData = async () => {
    try {
      const artData = await getArtData(params.id);
      setArt(artData.data);
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchUserData = async () => {
    if (currentUser) {
      try {
        const userData = await getUserData(currentUser);
        setClaimedArtworkIds(
          userData.data[0].art_works_claimed.map((art: Art) => art.id),
        );
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const fetchFullData = async () => {
    setLoading(true);
    await fetchArtData();
    await fetchUserData();
    setLoading(false);
  };

  useEffect(() => {
    fetchFullData();
  }, []);

  const handleArtClaim = async (art: Art) => {
    if (currentUser) {
      try {
        if (isArtworkClaimed) {
          await unclaimArt(currentUser, art.id);
        } else {
          await claimArt(currentUser, {
            id: art.id,
            title: art.title,
            thumbnail: {
              lqip: art.thumbnail?.lqip,
              alt_text: art.thumbnail?.alt_text,
            },
            artist_display: art.artist_display,
          });
        }
        await fetchUserData();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const imageUrl = `https://www.artic.edu/iiif/2/${art?.image_id}/full/843,/0/default.jpg`;
  const isArtworkClaimed = art && claimedArtworkIds.includes(art.id);

  return loading ? (
    <Loader />
  ) : art ? (
    <div className="flex flex-col space-y-10">
      <Back />
      <div className="relative w-full pb-80% sm:pb-50%">
        <Image
          src={imageUrl}
          alt={`Thumbnail of ${art.title}`}
          className="absolute left-0 top-0 h-full w-full object-contain"
          fill
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
          <Detail label="Medium" text={art.medium_display} />
          <Detail label="Dimensions" text={art.dimensions} />
          <Detail label="Credit Line" text={art.credit_line} />
          <Detail label="Reference No." text={art.main_reference_number} />
          <Detail label="API" text={art.api_link} />
          <ConfirmationDialog
            triggerButton={
              <Button
                className="mt-4"
                label={`${isArtworkClaimed ? "Unclaim" : "Claim"} Piece`}
                width={ButtonWidth.FULL}
              />
            }
            claimed={!!isArtworkClaimed}
            onConfirm={() => handleArtClaim(art)}
            loading={loading}
          />
        </div>
      </div>
    </div>
  ) : null;
};

interface DetailProps {
  label: string;
  text: string | null;
}

const Detail: FC<DetailProps> = ({ label, text }) => {
  return text ? (
    <>
      <div className="flex flex-col space-y-2 py-4 text-lg sm:flex-row sm:items-center sm:space-x-10 sm:space-y-0">
        <p className="grow font-medium">{label}</p>
        <p className="break-all text-art-gray-extra-light sm:text-right">
          {text}
        </p>
      </div>
      <hr />
    </>
  ) : null;
};

export default ArtworkPage;
