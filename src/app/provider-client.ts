"use client"

import { DateFnsHelper, DateHelper } from "@/intrastructure/date";
import { ExcelHelper, ExcelJsHelper } from "@/intrastructure/excel";
import { HttpRequest, FetchHttpRequest } from "@/intrastructure/http";

//@ts-ignore
if (!globalThis.client_providers_registered) {

    HttpRequest.register(new FetchHttpRequest());
    DateHelper.register(new DateFnsHelper());
    ExcelHelper.register(new ExcelJsHelper())

    //@ts-ignore
    globalThis.client_providers_registered = true;
}