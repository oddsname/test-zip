import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { prisma } from "@/lib/prisma"
import { format } from 'date-fns';
import { DeleteIcon, EditIcon } from "lucide-react";
import { CreateUserDialog } from "./_components/create-user-dialog";
import { EditUserDialog } from "./_components/edit-user-dialog";
import { DATE_FORMAT } from "@/lib/date";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <Card className="m-8 p-4">

      <div className="flex justify-end gap-4">
        <CreateUserDialog>
          <Button>Create Item</Button>
        </CreateUserDialog>

        <Button variant="outline">Upload XLSX</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Create At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((_user) =>
            <TableRow key={_user.id}>
              <TableCell className="font-medium">#{_user.id}</TableCell>
              <TableCell>{_user.name}</TableCell>
              <TableCell>{_user.email}</TableCell>
              <TableCell className="text-right">{_user.created_at instanceof Date ? format(_user.created_at, DATE_FORMAT) : ''}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">
                  <EditUserDialog user={_user}>
                    <EditIcon className="cursor-pointer" color="blue" />
                  </EditUserDialog>

                  <DeleteIcon className="cursor-pointer" color="red" />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
