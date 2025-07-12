import React, { useRef } from "react"
import { UserFormParams } from "@/domain/user/users-interface";
import { ExcelHelper } from "@/intrastructure/excel";
import { toast } from "sonner";
import { userSchema } from "@/domain/user/users-schema";

interface FileUploaderProps {
    children: React.ReactNode,
    onUsersParsed: (users: UserFormParams[]) => void,
}

export const XlsxUserUploader = ({ children, onUsersParsed, }: FileUploaderProps) => {
    const fileRef = useRef<HTMLInputElement | null>(null);

    const onClick = () => {
        if (fileRef && fileRef.current) {
            fileRef.current.click();
        }
    }

    const onFileUpload = async () => {
        const file = fileRef.current?.files?.[0];

        if (file) {
            try {
                const excelValues: String[][] = await ExcelHelper.instance().parseToValues(await file.arrayBuffer())

                const dataWithoutHeaders = excelValues.filter((_, key) => key > 0).map((_item) => {
                    const user = {
                        name: _item[0][2],
                        email: _item[0][3],
                        created_at: _item[0][4],
                    };

                    const result = userSchema.safeParse(user)

                    if (!result.success) {
                        console.log(user);
                        //if at least single element doesn't satisfy validation throw an error to stop loading
                        throw new Error("Invalid item" + user);
                    }

                    return {
                        name: _item[0][2],
                        email: _item[0][3],
                        created_at: _item[0][4],
                    }
                })

                onUsersParsed(dataWithoutHeaders as unknown as UserFormParams[])
            } catch (e) {
                console.log(e)
                toast.error("Invalid xlxs table format");
            }
        }
    }

    return (
        <div onClick={onClick}>
            <input type="file" className="hidden" accept='.xlsx' ref={fileRef} onChange={onFileUpload} />
            {children}
        </div>
    )
}