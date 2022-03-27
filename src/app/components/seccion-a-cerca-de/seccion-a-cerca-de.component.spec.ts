import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionACercaDeComponent } from './seccion-a-cerca-de.component';

describe('SeccionACercaDeComponent', () => {
  let component: SeccionACercaDeComponent;
  let fixture: ComponentFixture<SeccionACercaDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionACercaDeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionACercaDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
