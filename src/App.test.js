import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppContext } from './utils/appContext';
import App from './App';
import Card from './components/card';
import Modal from './components/modal';

// Dummy context value
const mockContextValue = {
  errorLoading: false,
};

jest.mock('./api/home.requests', () => ({
  useGetPhotos: () => jest.fn(() => Promise.resolve([
    {
      albumId: 1,
      id: 1,
      title: 'Photo 1',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952'
    },
    {
      albumId: 1,
      id: 2,
      title: 'reprehenderit est deserunt velit ipsam',
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796'
    }
  ])),
}));

// Test for rendering App component
test('renders App component', async () => {
  render(
    <AppContext.Provider value={mockContextValue}>
      <App />
    </AppContext.Provider>
  );
  const appElement = screen.getByTestId('app-component');
  expect(appElement).toBeInTheDocument();

  const photoElements = await screen.findAllByTestId('card-component');
  expect(photoElements).toHaveLength(2);
});

// Test for rendering Card component
test('renders Card component', () => {
  render(<Card id="1" url="https://via.placeholder.com/600/92c952" title="Photo 1" thumbnailUrl="https://via.placeholder.com/150/92c952" description="Description 1" />);
  const cardElement = screen.getByTestId('card-component');
  expect(cardElement).toBeInTheDocument();
});

// Test for opening Modal component
test('renders Modal component', () => {
  render(<Modal isOpen={true} data={{ id: '1', url: 'https://via.placeholder.com/600/92c952', title: 'Photo 1', description: 'Description 1' }} onClose={() => {}} onSave={() => {}} />);
  const modalElement = screen.getByTestId('modal-component');
  expect(modalElement).toBeInTheDocument();
});

// Test for opening Modal on card click
test('opens Modal on card click', async () => {
  render(
    <AppContext.Provider value={mockContextValue}>
      <App />
    </AppContext.Provider>
  );

  const photoElements = await screen.findAllByTestId('card-component');
  userEvent.click(photoElements[0]);

  const modalElement = await screen.findByTestId('modal-component');
  expect(modalElement).toBeVisible();
});

// Test for saving a description in localStorage
test('saves description in localStorage', async () => {
  render(
    <AppContext.Provider value={mockContextValue}>
      <App />
    </AppContext.Provider>
  );

  const photoElements = await screen.findAllByTestId('card-component');
  userEvent.click(photoElements[0]);

  const modalElement = await screen.findByTestId('modal-component');
  expect(modalElement).toBeVisible();

  const descriptionTextarea = screen.getByPlaceholderText('Add a description');
  userEvent.clear(descriptionTextarea);
  userEvent.type(descriptionTextarea, 'New Description');
  
  const saveButton = screen.getByText('Save');
  userEvent.click(saveButton);

  expect(localStorage.getItem('1')).toBe('New Description');
});

// Test for loading description from localStorage
test('loads description from localStorage', async () => {
  localStorage.setItem('1', 'Saved Description');

  render(
    <AppContext.Provider value={mockContextValue}>
      <App />
    </AppContext.Provider>
  );

  const photoElements = await screen.findAllByTestId('card-component');
  userEvent.click(photoElements[0]);

  const modalElement = await screen.findByTestId('modal-component');
  expect(modalElement).toBeVisible();

  const descriptionTextarea = screen.getByPlaceholderText('Add a description');
  expect(descriptionTextarea.value).toBe('Saved Description');
});

// Test for handling image load error in Modal
test('displays fallback image when image fails to load in Modal', async () => {
  render(
    <Modal isOpen={true} data={{ id: '1', url: 'https://invalid.url', title: 'Photo 1', description: 'Description 1' }} onClose={() => {}} onSave={() => {}} />
  );

  const modalElement = screen.getByTestId('modal-component');
  expect(modalElement).toBeInTheDocument();

  const modalImage = screen.getByAltText('Photo 1');
  fireEvent.error(modalImage);
  await waitFor(() => expect(modalImage).toHaveAttribute('src', '/error-image-generic.png'));
});

// Test for handling image load error in Card
test('displays fallback image when image fails to load in Card', async () => {
  render(<Card id="1" url="https://invalid.url" title="Photo 1" thumbnailUrl="https://invalid.url" description="Description 1" />);

  const cardElement = screen.getByTestId('card-component');
  expect(cardElement).toBeInTheDocument();

  const cardImage = screen.getByAltText('Photo 1');
  fireEvent.error(cardImage);
  await waitFor(() => expect(cardImage).toHaveAttribute('src', '/error-image-generic.png'));
});
