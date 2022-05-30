import { TestBed } from '@angular/core/testing';
import { FileToUploadService } from './file-to-upload.service';
describe('FileToUploadService', () => {
  let service: FileToUploadService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileToUploadService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
