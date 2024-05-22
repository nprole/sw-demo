import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import {
  AmbientLight,
  CanvasTexture,
  Clock,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera, PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries.js';
const { SphereGeometry } = ParametricGeometries;
class Ball {
  mesh!: Mesh;
  velocity!: Vector3;
  mass!: number;
  radius!: number;
}

@Component({
  selector: 'app-office-scene',
  standalone: true,
  templateUrl: './office-scene.component.html',
  styleUrls: ['./office-scene.component.css']
})
export class OfficeSceneComponent implements OnInit {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private ball!: Mesh;
  private moveDirection = new Vector3();
  private clock = new Clock();
  private playerBall!: Ball;
  private keys: { [key: string]: boolean } = {};
  private readonly size = 50; // Adjust size if needed

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngAfterViewInit(): void {
    this.createGradientFloor();
    this.addTextToFloor();
  }

  private initThreeJS(): void {
    // Set up the scene
    this.scene = new Scene();

    // Set up the camera
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 10, 20);

    // Set up the renderer
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.elRef.nativeElement.querySelector('#gameContainer').appendChild(this.renderer.domElement);

    // Create the player (ball)
    const ballGeometry = new SphereGeometry(1, 32, 32);
    const ballMaterial = new MeshBasicMaterial({ color: 0xff0000 });
    this.ball = new Mesh(ballGeometry, ballMaterial);
    this.ball.position.y = 1; // Raise the ball above the floor
    const radius = 1; // Ball radius should match geometry

    this.playerBall = {
      mesh: this.ball,
      velocity: new Vector3(0, 0, 0),
      mass: 1,
      radius
    };
    this.scene.add(this.ball);

    // Add ambient light to the scene
    const ambientLight = new AmbientLight(0x404040);
    this.scene.add(ambientLight);
  }

  private createGradientFloor(): void {
    // Create a canvas to draw the gradient
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');

    if (context) {
      const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'rgba(2,0,36,1)');
      gradient.addColorStop(0.14, 'rgba(245,177,87,1)');
      gradient.addColorStop(1, 'rgba(205,242,250,1)');
      // Fill with gradient
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Create texture and apply to the floor
      const texture = new CanvasTexture(canvas);
      const floorGeometry = new PlaneGeometry(this.size * 2, this.size * 2);
      const floorMaterial = new MeshBasicMaterial({ map: texture, side: DoubleSide });
      const floor = new Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = Math.PI / 2;
      this.scene.add(floor);
    }
  }

  private addTextToFloor(): void {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Welcome', {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false
      });
      const textMaterial = new MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new Mesh(textGeometry, textMaterial);
      textMesh.rotation.x = -Math.PI / 2;
      textMesh.position.set(-15, 0.1, -15); // Adjust position as needed
      this.scene.add(textMesh);
    });
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Calculate delta time for consistent movement
    const delta = this.clock.getDelta();
    this.movePlayerBall(delta);

    // Update camera position to follow the ball
    this.camera.position.set(this.ball.position.x, this.ball.position.y + 10, this.ball.position.z + 20);
    this.camera.lookAt(this.ball.position);

    this.renderer.render(this.scene, this.camera);
  }

  private movePlayerBall(delta: number): void {
    const speed = 10;
    const maxDistance = this.size - this.playerBall.radius;
    const velocity = this.playerBall.velocity;

    if (this.keys['w']) velocity.z -= speed * delta;
    if (this.keys['s']) velocity.z += speed * delta;
    if (this.keys['a']) velocity.x -= speed * delta;
    if (this.keys['d']) velocity.x += speed * delta;

    const newPosition = this.playerBall.mesh.position.clone().add(velocity);

    // Check for collisions with map boundaries and bounce
    if (newPosition.x - this.playerBall.radius < -this.size || newPosition.x + this.playerBall.radius > this.size) {
      velocity.x = -velocity.x; // Reverse direction
    }
    if (newPosition.z - this.playerBall.radius < -this.size || newPosition.z + this.playerBall.radius > this.size) {
      velocity.z = -velocity.z; // Reverse direction
    }

    // Apply the new position
    this.playerBall.mesh.position.add(velocity);

    // Apply friction to velocity
    this.playerBall.velocity.multiplyScalar(0.95);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.keys[event.key.toLowerCase()] = true;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.keys[event.key.toLowerCase()] = false;
  }
}
