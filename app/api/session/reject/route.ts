import { handleSessionAction } from "@/lib/session-operations";
export async function POST(request: Request) {
  return handleSessionAction(request, "reject");
}
