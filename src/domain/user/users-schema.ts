import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

export const userSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    email: z.string().email('Invalid email'),
    created_at: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format YYYY-MM-DD')
        .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid date',
        })
});

export const userZodResolver = () => zodResolver(userSchema)

export type UserFormData = z.infer<typeof userSchema>;
