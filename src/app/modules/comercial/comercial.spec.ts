import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comercial } from './comercial';

describe('Comercial', () => {
  let component: Comercial;
  let fixture: ComponentFixture<Comercial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comercial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comercial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
