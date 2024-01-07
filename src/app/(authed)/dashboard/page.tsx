"use client";

import { ArtWorksGrid } from "@/components/ArtWorksGrid";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserData } from "@/utils/apis";
import { Art } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [claimedArtWorks, setClaimedArtWorks] = useState<Art[]>([]);

  const getData = async () => {
    if (currentUser) {
      const res = await fetchUserData(currentUser);
      const jsonRes = await res.json();
      setClaimedArtWorks(jsonRes.data[0].art_works_claimed);
    }
  };

  useEffect(() => {
    getData();
  }, [currentUser, router]);

  return currentUser ? (
    <>
      <div className="mb-10 flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <h1 className="text-3xl font-medium">Claimed Artworks</h1>
        <Button label="Search Art" onClick={() => router.push("/search")} />
      </div>
      {claimedArtWorks.length > 0 ? (
        <ArtWorksGrid artworks={claimedArtWorks} claimed onUnclaim={getData} />
      ) : (
        <p className="text-art-gray-light">You have no claimed artworks yet.</p>
      )}
    </>
  ) : null;
};

export default DashboardPage;
