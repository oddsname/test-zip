import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ id: string }> }

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        await prisma.user.delete({
            where: { id: Number(id) }
        });

        return Response.json({
            data: { message: "Deleted" },
        });
    } catch (e) {
        console.log(e);
        return new Response((e as Error).message, {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}