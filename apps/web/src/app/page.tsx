"use client";
import { useEffect, useState } from "react";
import { User } from "database";
import { UserCard } from "@/components/cards/user-card";
import { LoadingSpinner } from "@/components/buttons/FilledButton";

export type UserWithTransactionCounts = User & {
  _count: {
    sentTransactions: number;
    receivedTransactions: number;
  };
};

export default function Page(): JSX.Element {
  const [profiles, setProfiles] = useState<UserWithTransactionCounts[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("/api/user/get");
        const profiles = await res.json();
        setProfiles(profiles);
        console.log(profiles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <main>
      <h1>Welcome to the Registry</h1>
      <div className='flex w-full gap-6 pt-9'>
        {profiles.length > 0 ? (
          profiles.map((profile) => {
            return <UserCard profile={profile} />;
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </main>
  );
}
