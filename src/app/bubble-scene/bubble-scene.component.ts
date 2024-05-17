import { Component, ElementRef, HostListener, NgZone, ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry, TextGeometryParameters} from "three/examples/jsm/geometries/TextGeometry";

class Ball {
  mesh!: THREE.Mesh;
  velocity!: THREE.Vector3;
  mass!: number;
  radius!: number;
}

@Component({
  selector: 'app-ball-scene',
  standalone: true,
  templateUrl: './bubble-scene.component.html',
  styleUrls: ['./bubble-scene.component.css']
})
export class BubbleSceneComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private balls: Ball[] = [];
  private playerBall!: Ball;
  private keys: { [key: string]: boolean } = {};
  private readonly size = 500;
  private playerLabel!: THREE.Mesh;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.animate();
  }

  private initThreeJS(): void {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Set the clear color to white
    this.renderer.setClearColor(0xFFFFFF);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.z = this.size;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;

    this.addLighting();
    this.addHelpers();
    this.createBalls();
    this.createPlayerBall();
    this.addPlayerLabel();
  }

  private addLighting(): void {
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    this.scene.add(pointLight);
  }

  // Add helpers for development
  private addHelpers(): void {
    const size = this.size;
    const divisions = 20;
    const gridHelper = new THREE.GridHelper(size * 2, divisions);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(size);
    this.scene.add(axesHelper);

    const boundaryGeometry = new THREE.BufferGeometry();
    const boundaryVertices = new Float32Array([
      -size, -size, -size,  size, -size, -size,
      size, -size, -size,  size,  size, -size,
      size,  size, -size, -size,  size, -size,
      -size,  size, -size, -size, -size, -size,

      -size, -size,  size,  size, -size,  size,
      size, -size,  size,  size,  size,  size,
      size,  size,  size, -size,  size,  size,
      -size,  size,  size, -size, -size,  size,

      -size, -size, -size, -size, -size,  size,
      size, -size, -size,  size, -size,  size,
      size,  size, -size,  size,  size,  size,
      -size,  size, -size, -size,  size,  size,
    ]);
    boundaryGeometry.setAttribute('position', new THREE.BufferAttribute(boundaryVertices, 3));
    const boundaryMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const boundaryLines = new THREE.LineSegments(boundaryGeometry, boundaryMaterial);
    this.scene.add(boundaryLines);
  }

  private createBalls(): void {
    const ballGeometry = new THREE.SphereGeometry(5, 32, 32);
    const size = this.size;

    for (let i = 0; i < 100; i++) {
      const ballMaterial = new THREE.MeshPhongMaterial({ color: this.getRandomColor() });
      const ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.position.set(
        (Math.random() - 0.5) * size * 2,
        (Math.random() - 0.5) * size * 2,
        (Math.random() - 0.5) * size * 2
      );
      const radius = 200;
      const ballObj: Ball = {
        mesh: ball,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
        mass: 1,
        radius
      };
      this.balls.push(ballObj);
      this.scene.add(ball);
    }
  }

  // Function to generate a random hex color
  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private createPlayerBall(): void {
    const ballGeometry = new THREE.SphereGeometry(5, 32, 32);
    const playerBallMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFFF00, // Bright yellow
      emissive: 0xFFFF00,
      emissiveIntensity: 0.5
    });

    const playerMesh = new THREE.Mesh(ballGeometry, playerBallMaterial);
    playerMesh.position.set(0, 0, 0);
    const radius = 200;
    this.playerBall = {
      mesh: playerMesh,
      velocity: new THREE.Vector3(0, 0, 0),
      mass: 1,
      radius
    };
    this.scene.add(playerMesh);
  }

  private addPlayerLabel(): void {
    const loader = new FontLoader();
    loader.load('assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Player', {
        font: font,
        size: 5,
        height: 1,
      } as TextGeometryParameters);

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
      this.playerLabel = new THREE.Mesh(textGeometry, textMaterial);
      this.playerLabel.position.set(0, -10, 0);
      this.scene.add(this.playerLabel);
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.keys[event.key.toLowerCase()] = true;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.keys[event.key.toLowerCase()] = false;
  }

  private movePlayerBall(): void {
    const speed = 0.5;
    const maxDistance = this.size - this.playerBall.radius;
    const velocity = this.playerBall.velocity;

    if (this.keys['w']) velocity.z -= speed;
    if (this.keys['s']) velocity.z += speed;
    if (this.keys['a']) velocity.x -= speed;
    if (this.keys['d']) velocity.x += speed;
    if (this.keys[' ']) velocity.y += speed; // Space for upward movement
    if (this.keys['shift']) velocity.y -= speed; // Shift for downward movement

    this.playerBall.mesh.position.add(velocity);
    this.playerBall.velocity.multiplyScalar(0.95); // Friction

    // Update player label position
    if (this.playerLabel) {
      this.playerLabel.position.set(
        this.playerBall.mesh.position.x,
        this.playerBall.mesh.position.y - 10,
        this.playerBall.mesh.position.z
      );
    }

    // Bounce off the boundaries
    const pos = this.playerBall.mesh.position;
    if (pos.x <= -maxDistance || pos.x >= maxDistance) {
      velocity.x = -velocity.x;
      pos.x = THREE.MathUtils.clamp(pos.x, -maxDistance, maxDistance);
    }
    if (pos.y <= -maxDistance || pos.y >= maxDistance) {
      velocity.y = -velocity.y;
      pos.y = THREE.MathUtils.clamp(pos.y, -maxDistance, maxDistance);
    }
    if (pos.z <= -maxDistance || pos.z >= maxDistance) {
      velocity.z = -velocity.z;
      pos.z = THREE.MathUtils.clamp(pos.z, -maxDistance, maxDistance);
    }
  }

  private checkCollisions(): void {
    const playerPos = this.playerBall.mesh.position;
    const playerRadius = this.playerBall.radius;

    for (let ball of this.balls) {
      const dist = playerPos.distanceTo(ball.mesh.position);
      const combinedRadius = playerRadius + ball.radius;
      if (dist < combinedRadius) {
        this.playerBall.mass += ball.mass;
        this.playerBall.radius = Math.cbrt(this.playerBall.mass); // Update radius based on mass
        this.playerBall.mesh.scale.setScalar(this.playerBall.radius / 5);
        this.scene.remove(ball.mesh);
        this.balls = this.balls.filter(b => b !== ball);
      }
    }
  }

  private animate = (): void => {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      this.controls.update(); // Update the controls in the animation loop
    });

    this.movePlayerBall();
    this.checkCollisions();

    this.balls.forEach(ball => {
      ball.mesh.position.add(ball.velocity);

      // Bounce off the boundaries
      const maxDistance = this.size - ball.radius;
      const pos = ball.mesh.position;
      if (pos.x <= -maxDistance || pos.x >= maxDistance) {
        ball.velocity.x = -ball.velocity.x;
        pos.x = THREE.MathUtils.clamp(pos.x, -maxDistance, maxDistance);
      }
      if (pos.y <= -maxDistance || pos.y >= maxDistance) {
        ball.velocity.y = -ball.velocity.y;
        pos.y = THREE.MathUtils.clamp(pos.y, -maxDistance, maxDistance);
      }
      if (pos.z <= -maxDistance || pos.z >= maxDistance) {
        ball.velocity.z = -ball.velocity.z;
        pos.z = THREE.MathUtils.clamp(pos.z, -maxDistance, maxDistance);
      }
    });
  }
}
