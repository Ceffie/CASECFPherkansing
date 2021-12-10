import { Component, OnInit } from '@angular/core';
import { CursusService } from '../cursus.service';
import { Cursus } from '../models/Cursus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor () {
  }
  ngOnInit(): void {
  }
}
