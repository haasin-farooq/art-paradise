"use client";

import { ArtworksGrid } from "@/components/ArtworksGrid";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserData } from "@/utils/apis";
import { Art } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { currentUser } = useAuth();

  const [claimedArtworks, setClaimedArtworks] = useState<Art[]>([]);

  const getData = async () => {
    if (currentUser) {
      try {
        const res = await fetchUserData(currentUser);
        const jsonRes = await res.json();
        setClaimedArtworks(jsonRes.data[0].art_works_claimed);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return currentUser ? (
    <>
      <div className="mb-10 flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <h1 className="text-3xl font-medium">Claimed Artworks</h1>
        <Link href="/search">
          <Button label="Search Art" />
        </Link>
      </div>
      {claimedArtworks.length > 0 ? (
        <ArtworksGrid artworks={claimedArtworks} onUnclaim={getData} />
      ) : (
        <p className="text-art-gray-light">You have no claimed artworks yet.</p>
      )}
    </>
  ) : null;
};

export default DashboardPage;
