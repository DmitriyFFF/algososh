import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

it('Кнопка с текстом рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text='Text' />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кнопка без текста рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Заблокированная кнопка рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button disabled/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button isLoader/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Нажатие на кнопку вызывает корректный alert', () => {
  window.alert = jest.fn();

      // Рендерим компонент
  render(<Button text='Text' onClick={() => window.alert('Вызов колбека при клике на кнопку')} />)

      // Находим элемент кнопки
  const button = screen.getByText('Text');

      // Имитируем нажатие на кнопку
  fireEvent.click(button);

      // Проверяем, что alert сработал с правильным текстом предупреждения
  expect(window.alert).toHaveBeenCalledWith('Вызов колбека при клике на кнопку');
});
