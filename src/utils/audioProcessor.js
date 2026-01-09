export async function processAudio(buffer, { attack, stretch, reverb, warmth }) {
  const sampleRate = buffer.sampleRate
  const stretchedLength = Math.floor(buffer.length * stretch)
  const attackSamples = Math.floor(attack * sampleRate * stretch)

  const offlineCtx = new OfflineAudioContext(buffer.numberOfChannels, stretchedLength, sampleRate)

  // Source with time stretch
  const source = offlineCtx.createBufferSource()
  source.buffer = buffer
  source.playbackRate.value = 1 / stretch

  // Attack envelope
  const envelope = offlineCtx.createGain()
  envelope.gain.setValueAtTime(0, 0)
  envelope.gain.linearRampToValueAtTime(1, attackSamples / sampleRate)

  // Lowpass filter for warmth
  const filter = offlineCtx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 8000 - warmth * 7500
  filter.Q.value = 0.7

  // Reverb via convolver
  const convolver = offlineCtx.createConvolver()
  const impulseLength = sampleRate * 3
  const impulse = offlineCtx.createBuffer(2, impulseLength, sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const channelData = impulse.getChannelData(channel)
    for (let i = 0; i < impulseLength; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 2.5)
    }
  }
  convolver.buffer = impulse

  // Dry/wet mix for reverb
  const dryGain = offlineCtx.createGain()
  const wetGain = offlineCtx.createGain()
  dryGain.gain.value = 1 - reverb
  wetGain.gain.value = reverb

  // Connect: source -> envelope -> filter -> dry/wet -> destination
  source.connect(envelope)
  envelope.connect(filter)
  filter.connect(dryGain)
  filter.connect(convolver)
  convolver.connect(wetGain)
  dryGain.connect(offlineCtx.destination)
  wetGain.connect(offlineCtx.destination)

  source.start(0)

  return offlineCtx.startRendering()
}
