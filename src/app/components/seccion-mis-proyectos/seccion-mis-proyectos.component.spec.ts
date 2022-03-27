import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionMisProyectosComponent } from './seccion-mis-proyectos.component';

describe('SeccionMisProyectosComponent', () => {
  let component: SeccionMisProyectosComponent;
  let fixture: ComponentFixture<SeccionMisProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionMisProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionMisProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
