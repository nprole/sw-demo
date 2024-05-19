import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {
  AmbientLight,
  AnimationAction,
  AnimationMixer,
  Box3,
  BoxHelper,
  Clock,
  Color, CubeTextureLoader,
  DirectionalLight, EquirectangularReflectionMapping,
  LoadingManager, Material,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CharacterControls} from './characterControls'; // Adjust the path as necessary
import {UtilsService} from './utils.service';
import {Body, Box, Vec3, World} from 'cannon-es';
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {GUI} from 'dat.gui';

@Component({
  selector: 'app-test-scene',
  templateUrl: './test-scene.component.html',
  standalone: true,
  styleUrls: ['./test-scene.component.css']
})
export class TestSceneComponent implements OnInit, OnDestroy, AfterViewInit {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private orbitControls!: OrbitControls;
  private characterControls!: CharacterControls;
  private clock!: Clock;
  private keysPressed!: any;
  private player: any;
  loadingManger: LoadingManager = new LoadingManager();
  healthBar!: HTMLDivElement | null;
  manaBar!: HTMLDivElement | null;
  coinCount!: HTMLDivElement | null;
  private models = ['assets/models/rock-001.glb',
    'assets/models/tree-002.glb',
    'assets/models/trunk-001.glb',
    'assets/models/trunk-002.glb',
    'assets/models/low-poly-tree.glb'];

  private loader = new GLTFLoader(this.loadingManger);

  // Create the Cannon.js world
  private world!: World;

  constructor(private elRef: ElementRef, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.player = null;
    this.world = new World();
    this.world.gravity.set(0, -9.82, 0); // Set gravity
    this.keysPressed = {};
    this.initUI();
    this.initScene();
  }

  ngAfterViewInit(): void {
    this.animate();
  }

  ngOnDestroy(): void {
    this.destroyUI();
  }

  destroyUI() {
    if (this.healthBar && document.body.contains(this.healthBar)) {
      document.body.removeChild(this.healthBar);
    }
    if (this.manaBar && document.body.contains(this.manaBar)) {
      document.body.removeChild(this.manaBar);
    }
    if (this.coinCount && document.body.contains(this.coinCount)) {
      document.body.removeChild(this.coinCount);
    }
  }

  initUI() {
    this.healthBar = document.createElement('div');
    this.healthBar.innerText = '100/100';
    this.healthBar.className = 'd-flex justify-content-end';
    this.healthBar.style.position = 'absolute';
    this.healthBar.style.top = '150px';
    this.healthBar.style.left = '20px';
    this.healthBar.style.width = '100px';
    this.healthBar.style.height = '20px';
    this.healthBar.style.backgroundColor = 'green';
    document.body.appendChild(this.healthBar);

    this.manaBar = document.createElement('div');
    this.manaBar.innerText = '100/100';
    this.manaBar.className = 'd-flex justify-content-end';
    this.manaBar.style.position = 'absolute';
    this.manaBar.style.top = '180px';
    this.manaBar.style.left = '20px';
    this.manaBar.style.width = '100px';
    this.manaBar.style.height = '20px';
    this.manaBar.style.backgroundColor = 'blue';
    document.body.appendChild(this.manaBar);

    this.coinCount = document.createElement('div');
    this.coinCount.style.position = 'absolute';
    this.coinCount.style.top = '260px';
    this.coinCount.style.left = '20px';
    this.coinCount.style.color = 'white';
    this.coinCount.innerHTML = 'Coins: 0';
    document.body.appendChild(this.coinCount);
  }

  private initScene(): void {
    // SCENE
    this.scene = new Scene();
    this.scene.background = new Color(0xa8def0);

    // CAMERA
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 5, 5);

    // RENDERER
    this.renderer = new WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.elRef.nativeElement.appendChild(this.renderer.domElement);

    // CONTROLS
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls['enableDamping'] = true;
    this.orbitControls['minDistance'] = 5;
    this.orbitControls['maxDistance'] = 15;
    this.orbitControls['enablePan'] = false;
    this.orbitControls['maxPolarAngle'] = Math.PI / 2 - 0.05;
    this.orbitControls.update();
    this.addSkyTexture();

    // LIGHTS
    this.addLights();

    // FLOOR
    this.generateFloor();

    // Load model
    const loadingManager = new LoadingManager();
    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.load('assets/models/forest-monster-final.glb', (gltf): void => {
      const model = gltf.scene;

      /*  const boxHelper = new BoxHelper(model);
        model.add(boxHelper);
        model.scale.set(0.1, 0.1, 0.1);
        */
      model.scale.set(0.1, 0.1, 0.1);

      // GUI setup
      const gui = new GUI();
      //const characterFolder = gui.addFolder('Character');

      model.traverse((object) => {
        if ((object as Mesh).isMesh) (object as Mesh).castShadow = true;
      });

      this.scene.add(model);

      // Create a physics body for the model
      const shape = new Box(new Vec3(0.5, 0.5, 0.5)); // Adjust size as needed
      const body = new Body({
        mass: 1,
        shape: shape,
        position: new Vec3(model.position.x, model.position.y, model.position.z),
      });
      this.world.addBody(body);

      // Save reference to the physics body
      model.userData['physicsBody'] = body;

      const mixer = new AnimationMixer(model);
      const animationsMap = new Map<string, AnimationAction>();
      gltf.animations.filter(a => a.name !== 'TPose').forEach((a) => {
        animationsMap.set(a.name, mixer.clipAction(a));
      });

      this.characterControls = new CharacterControls(model, mixer, animationsMap, this.orbitControls, this.camera, 'Idle');
    });

