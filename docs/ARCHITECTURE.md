# Architecture

## Overview

LilyPad is a minimalist web app that transforms audio samples (vocals, guitar, etc.) into ambient pad sounds. Users upload .wav files, adjust simple controls, and export processed audio.

## Philosophy

- Keep it minimal and focused
- Speed to market over perfection
- Test manually, no automated tests yet
- Make it easy and intuitive

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI Framework | React 19 |
| Build Tool | Vite 7 |
| Audio Processing | Web Audio API |
| Styling | CSS with CSS Variables |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |

**No backend** - client-side only for MVP. User audio never leaves their device.

## Project Structure

```
src/
├── components/          # React components (one per file)
│   ├── Logo.jsx         # SVG lilypad logo
│   └── Waveform.jsx     # Canvas-based waveform display
├── utils/               # Audio processing, helpers
│   ├── audioContext.js  # Singleton AudioContext
│   ├── audioProcessor.js # Audio effects pipeline
│   └── wavExport.js     # WAV encoding
├── styles/              # CSS files
│   └── App.css          # Main stylesheet
├── App.jsx              # Main app, state management
└── main.jsx             # Entry point
```

## Key Design Decisions

### Client-Side Only
All processing happens in the browser:
- No backend infrastructure needed
- User audio never leaves their device (privacy)
- Works offline after initial load

### OfflineAudioContext for Processing
We use `OfflineAudioContext` instead of realtime `AudioContext`:
- Processes faster than realtime
- Doesn't block the audio thread
- Produces consistent results

### Singleton AudioContext
Single shared `AudioContext` instance because:
- Browsers limit concurrent contexts
- Reusing contexts is more efficient
- Avoids "AudioContext was not started" errors

### CSS Variables for Theming
Color palette defined in `:root`:
```css
--zen-green: #4a7c59;
--cream: #f8f6f2;
```

## Audio Processing Pipeline

```
Input Buffer
    ↓
BufferSource (playbackRate for time-stretch)
    ↓
GainNode (attack envelope)
    ↓
BiquadFilter (lowpass for warmth)
    ↓
┌───────────────────┐
│  Dry/Wet Split    │
├─────────┬─────────┤
│ DryGain │ Convolver (reverb)
│         │    ↓
│         │ WetGain
└────┬────┴────┬────┘
     ↓         ↓
   Destination (mixed)
```

## State Management

Simple React `useState` hooks in `App.jsx`:
- `originalBuffer` - Decoded input audio
- `processedBuffer` - Rendered output audio
- `attack`, `stretch`, `reverb`, `warmth` - Effect parameters

No external state library needed at current scale.

## Future Ideas (Not Now)

- Multiple pad slots/layers
- MIDI keyboard support
- VST plugin version
- Preset system
- More audio formats
- Real-time processing
- User accounts/cloud saves
