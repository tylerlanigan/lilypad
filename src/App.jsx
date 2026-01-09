import { useState, useRef } from 'react'
import Logo from './components/Logo'
import Waveform from './components/Waveform'
import { getAudioContext } from './utils/audioContext'
import { processAudio } from './utils/audioProcessor'
import { downloadWav } from './utils/wavExport'

function App() {
  const [audioFile, setAudioFile] = useState(null)
  const [originalBuffer, setOriginalBuffer] = useState(null)
  const [processedBuffer, setProcessedBuffer] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const [attack, setAttack] = useState(0.5)
  const [stretch, setStretch] = useState(2)
  const [reverb, setReverb] = useState(0.5)
  const [warmth, setWarmth] = useState(0.5)

  const currentSourceRef = useRef(null)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    stopPlayback()
    setAudioFile(file)
    setProcessedBuffer(null)

    const arrayBuffer = await file.arrayBuffer()
    const ctx = getAudioContext()
    const decoded = await ctx.decodeAudioData(arrayBuffer)
    setOriginalBuffer(decoded)
  }

  const stopPlayback = () => {
    if (currentSourceRef.current) {
      currentSourceRef.current.stop()
      currentSourceRef.current = null
    }
    setIsPlaying(false)
  }

  const playBuffer = (buffer) => {
    if (!buffer) return

    stopPlayback()
    const ctx = getAudioContext()
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.connect(ctx.destination)
    source.onended = () => setIsPlaying(false)
    source.start(0)
    currentSourceRef.current = source
    setIsPlaying(true)
  }

  const handleProcess = async () => {
    if (!originalBuffer) return

    setIsProcessing(true)
    stopPlayback()

    const result = await processAudio(originalBuffer, { attack, stretch, reverb, warmth })
    setProcessedBuffer(result)
    setIsProcessing(false)
  }

  const handleExport = () => {
    if (!processedBuffer) return
    downloadWav(processedBuffer, `lilypad-${audioFile?.name || 'export'}.wav`)
  }

  return (
    <div className="app">
      <div className="logo">
        <Logo size={72} />
      </div>
      <h1>lilypad</h1>
      <p className="subtitle">transform sound into stillness</p>

      <div className="upload-section">
        <input type="file" accept=".wav,audio/wav" onChange={handleFileUpload} id="file-input" />
        <label htmlFor="file-input" className="upload-button">
          {audioFile ? audioFile.name : 'select audio'}
        </label>
      </div>

      {originalBuffer && (
        <>
          <div className="waveforms">
            <Waveform buffer={originalBuffer} color="#4a7c59" label="Original" />
            {processedBuffer && (
              <Waveform buffer={processedBuffer} color="#3d6b4a" label="Processed" />
            )}
          </div>

          <div className="preview-buttons">
            <button
              onClick={() => (isPlaying ? stopPlayback() : playBuffer(originalBuffer))}
              className="preview-btn"
            >
              {isPlaying && !processedBuffer ? '⏹ Stop' : '▶ Original'}
            </button>
            {processedBuffer && (
              <button
                onClick={() => (isPlaying ? stopPlayback() : playBuffer(processedBuffer))}
                className="preview-btn"
              >
                {isPlaying ? '⏹ Stop' : '▶ Processed'}
              </button>
            )}
          </div>

          <div className="controls">
            <div className="knobs">
              <div className="knob">
                <label>Attack</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={attack}
                  onChange={(e) => setAttack(parseFloat(e.target.value))}
                />
                <span>{attack.toFixed(1)}s</span>
              </div>

              <div className="knob">
                <label>Stretch</label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={stretch}
                  onChange={(e) => setStretch(parseFloat(e.target.value))}
                />
                <span>{stretch}x</span>
              </div>

              <div className="knob">
                <label>Reverb</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={reverb}
                  onChange={(e) => setReverb(parseFloat(e.target.value))}
                />
                <span>{Math.round(reverb * 100)}%</span>
              </div>

              <div className="knob">
                <label>Warmth</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={warmth}
                  onChange={(e) => setWarmth(parseFloat(e.target.value))}
                />
                <span>{Math.round(warmth * 100)}%</span>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={handleProcess} disabled={isProcessing} className="process-btn">
                {isProcessing ? 'Processing...' : 'Process'}
              </button>
              <button onClick={handleExport} disabled={!processedBuffer} className="export-btn">
                Export .wav
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
