# Widget App

Widget App is a customizable and feature-rich application that helps you stay organized and manage your tasks effectively.

## MyCustomWidget - Minesweeper Widget

The `MyCustomWidget` component in the Planner App is a Minesweeper-like game that features flags and bombs. The objective of the game is to avoid clicking on bombs. Once a user clicks on a bomb, the game ends.
It's not fully minesweeper, just you should avoid clicking on a bomb rather reveal all the flags.
and I've set my custom widget's area to **floating**

### Implementation

The `MyCustomWidget` component is implemented using React and JavaScript. It utilizes the `useState` hook to manage the game state, including the game board, game over status, opened cells count, mines, and flags. The game logic is handled through event handlers and recursive functions to reveal cells and check for game over conditions.

### How it Works

1. The game board is initially empty, and the player can start a new game by clicking the "Start New Game" button.

2. The game board is displayed as a grid, with each cell representing a square on the Minesweeper board. Clicking on a cell reveals its content.(🚩 or 💣)

3. The goal is to avoid clicking on cells that contain bombs. If a cell with a bomb is clicked, the game ends, and the player loses.

4. The player should find all the flags.

5. If a player finds all the flags without clicking on any bombs, they win the game.

6. The game board dynamically adjusts its size based on the rows and columns specified. By default, the board is an 8x8 grid with 10 randomly placed bombs.

7. The game provides feedback on the game over status, displaying a "Game Over" message if the player clicks on a bomb or a "You've won!" message if they successfully find all the flags.

## Timer Widget

The Timer Widget allows you to set timers for specific durations. It provides a countdown timer that visually displays the remaining time.

## Time Widget

The Time Widget displays the current date and time, helping you stay aware of the current time while using the planner app.

## Reminder List Widget

The Reminder List Widget helps you keep track of important tasks or events. It allows you to create, edit, and delete reminders, ensuring you never miss an important deadline or appointment.

## Calendar Widget

The Calendar Widget provides a visual representation of the dates and helps you plan and organize your schedule. It allows you to view and manage events for specific dates, making it easier to track your appointments and activities.

---

Feel free to explore the Planner App and utilize the various widgets to enhance your productivity and organization.

## Installation

To install the Planner App, follow these steps:

1. Clone the repository: `git clone https://github.com/Akxai/planner-bounty.git`
2. Navigate to the project directory: `cd planner-bounty`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

Make sure you have Node.js and npm installed on your machine before running the above commands.

## Usage

Once the development server is running, you can access the Planner App in your web browser at `http://localhost:3000`. Explore the different widgets and features to organize your tasks, manage reminders, and plan your schedule efficiently.

## Contributing

Contributions to the Planner App are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

The Planner App is open source and released under the [MIT License](https://opensource.org/licenses/MIT).
