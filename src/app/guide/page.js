import React from 'react'
import ListingGuide from "../components/AdminUseOnly/ListingGuide/page"

async function getGuides() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guide`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function page() {
  const { guides } = await getGuides();
  return (
    <div>
        <ListingGuide data={guides} />
    </div>
  )
}
