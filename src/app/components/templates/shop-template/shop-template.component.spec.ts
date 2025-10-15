import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTemplateComponent } from './shop-template.component';

describe('ShopTemplateComponent', () => {
  let component: ShopTemplateComponent;
  let fixture: ComponentFixture<ShopTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
