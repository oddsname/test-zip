"use client"

import { DateFnsHelper, DateHelper } from "@/lib/date";
import { HttpRequest, FetchHttpRequest } from "@/lib/http";

//@ts-ignore
if (!globalThis.client_providers_registered) {
    HttpRequest.register(new FetchHttpRequest());
    DateHelper.register(new DateFnsHelper());

    //@ts-ignore
    globalThis.client_providers_registered = true;
}