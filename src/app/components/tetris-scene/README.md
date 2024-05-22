# Tetris Game using Angular and Three.js

This project implements a Tetris game using Angular and Three.js. Below is an explanation of how the project is structured and the key functions involved in the implementation.

## Table of Contents
- [Project Setup](#project-setup)
- [Initialization of Three.js](#initialization-of-threejs)
- [Setting Up the Board](#setting-up-the-board)
- [Drawing the Active Piece](#drawing-the-active-piece)
- [Animation Loop](#animation-loop)
- [Handling Window Resize](#handling-window-resize)
- [Game Logic](#game-logic)
- [User Input Handling](#user-input-handling)

## Project Setup

1. **Install Angular CLI (if not already installed):**
    ```bash
    npm install -g @angular/cli
    ```

2. **Create a new Angular project:**
    ```bash
    ng new tetris-game
    cd tetris-game
    ```

3. **Install Three.js via npm:**
    ```bash
    npm install three
    ```

4. **Generate a new component for the Tetris scene:**
    ```bash
    ng generate component tetris-scene
    ```

## Initialization of Three.js

- The `initThreeJS` function sets up the Three.js scene, camera, and renderer.
- The camera is set to orthographic for better handling of 2D-like gameplay such as Tetris.
- The renderer's size is set to match the container element's size, ensuring it fits properly within the viewport.

## Setting Up the Board

- The `initBoard` function initializes a 2D array representing the Tetris board, with dimensions based on `boardWidth` and `boardHeight`.
- The `drawBoard` function clears any existing shapes and iterates through the board to draw the current state using cubes. This function also calls `drawPiece` to render the active Tetris piece.

## Drawing the Active Piece

- The `drawPiece` function takes the current piece and draws it on the scene using cubes positioned according to the piece's shape array.

## Animation Loop

- The `animate` function sets up a render loop using `requestAnimationFrame` to continuously render the scene and update the view.

## Handling Window Resize

- The `onWindowResize` function adjusts the camera and renderer dimensions whenever the window is resized to maintain the correct aspect ratio and size.

## Game Logic

- The `updateGame` function is called periodically to move the piece down and check for collisions.
- The `movePieceDown` function checks if the piece can move down without colliding with existing pieces or the board's boundaries.
- The `checkCollision` function checks for potential collisions given a movement offset.
- The `lockPiece` function locks the current piece in place on the board once it can't move further down and clears any completed lines.
- The `clearLines` function removes any full lines from the board and shifts the remaining lines down.
- The `rotatePiece` function rotates the current piece and checks for collisions to ensure the piece can be rotated without issues.

## User Input Handling

- The `handleKeyDown` function listens for keypress events and moves or rotates the current piece based on arrow key inputs.

## Example Code Snippets

### Initialization of Three.js

```typescript
initThreeJS(): void {
  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0x000000);

  const containerWidth = this.rendererContainer.nativeElement.clientWidth;
  const containerHeight = this.rendererContainer.nativeElement.clientHeight;
  const aspect = containerWidth / containerHeight;

  const d = 10;
  this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
  this.camera.position.set(this.boardWidth / 2, -this.boardHeight / 2, 20);
  this.camera.lookAt(new THREE.Vector3(this.boardWidth / 2, -this.boardHeight / 2, 0));

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(containerWidth, containerHeight);
  this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

  this.scene.add(this.grid);
}
