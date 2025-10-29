---
inclusion: fileMatch
fileMatchPattern: "src/**/*.tsx"
---

# Devvit Development Best Practices

## UI Component Guidelines

### Layout Components
- Use `vstack` for vertical layouts with proper `gap` spacing
- Use `hstack` for horizontal layouts with consistent `gap` values
- Always specify `alignment` for predictable positioning
- Use `padding` on containers, not individual elements

### Interactive Elements
- Buttons should have `appearance` set (primary, secondary, bordered, plain)
- Use appropriate `size` for buttons (small, medium, large)
- Always specify `width` and `height` for grid-like layouts
- Use `onPress` handlers, never `onClick`

### Text Rendering
- Always specify `size` for text elements
- Use `weight` for emphasis (regular, bold)
- Set `color` explicitly when needed
- Convert numbers to strings: `String(value)` or `value.toString()`

## State Management

### useState Patterns
```typescript
// Good: Proper initialization
const [grid, setGrid] = useState<SudokuGrid>(() => createEmptyGrid());

// Bad: Shared references
const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(null)));
```

### State Updates
```typescript
// Good: Immutable updates
const newGrid = [...grid];
newGrid[row] = [...newGrid[row]];
newGrid[row][col] = value;
setGrid(newGrid);

// Bad: Direct mutation
grid[row][col] = value;
setGrid(grid);
```

## Performance Considerations
- Use `key` props for dynamic lists
- Avoid complex calculations in render functions
- Use callback functions for expensive initializations
- Minimize re-renders with proper state structure

## Mobile Compatibility
- Design for touch interactions (minimum 44px touch targets)
- Use responsive sizing with explicit dimensions
- Test on various screen sizes
- Consider thumb-friendly button placement