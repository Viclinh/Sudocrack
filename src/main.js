import { Devvit, useState } from "@devvit/public-api";
Devvit.configure({
    redditAPI: true,
});
// Generate a complete valid Sudoku grid
const generateCompleteGrid = () => {
    const grid = Array(9).fill(null).map(() => Array(9).fill(null));
    const isValid = (grid, row, col, num) => {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num)
                return false;
        }
        // Check column
        for (let x = 0; x < 9; x++) {
            if (grid[x][col] === num)
                return false;
        }
        // Check 3x3 box
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num)
                    return false;
            }
        }
        return true;
    };
    const fillGrid = (grid) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === null) {
                    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (const num of numbers) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (fillGrid(grid))
                                return true;
                            grid[row][col] = null;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    fillGrid(grid);
    return grid;
};
// Create puzzle by removing numbers from complete grid
const createPuzzle = (difficulty) => {
    const solution = generateCompleteGrid();
    const puzzle = solution.map(row => [...row]);
    const cellsToRemove = {
        easy: 20,
        medium: 50,
        hard: 60
    }[difficulty];
    let removed = 0;
    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== null) {
            puzzle[row][col] = null;
            removed++;
        }
    }
    return { puzzle, solution };
};
// Check if current state is solved
const isSolved = (grid, solution) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] !== solution[row][col])
                return false;
        }
    }
    return true;
};
const createPost = async (context) => {
    const { reddit } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
        title: "🧩 Sudoku Game - Play & Create Custom Puzzles!",
        subredditName: subreddit.name,
        preview: (Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "middle center" },
            Devvit.createElement("text", { size: "large" }, "\uD83E\uDDE9 Loading Sudoku Game..."))),
    });
    return post;
};
Devvit.addMenuItem({
    label: "Create Sudoku Game",
    location: "subreddit",
    forUserType: "moderator",
    onPress: async (_event, context) => {
        const { ui } = context;
        ui.showToast("Creating Sudoku game post...");
        const post = await createPost(context);
        ui.navigateTo(post);
    },
});
Devvit.addTrigger({
    events: ["AppInstall"],
    onEvent: async (event, context) => {
        await createPost(context);
    },
});
Devvit.addCustomPostType({
    name: "Sudoku Game",
    height: "tall",
    render: (_context) => {
        const [gameMode, setGameMode] = useState('menu');
        const [currentGrid, setCurrentGrid] = useState(() => Array(9).fill(null).map(() => Array(9).fill(null)));
        const [originalPuzzle, setOriginalPuzzle] = useState(() => Array(9).fill(null).map(() => Array(9).fill(null)));
        const [solution, setSolution] = useState(() => Array(9).fill(null).map(() => Array(9).fill(null)));
        const [selectedCell, setSelectedCell] = useState(null);
        const [isComplete, setIsComplete] = useState(false);
        const [customGrid, setCustomGrid] = useState(() => Array(9).fill(null).map(() => Array(9).fill(null)));
        const startNewGame = (difficulty) => {
            const { puzzle, solution: sol } = createPuzzle(difficulty);
            setCurrentGrid(puzzle.map(row => [...row]));
            setOriginalPuzzle(puzzle.map(row => [...row]));
            setSolution(sol);
            setGameMode('play');
            setIsComplete(false);
            setSelectedCell(null);
        };
        const startCustomGame = () => {
            setGameMode('create');
            setCustomGrid(Array(9).fill(null).map(() => Array(9).fill(null)));
            setSelectedCell(null);
        };
        const playCustomPuzzle = () => {
            setCurrentGrid(customGrid.map(row => [...row]));
            setOriginalPuzzle(customGrid.map(row => [...row]));
            // For custom puzzles, we don't have a solution to check against
            setSolution(Array(9).fill(null).map(() => Array(9).fill(null)));
            setGameMode('play');
            setIsComplete(false);
            setSelectedCell(null);
        };
        const handleCellPress = (row, col) => {
            if (gameMode === 'play' && originalPuzzle[row][col] === null) {
                setSelectedCell({ row, col });
            }
            else if (gameMode === 'create') {
                setSelectedCell({ row, col });
            }
        };
        const handleNumberInput = (num) => {
            if (!selectedCell)
                return;
            const { row, col } = selectedCell;
            if (gameMode === 'play' && originalPuzzle[row][col] === null) {
                const newGrid = currentGrid.map(r => [...r]);
                newGrid[row][col] = num;
                setCurrentGrid(newGrid);
                // Check if solved (only for generated puzzles with solutions)
                if (solution[0][0] !== null && isSolved(newGrid, solution)) {
                    setIsComplete(true);
                }
            }
            else if (gameMode === 'create') {
                const newGrid = customGrid.map(r => [...r]);
                newGrid[row][col] = num;
                setCustomGrid(newGrid);
            }
        };
        const clearCell = () => {
            if (!selectedCell)
                return;
            const { row, col } = selectedCell;
            if (gameMode === 'play' && originalPuzzle[row][col] === null) {
                const newGrid = currentGrid.map(r => [...r]);
                newGrid[row][col] = null;
                setCurrentGrid(newGrid);
                setIsComplete(false);
            }
            else if (gameMode === 'create') {
                const newGrid = customGrid.map(r => [...r]);
                newGrid[row][col] = null;
                setCustomGrid(newGrid);
            }
        };
        const renderCell = (row, col) => {
            const isSelected = selectedCell?.row === row && selectedCell?.col === col;
            const isOriginal = gameMode === 'play' && originalPuzzle[row][col] !== null;
            const value = gameMode === 'create' ? customGrid[row][col] : currentGrid[row][col];
            return (Devvit.createElement("button", { key: `${row}-${col}`, onPress: () => handleCellPress(row, col), appearance: "bordered", size: "small", width: "32px", height: "32px" },
                Devvit.createElement("text", { size: "medium", weight: isOriginal ? "bold" : "regular", color: isSelected ? "blue" : (isOriginal ? "black" : "gray") }, value || " ")));
        };
        const renderGrid = () => {
            const rows = [];
            for (let row = 0; row < 9; row++) {
                const cells = [];
                for (let col = 0; col < 9; col++) {
                    cells.push(renderCell(row, col));
                }
                rows.push(Devvit.createElement("hstack", { key: row, gap: "small" }, cells));
            }
            return rows;
        };
        if (gameMode === 'menu') {
            return (Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "center middle", gap: "large", padding: "large" },
                Devvit.createElement("text", { size: "xxlarge", weight: "bold" }, "\uD83E\uDDE9 Sudoku Game"),
                Devvit.createElement("text", { size: "medium", alignment: "center" }, "Choose your challenge level or create your own puzzle!"),
                Devvit.createElement("vstack", { gap: "medium", alignment: "center" },
                    Devvit.createElement("text", { size: "large", weight: "bold" }, "Play Generated Puzzles:"),
                    Devvit.createElement("hstack", { gap: "medium" },
                        Devvit.createElement("button", { appearance: "primary", onPress: () => startNewGame('easy') }, "Easy"),
                        Devvit.createElement("button", { appearance: "primary", onPress: () => startNewGame('medium') }, "Medium"),
                        Devvit.createElement("button", { appearance: "primary", onPress: () => startNewGame('hard') }, "Hard"))),
                Devvit.createElement("vstack", { gap: "medium", alignment: "center" },
                    Devvit.createElement("text", { size: "large", weight: "bold" }, "Custom Puzzles:"),
                    Devvit.createElement("button", { appearance: "secondary", onPress: startCustomGame }, "Create Your Own Puzzle"))));
        }
        if (gameMode === 'create') {
            return (Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "center top", gap: "medium", padding: "medium" },
                Devvit.createElement("hstack", { gap: "medium", alignment: "center" },
                    Devvit.createElement("button", { appearance: "secondary", onPress: () => setGameMode('menu') }, "\u2190 Back"),
                    Devvit.createElement("text", { size: "large", weight: "bold" }, "Create Custom Puzzle")),
                Devvit.createElement("text", { size: "small", alignment: "center" }, "Tap cells and use numbers below to create your puzzle"),
                Devvit.createElement("vstack", { gap: "small", alignment: "center" }, renderGrid()),
                Devvit.createElement("vstack", { gap: "small", alignment: "center" },
                    Devvit.createElement("text", { size: "medium" }, "Select Number:"),
                    Devvit.createElement("hstack", { gap: "small" }, [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (Devvit.createElement("button", { key: num, appearance: "bordered", size: "small", onPress: () => handleNumberInput(num) }, num)))),
                    Devvit.createElement("hstack", { gap: "medium" },
                        Devvit.createElement("button", { appearance: "secondary", onPress: clearCell }, "Clear"),
                        Devvit.createElement("button", { appearance: "primary", onPress: playCustomPuzzle }, "Play This Puzzle")))));
        }
        // Play mode
        return (Devvit.createElement("vstack", { height: "100%", width: "100%", alignment: "center top", gap: "medium", padding: "medium" },
            Devvit.createElement("hstack", { gap: "medium", alignment: "center" },
                Devvit.createElement("button", { appearance: "secondary", onPress: () => setGameMode('menu') }, "\u2190 Menu"),
                Devvit.createElement("text", { size: "large", weight: "bold" }, isComplete ? "🎉 Completed!" : "Sudoku Puzzle")),
            isComplete && (Devvit.createElement("text", { size: "medium", color: "green", alignment: "center" }, "Congratulations! You solved the puzzle! \uD83C\uDF89")),
            Devvit.createElement("vstack", { gap: "small", alignment: "center" }, renderGrid()),
            selectedCell && !isComplete && (Devvit.createElement("vstack", { gap: "small", alignment: "center" },
                Devvit.createElement("text", { size: "medium" },
                    "Selected: Row ",
                    selectedCell.row + 1,
                    ", Col ",
                    selectedCell.col + 1),
                Devvit.createElement("hstack", { gap: "small" }, [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (Devvit.createElement("button", { key: num, appearance: "bordered", size: "small", onPress: () => handleNumberInput(num) }, num)))),
                Devvit.createElement("button", { appearance: "secondary", onPress: clearCell }, "Clear Cell"))),
            !selectedCell && !isComplete && (Devvit.createElement("text", { size: "small", alignment: "center" }, "Tap an empty cell to start playing"))));
    },
});
export default Devvit;
