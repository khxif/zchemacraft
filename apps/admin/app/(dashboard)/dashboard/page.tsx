'use client';

import { ColumnDef } from '@tanstack/react-table';
import { StatisticsCard } from '@zchemacraft/components/core/statistics-card';
import { UsersTable } from '@zchemacraft/components/core/tables/users-table';
import { useGetDashboardOverview } from '@zchemacraft/hooks/queries';
import { User } from '@zchemacraft/types';
import { FlagTriangleLeftIcon, SignpostIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardOverview();

  return (
    <main className="px-4 flex flex-col gap-8 md:px-8">
      <section>
        <StatisticsCard title="Total Users" value={data?.totalUsers ?? '0'} />
      </section>

      <UsersTable columns={columns} data={data?.users ?? []} isLoading={isLoading} />
    </main>
  );
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'profilePicture',
    header: () => (
      <span className="flex items-center space-x-2 py-4 font-medium">
        <UserIcon className="size-4" />
        <p>User</p>
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Image
          src={row.original.profilePicture || '/default-profile.png'}
          alt="Profile Picture"
          width={50}
          height={50}
          className="size-10 rounded-full"
        />

        <div className="space-y-1">
          <h6>{row.original.name}</h6>
          <p>{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'lastSignedIn',
    header: () => (
      <span className="flex items-center space-x-2 py-4 font-medium">
        <SignpostIcon className="size-4" />
        <p>Last Login</p>
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-primary font-medium space-x-2 flex">
        <p> {new Date(row.original.lastSignedIn).toLocaleDateString()}</p>
        <p>{new Date(row.original.lastSignedIn).toLocaleTimeString()}</p>
      </span>
    ),
  },
  {
    accessorKey: 'endpointsLeft',
    header: () => (
      <span className="flex space-x-1.5 py-4 font-medium items-center justify-center">
        <FlagTriangleLeftIcon className="size-4" />
        <p>Endpoints Left</p>
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-primary font-medium flex items-center justify-center">
        {row.original.endpointsLeft}
      </span>
    ),
  },
];
