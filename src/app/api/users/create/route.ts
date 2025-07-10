import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { name, email, created_at } = await request.json();

        const user = await prisma.user.create({
            data: {
                name,
                email,
                created_at
            }
        })

        return Response.json({
            data: { ...user },
        });
    } catch (e) {
        console.log(e);
        return new Response((e as Error).message, {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}