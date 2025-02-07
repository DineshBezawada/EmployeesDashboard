import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableHeader from './TableHeader';

const mockHeader = [
  { field: 'firstName', name: 'First Name' },
  { field: 'lastName', name: 'Last Name' },
  { field: 'jobTitle', name: 'Job Title' },
];
const mockSetFilterType = jest.fn();

describe('TableHeader Component', () => {
  const renderComponent = (filterType) =>
    render(
      <table>
        <TableHeader header={mockHeader} filterType={filterType} setFilterType={mockSetFilterType} />
      </table>
    );
test('renders table headers correctly', () => {
    renderComponent({ type: '', isReverse: false, isFilterClicked: false });
    mockHeader.forEach((column) => {
      expect(screen.getByText(column.name)).toBeInTheDocument();
    });
  });
test('calls setFilterType with correct arguments on header click', () => {
    renderComponent({ type: '', isReverse: false, isFilterClicked: false });
    const firstNameHeader = screen.getByText('First Name');
    fireEvent.click(firstNameHeader);
    expect(mockSetFilterType).toHaveBeenCalledWith({
      type: 'firstName',
      isReverse: false,
      isFilterClicked: true,
    });
  });
test('toggles isReverse when the same header is clicked', () => {
    renderComponent({ type: 'firstName', isReverse: false, isFilterClicked: true });
    const firstNameHeader = screen.getByText('First Name');
    fireEvent.click(firstNameHeader);
    expect(mockSetFilterType).toHaveBeenCalledWith({
      type: 'firstName',
      isReverse: true,
      isFilterClicked: true,
    });
  });
test('renders arrow buttons with correct opacity', () => {
    renderComponent({ type: 'firstName', isReverse: false, isFilterClicked: true });
    const downArrow = screen.getAllByText('▼')[0];
    const upArrow = screen.getAllByText('▲')[0];
    expect(downArrow).toHaveStyle('opacity: 1');
    expect(upArrow).toHaveStyle('opacity: 0.5');
  });
});