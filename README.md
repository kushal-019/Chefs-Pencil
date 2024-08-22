
---

# 2 Truths and a Lie Game

## Overview

"2 Truths and a Lie" is a simple and engaging JavaScript game where players are presented with three statements: two truths and one lie. The objective is to identify which statement is the lie. This game is implemented using HTML, CSS, and JavaScript.

## Features

- **Interactive Gameplay**: Users can select which statement they think is the lie.
- **Randomized Statements**: Statements are randomly shuffled for each round.
- **Score Tracking**: Keeps track of the user's score as they play.
- **Two player mode**: 2 Users can play at same time and select which statement they think is the lie.

## Installation

To get started with the game, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kushal-019/TwoTruthOneLie.git
   
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd TwoTruthOneLie
   ```

3. **Open the Game**

   You can open the `index.html` file in your web browser to start playing the game.

   ```bash
   open index.html
   ```

## Usage

1. **Starting the Game**

   - Open `index.html` in your web browser.

   - You will see 2 options appear asking for single or double mode
   - Chose your mode and play accordinglly

   - You will see three statements on the screen.
   - Click on the statement you believe is the lie.


2. **Scoring**
   **For single player mode**
   - After selecting a statement, feedback will be provided indicating whether your choice was correct.
   - Your score will be updated accordingly.

   **For double player mode**
   - feedback will be provided once both have chosen their options

3. **Replay**

   - Click on the "Play Again" button to start a new round with different statements.

## Code Structure

- `index.html`: The main HTML file that contains the game structure.
- `styles.css`: The CSS file for styling the game interface.
- `script.js`: The JavaScript file that contains the game logic.
- `data.js` : This file contains Json data used in website.

## Example Code

Here’s a snippet of how the game logic is implemented in `script.js`:

```javascript
const statements = [
    {
      "set": ["Samantha climbed Mount Fuji in Japan.", "She spent a few days on a remote island in Australia.", "She has never tasted sushi before."],
      "answer": "She has never tasted sushi before."
    },
];

function getRandomStatements() {
    const randomIndex = Math.floor(Math.random() * statements.length);
    return statements[randomIndex];
}

// Function to handle user choices and check if they are correct
function checkAnswer(selectedStatement) {
    // Implement logic to check if the selected statement is the lie
}
```

## Contributing

If you’d like to contribute to the game, please fork the repository and submit a pull request with your changes. Ensure that you follow the code style and provide a description of your modifications.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [Kushal Goel](mailto:your-kgoel8451@gmail.com).

---