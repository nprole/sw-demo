import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisSceneComponent } from './components/tetris-scene/tetris-scene.component';
import { ThreeSceneComponent } from './components/three-scene/three-scene.component';
import { SceneOverviewComponent } from './components/scene-overview/scene-overview.component';
import {AboutComponent} from "./components/about/about.component";
import {ChatGptShowcaseComponent} from "./components/chat-gpt-showcase/chat-gpt-showcase.component";
import {BubbleSceneComponent} from "./components/bubble-scene/bubble-scene.component";
import {OfficeSceneComponent} from "./components/office-scene/office-scene.component";
import {TestSceneComponent} from "./components/test-scene/test-scene.component";
import {LinksComponent} from "./components/links/links.component";
import {GeneratedSpritesComponent} from "./components/generated-sprites/generated-sprites.component";

// PRO TIP
export const routes: Routes = [
  { path: '', redirectTo: '/scenes', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'links', component: LinksComponent},
  { path: 'sprites', component: GeneratedSpritesComponent},
  { path: 'scenes', component: SceneOverviewComponent },
  { path: 'scenes/tetris-scene', component: TetrisSceneComponent },
  { path: 'scenes/cube-example', component: ThreeSceneComponent },
  { path: 'scenes/bubble-scene', component: BubbleSceneComponent },
  { path: 'scenes/office', component: OfficeSceneComponent },
  { path: 'scenes/test-3d', component: TestSceneComponent},
  { path: 'chatgpt-4', component: ChatGptShowcaseComponent }, // Assuming AboutComponent represents ChatGPT 4o for now
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
