import React from 'react';
import styled from 'styled-components';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface BaseInputProps {
  label: string;
  id?: string;
  placeholder?: string;
  width?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  readOnly?: boolean;
  onChangePhone?: (value: string) => void;
}
interface TextInputProps extends BaseInputProps {
  type: 'text' | 'tel' | 'radio' | 'number' | 'date';
  
}
interface TelInputProps extends BaseInputProps {
  type: 'tel';
  onChangePhone: (value: string) => void;
}
type InputProps = TextInputProps | TelInputProps;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div<{ width?: string }>`
  position: relative;
  margin: 24px 0;
  border-radius: 12px;
  width: ${(props) => props.width || '350px'};
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 12px;
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 5px;
  height: 53px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(10, 17, 23, 0.4);
  }
`;

const StyledPhoneInputWrapper = styled.div`
  .react-international-phone-country-selector-button {
    padding: 0 12px;
    font-size: 12px;
    border-radius: 5px;
    height: 53px;
  }
  .react-international-phone-input {
    width: 100%;
    padding: 12px;
    font-size: 12px;
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 5px;
    height: 53px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;

    & input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 12px;
    }

    &:focus-within {
      outline: none;
      box-shadow: 0 0 8px rgba(10, 17, 23, 0.4);
    }
  }
`;

const InputLabel = styled.label`
  position: absolute;
  top: -12px;
  left: 12px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 14px;
  color: #000;
  transition:
    top 0.3s ease,
    font-size 0.3s ease,
    color 0.3s ease;
  pointer-events: none;
`;

const RadioInput = styled.input`
  margin-right: 8px;
`;

const RadioLabel = styled.label`
  font-size: 16px;
  color: #000;
`;

const Input: React.FC<InputProps> = ({
  label,
  width,
  register,
  type = 'text',
  value,
  onChangeText,
  onChangePhone,
  ...rest
}) => {
  return (
    <CenteredContainer>
      {type === 'radio' ? (
        <>
          <RadioInput type="radio" {...register} {...rest} />
          <RadioLabel>{label}</RadioLabel>
        </>
      ) : type === 'tel' ? (
        <InputContainer width={width}>
          <StyledPhoneInputWrapper>
            <PhoneInput
              defaultCountry="in"
              value={value}
              onChange={(phone) => {
                onChangePhone && onChangePhone(phone);
                register && register.onChange({
                  target: { value: phone, name: register.name },
                });
              }}
              {...rest}
            />
          </StyledPhoneInputWrapper>
          <InputLabel>{label}</InputLabel>
        </InputContainer>
      ) : (
        <InputContainer width={width}>
          <InputField
            type={type}
            value={value}
            onChange={onChangeText}
            {...rest}
          />
          <InputLabel>{label}</InputLabel>
        </InputContainer>
      )}
    </CenteredContainer>
  );
};
Input.defaultProps = {
  placeholder: '',
  readOnly: false,
};
export default Input;
