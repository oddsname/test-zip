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
import { DATE_FORMAT, DateHelper } from "@/intrastructure/date"
import { UserParams } from "@/domain/user/users-interface"
import { UserFormData, userZodResolver } from "@/domain/user/users-schema"

interface EditUserDialogProps {
  user: UserParams,
  open: boolean,
  setOpen: (val: boolean) => void,
  onSave: (data: UserParams) => void
}

export function EditUserDialog({ open, user, setOpen, onSave }: EditUserDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: userZodResolver(),
    defaultValues: {
      ...user,
      created_at: DateHelper.instance()?.toString(user.created_at, DATE_FORMAT)
    }
  });

  const onSubmit = (data: UserFormData) => {
    const userParams: UserParams = {
      ...data,
      created_at: new Date(data.created_at),
      id: user.id
    }

    onSave(userParams);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Update the item details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Name</Label>
            <Input {...register('name')} />
            <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          </div>

          <div className="grid gap-3">
            <Label>Email</Label>
            <Input {...register('email')} />
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </div>

          <div className="grid gap-3">
            <Label>Created At</Label>
            <Input {...register('created_at')} />
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
