# Code Style Guide

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `FileUpload.jsx` |
| Utilities | camelCase | `audioProcessor.js` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| CSS classes | kebab-case | `.upload-button` |

## React Patterns

### Use functional components only (no classes)

```jsx
// Good
function FileUpload({ onFileSelect }) {
  return <div>...</div>
}

// Bad
class FileUpload extends React.Component {
  render() { return <div>...</div> }
}
```

### Use hooks for state and effects

```jsx
import { useState, useEffect, useRef } from 'react'

function Component() {
  const [value, setValue] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    // side effects here
  }, [dependency])
}
```

### Keep components small and focused

Each component should do one thing well. If a component grows too large, split it.

### Props should be clearly named

```jsx
// Good
<AudioPlayer
  buffer={audioBuffer}
  onPlay={handlePlay}
  isPlaying={isPlaying}
/>

// Bad
<AudioPlayer
  data={audioBuffer}
  cb={handlePlay}
  flag={isPlaying}
/>
```

## Component Structure

```jsx
// src/components/FileUpload.jsx
import { useState } from 'react'

export default function FileUpload({ onFileSelect }) {
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    onFileSelect(selectedFile)
  }

  return (
    <div className="file-upload">
      <input type="file" onChange={handleChange} />
      {file && <span>{file.name}</span>}
    </div>
  )
}
```

## Exports

- **Components**: Use default exports
- **Utilities**: Use named exports

```jsx
// Component
export default function Waveform() {}

// Utility
export function processAudio() {}
export function downloadWav() {}
```

## Things to Avoid

- Class components (use hooks)
- Unnecessary dependencies
- Over-engineering solutions
- Changes without git commits
- Inline styles (use CSS classes)

## Things to Do

- Keep it simple
- Commit frequently
- Test in browser constantly
- Follow existing patterns
- Use Prettier for formatting
