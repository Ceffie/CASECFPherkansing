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
    let strArr: Array<string> = ['1', '2', '3', '4', '5', '6'];
    expect(component.SliceSplitFile(strArr, 0)).toEqual(['1', '2', '3', '4', '5']);
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

  it('should throw if string has incorrect order', fakeAsync(() => {
    let originalString: string = 
`Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 3 dagen
Startdatum: 8/10/2018

Titel: Java Persistence API
Duur: 2 dagen
Cursuscode: JPA
Startdatum: 15/10/2018

`;
    
    expect(function (){ component.ReformToCursussenArray(originalString) }).toThrow('Bestand is niet in correct formaat op regel 7. Er zijn geen cursusinstanties toegevoegd.');
  }));

  it('should throw if string has incorrect breaks', fakeAsync(() => {
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
    
    expect(function (){ component.ReformToCursussenArray(originalString) }).toThrow('Bestand is niet in correct formaat op regel 5. Er zijn geen cursusinstanties toegevoegd.');
  }));

  it('should throw if string has incorrect date form', fakeAsync(() => {
    let originalString: string = 
`Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 3 dagen
Startdatum: 8/10/2018

Titel: Java Persistence API
Cursuscode: JPA
Duur: 2 dagen
Startdatum: 15-10-2018

`;
    
    expect(function (){ component.ReformToCursussenArray(originalString) }).toThrow('Bestand is niet in correct formaat op regel 9. Er zijn geen cursusinstanties toegevoegd.');
  }));
  
  it('should throw if values do not contain string with first removable', fakeAsync(() => {
    let originalString: string = 'Remove me: Do not remove me (Do remove me)';
    let removable: string = 'Not there: ';
    let secondRemovable: string = ' (Do remove me)';
    expect(function(){ component.ThrowIfIncorrectValues(originalString, removable, 3, 2, secondRemovable); }).toThrow('Bestand is niet in correct formaat op regel 18. Er zijn geen cursusinstanties toegevoegd.');
  }));
  
  it('should throw if values do not contain string with second removable', fakeAsync(() => {
    let originalString: string = 'Remove me: Do not remove me (Do remove me)';
    let removable: string = 'Remove me: ';
    let secondRemovable: string = ' (Do NOT remove me)';
    expect(function(){ component.ThrowIfIncorrectValues(originalString, removable, 3, 2, secondRemovable); }).toThrow('Bestand is niet in correct formaat op regel 18. Er zijn geen cursusinstanties toegevoegd.');
  }));
  
  it('should throw if value does not contain string', fakeAsync(() => {
    let originalString: string = 'Remove me: Do not remove me';
    let removable: string = 'Not there: ';
    expect(function(){ component.ThrowIfIncorrectValue(originalString, removable, 3, 2); }).toThrow('Bestand is niet in correct formaat op regel 18. Er zijn geen cursusinstanties toegevoegd.');
  }));

  it('should throw if value contains anything', fakeAsync(() => {
    let originalString: string = 'Anything at all';
    expect(function(){ component.ThrowIfNotEmpty(originalString, 3, 2); }).toThrow('Bestand is niet in correct formaat op regel 18. Er zijn geen cursusinstanties toegevoegd.');
  }));
  
  it('should not throw if values do contain strings', fakeAsync(() => {
    let originalString: string = 'Remove me: Do not remove me (Do remove me)';
    let removable: string = 'Remove me: ';
    let secondRemovable: string = ' (Do remove me)';
    expect(function(){ component.ThrowIfIncorrectValues(originalString, removable, 3, 2, secondRemovable); }).not.toThrow();
  }));
  
  it('should not throw if value does contain string', fakeAsync(() => {
    let originalString: string = 'Remove me: Do not remove me.';
    let removable: string = 'Remove me: ';
    expect(function(){ component.ThrowIfIncorrectValue(originalString, removable, 3, 2); }).not.toThrow();
  }));

  it('should not throw if value contains nothing', fakeAsync(() => {
    let originalString: string = '';
    expect(function(){ component.ThrowIfNotEmpty(originalString, 3, 2); }).not.toThrow();
  }));
});
