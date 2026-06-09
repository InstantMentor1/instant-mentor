import { handleSessionAction } from "@/lib/session-operations";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const body = await request.json();
  const forwarded = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify(body),
  });
  return handleSessionAction(forwarded, String(body.action ?? ""), (await context.params).id);
}
