# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LilyPad is a minimalist web app that transforms audio files into ambient pad sounds. Users can upload .wav files, process them with reverb and time-stretching, and export the result.

**Philosophy**: Keep it minimal, speed to market over perfection, make it easy and intuitive.

## Quick Start

```bash
npm install
npm run dev    # http://localhost:5173
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build |
| `npm run lint` | Check ESLint issues |
| `npm run format` | Format with Prettier |

## Project Structure

```
src/
├── components/    # React components (Logo, Waveform)
├── utils/         # Audio processing logic
├── styles/        # CSS files
├── App.jsx        # Main app component
└── main.jsx       # Entry point
```

## Documentation

- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) - Workflows, commands, git practices
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical decisions, project structure
- [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) - Code standards, React patterns
- [docs/AUDIO_GUIDE.md](docs/AUDIO_GUIDE.md) - Web Audio API, effects, WAV export

## Key Patterns

- **React**: Functional components + hooks only, no classes
- **Audio**: Use `OfflineAudioContext` for processing, singleton `AudioContext`
- **State**: Simple `useState` hooks in App.jsx
- **Styling**: CSS variables for theming (`--zen-green`, `--cream`)

## Audio Pipeline

```
Source → Attack Envelope → Lowpass Filter → Reverb → Output
```

## Before Committing

```bash
npm run lint
npm run format
```
