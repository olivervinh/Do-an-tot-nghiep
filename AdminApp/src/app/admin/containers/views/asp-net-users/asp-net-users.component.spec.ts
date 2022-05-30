import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AspNetUsersComponent } from './asp-net-users.component';
describe('AspNetUsersComponent', () => {
  let component: AspNetUsersComponent;
  let fixture: ComponentFixture<AspNetUsersComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspNetUsersComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AspNetUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
