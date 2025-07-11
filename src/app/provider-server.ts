"use server"

import { ExcelHelper, ExcelJsHelper } from "@/lib/excel";

//@ts-ignore
if (!globalThis.server_providers_registered) {
  ExcelHelper.register(new ExcelJsHelper())

  //@ts-ignore
  globalThis.server_providers_registered = true;
}