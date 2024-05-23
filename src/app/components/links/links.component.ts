import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {BackgroundSkyComponent} from "../background-sky-scene/background-sky.component";

interface LinkItem {
  name: string;
  url: string;
  description: string;
  className: string;
}

interface LinkCategory {
  category: string;
  items: LinkItem[];
}

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, RouterModule, BackgroundSkyComponent],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {
  @Input() fullHeight: boolean = true;
  @ViewChild('contentWrapper', {static: false}) contentWrapper!: ElementRef;

  public links: LinkCategory[] = [
    {
      category: 'General', items: [
        {
          name: 'Spline',
          url: 'https://spline.design/',
          description: '3D design tool for creating web-based experiences',
          className: 'spline'
        },
        {
          name: 'Blender',
          url: 'https://www.blender.org/',
          description: 'Open-source 3D creation suite',
          className: 'spline'
        },
        {
          name: 'Tiled',
          url: 'https://www.mapeditor.org/',
          description: '2D level editor for tile-based games',
          className: 'spline'
        },
        {
          name: 'Phaser.js',
          url: 'https://phaser.io/',
          description: 'Fast, free, and fun open-source HTML5 game framework',
          className: 'spline'
        }
      ]
    },
    {
      category: 'General 2', items: [
        {
          name: 'Mixamo',
          url: 'https://www.mixamo.com/#/?page=1&query=run',
          description: 'Online platform for 3D character animations',
          className: 'blender'
        },
        {
          name: 'WebGPU',
          url: 'https://www.w3.org/TR/webgpu/',
          description: 'Graphics API for web applications',
          className: 'blender'
        },
        {
          name: 'WebGL',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API',
          description: 'JavaScript API for rendering 3D graphics',
          className: 'blender'
        },
        {
          name: 'cannon.js',
          url: 'https://www.npmjs.com/package/cannon',
          description: 'JavaScript physics engine',
          className: 'blender'
        }
      ]
    },
    {
      category: 'General 3', items: [
        {
          name: 'FFMPEG',
          url: 'https://ffmpeg.org/download.html',
          description: 'Multimedia framework for video and audio processing',
          className: 'tiled'
        },
        {
          name: 'dat.gui',
          url: 'https://github.com/dataarts/dat.gui',
          description: 'Lightweight GUI for changing variables in JavaScript',
          className: 'tiled'
        }
      ]
    },
    {
      category: 'Angular', items: [
        {
          name: 'DOCS',
          url: 'https://angular.io/docs',
          description: 'Official Angular documentation',
          className: 'phaser'
        },
        {
          name: 'v17',
          url: 'https://blog.angular.io/introducing-angular-v17-4d7033312e4b',
          description: 'Introducing Angular v17 features',
          className: 'phaser'
        }
      ]
    },
    {
      category: 'Three.js', items: [
        {
          name: 'Three.js Examples',
          url: 'https://threejs.org/examples/',
          description: 'Collection of Three.js examples',
          className: 'mixamo'
        },
        {
          name: '3D - Model',
          url: 'https://github.com/tamani-coding/threejs-character-controls-example',
          description: 'Example of character controls in Three.js',
          className: 'mixamo'
        },
        {
          name: 'Best Three.js Awarded Apps',
          url: 'https://www.awwwards.com/websites/three-js/?page=2',
          description: 'Award-winning Three.js applications',
          className: 'mixamo'
        },
        {
          name: 'SlotMachineAnimation',
          url: 'https://www.kevssite.com/virtual-slot-machine/',
          description: 'Virtual slot machine animation using Three.js',
          className: 'mixamo'
        }
      ]
    },
    {
      category: 'ChatGPT-4o', items: [
        {
          name: 'ChatGPT-4o vs GPT-4',
          url: 'https://www.tomsguide.com/ai/chatgpt/i-gave-5-prompts-to-chatgpt-4o-vs-gpt-4-to-test-the-new-ai-model-heres-what-happened',
          description: 'Comparison between ChatGPT-4o and GPT-4',
          className: 'webgpu'
        }
      ]
    },
    {
      category: 'AI Game Development', items: [
        {
          name: 'BlokadeLabs',
          url: 'https://www.blockadelabs.com/',
          description: 'AI-powered game development tools',
          className: 'webgl'
        },
        {
          name: 'ROBLOX',
          url: 'https://www.roblox.com/',
          description: 'User-generated content game platform',
          className: 'webgl'
        },
        {
          name: 'Instruct-Nerf2Nerf',
          url: 'https://instruct-nerf2nerf.github.io/',
          description: 'AI-driven neural rendering research',
          className: 'webgl'
        }
      ]
    },
    {
      category: 'Graphics Sites', items: [
        {name: 'Kenney.nl', url: 'https://kenney.nl/assets', description: 'Free game assets', className: 'cannon'},
        {
          name: 'OpenGameArt.org',
          url: 'https://opengameart.org/',
          description: 'Free-to-use game art',
          className: 'angular'
        },
        {
          name: 'Itch.io',
          url: 'https://itch.io/game-assets/free',
          description: 'Free game assets on Itch.io',
          className: 'angular'
        },
        {
          name: 'CraftPix.net',
          url: 'https://craftpix.net/freebies/',
          description: 'Free game graphics',
          className: 'angular'
        }
      ]
    },
    {
      category: 'Graphics Sites 2', items: [
        {
          name: 'Pixel Art Makers',
          url: 'https://pixelartmaker.com/gallery',
          description: 'Pixel art gallery and tools',
          className: 'angular'
        },
        {
          name: 'Game Art 2D',
          url: 'https://www.gameart2d.com/freebies.html',
          description: 'Free 2D game assets',
          className: 'angular'
        },
        {
          name: 'Reiner\'s Tilesets',
          url: 'http://www.reinerstilesets.de/',
          description: 'Free tilesets for game development',
          className: 'angular'
        },
        {name: 'SketchFab', url: 'https://sketchfab.com/', description: '3D model repository', className: 'angular'}
      ]
    },
    {
      category: 'Graphics Sites 3', items: [
        {
          name: 'PolyHaven',
          url: 'https://polyhaven.com/',
          description: 'Free 3D models, HDRs and textures',
          className: 'graphics-polyhaven'
        }
      ]
    },
    {
      category: 'Used Graphics', items: [
        {
          name: '30 Grass Textures (tilable)',
          url: 'https://opengameart.org/content/30-grass-textures-tilable',
          description: 'Collection of 30 tileable grass textures',
          className: 'used-grass-texture'
        },
        {
          name: 'Forest Monster',
          url: 'https://opengameart.org/content/forest-monster',
          description: 'Forest monster character art',
          className: 'used-forest-monster'
        },
        {
          name: 'Lonely Road Afternoon Puresky',
          url: 'https://polyhaven.com/a/lonely_road_afternoon_puresky',
          description: 'HDR sky texture',
          className: 'used-lonely-road'
        }
      ]
    },
    {
      category: 'Example of WebDesign', items: [
        {
          name: 'FFmpeg Builds',
          url: 'https://www.gyan.dev/ffmpeg/builds/',
          description: 'Example of web design using FFmpeg builds',
          className: 'webdesign-ffmpeg-builds'
        }
      ]
    }
  ];
  navigate(path: string) {
    const url = encodeURI(path);
    window.open(url, '_blank')
  }

  scrollLeft(event: any) {
    if (event) {
      event.stopPropagation();
    }
    this.contentWrapper.nativeElement.scrollBy({left: -1000, behavior: 'smooth'});
  }

  scrollRight(event: any) {
    if (event) {
      event.stopPropagation();
    }
    this.contentWrapper.nativeElement.scrollBy({left: 1000, behavior: 'smooth'});
  }
}
