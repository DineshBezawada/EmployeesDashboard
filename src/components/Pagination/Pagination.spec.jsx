import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const renderComponent = (props) => render(<Pagination {...props} />);
  test("dispatches setCurrentPage action on page click", () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 1,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const pageNumber = screen.getByText("3");
    fireEvent.click(pageNumber);
    expect(mockUpdateCurrentPage).toHaveBeenCalledWith(3);
  });
  test("renders correct page numbers", () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 1,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const pageNumbers = screen.getAllByRole("button");
    expect(pageNumbers).toHaveLength(9);
  });
  test("does not dispatch setCurrentPage action on invalid page click", () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 500,
      pageDataLimit: 10,
      currentPage: 1,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const pageNumber = screen.getByText("...");
    fireEvent.click(pageNumber);
    expect(mockUpdateCurrentPage).not.toHaveBeenCalled();
  });
  test('disables "First" and "Prev" buttons on first page', () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 1,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const firstButton = screen.getByText("First");
    const prevButton = screen.getByText("Prev");
    expect(firstButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });
  test('disables "Last" and "Next" buttons on last page', () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 5,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const lastButton = screen.getByText("Last");
    const nextButton = screen.getByText("Next");
    expect(lastButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
  test("Able to test First button is Working", () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 5,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const pageNumber = screen.getByText("First");
    fireEvent.click(pageNumber);
    expect(mockUpdateCurrentPage).toHaveBeenCalledWith(1);
  });
  test("Able to test Prev button is Working", () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 5,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const pageNumber = screen.getByText("Prev");
    fireEvent.click(pageNumber);
    expect(mockUpdateCurrentPage).toHaveBeenCalledWith(4);
  });
  test("Able to test Next button is Working", () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 1,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const pageNumber = screen.getByText("Next");
    fireEvent.click(pageNumber);
    expect(mockUpdateCurrentPage).toHaveBeenCalledWith(2);
  });
  test("Able to test Last button is Working", () => {
    const mockUpdateCurrentPage = jest.fn();
    renderComponent({
      totalRecords: 50,
      pageDataLimit: 10,
      currentPage: 1,
      updateCurrentPage: mockUpdateCurrentPage,
    });
    const pageNumber = screen.getByText("Last");
    fireEvent.click(pageNumber);
    expect(mockUpdateCurrentPage).toHaveBeenCalledWith(5);
  });
});
