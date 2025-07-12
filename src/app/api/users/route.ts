import { ExcelHelper } from "@/intrastructure/excel";
import { prisma } from "@/intrastructure/prisma";

export async function GET(request: Request) {
    try {
        const users = await prisma.user.findMany();

        return Response.json({
            data: users,
        });
    } catch (e) {
        console.log(e);
        return new Response((e as Error).message, {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}