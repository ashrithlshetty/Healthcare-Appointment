import styled, { css } from 'styled-components';

interface FormProps{
    type?: 'regular' | 'modal';
}
const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 0rem 1rem;

    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 100%;
    `}
    overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;
