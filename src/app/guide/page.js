import React from 'react'
import ListingGuide from "../components/AdminUseOnly/ListingGuide/page"
import { getGuides } from '../hooks/getGuides';


export default async function page() {
  const { guides } = await getGuides();
  return (
    <div>
        <ListingGuide data={guides} />
    </div>
  )
}
