'use client';

import { ColumnDef } from '@tanstack/react-table';
import { StatisticsCard } from '@zchemacraft/components/core/statistics-card';
import { UsersTable } from '@zchemacraft/components/core/tables/users-table';
import { useGetDashboardOverview } from '@zchemacraft/hooks/queries';
import { User } from '@zchemacraft/types';
import Image from 'next/image';

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardOverview();
  console.log(data);

  return (
    <main className="px-4 flex flex-col gap-8 md:px-8">
      <StatisticsCard title="Total Users" value={data?.totalUsers ?? '0'} />

      {!isLoading ? <UsersTable columns={columns} data={data?.users ?? []} /> : <p>Loading...</p>}
    </main>
  );
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'profilePicture',
    header: 'Profile Picture',
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Image
          src={row.original.profilePicture || '/default-profile.png'}
          alt="Profile Picture"
          width={50}
          height={50}
          className="size-10 rounded-full"
        />

        <div className="space-y-2">
          <h6>{row.original.name}</h6>
          <p>{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'lastSignedIn',
    header: 'Last Login',
  },
];
