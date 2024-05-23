import {Component, HostListener, Input, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  AmbientLight,
  DirectionalLight,
  EquirectangularReflectionMapping,
  LoadingManager,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-background-sky',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-sky.component.html',
  styleUrls: ['./background-sky.component.css']
})
export class BackgroundSkyComponent implements OnInit {
  @Input() fullHeight: boolean = true; // Add this line to control the condition
  @Input() textureId: number = 0; // Add this line to control the condition
  private loadingManager!: LoadingManager;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private orbitControls!: OrbitControls;
  private mouseX: number = 0;
  private mouseY: number = 0;

  private scene!: Scene;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.initScene();
    this.animate();
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    console.log('MOuse X');
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  initScene() {
    this.loadingManager = new LoadingManager();
    // Basic setup
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('container');
    if (container) {
      container.appendChild(this.renderer.domElement);
    } else {
      console.error('Container element not found');
      return;
    }

    // Skybox setup
    this.addSkyTexture();

    // Camera position
    this.camera.position.z = 5;
    this.addLights();

    // CONTROLS
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls['enableDamping'] = true;
    this.orbitControls['minDistance'] = 20;
    this.orbitControls['maxDistance'] = 70;
    this.orbitControls['enablePan'] = false;
    this.orbitControls['maxPolarAngle'] = Math.PI / 2 - 0.05;
    this.orbitControls.update();
  }

  private addLights(): void {
    this.scene.add(new AmbientLight(0xffffff, 0.7));
    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.position.set(-60, 100, -10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    this.scene.add(dirLight);
  }

  private addSkyTexture(): void {
    const rgbeLoader = new RGBELoader(this.loadingManager);
    let textureName = 'assets/textures/sky/sky.hdr';
    if(this.textureId !== 0){
      textureName ='assets/textures/sky/moon.hdr'
    }
    rgbeLoader.load(textureName, (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      this.scene.background = texture;
      this.scene.environment = texture; // Optional: to use the texture for environment lighting
      console.log('Sky texture loaded successfully');
    }, undefined, (error) => {
      console.error('Error loading sky texture', error);
    });
  }

  // Render the scene

  animate() {
    requestAnimationFrame(() => this.animate());
    this.camera.position.x += (this.mouseX * 10 - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouseY * 10 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
