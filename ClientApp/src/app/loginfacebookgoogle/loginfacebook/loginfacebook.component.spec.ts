import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginfacebookComponent } from './loginfacebook.component';
describe('LoginfacebookComponent', () => {
  let component: LoginfacebookComponent;
  let fixture: ComponentFixture<LoginfacebookComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginfacebookComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
