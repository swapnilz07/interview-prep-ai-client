export function messageFromResponseData(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null || !("message" in data)) {
    return undefined;
  }
  const { message } = data as { message: unknown };
  return typeof message === "string" ? message : undefined;
}
