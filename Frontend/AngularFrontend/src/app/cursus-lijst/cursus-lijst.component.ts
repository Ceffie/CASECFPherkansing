import { Component, Input, OnInit } from '@angular/core';
import { CursusService } from '../cursus.service';
import { Cursus } from '../models/Cursus';
import { CursusInstantie } from '../models/CursusInstantie';

@Component({
  selector: 'app-cursus-lijst',
  templateUrl: './cursus-lijst.component.html',
  styleUrls: ['./cursus-lijst.component.css']
})
export class CursusLijstComponent implements OnInit {

  public cursusInstantiesData: Array<any> = [];

  constructor(private cursuservice: CursusService) {
    cursuservice.get().subscribe((data: any) => this.cursusInstantiesData = this.seperateCursusInstances(data));
   }

  ngOnInit(): void {
  }

  seperateCursusInstances(data: Array<Cursus>): Array<any>{
    let result: Array<any> = [];
    if(data != null){
      data.forEach((cursus: Cursus) => {
        cursus.cursusInstanties.forEach((instantie: CursusInstantie) => {
          result.push({titel: cursus.titel, duur: cursus.duur, startDatum: instantie.startDatum})
        });
      });
    } 
    
    return this.sortArray(result, "startDatum");
  }

  sortArray(value: any[], propertyName: string): any[] {
    if (propertyName)
      return value.sort((a: any, b: any) => a[propertyName].localeCompare(b[propertyName]));
    else
      return value;
  }
}
