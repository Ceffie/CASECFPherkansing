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
  public invoerenErrorMessage: String = '';
    
  private fileTypes = ['txt'];
  private cursusArrayLength: number = 5;

  constructor(private cursuservice: CursusService) { }

  ngOnInit(): void {
  }
  
  fileChanged(file: any) {
    if(this.fileIsAllowed(file.target)){
      this.invoerenErrorMessage = '';
      this.file = file.target.files[0];
    } else {
      this.invoerenErrorMessage = 'Bestand is niet in correct formaat.';
    }
  }

  fileIsAllowed(input: any): boolean {
    if (input.files && input.files[0]) {
        var extension = input.files[0].name.split('.').pop().toLowerCase(),  
            isSuccess = this.fileTypes.indexOf(extension) > -1;
        return isSuccess; 
    }
    return false;
  }

  postCursus(cursussen: Array<Cursus>){
    this.cursuservice.add(JSON.stringify(cursussen)).subscribe((data: any) => this.answerToPost = data);
  }

  uploadDocument() {
    this.invoerenErrorMessage = '';
    let fileReader = new FileReader();
    fileReader.onload = () => {
      const FullFile = fileReader.result;
      
      if(FullFile != null){
        try{
          this.postCursus(this.ReformToCursussenArray(FullFile));
          this.invoerenErrorMessage = '';
        } catch(error){
          let message;

          if (error instanceof String) {
            message = error;
          } else {
            message = String(error);
          }

          this.invoerenErrorMessage = message;
        }
      }
    }
    fileReader.readAsText(this.file);
  }

  ReformToCursussenArray(fullFile: any): Array<Cursus>{
    let splitFile: Array<string> = this.SplitFullFile(fullFile);
    let cursusArrays: Array<Array<string>> = [];
    let cursussen: Array<Cursus> = [];

    for (let i = 0; i < splitFile.length; i+=this.cursusArrayLength) {
      if(this.SliceSplitFile(splitFile, i).length > 1) {
        cursusArrays.push(this.SliceSplitFile(splitFile, i));
      }
    }
    for (let i = 0; i < cursusArrays.length; i++){
      for (let e = 0; e < this.cursusArrayLength; e++){
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
              this.ThrowIfIncorrectValue(cursusArrays[i][e], 'Titel: ', i, e);

              cursussen[i].titel = this.RemoveTextFromCursusPart(cursusArrays[i][e], 'Titel: ', '', '');
            break;
            case 1:
              this.ThrowIfIncorrectValue(cursusArrays[i][e], 'Cursuscode: ', i, e);

              cursussen[i].code = this.RemoveTextFromCursusPart(cursusArrays[i][e], 'Cursuscode: ', '', '');
            break;
            case 2:
              this.ThrowIfIncorrectValues(cursusArrays[i][e], 'Duur: ', i, e, ' dagen');

              cursussen[i].duur = +(this.RemoveTextFromCursusPart(cursusArrays[i][e], 'Duur: ', ' dagen', ''));
            break;
            case 3:
              this.ThrowIfIncorrectValues(cursusArrays[i][e], 'Startdatum: ', i, e, '/');

              cursussen[i].cursusInstanties.push({id: 0, startDatum: new Date(this.RemoveTextFromCursusPart(cursusArrays[i][e], 'Startdatum: ', /(\d+[/])(\d+[/])/, '$2$1') )});
            break;
            case 4:
              this.ThrowIfNotEmpty(cursusArrays[i][e], i, e);
            break;
          }
        }
      }
    }
    return cursussen;
  }

  SplitFullFile(fullFile: any): Array<string>{
    return fullFile.toString().split('\n');
  }

  SliceSplitFile(splitFile: Array<string>, i: number): Array<string>{
    return splitFile.slice(i, i+this.cursusArrayLength);
  }

  RemoveTextFromCursusPart(originalValue: string, stringToBeRemoved: string, secondStringToBeRemoved:  string | RegExp, secondStringToBeReplacement: string): string{
    return originalValue.replace(stringToBeRemoved, '').replace(secondStringToBeRemoved, secondStringToBeReplacement);
  }

  ThrowIfIncorrectValue(value: string, removable1: string, i: number, e: number) {
    if(!value.includes(removable1)){
      throw 'Bestand is niet in correct formaat op regel ' + String(i*this.cursusArrayLength + e + 1) + '. Er zijn geen cursusinstanties toegevoegd.'
    }
  }

  ThrowIfIncorrectValues(value: string, removable1: string, i: number, e: number, removable2: string) {
    if(!value.includes(removable1) || !value.includes(removable2)){
      throw 'Bestand is niet in correct formaat op regel ' + String(i*this.cursusArrayLength + e + 1) + '. Er zijn geen cursusinstanties toegevoegd.'
    }
  }

  ThrowIfNotEmpty(value: string, i: number, e: number){
    if(value){
      throw 'Bestand is niet in correct formaat op regel ' + String(i*this.cursusArrayLength + e + 1) + '. Er zijn geen cursusinstanties toegevoegd.'
    }
  }
}
