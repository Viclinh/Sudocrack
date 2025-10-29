# Puzzle Validator Hook

## Trigger
Manual button click or when custom puzzle is created

## Actions
1. Validate Sudoku puzzle rules
2. Check for unique solution
3. Generate difficulty rating
4. Save valid puzzles to collection

## Configuration
```json
{
  "name": "Validate Custom Puzzle",
  "trigger": "manual",
  "buttonText": "🧩 Validate Puzzle",
  "actions": [
    {
      "type": "function",
      "function": "validateSudokuRules",
      "params": ["currentGrid"]
    },
    {
      "type": "function",
      "function": "checkUniqueSolution", 
      "params": ["currentGrid"]
    },
    {
      "type": "function",
      "function": "calculateDifficulty",
      "params": ["currentGrid"]
    },
    {
      "type": "toast",
      "message": "Puzzle validation complete!"
    }
  ]
}
```

## Validation Rules
- Each row contains digits 1-9 exactly once
- Each column contains digits 1-9 exactly once  
- Each 3x3 box contains digits 1-9 exactly once
- Puzzle has exactly one valid solution
- Minimum 17 clues required for unique solution

## Purpose
Ensure user-created puzzles follow proper Sudoku rules and provide quality feedback on puzzle difficulty and solvability.