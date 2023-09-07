// Function to parse query parameters from a URL string
export default function parseQueryParameters(urlString: string): {
  id: string;
  q: string;
  fields: string;
  page: number;
  limit: number;
  items: number;
} {
  // Create a URL object from the URL string
  const url = new URL(urlString);

  // Get the query parameters using URLSearchParams
  const queryParams = new URLSearchParams(url.search);

  const id = queryParams.get("id") || "";
  const q = queryParams.get("q") || "";
  const fields = queryParams.get("fields") || "";
  const page = parseInt(queryParams.get("page") || "1", 10);
  const limit = parseInt(queryParams.get("limit") || "10", 10);
  const items = parseInt(queryParams.get("items") || "10", 10);

  // Return an object containing the extracted values
  return { id, q, fields, page, limit, items };
}
