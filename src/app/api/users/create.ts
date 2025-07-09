import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    try {
        const { name, email, created_at } = await request.json();

        await prisma.user.create({
            data: {
                name,
                email,
                created_at
            }
        })

        return Response.json({
            success: true,
            data: { name, },
        });
    } catch (e: unknown) {
        return new Response((e as Error).message, {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}