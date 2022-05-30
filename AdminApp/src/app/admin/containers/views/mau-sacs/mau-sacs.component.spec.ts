import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MauSacsComponent } from './mau-sacs.component';
describe('MauSacsComponent', () => {
  let component: MauSacsComponent;
  let fixture: ComponentFixture<MauSacsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MauSacsComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(MauSacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
