import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCraftComponent } from './edit-craft.component';

describe('EditCraftComponent', () => {
  let component: EditCraftComponent;
  let fixture: ComponentFixture<EditCraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCraftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
