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
import { format } from 'date-fns';
import { z } from 'zod';
import { DATE_FORMAT } from "@/lib/date"

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

interface UserProps {
  name: string,
  email: string,
  created_at: Date,
  id: number,
}

export function EditUserDialog({ user, children }: { user: UserProps, children: React.ReactNode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      created_at: user.created_at instanceof Date ? format(user.created_at, DATE_FORMAT) : '',
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Submitted:', data);
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
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
              <p className="text-red-700">{errors.name || ''}</p>
            </div>

            <div className="grid gap-3">
              <Label>Email</Label>
              <Input {...register('email')} />
              <p className="text-red-700">{errors.name || ''}</p>
            </div>

            <div className="grid gap-3">
              <Label>Created At</Label>
              <Input {...register('created_at')} />
              <p className="text-red-700">{errors.name || ''}</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
