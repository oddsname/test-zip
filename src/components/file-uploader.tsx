import React, { useRef } from "react"

interface FileUploaderProps { children: React.ReactNode }

export const FileUploader = ({ children }: FileUploaderProps) => {
    const fileRef = useRef<HTMLInputElement | null>(null);

    const onClick = () => {
        if (fileRef && fileRef.current) {
            fileRef.current.click();
        }
    }

    const onFileUpload = () => {
        const file = fileRef.current?.files?.[0];

        if (file) {
            const fd = new FormData();

            fd.append('file', file);
        }
    }

    return (
        <div onClick={onClick}>
            <input type="file" className="hidden" accept=".xlsx" onChange={onFileUpload} ref={fileRef} />
            {children}
        </div>
    )
}