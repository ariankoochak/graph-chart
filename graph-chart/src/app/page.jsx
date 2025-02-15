'use client'

import GetCsv from '@/components/GetCsv/GetCsv'
import React from 'react'

export default function MainPage() {
  
  return (
    <section>
      <div className="csv-management-container">
        <GetCsv onGetCsv={(csv)=>{
          console.log(csv);
        }}/>
      </div>
      <div className="graph-chart-container"></div>
      <div className="node-details"></div>
    </section>
  )
}
