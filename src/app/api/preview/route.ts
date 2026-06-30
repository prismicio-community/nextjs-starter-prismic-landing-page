import { redirectToPreviewURL } from "@prismicio/next";
import { NextRequest } from "next/server";

import { client } from "@/prismicio";

export async function GET(request: NextRequest) {
  return await redirectToPreviewURL({ client, request });
}
