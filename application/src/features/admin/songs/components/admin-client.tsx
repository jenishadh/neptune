'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Icons } from '@/components/icons'
import { Header } from '@/components/header'

import { columns } from '@/features/admin/songs/table/columns'
import { DataTable } from '@/features/admin/songs/table/data-table'
import { SongClientProps } from '@/features/admin/songs/schemas'

export function AdminClient({ data }: SongClientProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <Header
        title="Songs"
        description="All the songs supported by the system."
        icon={Icons.music}
      >
        <Button onClick={() => router.push('/admin/songs/add')}>
          <Icons.plus />
          Add New
        </Button>
      </Header>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </div>
  )
}
