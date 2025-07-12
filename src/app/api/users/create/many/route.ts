import { UserFormParams } from "@/domain/user/users-interface";
import { prisma } from "@/intrastructure/prisma";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const users = data.map((item: UserFormParams) => ({
            ...item,
            created_at: new Date(item.created_at)
        }))

        await prisma.user.createMany({
            data: users
        })

        return Response.json({
            data: { message: "Success" },
        });
    } catch (e) {
        console.log(e);
        return new Response((e as Error).message, {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}