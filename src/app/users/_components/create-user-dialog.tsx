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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ErrorMessage } from "@/components/ui/error-message"
import { toast } from "sonner"

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

interface CreateUserDialogProps { open: boolean }

export function CreateUserDialog({ open }: CreateUserDialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    toast.info('New user created successfully');
  };

  return (
    <Dialog open={open}>
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
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
