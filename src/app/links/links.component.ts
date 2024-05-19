import { Component } from '@angular/core';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {
  links = [
    { category: 'General', items: [
        { name: 'Spline', url: 'https://spline.design/' },
        { name: 'Blender', url: 'https://www.blender.org/' },
        { name: 'Tiled', url: 'https://www.mapeditor.org/' },
        { name: 'Phaser.js', url: 'https://phaser.io/' },
        { name: 'Mixamo', url: 'https://www.mixamo.com/#/?page=1&query=run' },
        { name: 'WebGPU', url: 'https://www.w3.org/TR/webgpu/' },
        { name: 'WebGL', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API' },
        { name: 'cannon.js', url: 'https://www.npmjs.com/package/cannon' },
      ]},
    { category: 'Angular', items: [
        { name: 'DOCS', url: 'https://angular.io/docs' },
        { name: 'v17', url: 'https://blog.angular.io/introducing-angular-v17-4d7033312e4b' },
      ]},
    { category: 'Three.js', items: [
        { name: 'Three.js Examples', url: 'https://threejs.org/examples/' },
        { name: '3D - Model', url: 'https://github.com/tamani-coding/threejs-character-controls-example' },
        { name: 'Best Three.js Awarded Apps', url: 'https://www.awwwards.com/websites/three-js/?page=2' },
        { name: 'SlotMachineAnimation', url: 'https://www.kevssite.com/virtual-slot-machine/' },
      ]},
    { category: 'ChatGPT-4o', items: [
        { name: 'ChatGPT-4o vs GPT-4', url: 'https://www.tomsguide.com/ai/chatgpt/i-gave-5-prompts-to-chatgpt-4o-vs-gpt-4-to-test-the-new-ai-model-heres-what-happened' },
      ]},
    { category: 'AI Game Development', items: [
        { name: 'BlokadeLabs', url: 'https://www.blockadelabs.com/' },
        { name: 'ROBLOX', url: 'https://www.roblox.com/' },
        { name: 'Instruct-Nerf2Nerf', url: 'https://instruct-nerf2nerf.github.io/' },
      ]},
    { category: 'Graphics Sites', items: [
        { name: 'Kenney.nl', url: 'https://kenney.nl/assets' },
        { name: 'OpenGameArt.org', url: 'https://opengameart.org/' },
        { name: 'Itch.io', url: 'https://itch.io/game-assets/free' },
        { name: 'CraftPix.net', url: 'https://craftpix.net/freebies/' },
        { name: 'Pixel Art Makers', url: 'https://pixelartmaker.com/gallery' },
        { name: 'Game Art 2D', url: 'https://www.gameart2d.com/freebies.html' },
        { name: 'Reiner\'s Tilesets', url: 'http://www.reinerstilesets.de/' },
        { name: 'SketchFab', url: 'https://sketchfab.com/' },
      ]},
    { category: 'Used Graphics', items: [
        { name: '30 Grass Textures (tilable)', url: 'https://opengameart.org/content/30-grass-textures-tilable' },
        { name: 'Forest Monster', url: 'https://opengameart.org/content/forest-monster' },
      ]}
  ];

}
