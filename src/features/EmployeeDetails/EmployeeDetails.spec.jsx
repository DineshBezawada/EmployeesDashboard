import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeDetails from './EmployeeDetails';

jest.mock('../../components/Modal', () => ({ children, isOpen, onClose }) => (
  isOpen ? <div data-testid="modal">{children}</div> : null
));
jest.mock('../../components/FallbackImg', () => ({ src, alt, className, fallbackSrc }) => (
  <img src={src} alt={alt} className={className} data-fallback-src={fallbackSrc} />
));
const mockEmployeeDetails = {
  id: 1,
  avatar: 'https://example.com/avatar.jpg',
  firstName: 'John',
  lastName: 'Doe',
  jobTitle: 'Developer',
  age: 30,
  dateJoined: '2022-01-01T00:00:00Z',
  bio: 'A skilled developer.',
};
describe('EmployeeDetails Component', () => {
  const renderComponent = (props) =>
    render(
      <EmployeeDetails
        isModalOpen={true}
        handleCloseModal={jest.fn()}
        isLoading={false}
        employeeDetails={mockEmployeeDetails}
        {...props}
      />
    );
test('renders modal when isModalOpen is true', () => {
    renderComponent();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
test('renders loading text when isLoading is true', () => {
    renderComponent({ isLoading: true });
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
test('renders employee details when isLoading is false', () => {
    renderComponent();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Role : Developer')).toBeInTheDocument();
    expect(screen.getByText('Age : 30')).toBeInTheDocument();
expect(screen.getByText('Joined : 2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('A skilled developer.')).toBeInTheDocument();
  });
test('renders Img component with correct props', () => {
    renderComponent();
    const imgElement = screen.getByAltText('avatar');
    expect(imgElement).toHaveAttribute('src', mockEmployeeDetails.avatar);
expect(imgElement).toHaveAttribute('data-fallback-src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8D7EiZNqJsZh69o1HwqweT66YLoXVu-VTZKZxWNDtZTjUBeVtZAOLPw&s');
  });
});