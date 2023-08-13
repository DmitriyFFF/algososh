import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StringComponent } from './string';

describe('Тестирование алгоритма разворота строки', () => {
  it('Корректно разворачивает строку с четным количеством символов', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId('inputValue');
    const button = screen.getByTestId('submitButton');
    const evenString = 'even';
    const reverseEvenString = [...evenString].reverse().join('');

    userEvent.type(input, evenString);
    fireEvent.click(button);

    waitFor(() => {
      const circles = screen.getByTestId('circles');
      const result = circles.map((item) => item.textContent).join('');
      expect(result).toBe(reverseEvenString);
      }
    )
  });

  it('Корректно разворачивает строку с нечетным количеством символов', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId('inputValue');
    const button = screen.getByTestId('submitButton');
    const oddString = 'odd';
    const reverseOddString = [...oddString].reverse().join('');

    userEvent.type(input, oddString);
    fireEvent.click(button);

    waitFor(() => {
      const circles = screen.getByTestId('circles');
      const result = circles.map((item) => item.textContent).join('');
      expect(result).toBe(reverseOddString);
      }
    )
  });

  it('Корректно разворачивает строку с одним символом', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId('inputValue');
    const button = screen.getByTestId('submitButton');
    const letter = 'a';
    const reverseLetter = [...letter].reverse().join('');

    userEvent.type(input, letter);
    fireEvent.click(button);

    waitFor(() => {
      const circles = screen.getByTestId('circles');
      const result = circles.map((item) => item.textContent).join('');
      expect(result).toBe(reverseLetter);
      }
    )
  });

  it('Корректно разворачивает пустую строку', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId('inputValue');
    const button = screen.getByTestId('submitButton');
    const emptyString = '';
    const reverseEmptyString = [...emptyString].reverse().join('');

    userEvent.type(input, emptyString);
    fireEvent.click(button);

    waitFor(() => {
      const circles = screen.getByTestId('circles');
      const result = circles.map((item) => item.textContent).join('');
      expect(result).toBe(reverseEmptyString);
      }
    )
  });
})
