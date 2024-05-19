import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

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
  public logos = [
    'assets/logo/example_1.png',
    'assets/logo/example_2.png',
    'assets/logo/example_3.png',
    'assets/logo/example_4.png',
    'assets/logo/example_5.png',
    'assets/logo/example_6.png',
    'assets/logo/example_7.png',
  ];
  public currentSlide: number = 0;
  public currentLogoSlide: number = 0;
  private intervalId: any;
  private intervalTime: number = 5000; // Change image every 3 seconds

  constructor() {}

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.clearCarouselInterval();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.next('sprite');
      this.next('logo');
    }, this.intervalTime);
  }

  clearCarouselInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
//TODO odvratno
  next(carouselName: string): void {
    if(carouselName === 'sprite') {
      if (this.currentSlide < this.sprites.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
    } else {
      if (this.currentSlide < this.sprites.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
    }


  }
  //TODO ovo nebi vako piso nikad :')
  previous(carouselName: string): void {
    if(carouselName === 'sprite'){
      if (this.currentSlide > 0) {
        this.currentSlide--;
      } else {
        this.currentSlide = this.sprites.length - 1;
      }
    }else {
      if (this.currentLogoSlide > 0) {
        this.currentLogoSlide--;
      } else {
        this.currentLogoSlide = this.logos.length - 1;
      }
    }

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
      this.next('sprite');
      this.next('logo');
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
      this.previous('sprite');
      this.previous('logo');    }
  }
}
