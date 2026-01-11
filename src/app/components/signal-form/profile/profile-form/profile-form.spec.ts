import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileForm } from './profile-form';
import { defaultProfile } from '../profile';

describe('ProfileForm', () => {
  let component: ProfileForm;
  let fixture: ComponentFixture<ProfileForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reset the form when cancel is called', () => {
    // Arrange
    component.profileFormModel.set({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      password: 'password123',
      confirmPassword: 'password123',
      hasEmergencyContact: true,
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '123-456-7890'
    });

    // Act
    component.cancel();

    // Assert
    expect(component.profileFormModel()).toEqual(defaultProfile);
  });

  it('should set success message and reset form on valid profile', async () => {
    // Arrange
    const testData = {  
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      password: 'password1',
      confirmPassword: 'password1',
      hasEmergencyContact: true,
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '123-456-7890'
    };
    component.profileFormModel.set(testData);

    // Act
    component.saveProfile();
    await fixture.whenStable(); // Wait for async operations

    // Assert 
    expect(component.profileFormModel()).toBe(defaultProfile);

  }); 


});
