import { Component } from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {ThreeSceneComponent} from "./components/three-scene/three-scene.component";
import {TetrisSceneComponent} from "./components/tetris-scene/tetris-scene.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThreeSceneComponent, TetrisSceneComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SWThreeDemo';
  constructor(
    protected router: Router,
  ) {
  }
  goBack() {
    //this.location.back();
    this.router.navigate(['..'], {});
  }

  navigateTo(){
    this.router.navigate(['/scenes'], {});
  }
}
