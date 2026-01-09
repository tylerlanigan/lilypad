# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LilyPad is a minimalist web app that transforms audio files into ambient pad sounds. Users can upload .wav files, process them with reverb and time-stretching, and export the result.

## Build Commands

```bash
npm install    # Install dependencies
npm run dev    # Start development server (http://localhost:5173)
npm run build  # Production build
npm run preview # Preview production build
```

## Architecture

**Tech Stack**: React 19 + Vite 7 + Web Audio API

**Folder Structure**:
```
src/
├── components/    # React components
│   └── Waveform.jsx
├── utils/         # Audio processing logic
│   ├── audioContext.js   # Shared AudioContext singleton
│   ├── audioProcessor.js # Pad processing (stretch, reverb, envelope)
│   └── wavExport.js      # WAV file encoding and download
├── styles/        # CSS files
│   └── App.css
├── App.jsx        # Main app component
└── main.jsx       # Entry point
```

**Audio Processing Pipeline**:
Source → Attack Envelope → Lowpass Filter → Reverb (Convolver) → Output
