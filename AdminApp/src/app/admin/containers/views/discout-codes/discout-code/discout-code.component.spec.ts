import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscoutCodeComponent } from './discout-code.component';
describe('DiscoutCodeComponent', () => {
  let component: DiscoutCodeComponent;
  let fixture: ComponentFixture<DiscoutCodeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoutCodeComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoutCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
