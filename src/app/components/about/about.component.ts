import { Component } from '@angular/core';
import {BackgroundSkyComponent} from "../background-sky-scene/background-sky.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    BackgroundSkyComponent,
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
