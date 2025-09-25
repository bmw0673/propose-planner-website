"use client"

import React from "react"

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export default function LoadingSpinner({ size = 32, className }: LoadingSpinnerProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth: Math.max(2, Math.floor(size / 12)),
  }
  return (
    <div className={`inline-block rounded-full border-neutral-300 border-t-primary animate-spin ${className || ""}`} style={style} />
  )
}


