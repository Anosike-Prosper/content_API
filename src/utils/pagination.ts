export function getPagination(query: { limit?: string; page?: string }) {

  const limit = parseInt(query.limit || "10", 3);
  const page = parseInt(query.page || "1", 10);
  const offset = (page - 1) * limit;

  return { limit, page, offset };
}
