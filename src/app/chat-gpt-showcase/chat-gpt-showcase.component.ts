import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {string} from "three/examples/jsm/nodes/shadernode/ShaderNode";

@Component({
  selector: 'app-chat-gpt-showcase',
  templateUrl: './chat-gpt-showcase.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./chat-gpt-showcase.component.css']
})
export class ChatGptShowcaseComponent implements OnInit {
  @Input() text!: string;
  @Input() index!: number;
  textColor!: string;
  position!: { x: number, y: number, z: number };

  ngOnInit(): void {
    // Set initial position based on index
    this.textColor =  'rgb(0, 0, 0)'; // Initial color;
    this.position = { x: 0, y: -this.index * 15, z: 0 };
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollTop = (event.target as Document).documentElement.scrollTop;
    const maxScroll = (event.target as Document).documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    this.textColor = this.calculateGradientColor(scrollFraction);
  }

  calculateGradientColor(fraction: number): string {
    const startColor = { r: 169, g: 169, b: 169 }; // Fine gray
    const endColor = { r: 30, g: 144, b: 255 }; // Dodger blue

    // Interpolate between the start and end colors based on the fraction
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * fraction);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * fraction);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * fraction);

    return `rgb(${r}, ${g}, ${b})`;
  }
}


