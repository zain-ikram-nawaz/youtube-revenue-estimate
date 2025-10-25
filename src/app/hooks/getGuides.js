export async function getGuides() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guide?page=1&limit=1`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}
