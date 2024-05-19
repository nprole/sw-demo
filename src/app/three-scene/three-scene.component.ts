import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [],
  templateUrl: './three-scene.component.html',
  styleUrl: './three-scene.component.css'
})
export class ThreeSceneComponent implements AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  cube!: Mesh;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initThreeJS();
    this.animate();
  }

  initThreeJS(): void {
    // Create the scene
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);

    // Create the camera
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create the renderer
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('Sent Renderer' , this.rendererContainer.nativeElement);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Create a cube
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    // Rotate the cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }
}
