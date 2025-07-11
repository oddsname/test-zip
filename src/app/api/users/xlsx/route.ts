import { ExcelHelper } from "@/lib/excel";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return Response.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        
        console.log(ExcelHelper.instance().parseToValues(arrayBuffer));

        return Response.json({ message: 'File uploaded successfully', fileName: file.name });
    } catch (e) {
        console.log(e);
        return new Response((e as Error).message, {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}