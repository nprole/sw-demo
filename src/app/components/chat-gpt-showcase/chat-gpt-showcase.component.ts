import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

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
  startColor!: any;
  endColor!: any;
  currentColor!: string;
  position!: { x: number, y: number, z: number };

  constructor() {
    this.startColor = {
      "r": 81,
      "g": 191,
      "b": 91
    }
    this.endColor = {
      "r": 234,
      "g": 241,
      "b": 238
    }
  }

  ngOnInit(): void {
    /*  --green-color-1: rgb(81, 191, 39);
  --green-color-2: rgb(166, 233, 25);
  --green-color-3: rgb(36, 217, 168);
  --green-color-4: rgb(32, 132, 107);
  --green-color-5: rgb(25, 60, 50);
  --green-color-6: rgb(234, 241, 238);
  --green-color-7: rgb(0, 8, 11);*/
    // Set initial position based on index

    this.currentColor = 'rgb(81, 191, 39)'; // Initial color;
    this.position = {x: 0, y: -this.index * 15, z: 0};
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollTop = (event.target as Document).documentElement.scrollTop;
    const maxScroll = (event.target as Document).documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    this.currentColor = this.calculateGradientColor(scrollFraction);
  }

  calculateGradientColor(fraction: number): string {
    const r = Math.round(this.startColor.r + (this.endColor.r - this.startColor.r) * fraction);
    const g = Math.round(this.startColor.g + (this.endColor.g - this.startColor.g) * fraction);
    const b = Math.round(this.startColor.b + (this.endColor.b - this.startColor.b) * fraction);

    return `rgb(${r}, ${g}, ${b})`;
  }
}


