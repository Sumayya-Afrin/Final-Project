import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftListComponent } from './craft-list.component';

describe('CraftListComponent', () => {
  let component: CraftListComponent;
  let fixture: ComponentFixture<CraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraftListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
