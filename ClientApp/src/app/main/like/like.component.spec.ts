import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeComponent } from './like.component';
describe('ContactComponent', () => {
  let component: LikeComponent;
  let fixture: ComponentFixture<LikeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
