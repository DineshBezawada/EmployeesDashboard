import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';
jest.mock('../Loader/Loader', () => () => <div data-testid="loader">Loading...</div>);
jest.mock('./TableHeader', () => () => <thead data-testid="table-header"></thead>);
jest.mock('./TableBody', () => () => <tbody data-testid="table-body"></tbody>);
jest.mock('../Pagination/Pagination', () => () => <div data-testid="pagination"></div>);
const mockHeader = [
  { field: 'firstName', name: 'First Name' },
  { field: 'lastName', name: 'Last Name' },
  { field: 'jobTitle', name: 'Job Title' },
];

const mockData = [
  { id: 1, firstName: 'John', lastName: 'Doe', jobTitle: 'Developer' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', jobTitle: 'Designer' },
];
describe('Table Component', () => {
  const renderComponent = (props) =>
    render(
<Table
        header={mockHeader}
        data={mockData}
        loading={false}
        paginate={false}
        totalRecords={mockData.length}
        filterType={{ type: '', isReverse: false, isFilterClicked: false }}
        setFilterType={jest.fn()}
        pageDataLimit={5}
        handleGetUserDetails={jest.fn()}
        currentPage={1}
        updateCurrentPage={jest.fn()}
        {...props}
      />
    );
test('renders loader when loading is true', () => {
    renderComponent({ loading: true });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders table header and body', () => {
    renderComponent();
    expect(screen.getByTestId('table-header')).toBeInTheDocument();
    expect(screen.getByTestId('table-body')).toBeInTheDocument();
  });

  test('renders pagination when paginate is true', () => {
    renderComponent({ paginate: true });
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
test('does not render pagination when paginate is false', () => {
    renderComponent({ paginate: false });
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});