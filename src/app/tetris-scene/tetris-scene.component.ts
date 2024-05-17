import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

type Piece = {
  shape: number[][],
  color: number,
  x: number,
  y: number
};

const PIECES: Piece[] = [
  { shape: [[1, 1, 1, 1]], color: 0x00ffff, x: 3, y: 0 }, // I
  { shape: [[1, 1], [1, 1]], color: 0xffff00, x: 4, y: 0 }, // O
  { shape: [[0, 1, 0], [1, 1, 1]], color: 0xff00ff, x: 3, y: 0 }, // T
  { shape: [[0, 1, 1], [1, 1, 0]], color: 0x00ff00, x: 3, y: 0 }, // S
  { shape: [[1, 1, 0], [0, 1, 1]], color: 0xff0000, x: 3, y: 0 }, // Z
  { shape: [[1, 0, 0], [1, 1, 1]], color: 0x0000ff, x: 3, y: 0 }, // J
  { shape: [[0, 0, 1], [1, 1, 1]], color: 0xffa500, x: 3, y: 0 }  // L
];

@Component({
  selector: 'app-tetris-scene',
  templateUrl: './tetris-scene.component.html',
  standalone: true,
  styleUrls: ['./tetris-scene.component.css']
})
export class TetrisSceneComponent implements OnInit {
  @ViewChild('rendererContainer', {static: true}) rendererContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.OrthographicCamera;
  board: number[][] = [];
  boardWidth = 10;
  boardHeight = 20;
  grid: THREE.Group = new THREE.Group();
  currentPiece: Piece;
  interval: any;

  constructor() {
    this.currentPiece = this.getRandomPiece();
  }

  ngOnInit(): void {
    this.initThreeJS();
    this.initBoard();
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.interval = setInterval(() => this.updateGame(), 1000);
  }

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

  initBoard(): void {
    for (let y = 0; y < this.boardHeight; y++) {
      this.board[y] = [];
      for (let x = 0; x < this.boardWidth; x++) {
        this.board[y][x] = 0;
      }
    }
    this.drawBoard();
  }

  drawBoard(): void {
    this.grid.clear();
    const cubeSize = 1;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        if (this.board[y][x] !== 0) {
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(x, -y, 0);
          this.grid.add(cube);
        }
      }
    }
    this.drawPiece();
  }

  drawPiece(): void {
    const cubeSize = 1;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshBasicMaterial({color: this.currentPiece.color});

    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x] !== 0) {
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(this.currentPiece.x + x, -(this.currentPiece.y + y), 0);
          this.grid.add(cube);
        }
      }
    }
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(): void {
    const containerWidth = this.rendererContainer.nativeElement.clientWidth;
    const containerHeight = this.rendererContainer.nativeElement.clientHeight;
    const aspect = containerWidth / containerHeight;

    const d = 10;
    this.camera.left = -d * aspect;
    this.camera.right = d * aspect;
    this.camera.top = d;
    this.camera.bottom = -d;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(containerWidth, containerHeight);
  }

  getRandomPiece(): Piece {
    const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
    return {...piece, x: piece.x, y: piece.y};
  }

  updateGame(): void {
    this.movePieceDown();
    this.drawBoard();
  }

  movePieceDown(): void {
    if (!this.checkCollision(0, 1, this.currentPiece.shape)) {
      this.currentPiece.y++;
    } else {
      this.lockPiece();
      this.currentPiece = this.getRandomPiece();
      if (this.checkCollision(0, 0, this.currentPiece.shape)) {
        clearInterval(this.interval);
        alert('Game Over');
      }
    }
  }

  checkCollision(offsetX: number, offsetY: number, piece: number[][]): boolean {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          const newX = this.currentPiece.x + x + offsetX;
          const newY = this.currentPiece.y + y + offsetY;
          if (
            newX < 0 ||
            newX >= this.boardWidth ||
            newY >= this.boardHeight ||
            this.board[newY][newX] !== 0
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  lockPiece(): void {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x] !== 0) {
          this.board[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.color;
        }
      }
    }
    this.clearLines();
  }

  clearLines(): void {
    outer: for (let y = this.boardHeight - 1; y >= 0; y--) {
      for (let x = 0; x < this.boardWidth; x++) {
        if (this.board[y][x] === 0) {
          continue outer;
        }
      }
      const row = this.board.splice(y, 1)[0].fill(0);
      this.board.unshift(row);
      y++;
    }
  }

  rotatePiece(): void {
    const newShape = this.currentPiece.shape[0].map((_, index) =>
      this.currentPiece.shape.map(row => row[index]).reverse()
    );
    if (!this.checkCollision(0, 0, newShape)) {
      this.currentPiece.shape = newShape;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        if (!this.checkCollision(-1, 0, this.currentPiece.shape)) {
          this.currentPiece.x--;
        }
        break;
      case 'ArrowRight':
        if (!this.checkCollision(1, 0, this.currentPiece.shape)) {
          this.currentPiece.x++;
        }
        break;
      case 'ArrowDown':
        this.movePieceDown();
        break;
      case 'ArrowUp':
        this.rotatePiece();
        break;
    }
    this.drawBoard();
  }
}
