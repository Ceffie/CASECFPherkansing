import { ComponentFixture, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { CursusService } from '../cursus.service';
import { Cursus } from '../models/Cursus';
import { CursusInstantie } from '../models/CursusInstantie';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CursusLijstComponent } from './cursus-lijst.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CursusLijstComponent', () => {
  let component: CursusLijstComponent;
  let fixture: ComponentFixture<CursusLijstComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusLijstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursusService],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CursusLijstComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create multiple cursussen from multiple instanties', fakeAsync(() => {
    const cursusInstanties: Array<any> = [
      {
        id: 11,
        startDatum: "2022-10-07T22:00:00+00:00"
      },
      {
        id: 22,
        startDatum: "2018-10-07T22:00:00+00:00"
      }
    ];

    const testCursussen: Array<Cursus> = 
    [
      {
        id: 1,
        titel: 'Test Titel',
        code: '0123CODE',
        duur: 3,
        cursusInstanties: cursusInstanties
      }
    ];

    expect(component.seperateCursusInstances(testCursussen).length).toBe(2);
    expect(component.seperateCursusInstances(testCursussen)[0].titel).toBe('Test Titel');
    expect(component.seperateCursusInstances(testCursussen)[1].titel).toBe('Test Titel');
    expect(component.seperateCursusInstances(testCursussen)[0].startDatum).toEqual("2018-10-07T22:00:00+00:00");
    expect(component.seperateCursusInstances(testCursussen)[1].startDatum).toEqual("2022-10-07T22:00:00+00:00");
    
    component.cursusInstantiesData = component.seperateCursusInstances(testCursussen);

    expect(component.cursusInstantiesData.length).toBe(2);
  }));

  it('should return an ordered array', () => {
    let TestInput: Array<any> = 
    [
      {
        duur: 1,
        titel: "Object 1",
        startDatum: "2018-10-07T22:00:00+00:00"
      },
      {
        duur: 2,
        titel: "Object 2",
        startDatum: "2022-10-07T22:00:00+00:00"
      },      
      {
        duur: 3,
        titel: "Object 3",
        startDatum: "2018-11-07T22:00:00+00:00"
      }
    ]

    expect(component.sortArray(TestInput, "startDatum").length).toBe(3);

    let ExpectedOutput: Array<any> = 
    [
      {
        duur: 1,
        titel: "Object 1",
        startDatum: "2018-10-07T22:00:00+00:00"
      },
      {
        duur: 3,
        titel: "Object 3",
        startDatum: "2018-11-07T22:00:00+00:00"
      },
      {
        duur: 2,
        titel: "Object 2",
        startDatum: "2022-10-07T22:00:00+00:00"
      }
    ]

    expect(component.sortArray(TestInput, "startDatum")).toEqual(ExpectedOutput);
  });
});
