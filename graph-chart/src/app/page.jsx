'use client'

import Chart from '@/components/Chart/Chart';
import GetCsv from '@/components/GetCsv/GetCsv'
import React, { useState } from 'react'

export default function MainPage() {

  const [csv,setCsv] = useState([]);
  const handlePrepareCsv = (csv)=>{
    setCsv(csv);
  }

  return (
    <section>
      <div className="csv-management-container">
        <GetCsv onGetCsv={handlePrepareCsv}/>
      </div>
      <div className="graph-chart-container">
        <Chart csv={csv}/>
      </div>
      <div className="node-details"></div>
    </section>
  )
}
