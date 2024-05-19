import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {
  public links = [
    {
      category: 'General', items: [
        { name: 'Spline', url: 'https://spline.design/', description: '3D design tool for creating web-based experiences', className: 'spline' },
        { name: 'Blender', url: 'https://www.blender.org/', description: 'Open-source 3D creation suite', className: 'blender' },
        { name: 'Tiled', url: 'https://www.mapeditor.org/', description: '2D level editor for tile-based games', className: 'tiled' },
        { name: 'Phaser.js', url: 'https://phaser.io/', description: 'Fast, free, and fun open-source HTML5 game framework', className: 'phaser' },
        { name: 'Mixamo', url: 'https://www.mixamo.com/#/?page=1&query=run', description: 'Online platform for 3D character animations', className: 'mixamo' },
        { name: 'WebGPU', url: 'https://www.w3.org/TR/webgpu/', description: 'Graphics API for web applications', className: 'webgpu' },
        { name: 'WebGL', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API', description: 'JavaScript API for rendering 3D graphics', className: 'webgl' },
        { name: 'cannon.js', url: 'https://www.npmjs.com/package/cannon', description: 'JavaScript physics engine', className: 'cannon' }
      ]
    },
    {
      category: 'Angular', items: [
        { name: 'DOCS', url: 'https://angular.io/docs', description: 'Official Angular documentation', className: 'angular' },
        { name: 'v17', url: 'https://blog.angular.io/introducing-angular-v17-4d7033312e4b', description: 'Introducing Angular v17 features', className: 'angular-v17' }
      ]
    },
    {
      category: 'Three.js', items: [
        { name: 'Three.js Examples', url: 'https://threejs.org/examples/', description: 'Collection of Three.js examples', className: 'threejs' },
        { name: '3D - Model', url: 'https://github.com/tamani-coding/threejs-character-controls-example', description: 'Example of character controls in Three.js', className: 'character-model' },
        { name: 'Best Three.js Awarded Apps', url: 'https://www.awwwards.com/websites/three-js/?page=2', description: 'Award-winning Three.js applications', className: 'awarded-apps' },
        { name: 'SlotMachineAnimation', url: 'https://www.kevssite.com/virtual-slot-machine/', description: 'Virtual slot machine animation using Three.js', className: 'slot-machine' }
      ]
    },
    {
      category: 'ChatGPT-4o', items: [
        { name: 'ChatGPT-4o vs GPT-4', url: 'https://www.tomsguide.com/ai/chatgpt/i-gave-5-prompts-to-chatgpt-4o-vs-gpt-4-to-test-the-new-ai-model-heres-what-happened', description: 'Comparison between ChatGPT-4o and GPT-4', className: 'chatgpt' }
      ]
    },
    {
      category: 'AI Game Development', items: [
        { name: 'BlokadeLabs', url: 'https://www.blockadelabs.com/', description: 'AI-powered game development tools', className: 'blokadelabs' },
        { name: 'ROBLOX', url: 'https://www.roblox.com/', description: 'User-generated content game platform', className: 'roblox' },
        { name: 'Instruct-Nerf2Nerf', url: 'https://instruct-nerf2nerf.github.io/', description: 'AI-driven neural rendering research', className: 'instruct-nerf2nerf' }
      ]
    },
    {
      category: 'Graphics Sites', items: [
        { name: 'Kenney.nl', url: 'https://kenney.nl/assets', description: 'Free game assets', className: 'kenney' },
        { name: 'OpenGameArt.org', url: 'https://opengameart.org/', description: 'Free-to-use game art', className: 'opengameart' },
        { name: 'Itch.io', url: 'https://itch.io/game-assets/free', description: 'Free game assets on Itch.io', className: 'itchio' },
        { name: 'CraftPix.net', url: 'https://craftpix.net/freebies/', description: 'Free game graphics', className: 'craftpix' },
        { name: 'Pixel Art Makers', url: 'https://pixelartmaker.com/gallery', description: 'Pixel art gallery and tools', className: 'pixelart' },
        { name: 'Game Art 2D', url: 'https://www.gameart2d.com/freebies.html', description: 'Free 2D game assets', className: 'gameart2d' },
        { name: 'Reiner\'s Tilesets', url: 'http://www.reinerstilesets.de/', description: 'Free tilesets for game development', className: 'reiners-tilesets' },
        { name: 'SketchFab', url: 'https://sketchfab.com/', description: '3D model repository', className: 'sketchfab' }
      ]
    },
    {
      category: 'Used Graphics', items: [
        { name: '30 Grass Textures (tilable)', url: 'https://opengameart.org/content/30-grass-textures-tilable', description: 'Collection of 30 tileable grass textures', className: 'grass-texture' },
        { name: 'Forest Monster', url: 'https://opengameart.org/content/forest-monster', description: 'Forest monster character art', className: 'forest-monster' }
      ]
    }
  ];
}
