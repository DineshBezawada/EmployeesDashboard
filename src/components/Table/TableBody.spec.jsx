import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableBody from "./TableBody";

const mockData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    avatar: "https://example.com/avatar2.jpg",
  },
];
const mockHeader = [
  { field: "id", label: "ID" },
  { field: "firstName", label: "First Name" },
  { field: "lastName", label: "Last Name" },
];
const mockHandleGetUserDetails = jest.fn();
describe("TableBody Component", () => {
  test("renders table rows and columns correctly", () => {
    render(
      <TableBody
        data={mockData}
        header={mockHeader}
        handleGetUserDetails={mockHandleGetUserDetails}
      />
    );
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length);

    mockData.forEach((row) => {
      expect(screen.getByText(row.id)).toBeInTheDocument();
      expect(screen.getByText(row.firstName)).toBeInTheDocument();
      expect(screen.getAllByText(row.lastName)[0]).toBeInTheDocument();
    });
  });
  test("calls handleGetUserDetails when ID link is clicked", () => {
    render(
      <TableBody
        data={mockData}
        header={mockHeader}
        handleGetUserDetails={mockHandleGetUserDetails}
      />
    );
    const idLink = screen.getByText("1");
    fireEvent.click(idLink);

    expect(mockHandleGetUserDetails).toHaveBeenCalledWith(1);
  });

  test("renders Img component with correct props", () => {
    render(
      <TableBody
        data={mockData}
        header={mockHeader}
        handleGetUserDetails={mockHandleGetUserDetails}
      />
    );
    const imgElements = screen.getAllByAltText("DK");
    expect(imgElements).toHaveLength(mockData.length);
    imgElements.forEach((img, index) => {
      expect(img).toHaveAttribute("src", mockData[index].avatar);
    });
  });
});
