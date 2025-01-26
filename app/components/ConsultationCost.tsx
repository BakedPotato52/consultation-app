"use client"

import { useState, useEffect } from "react"

export default function ConsultationCost({
  startTime,
  endTime,
  rate,
}: { startTime: Date; endTime: Date; rate: number }) {
  const [cost, setCost] = useState(0)

  useEffect(() => {
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) // duration in hours
    setCost(duration * rate)
  }, [startTime, endTime, rate])

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Consultation Cost</h3>
      <p>Start Time: {startTime.toLocaleString()}</p>
      <p>End Time: {endTime.toLocaleString()}</p>
      <p>Rate: ${rate}/hour</p>
      <p className="text-xl font-bold mt-2">Total Cost: ${cost.toFixed(2)}</p>
    </div>
  )
}