    this.generateForest();

    // CONTROL KEYS
    document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
    document.addEventListener('keyup', (event) => this.onKeyUp(event), false);

    // CLOCK
    this.clock = new Clock();
  }

  private generateForest(){
    for (let i = 0; i < 500; i++) {
      const modelIndex = Math.floor(Math.random() * this.models.length);
      const modelPath = this.models[modelIndex];

      this.loader.load(modelPath, (gltf) => {
        const object = gltf.scene;
        object.position.set(Math.random() * 500 - 250, 0, Math.random() * 500 - 250); // Set initial position flat on the ground
        this.scene.add(object);

        // Create and add physics body
        const body = this.createPhysicsBody(object);
        this.world.addBody(body);

        object.userData['physicsBody'] = body;
      }, () => {
      }, (error) => {
        console.error('An error happened', error);
      });
    }
  }

  private createPhysicsBody(object: Object3D): Body {
    // Get the bounding box of the object
    const box = new Box3().setFromObject(object);
    const size = new Vector3();
    box.getSize(size);

    // Create a Cannon.js body
    const shape = new Box(new Vec3(size.x / 2, size.y / 2, size.z / 2));
    const body = new Body({
      mass: 1, // Set mass
      position: new Vec3(
        object.position.x,
        object.position.y + size.y / 2,
        object.position.z
      )
    });
    body.addShape(shape);

    return body;
  }

  private addSkyTexture(): void {
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('assets/textures/sky/sky.hdr', (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      this.scene.background = texture;
      this.scene.environment = texture; // Optional: to use the texture for environment lighting
    });
  }

  PhysicsBody(object: Object3D): Body {
    // Get the bounding box of the object
    const box = new Box3().setFromObject(object);
    const size = new Vector3();
    box.getSize(size);

    // Create a Cannon.js body
    const shape = new Box(new Vec3(size.x / 2, size.y / 2, size.z / 2));
    const body = new Body({
      mass: 1, // Set mass
      position: new Vec3(object.position.x, object.position.y + size.y / 2, object.position.z)
    });
    body.addShape(shape);

    return body;
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

// Function to check collision
  private checkCollision(mainModel: any, otherModels: any) {
    const mainBox = new Box3().setFromObject(mainModel);

    for (let i = 0; i < otherModels.length; i++) {
      const otherBox = new Box3().setFromObject(otherModels[i]);

      if (mainBox.intersectsBox(otherBox)) {
        // Handle collision
        console.log('Collision detected with model:', otherModels[i]);
        return true;
      }
    }

    return false;
  }

  private generateFloor(): void {
    const textureLoader = new TextureLoader();
    const sandBaseColor = textureLoader.load('assets/textures/grass/tilable-IMG_0044.png');
    const sandNormalMap = textureLoader.load('assets/textures/grass/tilable-IMG_0044_nm.png');
    const sandHeightMap = textureLoader.load('assets/textures/grass/tilable-IMG_0044-dark.png');
    const sandAmbientOcclusion = textureLoader.load('assets/textures/grass/tilable-IMG_0044-lush.png');

    const WIDTH = 500;
    const LENGTH = 500;

    const geometry = new PlaneGeometry(WIDTH, LENGTH, 512, 512);
    const material = new MeshStandardMaterial({
      map: sandBaseColor!,
      normalMap: sandNormalMap!,
      displacementMap: sandHeightMap!,
      displacementScale: 0,
      aoMap: sandAmbientOcclusion!
    });
    this.wrapAndRepeatTexture(material.map!);
    this.wrapAndRepeatTexture(material.normalMap!);
    this.wrapAndRepeatTexture(material.displacementMap!);
    this.wrapAndRepeatTexture(material.aoMap!);

    const floor = new Mesh(geometry, material);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    // Add ground to physics world
    const groundShape = new Box(new Vec3(40, 0, 40)); // Adjust size to match the Three.js ground plane
    const groundBody = new Body({mass: 0});
    groundBody.addShape(groundShape);
    groundBody.position.set(0, -0.01, 0); // Ensure it matches the position of the Three.js ground plane
    this.world.addBody(groundBody);
  }

  private wrapAndRepeatTexture(map: Texture): void {
    map.wrapS = map.wrapT = RepeatWrapping;
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

    // Step the physics world
    this.world.step(1 / 60);

// Update the position of the Three.js objects to match the physics bodies
    this.scene.children.forEach((object) => {
      //   console.log('Log' , object);
      /*     if (this.checkCollision(mainModel, otherModels)) {
             // Reverse movement or stop the main model from moving through other models
             undoMoveMainModel();
           }*/
      /*if (object.userData['physicsBody']) {
        const body = object.userData['physicsBody'];
        object.position.set(body.position.x, body.position.y, body.position.z);
        object.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
      }*/
    });


    const mixerUpdateDelta = this.clock.getDelta();
    if (this.characterControls) {
      this.characterControls.update(mixerUpdateDelta, this.keysPressed);
    }
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
