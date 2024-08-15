import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCraftComponent } from './search-craft.component';

describe('SearchCraftComponent', () => {
  let component: SearchCraftComponent;
  let fixture: ComponentFixture<SearchCraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCraftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
