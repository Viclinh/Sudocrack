# Test on Save Hook

## Trigger
When any TypeScript file is saved in the `src/` directory

## Actions
1. Run type checking: `npm run type-check`
2. Deploy to test environment: `npm run deploy`
3. Show toast notification with results

## Configuration
```json
{
  "name": "Test Sudoku on Save",
  "trigger": "file_save",
  "filePattern": "src/**/*.tsx",
  "actions": [
    {
      "type": "command",
      "command": "npm run type-check",
      "showOutput": true
    },
    {
      "type": "command", 
      "command": "npm run deploy",
      "showOutput": false
    },
    {
      "type": "toast",
      "message": "Sudoku game updated and deployed!"
    }
  ]
}
```

## Purpose
Automatically test and deploy the Sudoku game whenever code changes are made, ensuring rapid iteration and immediate feedback during development.