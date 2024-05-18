import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisSceneComponent } from './tetris-scene/tetris-scene.component';
import { ThreeSceneComponent } from './three-scene/three-scene.component';
import { SceneOverviewComponent } from './scene-overview/scene-overview.component';
import {AboutComponent} from "./about/about.component";
import {ChatGptShowcaseComponent} from "./chat-gpt-showcase/chat-gpt-showcase.component";
import {BubbleSceneComponent} from "./bubble-scene/bubble-scene.component";
import {OfficeSceneComponent} from "./office-scene/office-scene.component";
import {TextAnimatedComponent} from "./text-animated/text-animated.component";
import {TestSceneComponent} from "./test-scene/test-scene.component";

// PRO TIP
export const routes: Routes = [
  { path: '', redirectTo: '/scenes', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'scenes', component: SceneOverviewComponent },
  { path: 'scenes/tetris-scene', component: TetrisSceneComponent },
  { path: 'scenes/cube-example', component: ThreeSceneComponent },
  { path: 'scenes/bubble-scene', component: BubbleSceneComponent },
  { path: 'scenes/office', component: OfficeSceneComponent },
  { path: 'scenes/text-animated', component: TextAnimatedComponent },
  { path: 'scenes/test-3d', component: TestSceneComponent},
  { path: 'chatgpt-4', component: ChatGptShowcaseComponent }, // Assuming AboutComponent represents ChatGPT 4o for now
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
