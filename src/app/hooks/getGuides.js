export async function getGuides(page = 1, limit = 6) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/guide?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
 const data = await res.json();
  // console.log("API response:", data); // 👈 Add this line for testing
  return data;
}
