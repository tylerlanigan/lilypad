# LilyPad

Transform any audio into ambient pad sounds.

LilyPad is a minimalist web app that takes your audio samples—vocals, guitar, synths, anything—and turns them into lush, atmospheric pads. Upload a .wav file, tweak a few knobs, and export your creation.

## Features

- **Upload** any .wav file (vocals, instruments, samples)
- **Time Stretch** — slow down audio without changing pitch
- **Attack** — add a slow fade-in for that classic pad feel
- **Reverb** — spacious, dreamy reverb
- **Warmth** — lowpass filter for softer tones
- **Waveform visualization** — see your audio before and after
- **Export** — download your processed audio as .wav

## Getting Started

```bash
# Clone the repo
git clone https://github.com/tylerlanigan/lilypad.git
cd lilypad

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Click **"select audio"** to upload a .wav file
2. Preview the original with **"▶ Original"**
3. Adjust the knobs:
   - **Attack** — fade-in time (0–2 seconds)
   - **Stretch** — time stretch amount (1–8x)
   - **Reverb** — wet/dry mix (0–100%)
   - **Warmth** — lowpass filter (0–100%)
4. Click **"Process"** to render
5. Preview with **"▶ Processed"**
6. Click **"Export .wav"** to download

## Tech Stack

- React 19
- Vite 7
- Web Audio API
- No backend — everything runs in your browser

## Privacy

Your audio never leaves your device. All processing happens locally in your browser.

## License

ISC
