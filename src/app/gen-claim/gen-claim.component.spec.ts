import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenClaimComponent } from './gen-claim.component';

describe('GenClaimComponent', () => {
  let component: GenClaimComponent;
  let fixture: ComponentFixture<GenClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
