import { useEffect, useRef } from 'react'

function Waveform({ buffer, color = '#667eea', label }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!buffer || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height

    ctx.clearRect(0, 0, width, height)

    const channelData = buffer.getChannelData(0)
    const samples = channelData.length
    const samplesPerPixel = Math.floor(samples / width)

    ctx.beginPath()
    ctx.moveTo(0, height / 2)

    for (let x = 0; x < width; x++) {
      const start = x * samplesPerPixel
      const end = start + samplesPerPixel

      let min = 0
      let max = 0

      for (let i = start; i < end && i < samples; i++) {
        const sample = channelData[i]
        if (sample < min) min = sample
        if (sample > max) max = sample
      }

      const yMin = ((1 + min) * height) / 2
      const yMax = ((1 + max) * height) / 2

      ctx.lineTo(x, yMin)
      ctx.lineTo(x, yMax)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.globalAlpha = 0.3
    ctx.fillStyle = color
    ctx.lineTo(width, height / 2)
    ctx.lineTo(0, height / 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }, [buffer, color])

  return (
    <div className="waveform-container">
      {label && <span className="waveform-label">{label}</span>}
      <canvas ref={canvasRef} className="waveform-canvas" />
    </div>
  )
}

export default Waveform
