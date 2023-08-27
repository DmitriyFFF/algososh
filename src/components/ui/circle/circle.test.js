import React from 'react';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle', () => {
  it('Кружок без буквы рендерится без ошибок', () => {
    const tree = renderer
    .create(<Circle />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кружок с буквой рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle letter='letter'/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок с head рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle head={'head'}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок с react-элементом в head рендерится без ошибок', () => {
    const tree = renderer
    .create(<Circle head={<Circle />} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок с tail рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle tail={'tail'}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок с react-элементом в tail рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок с index рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle index={0} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок с пропом isSmall рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle isSmall />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок в состоянии default рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок в состоянии changing рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кружок в состоянии modified рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
})
