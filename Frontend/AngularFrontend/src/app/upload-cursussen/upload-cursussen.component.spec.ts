import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { CursusService } from '../cursus.service';
import { Cursus } from '../models/Cursus';

import { UploadCursussenComponent } from './upload-cursussen.component';

describe('UploadCursussenComponent', () => {
  let component: UploadCursussenComponent;
  let fixture: ComponentFixture<UploadCursussenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCursussenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursusService],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(UploadCursussenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should split a string by breaks', fakeAsync(() => {
    let str: string = 'Testline 1 \nTestline 2';

    expect(component.SplitFullFile(str)).toEqual(['Testline 1 ', 'Testline 2']);
  }));

  it('should slice an array of strings by a certain length', fakeAsync(() => {
    let strArr: Array<string> = ['1', '2', '3', '4'];
    expect(component.SliceSplitFile(strArr, 0, 2)).toEqual(['1', '2']);
  }));

  it('should change string so first part is removed', fakeAsync(() => {
    let originalString: string = 'Remove me: Do not remove me';
    let removable: string = 'Remove me: ';
    expect(component.RemoveTextFromCursusPart(originalString, removable, '', '')).toEqual('Do not remove me');
  }));

  it('should change string so first part is removed and second is removed', fakeAsync(() => {
    let originalString: string = 'Remove me: Do not remove me (Do remove me)';
    let removable: string = 'Remove me: ';
    let secondRemovable: string = ' (Do remove me)';
    expect(component.RemoveTextFromCursusPart(originalString, removable, secondRemovable, '')).toEqual('Do not remove me');
  }));

  it('should change string so first part is removed and second is remade', fakeAsync(() => {
    let originalString: string = 'Remove me: 15/10/2018';
    let removable: string = 'Remove me: ';
    let regExRemover = /(\d+[/])(\d+[/])/;
    let regExReplacer = '$2$1';
    expect(component.RemoveTextFromCursusPart(originalString, removable, regExRemover, regExReplacer)).toEqual('10/15/2018');
  }));

  it('should reform string to array of cursussen', fakeAsync(() => {
    let originalString: string = 
`Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 3 dagen
Startdatum: 8/10/2018

Titel: Java Persistence API
Cursuscode: JPA
Duur: 2 dagen
Startdatum: 15/10/2018
    
`;

    let expectedCursusArray: Array<Cursus> = 
    [
      {id: 0, titel: 'C# Programmeren', code: 'CNETIN', duur: 3, cursusInstanties: [{id: 0, startDatum: new Date('Mon Oct 08 2018 00:00:00 GMT+0200 (Central European Summer Time)')}]}, 
      {id: 0, titel: 'Java Persistence API', code: 'JPA', duur: 2, cursusInstanties: [{id: 0, startDatum: new Date('Mon Oct 15 2018 00:00:00 GMT+0200 (Central European Summer Time)')}]}
    ]
    
    expect(component.ReformToCursussenArray(originalString)).toEqual(expectedCursusArray);
  }));
});
