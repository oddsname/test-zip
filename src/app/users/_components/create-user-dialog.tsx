"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@/components/ui/error-message"
import { UserFormParams } from "@/domain/user/users-interface"
import { UserFormData, userZodResolver } from "@/domain/user/users-schema"

interface CreateUserDialogProps { open: boolean, setOpen: (val: boolean) => void, onSave: (data: UserFormParams) => void }

export function CreateUserDialog({ open, setOpen, onSave }: CreateUserDialogProps) {
  const { register, handleSubmit, reset, formState: { errors, } } = useForm<UserFormData>({
    resolver: userZodResolver(),
    defaultValues: { email: '', name: '', created_at: '', }
  });

  const onSubmit = (data: UserFormData) => {
    const userParams: UserFormParams = { ...data, created_at: new Date(data.created_at) }

    reset();
    onSave(userParams);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Item</DialogTitle>
          <DialogDescription>
            Fill in the details for a new item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Name</Label>
            <Input {...register('name')} defaultValue="" />
            <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          </div>

          <div className="grid gap-3">
            <Label>Email</Label>
            <Input {...register('email')} defaultValue="" />
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </div>

          <div className="grid gap-3">
            <Label>Created At</Label>
            <Input {...register('created_at')} defaultValue="" />
            <ErrorMessage>{errors?.created_at?.message}</ErrorMessage>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Save changes</Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
