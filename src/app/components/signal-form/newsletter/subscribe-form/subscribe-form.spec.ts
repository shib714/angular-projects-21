import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeForm } from './subscribe-form';

describe('SubscribeForm', () => {
  let component: SubscribeForm;
  let fixture: ComponentFixture<SubscribeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
