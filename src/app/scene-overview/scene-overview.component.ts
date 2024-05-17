import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-scene-overview',
  standalone: true,
  imports: [],
  templateUrl: './scene-overview.component.html',
  styleUrl: './scene-overview.component.css'
})
export class SceneOverviewComponent {

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}

