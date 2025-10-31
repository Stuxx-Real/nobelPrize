import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureateDialog } from './laureate-dialog';

describe('LaureateDialog', () => {
  let component: LaureateDialog;
  let fixture: ComponentFixture<LaureateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaureateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaureateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
