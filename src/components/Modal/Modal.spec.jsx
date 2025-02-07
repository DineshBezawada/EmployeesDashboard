import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index';

describe('Modal Component', () => {
test('renders children when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });
test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });
test('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByText('X'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
test('sets body overflow to hidden when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });
test('sets body overflow to auto when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('auto');
  });
test('resets body overflow to auto on unmount', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });
});