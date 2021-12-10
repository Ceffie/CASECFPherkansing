import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { CursusService } from '../cursus.service';
import { Cursus } from '../models/Cursus';

@Component({
  selector: 'app-upload-cursussen',
  templateUrl: './upload-cursussen.component.html',
  styleUrls: ['./upload-cursussen.component.css']
})
export class UploadCursussenComponent implements OnInit {
  public file: any;
  public answerToPost: any;

  constructor(private cursuservice: CursusService) { }

  ngOnInit(): void {
  }
  
  fileChanged(file: any) {
    this.file = file.target.files[0];
  }

  postCursus(cursussen: Array<Cursus>){
    this.cursuservice.add(JSON.stringify(cursussen)).subscribe((data: any) => this.answerToPost = data);
  }

  uploadDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const FullFile = fileReader.result;
      
      if(FullFile != null){
        this.postCursus(this.ReformToCursussenArray(FullFile));
      }
    }
    fileReader.readAsText(this.file);
  }

  ReformToCursussenArray(fullFile: any): Array<Cursus>{
    let splitFile: Array<string> = this.SplitFullFile(fullFile);
    let cursusArrays: Array<Array<string>> = [];
    let cursusArrayLength: number = 5;
    let cursussen: Array<Cursus> = [];

    for (let i = 0; i < splitFile.length; i+=cursusArrayLength) {
      cursusArrays.push(this.SliceSplitFile(splitFile, i, cursusArrayLength));
    }
    for (let i = 0; i < cursusArrays.length; i++){
      for (let e = 0; e < cursusArrayLength; e++){
        if (cursusArrays[i][e] != null){
          switch (e){
            case 0:
              cursussen.push({
                id: 0,
                titel: '',
                code: '',
                duur: 0,
                cursusInstanties: []
              });
              cursussen[i].titel = this.RemoveTextFromCursusPart(cursusArrays[i][e], 'Titel: ', '', '');
            break;
            case 1:
              cursussen[i].code = this.RemoveTextFromCursusPart(cursusArrays[i][e], 'Cursuscode: ', '', '');
            break;
            case 2:
              cursussen[i].duur = +(this.RemoveTextFromCursusPart(cursusArrays[i][e], 'Duur: ', ' dagen', ''));
            break;
            case 3:
              cursussen[i].cursusInstanties.push({id: 0, startDatum: new Date(this.RemoveTextFromCursusPart(cursusArrays[i][e], 'StartDatum: ', /(\d+[/])(\d+[/])/, '$2$1') )});
            break;
          }
        }
      }
    }

    cursussen.pop();
    return cursussen;
  }

  SplitFullFile(fullFile: any): Array<string>{
    return fullFile.toString().split('\n');
  }

  SliceSplitFile(splitFile: Array<string>, i: number, cursusArrayLength: number): Array<string>{
    return splitFile.slice(i, i+cursusArrayLength);
  }

  RemoveTextFromCursusPart(originalValue: string, stringToBeRemoved: string, secondStringToBeRemoved:  string | RegExp, secondStringToBeReplacement: string): string{
    return originalValue.replace(stringToBeRemoved, '').replace(secondStringToBeRemoved, secondStringToBeReplacement);
  }
}
