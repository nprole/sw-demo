import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-scene-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scene-overview.component.html',
  styleUrl: './scene-overview.component.css'
})
export class SceneOverviewComponent {
  public examples = [
    { name: 'Home', route: '/home', description: 'The main page of the application.' },
    { name: 'About', route: '/about', description: 'Information about the application and its purpose.' },
    { name: 'Links', route: '/links', description: 'Useful links related to the application.' },
    { name: 'Generated Sprite Sets', route: '/sprites', description: 'Assets Generated By ChatGpt for this project' },
    { name: 'Tetris Scene', route: '/scenes/tetris-scene', description: 'This example showcases a Tetris game implemented with Angular and Three.js.' },
    { name: 'Cube Example', route: '/scenes/cube-example', description: 'This example demonstrates a simple 3D rotating cube using Three.js.' },
    { name: 'Office Scene', route: '/scenes/office', description: 'Office scene built from image uploaded, recorded with camera.' },
    { name: 'Bubble', route: '/scenes/bubble-scene', description: 'Bubble scene example.' },
    { name: '3D Model Animated', route: '/scenes/test-3d', description: '3D model animated example.' },
    { name: 'ChatGPT 4o', route: '/chatgpt-4', description: 'Information about the ChatGPT 4o model and its features.' }
  ];
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }


}
