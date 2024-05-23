import {AnimationAction, AnimationMixer, Camera, Group, Quaternion, Vector3} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {A, D, DIRECTIONS, S, W} from './utils.service';

export class CharacterControls {
  model: Group;
  mixer: AnimationMixer;
  animationsMap: Map<string, AnimationAction> = new Map(); // Walk, Run, Idle
  orbitControl: OrbitControls;
  camera: Camera;

  toggleRun: boolean = true;
  currentAction: string;

  walkDirection = new Vector3();
  rotateAngle = new Vector3(0, 1, 0);
  rotateQuaternion: Quaternion = new Quaternion();
  cameraTarget = new Vector3();

  fadeDuration: number = 0.2;
  runVelocity = 10;
  walkVelocity = 5;

  constructor(model: Group, mixer: AnimationMixer, animationsMap: Map<string, AnimationAction>, orbitControl: OrbitControls, camera: Camera, currentAction: string) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.currentAction = currentAction;
    this.animationsMap.forEach((value, key) => {
      if (key == currentAction) {
        value.play();
      }
    });
    this.orbitControl = orbitControl;
    this.camera = camera;
    this.updateCameraTarget(0, 0);
  }

  public switchRunToggle() {
    this.toggleRun = !this.toggleRun;
  }

  public update(delta: number, keysPressed: any) {
    const directionPressed = DIRECTIONS.some(key => keysPressed[key] == true);

    let play = '';
    if (directionPressed && this.toggleRun) {
      play = 'Walk';
    } else if (directionPressed) {
      play = 'Walk';
    } else {
      play = 'Idle';
    }

    if (this.currentAction != play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);
      if (current) {
        current.fadeOut(this.fadeDuration);
      }
      if (toPlay) {
        toPlay.reset().fadeIn(this.fadeDuration).play();
      }
      this.currentAction = play;
    }

    this.mixer.update(delta);

    if (this.currentAction == 'Run' || this.currentAction == 'Walk') {
      // calculate towards camera direction
      const angleYCameraDirection = Math.atan2(
        (this.camera.position.x - this.model.position.x),
        (this.camera.position.z - this.model.position.z)
      );
      // diagonal movement angle offset
      const directionOffset = this.directionOffset(keysPressed);

      // rotate model
      this.rotateQuaternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset + Math.PI); // Invert direction
      this.model.quaternion.rotateTowards(this.rotateQuaternion, 0.2);

      // calculate direction
      this.camera.getWorldDirection(this.walkDirection);
      this.walkDirection.y = 0;
      this.walkDirection.normalize();
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

      // run/walk velocity
      const velocity = this.currentAction == 'Run' ? this.runVelocity : this.walkVelocity;

      // move model & camera
      const moveX = this.walkDirection.x * velocity * delta;
      const moveZ = this.walkDirection.z * velocity * delta;
      this.model.position.x += moveX;
      this.model.position.z += moveZ;
      this.updateCameraTarget(moveX, moveZ);
    }
  }

  private updateCameraTarget(moveX: number, moveZ: number) {
    // move camera
    this.camera.position.x += moveX;
    this.camera.position.z += moveZ;

    // update camera target
    this.cameraTarget.x = this.model.position.x;
    this.cameraTarget.y = this.model.position.y + 1;
    this.cameraTarget.z = this.model.position.z;
    this.orbitControl.target = this.cameraTarget;
  }

  private directionOffset(keysPressed: any) {
    let directionOffset = 0; // W

    if (keysPressed[W]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4; // W + A
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4; // W + D
      }
    } else if (keysPressed[S]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // S + A
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // S + D
      } else {
        directionOffset = Math.PI; // S
      }
    } else if (keysPressed[A]) {
      directionOffset = Math.PI / 2; // A
    } else if (keysPressed[D]) {
      directionOffset = -Math.PI / 2; // D
    }

    return directionOffset;
  }
}
