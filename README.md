# 🧩 Reddit Sudoku Game

An interactive Sudoku game built with Reddit Devvit, developed using Kiro AI IDE for enhanced productivity and code quality.

## 🎯 Features

- **Interactive 9x9 Sudoku Grid** - Touch-friendly interface with visual feedback
- **Multiple Difficulty Levels** - Easy (20 clues removed), Medium (50), Hard (60)
- **Custom Puzzle Creation** - Users can create and share their own puzzles
- **Mobile-Optimized Design** - Responsive layout for Reddit mobile experience
- **Real-time Validation** - Instant feedback on puzzle completion

## 🚀 Kiro AI Development

This project showcases advanced development practices using **Kiro AI IDE**:

### 📋 Specs-Driven Development

- Comprehensive feature specifications in `.kiro/specs/`
- Requirements tracking with checkboxes
- Technical implementation guidelines
- File references using `#[[file:path]]` syntax

### 🔧 Automated Hooks

- **Test on Save** - Automatically runs type checking and deployment when files are saved
- **Puzzle Validator** - Manual hook for validating custom Sudoku puzzles
- JSON-configured triggers and actions for seamless workflow

### 🎯 Intelligent Steering

- **Project Guidelines** - Always-active development standards
- **Devvit Best Practices** - Context-aware guidance for TypeScript files
- Automatic code quality enforcement and suggestions

### ⚙️ Enhanced Tooling

- **MCP Integration** - Model Context Protocol for advanced file system access
- **Workspace Organization** - Structured project management
- **AI-Assisted Development** - Intelligent code suggestions and debugging

## 🛠️ Development Commands

### `npm run deploy`

Upload the app to Reddit's App Directory. Uses Kiro's automated testing hooks to ensure code quality before deployment.

### `npm run dev`

Start playtest session with live reload. Kiro's steering rules provide real-time guidance during development.

### `npm run type-check`

Run TypeScript validation. Integrated with Kiro hooks for automatic execution on file save.

## 📁 Project Structure

```
├── src/
│   └── main.tsx           # Main Sudoku game implementation
├── .kiro/
│   ├── specs/             # Feature specifications and requirements
│   ├── hooks/             # Automated development workflows
│   ├── steering/          # AI guidance and best practices
│   └── settings/          # Kiro workspace configuration
├── package.json           # Dependencies and scripts
└── devvit.yaml           # Reddit Devvit configuration
```

## 🎮 How to Play

1. **Start Game** - Choose difficulty level or create custom puzzle
2. **Select Cell** - Tap any empty cell to select it
3. **Input Numbers** - Use the number buttons (1-9) below the grid
4. **Complete Puzzle** - Fill all cells following Sudoku rules
5. **Victory** - Celebrate when the puzzle is solved!

## 🔧 Kiro Workspace Features

This project demonstrates Kiro's powerful development features:

- **Specs**: Structured feature development with progress tracking
- **Hooks**: Automated testing, validation, and deployment workflows
- **Steering**: Context-aware AI guidance and code quality enforcement
- **MCP**: Enhanced file system integration and tooling

## 📚 Learn More

- [Reddit Devvit Documentation](https://developers.reddit.com/docs/)
- [Developer Portal](https://developers.reddit.com/my/apps)
- [Kiro AI IDE Features](https://kiro.ai) - Specs, Hooks, and Steering

---

_Built with ❤️ using Kiro AI IDE and Reddit Devvit_
