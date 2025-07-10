import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params

        const { name, email, created_at } = await request.json();

        const user = await prisma.user.update({
            where: { id: Number(id) },
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