import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-generated-sprites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generated-sprites.component.html',
  styleUrls: ['./generated-sprites.component.css']
})
export class GeneratedSpritesComponent implements OnInit, OnDestroy {
  sprites: string[] = [
    'assets/sprites/full/example_1.png',
    'assets/sprites/full/example_2.png',
    'assets/sprites/full/example_3.png',
    'assets/sprites/full/example_4.png',
    'assets/sprites/full/example_5.png',
    'assets/sprites/full/example_6.png',
    'assets/sprites/full/example_7.png',
    'assets/sprites/full/example_8.png',
    'assets/sprites/full/example_9.png',
    'assets/sprites/full/example_10.png',
    'assets/sprites/full/example_11.png',
    'assets/sprites/full/example_12.png',
    'assets/sprites/full/example_13.png',
    'assets/sprites/full/example_14.png',
    'assets/sprites/full/example_15.png',
    'assets/sprites/full/example_16.png',
    'assets/sprites/full/example_17.png',
    'assets/sprites/full/example_18.png',
    'assets/sprites/full/example_19.png',
    'assets/sprites/full/example_20.png',
    'assets/sprites/full/example_21.png',
    'assets/sprites/full/example_22.png',
    'assets/sprites/full/example_23.png',
    'assets/sprites/full/example_24.png',
    'assets/sprites/full/example_25.png',
    'assets/sprites/full/example_26.png',
    'assets/sprites/full/example_27.png',
  ];

  public currentSlide: number = 0;
  private intervalId: any;
  private intervalTime: number = 3000; // Change image every 3 seconds

  constructor() {}

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.clearCarouselInterval();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, this.intervalTime);
  }

  clearCarouselInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next(): void {
    if (this.currentSlide < this.sprites.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  previous(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.sprites.length - 1;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
      this.next();
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
      this.previous();
    }
  }
}
