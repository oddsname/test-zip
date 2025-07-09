import React from "react"

export const ErrorMessage = ({ children }: { children?: React.ReactNode }) => {

    return (
        <p className="text-xs text-red-700">{children}</p>
    )
}