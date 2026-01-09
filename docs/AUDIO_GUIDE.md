# Audio Processing Guide

## Supported Formats (MVP)

| Property | Supported |
|----------|-----------|
| Format | .wav only |
| Sample Rate | 44.1kHz or 48kHz |
| Channels | Mono or stereo |
| Max File Size | 50MB |

## Web Audio API Basics

### AudioContext

The `AudioContext` is the main entry point for all Web Audio operations. We use a singleton pattern:

```js
// src/utils/audioContext.js
let audioContext = null

export function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}
```

### Loading Audio Files

```js
const file = e.target.files[0]
const arrayBuffer = await file.arrayBuffer()
const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
```

### OfflineAudioContext for Processing

Use `OfflineAudioContext` for non-realtime rendering:

```js
const offlineCtx = new OfflineAudioContext(
  numChannels,
  lengthInSamples,
  sampleRate
)

// Build audio graph...
source.start(0)
const renderedBuffer = await offlineCtx.startRendering()
```

## Current Effects

### Time Stretch

Slows down audio without changing pitch (simple method using playbackRate):

```js
source.playbackRate.value = 1 / stretchAmount  // 2 = half speed
```

### Attack Envelope

Fade-in effect for pad-like sound:

```js
const envelope = ctx.createGain()
envelope.gain.setValueAtTime(0, 0)
envelope.gain.linearRampToValueAtTime(1, attackTime)
```

### Lowpass Filter (Warmth)

Removes high frequencies for warmer sound:

```js
const filter = ctx.createBiquadFilter()
filter.type = 'lowpass'
filter.frequency.value = 8000 - (warmth * 7500)  // 500-8000 Hz
filter.Q.value = 0.7
```

### Reverb (Convolver)

Synthetic impulse response reverb:

```js
const convolver = ctx.createConvolver()
const impulse = ctx.createBuffer(2, sampleRate * 3, sampleRate)
// Fill with decaying noise...
convolver.buffer = impulse
```

## Audio Graph Structure

```
source
  → envelope (GainNode)
    → filter (BiquadFilter)
      → dryGain ──────────────→ destination
      → convolver → wetGain ──→ destination
```

## WAV Export

WAV files have a 44-byte header followed by raw PCM data:

```
Bytes 0-3:   "RIFF"
Bytes 4-7:   File size - 8
Bytes 8-11:  "WAVE"
Bytes 12-15: "fmt "
... (format chunk)
Bytes 36-39: "data"
Bytes 40-43: Data size
Bytes 44+:   Audio samples (16-bit PCM)
```

See `src/utils/wavExport.js` for implementation.

## Best Practices

### Always handle errors

```js
try {
  const buffer = await ctx.decodeAudioData(arrayBuffer)
} catch (err) {
  console.error('Failed to decode audio:', err)
}
```

### Clean up audio resources

```js
source.stop()
source.disconnect()
```

### Check browser compatibility

```js
const AudioContext = window.AudioContext || window.webkitAudioContext
if (!AudioContext) {
  // Show error to user
}
```

## Debugging Tips

1. **Check browser console** for errors
2. **Verify file format** - must be valid .wav
3. **Use Web Audio Inspector** - Chrome DevTools extension
4. **Log buffer properties**:
   ```js
   console.log({
     duration: buffer.duration,
     sampleRate: buffer.sampleRate,
     channels: buffer.numberOfChannels,
     length: buffer.length
   })
   ```

## Resources

- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Audio API Specification](https://www.w3.org/TR/webaudio/)
