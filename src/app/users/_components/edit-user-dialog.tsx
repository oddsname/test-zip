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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ErrorMessage } from "@/components/ui/error-message"
import { UserParams } from "@/interfaces/users"
import { DATE_FORMAT, DateHelper } from "@/lib/date"

const schema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email'),
  created_at: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format YYYY-MM-DD')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date',
    })
});

type FormData = z.infer<typeof schema>;

interface EditUserDialogProps {
  user: UserParams,
  open: boolean,
  setOpen: (val: boolean) => void,
  onSave: (data: UserParams) => void
}

export function EditUserDialog({ open, user, setOpen, onSave }: EditUserDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...user,
      created_at: DateHelper.instance().toString(user.created_at, DATE_FORMAT)
    }
  });

  const onSubmit = (data: FormData) => {
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
