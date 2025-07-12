"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DeleteIcon, EditIcon } from "lucide-react";
import { CreateUserDialog } from "./_components/create-user-dialog";
import { EditUserDialog } from "./_components/edit-user-dialog";
import { XlsxUserUploader } from "@/app/users/_components/xlsx-user-uploader";
import { usersApi } from "@/domain/user/users-service";
import { UserParams, UserFormParams } from "@/domain/user/users-interface";
import { DATE_FORMAT, DateHelper } from "@/intrastructure/date";
import { toast } from "sonner";
import { useGlobalLoader } from "@/components/loader/global-loader-provider";


export default function Page() {
  const globalLoader = useGlobalLoader()

  const [users, setUsers] = useState<UserParams[]>([]);

  const [createUserDialog, setCreateUserDialog] = useState(false);
  const [updateUserDialog, setUpdateUserDialog] = useState(false);

  const [userToEdit, setUserToEdit] = useState<UserParams>({ id: 0, name: "", email: '', created_at: new Date })

  useEffect(() => {
    resetUsers();
  }, [])

  const resetUsers = async () => {
    const users = await usersApi.getAllUsers();

    setUsers(users);
  }

  const onClickEdit = (user: UserParams) => {
    setUserToEdit(user);

    setUpdateUserDialog(true)
  }

  const onClickDelete = async (user: UserParams) => {
    if (confirm(`Are you really want to delete ${user.name} user?`)) {
      globalLoader.callback(async () => {
        await usersApi.deteleUser(user.id);
        await resetUsers();

        toast.info('User deleted successfully');
      })
    }
  }

  const onUserCreate = async (data: UserFormParams) => {
    globalLoader.callback(async () => {
      try {
        await usersApi.createUser(data);
        await resetUsers();

        setCreateUserDialog(false)
        toast.success("User created successfully")

      } catch (e) {
        console.log(e);
        toast.error("Something went wrong")
      }
    })
  }

  const onUserUpdate = async (data: UserParams) => {
    globalLoader.callback(async () => {
      try {
        await usersApi.updateUser(data.id, data);
        await resetUsers();

        setUpdateUserDialog(false)
        toast.success("User updated successfully")
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong")
      }
    })
  }

  const onXlsxUsersParsed = async (data: UserFormParams[]) => {
    globalLoader.callback(async () => {
      try {
        await usersApi.createUsers(data);
        await resetUsers();
        toast.success("Users were created successfully");
      } catch (e) {
        console.log(e)
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card className="m-8 p-4">
      <div className="flex justify-end gap-4">
        <Button onClick={() => setCreateUserDialog(true)}>Create Item</Button>

        <XlsxUserUploader onUsersParsed={onXlsxUsersParsed}>
          <Button variant="outline">Upload XLSX</Button>
        </XlsxUserUploader>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((_user) =>
            <TableRow key={_user.id}>
              <TableCell className="font-medium">#{_user.id}</TableCell>
              <TableCell>{_user.name}</TableCell>
              <TableCell>{_user.email}</TableCell>
              <TableCell className="text-right">{DateHelper.instance().toString(_user.created_at, DATE_FORMAT)}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">
                  <EditIcon className="cursor-pointer" color="blue" onClick={() => onClickEdit(_user)} />
                  <DeleteIcon className="cursor-pointer" color="red" onClick={() => onClickDelete(_user)} />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CreateUserDialog open={createUserDialog} setOpen={setCreateUserDialog} onSave={onUserCreate} />
      <EditUserDialog open={updateUserDialog} user={userToEdit} setOpen={setUpdateUserDialog} onSave={onUserUpdate} key={updateUserDialog + ""} />
    </Card>
  )
}
