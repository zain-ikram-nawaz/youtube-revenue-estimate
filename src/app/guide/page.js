import React from 'react'
import Guide from '../components/Guide/page'
import Data from '../../data/data.json'

export default function page() {
  return (
    <div>
      <Guide data={Data} />
    </div>
  )
}
