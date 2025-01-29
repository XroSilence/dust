// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import test from 'node:test';

test('renders Home component for the root path', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

test('renders Quote component for the /quote path', () => {
  render(
    <MemoryRouter initialEntries={['/quote']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Quote/i)).toBeInTheDocument();
});

test('renders Services component for the /services path', () => {
  render(
    <MemoryRouter initialEntries={['/services']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Services/i)).toBeInTheDocument();
});

test('renders Contact component for the /contact path', () => {
  render(
    <MemoryRouter initialEntries={['/contact']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});

test('renders Areas component for the /areas path', () => {
  render(
    <MemoryRouter initialEntries={['/areas']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Areas/i)).toBeInTheDocument();
});

test('renders AdminLogin component for the /admin/login path', () => {
  render(
    <MemoryRouter initialEntries={['/admin/login']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
});

test('renders SetupTwoFactor component for the /admin/setup-2fa path', () => {
  render(
    <MemoryRouter initialEntries={['/admin/setup-2fa']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Setup Two Factor/i)).toBeInTheDocument();
});

test('renders AdminDashboard component for the /admin/dashboard path', () => {
  render(
    <MemoryRouter initialEntries={['/admin/dashboard']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
});

function expect(arg0: any) {
  throw new Error('Function not implemented.');
}
