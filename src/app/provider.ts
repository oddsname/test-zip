"use client"

import { DateFnsHelper, DateHelper } from "@/lib/date";
import { HttpRequest, FetchHttpRequest} from "@/lib/http";

HttpRequest.register(new FetchHttpRequest());
DateHelper.register(new DateFnsHelper());