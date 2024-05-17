import { Component } from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {ThreeSceneComponent} from "./three-scene/three-scene.component";
import {TetrisSceneComponent} from "./tetris-scene/tetris-scene.component";

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
}
