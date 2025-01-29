import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactFormModal from './ContactFormModal';
import { beforeEach, describe, it } from 'node:test';

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

describe('ContactFormModal', () => {
  beforeEach(() => {
    render(<ContactFormModal onSubmit={mockOnSubmit} onClose={mockOnClose} />);
  });

  it('renders the form fields correctly', () => {
    expect(screen.getByLabelText(/Name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('displays validation errors for required fields', () => {
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid phone number is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with valid data', () => {
    fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone \*/i), { target: { value: '+1234567890' } });
    fireEvent.change(screen.getByLabelText(/Company/i), { target: { value: 'Example Inc.' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello, this is a test message.' } });

    fireEvent.click(screen.getByText(/Continue/i));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      company: 'Example Inc.',
      message: 'Hello, this is a test message.'
    });
  });

  it('calls onClose when close button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});

function expect(arg0: any) {
  throw new Error('Function not implemented.');
}
