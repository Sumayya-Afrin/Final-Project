import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftsComponent } from './crafts.component';

describe('CraftsComponent', () => {
  let component: CraftsComponent;
  let fixture: ComponentFixture<CraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
