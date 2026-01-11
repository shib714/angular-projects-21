import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initialData } from '../subscription';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form when cancel is called', () => {
    // Arrange
    component.subscribeModel.set({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      yearsAsFan: 5,
      phone: '',
      sendViaEmail: true,
      sendViaText: false
    });

    // Act
    component.cancel();

    // Assert
    expect(component.subscribeModel()).toEqual(initialData);
  });

  it('should set success message and reset form on valid subscription', async () => {
    // Arrange
    const testData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      yearsAsFan: 10,
      phone: '',
      sendViaEmail: true,
      sendViaText: false
    };
    component.subscribeModel.set(testData);

    // Act
    component.subscribe();
    await fixture.whenStable(); // Wait for async operations

    // Assert
    expect(component.subscribeMessage()).toBe('Thank you for your subscription Jane Doe!');
    expect(component.subscribeModel()).toEqual(initialData);
  });
});