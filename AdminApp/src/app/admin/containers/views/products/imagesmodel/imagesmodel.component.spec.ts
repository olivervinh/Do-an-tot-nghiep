import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagesmodelComponent } from './imagesmodel.component';
describe('ImagesmodelComponent', () => {
  let component: ImagesmodelComponent;
  let fixture: ComponentFixture<ImagesmodelComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesmodelComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
