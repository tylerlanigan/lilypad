# Development Workflow

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check for ESLint issues |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without changes |

## Before Making Changes

```bash
git status                    # Ensure clean state
git add . && git commit -m "Before: [task name]"
```

## After Changes

```bash
git status                    # What changed?
git diff                      # Review changes
npm run dev                   # Test it works
npm run lint                  # Check for errors
git add . && git commit -m "Add: [what you built]"
```

## If Something Breaks

```bash
git reset --hard              # Nuclear: undo everything
git checkout -- src/App.jsx   # Undo one file
npm run lint:fix              # Auto-fix linting
```

## Common Tasks

### Adding a New Component

1. Create component file: `src/components/NewComponent.jsx`
2. Create corresponding CSS if needed
3. Import in parent component
4. Test in browser
5. Commit

### Adding Audio Processing Feature

1. Add function to `src/utils/audioProcessor.js`
2. Test with sample audio file
3. Listen to output quality
4. Tweak parameters
5. Commit when sounds good

### Debugging Audio Issues

1. Check browser console for errors
2. Verify file is valid .wav format
3. Test with known-good sample
4. Add console.logs to track audio buffer
5. Use Web Audio Inspector (Chrome DevTools)

## Git Commit Message Format

```
Add: [new feature]
Fix: [bug description]
Update: [modification]
Refactor: [code improvement]
Docs: [documentation change]
```

Examples:
- `Add: FileUpload component with drag and drop`
- `Fix: Audio export not working for stereo files`
- `Update: Reverb knob range from 0-1 to 0-100`
