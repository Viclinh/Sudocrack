---
inclusion: always
---

# Reddit Sudoku Game - Project Guidelines

## Project Overview
This is a Reddit Devvit application that provides an interactive Sudoku game experience directly within Reddit posts.

## Key Features
- Interactive 9x9 Sudoku grid with number input
- Multiple difficulty levels (Easy, Medium, Hard)
- Custom puzzle creation capability
- Clean, mobile-friendly interface
- Reddit-native UI components

## Development Standards

### Code Style
- Use TypeScript for type safety
- Follow React functional component patterns
- Use descriptive variable names
- Add comments for complex logic

### Devvit Best Practices
- Use Devvit's built-in UI components (vstack, hstack, button, text)
- Implement proper state management with useState
- Handle user interactions with onPress events
- Use appropriate sizing (width, height) for mobile compatibility

### Testing
- Test locally with `npm run dev`
- Deploy with `npm run deploy`
- Publish with `npm run launch`

## File Structure
- `src/main.tsx` - Main application logic and UI
- `package.json` - Dependencies and scripts
- `devvit.yaml` - Devvit app configuration