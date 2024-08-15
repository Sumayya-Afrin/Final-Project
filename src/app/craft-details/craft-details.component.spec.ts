import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftDetailsComponent } from './craft-details.component';

describe('CraftDetailsComponent', () => {
  let component: CraftDetailsComponent;
  let fixture: ComponentFixture<CraftDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraftDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CraftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
