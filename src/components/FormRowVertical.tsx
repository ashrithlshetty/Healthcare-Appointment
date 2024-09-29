import styled from 'styled-components';

interface FormRowProps{
    label?: string;
    error?:string;
    children?: React.ReactNode;
}
const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.1 0;
`;


const Error = styled.span`
  margin-left: 2rem;
  font-size: 1rem;
  color: var(--color-red-700);
  margin-top: -1.5rem;
`;

import PropTypes from 'prop-types';

function FormRowVertical({ error, children }:FormRowProps) {

  return (
    <StyledFormRow>
      {/* {label && <Label htmlFor={children?.props.id}>{label}</Label>} */}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

FormRowVertical.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormRowVertical;
