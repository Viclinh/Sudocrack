import { Devvit, useState, TriggerContext } from "@devvit/public-api";

Devvit.configure({
  redditAPI: true,
});

type GameMode = 'play' | 'menu';

const createPost = async (context: Devvit.Context | TriggerContext) => {
  const { reddit } = context;
  const subreddit = await reddit.getCurrentSubreddit();
  const post = await reddit.submitPost({
    title: "🧩 Simple Sudoku Game",
    subredditName: subreddit.name,
    preview: (
      <vstack height="100%" width="100%" alignment="middle center">
        <text size="large">🧩 Loading Sudoku Game...</text>
      </vstack>
    ),
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
  name: "Simple Sudoku",
  height: "tall",
  render: (_context) => {
    const [gameMode, setGameMode] = useState<GameMode>('menu');
    const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);

    // Simple hardcoded puzzle - some cells filled, some empty
    const [grid, setGrid] = useState([
      [5, null, null, 6, null, 8, null, 1, 2],
      [6, null, 2, 1, null, 5, 3, null, 8],
      [null, 9, 8, null, 4, null, 5, 6, null],
      [8, null, null, 7, 6, null, 4, 2, 3],
      [4, 2, 6, 8, null, 3, null, 9, 1],
      [7, 1, 3, null, 2, 4, 8, null, null],
      [null, 6, 1, 5, null, 7, 2, 8, null],
      [2, 8, null, 4, 1, null, 6, null, 5],
      [3, null, 5, null, 8, 6, null, null, 9]
    ]);

    const handleCellPress = (row: number, col: number) => {
      setSelectedCell({ row, col });
    };

    const handleNumberInput = (num: number) => {
      if (!selectedCell) return;

      const newGrid = [...grid];
      newGrid[selectedCell.row] = [...newGrid[selectedCell.row]];
      newGrid[selectedCell.row][selectedCell.col] = num;
      setGrid(newGrid);
    };

    const clearCell = () => {
      if (!selectedCell) return;

      const newGrid = [...grid];
      newGrid[selectedCell.row] = [...newGrid[selectedCell.row]];
      newGrid[selectedCell.row][selectedCell.col] = null;
      setGrid(newGrid);
    };

    if (gameMode === 'menu') {
      return (
        <vstack height="100%" width="100%" alignment="center middle" gap="large" padding="large">
          <text size="xxlarge" weight="bold">🧩 Sudoku Game</text>
          <button appearance="primary" onPress={() => setGameMode('play')}>
            Start Playing
          </button>
        </vstack>
      );
    }

    // Render the game
    return (
      <vstack height="100%" width="100%" alignment="center top" gap="medium" padding="medium">
        <hstack gap="medium" alignment="center">
          <button appearance="secondary" onPress={() => setGameMode('menu')}>
            ← Menu
          </button>
          <text size="large" weight="bold">Sudoku</text>
        </hstack>

        <text size="small" alignment="center" color="gray">
          💡 Tap a cell, then use buttons below to add numbers
        </text>

        <text size="small" alignment="center" color="red">
          Debug: First cell = {grid[0][0]} (type: {typeof grid[0][0]})
        </text>

        {/* Sudoku Grid */}
        <vstack backgroundColor="orange" padding="medium" cornerRadius="medium" gap="xs">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((rowIndex) => (
            <hstack key={rowIndex} gap="xs">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                const cell = grid[rowIndex][colIndex];

                // Test with hardcoded numbers first
                let displayText = "";
                if (cell === null) {
                  displayText = isSelected ? "●" : "";
                } else if (typeof cell === 'number') {
                  displayText = cell < 10 ? cell.toString() : "9";
                } else {
                  displayText = "X"; // Debug marker
                }

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    appearance="secondary"
                    size="small"
                    width="28px"
                    height="28px"
                  >
                    <text size="medium" color={isSelected ? "blue" : "black"}>
                      {displayText}
                    </text>
                  </button>
                );
              })}
            </hstack>
          ))}
        </vstack>

        {/* Number Input Buttons */}
        <vstack gap="medium" alignment="center">
          <hstack gap="small">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                appearance="secondary"
                size="small"
                width="32px"
                height="32px"
                onPress={() => handleNumberInput(num)}
              >
                <text size="medium">{num}</text>
              </button>
            ))}
          </hstack>

          <hstack gap="medium">
            <button appearance="secondary" onPress={clearCell}>
              Clear
            </button>
            <button appearance="primary" onPress={() => setGameMode('menu')}>
              New Game
            </button>
          </hstack>
        </vstack>

        {selectedCell && (
          <text size="small" alignment="center" color="blue">
            Selected: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
          </text>
        )}
      </vstack>
    );
  },
});

export default Devvit;