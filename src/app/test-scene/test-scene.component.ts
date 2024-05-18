import { Component, OnInit, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CharacterControls } from './characterControls';  // Adjust the path as necessary
import { UtilsService } from './utils.service';  // Adjust the path as necessary

@Component({
  selector: 'app-test-scene',
  templateUrl: './test-scene.component.html',
  standalone: true,
  styleUrls: ['./test-scene.component.css']
})
export class TestSceneComponent implements OnInit, AfterViewInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private orbitControls!: OrbitControls;
  private characterControls!: CharacterControls;
  private clock!: THREE.Clock;
  private keysPressed!: any;
  constructor(private elRef: ElementRef, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.keysPressed = {};
    this.initScene();
  }

  ngAfterViewInit(): void {
    this.animate();
  }

  private initScene(): void {
    // SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa8def0);

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 5, 5);

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.elRef.nativeElement.appendChild(this.renderer.domElement);

    // CONTROLS
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enableDamping = true;
    this.orbitControls.minDistance = 5;
    this.orbitControls.maxDistance = 15;
    this.orbitControls.enablePan = false;
    this.orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
    this.orbitControls.update();

    // LIGHTS
    this.addLights();

    // FLOOR
    this.generateFloor();

    // MODEL WITH ANIMATIONS
    const loadingManager = new THREE.LoadingManager();
    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.load('assets/models/forest-monster-final.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.1, 0.1, 0.1);

      model.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) (object as THREE.Mesh).castShadow = true;
      });
      this.scene.add(model);

      const mixer = new THREE.AnimationMixer(model);
      const animationsMap = new Map<string, THREE.AnimationAction>();
      gltf.animations.filter(a => a.name !== 'TPose').forEach((a) => {
        animationsMap.set(a.name, mixer.clipAction(a));
      });

      this.characterControls = new CharacterControls(model, mixer, animationsMap, this.orbitControls, this.camera, 'Idle');
    });

    // CONTROL KEYS
    document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
    document.addEventListener('keyup', (event) => this.onKeyUp(event), false);

    // CLOCK
    this.clock = new THREE.Clock();
  }

  private addLights(): void {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
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

  private generateFloor(): void {
    const textureLoader = new THREE.TextureLoader();
    const sandBaseColor = textureLoader.load('assets/textures/grass/tilable-IMG_0044.png');
    const sandNormalMap = textureLoader.load('assets/textures/grass/tilable-IMG_0044_nm.png');
    const sandHeightMap = textureLoader.load('assets/textures/grass/tilable-IMG_0044_dark.png');
    const sandAmbientOcclusion = textureLoader.load('assets/textures/grass/tilable-IMG_0044_lush.png');

    const WIDTH = 80;
    const LENGTH = 80;

    const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
    const material = new THREE.MeshStandardMaterial({
      map: sandBaseColor!,
      normalMap: sandNormalMap!,
      displacementMap: sandHeightMap!,
      displacementScale: 0.1,
      aoMap: sandAmbientOcclusion!
    });
    this.wrapAndRepeatTexture(material.map!);
    this.wrapAndRepeatTexture(material.normalMap!);
    this.wrapAndRepeatTexture(material.displacementMap!);
    this.wrapAndRepeatTexture(material.aoMap!);

    const floor = new THREE.Mesh(geometry, material);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);
  }

  private wrapAndRepeatTexture(map: THREE.Texture): void {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(10, 10);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.utilsService.updatePosition();
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.utilsService.down(event.key);
    if (event.shiftKey && this.characterControls) {
      this.characterControls.switchRunToggle();
    } else {
      this.keysPressed[event.key.toLowerCase()] = true;
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.utilsService.up(event.key);
    this.keysPressed[event.key.toLowerCase()] = false;
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const mixerUpdateDelta = this.clock.getDelta();
    if (this.characterControls) {
      this.characterControls.update(mixerUpdateDelta, this.keysPressed);
    }
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
