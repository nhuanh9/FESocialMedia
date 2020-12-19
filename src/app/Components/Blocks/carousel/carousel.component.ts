import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ComponentFixtureAutoDetect} from "@angular/core/testing";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
})
export class CarouselComponent implements OnInit {
  sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
