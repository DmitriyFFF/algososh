import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortingPage } from './sorting-page';
import { choiceSort, bubbleSort } from '../../utils/constants';

describe('Тестирование алгоритмов сортировки выбором', () => {
  it('Корректно сортирует пустой массив', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    )
    const choiceRadio = screen.getByTestId('choiceRadio');
    const ascButton = screen.getByTestId('ascendingButton');
    const desButton = screen.getByTestId('descendingButton');

    const arr = [];
    const testArr = [];

    fireEvent.click(choiceRadio);
    expect(choiceRadio).toBeChecked();

    userEvent.click(ascButton);
    userEvent.click(desButton);
    expect(choiceSort(arr)).toEqual(testArr);
  });

  it('Корректно сортирует массив из одного элемента', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    )
    const choiceRadio = screen.getByTestId('choiceRadio');
    const ascButton = screen.getByTestId('ascendingButton');
    const desButton = screen.getByTestId('descendingButton');

    const arr = ['1'];
    const testArr = ['1'];

    fireEvent.click(choiceRadio);
    expect(choiceRadio).toBeChecked();

    userEvent.click(ascButton);
    userEvent.click(desButton);
    expect(choiceSort(arr)).toEqual(testArr);
  });

  it('Корректно сортирует массив из нескольких элементов', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    )
    const choiceRadio = screen.getByTestId('choiceRadio');
    const ascButton = screen.getByTestId('ascendingButton');
    const desButton = screen.getByTestId('descendingButton');

    const arr = ['3', '1', '8', '5'];
    const testAscArr = ['1', '3', '5', '8'];
    const testDesArr = ['8', '5', '3', '1'];

    fireEvent.click(choiceRadio);
    expect(choiceRadio).toBeChecked();

    userEvent.click(ascButton);
    waitFor(() => {
      expect(choiceSort(arr)).toEqual(testAscArr);
    })

    userEvent.click(desButton);
    waitFor(() => {
      expect(choiceSort(arr)).toEqual(testDesArr);
    })
  });
});

describe('Тестирование алгоритмов сортировки пузырьком', () => {
  it('Корректно сортирует пустой массив', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    )
    const bubbleRadio = screen.getByTestId('bubbleRadio');
    const ascButton = screen.getByTestId('ascendingButton');
    const desButton = screen.getByTestId('descendingButton');

    const arr = [];
    const testArr = [];

    fireEvent.click(bubbleRadio);
    expect(bubbleRadio).toBeChecked();

    userEvent.click(ascButton);
    userEvent.click(desButton);
    expect(bubbleSort(arr)).toEqual(testArr);
  });

  it('Корректно сортирует массив из одного элемента', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    )
    const bubbleRadio = screen.getByTestId('bubbleRadio');
    const ascButton = screen.getByTestId('ascendingButton');
    const desButton = screen.getByTestId('descendingButton');

    const arr = ['1'];
    const testArr = ['1'];

    fireEvent.click(bubbleRadio);
    expect(bubbleRadio).toBeChecked();

    userEvent.click(ascButton);
    userEvent.click(desButton);
    expect(bubbleSort(arr)).toEqual(testArr);
  });

  it('Корректно сортирует массив из нескольких элементов', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    )
    const bubbleRadio = screen.getByTestId('bubbleRadio');
    const ascButton = screen.getByTestId('ascendingButton');
    const desButton = screen.getByTestId('descendingButton');

    const arr = ['3', '1', '8', '5'];
    const testAscArr = ['1', '3', '5', '8'];
    const testDesArr = ['8', '5', '3', '1'];

    fireEvent.click(bubbleRadio);
    expect(bubbleRadio).toBeChecked();

    userEvent.click(ascButton);
    waitFor(() => {
      expect(bubbleSort(arr)).toEqual(testAscArr);
    })

    userEvent.click(desButton);
    waitFor(() => {
      expect(bubbleSort(arr)).toEqual(testDesArr);
    })
  });
})
