import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Row from '../../components/Row';
import { useUser } from '../../context/userContext';
import { updateCompanyInfo } from '../../services/realmServices';
import { toast } from 'react-hot-toast';
import Input from '../../components/Input';
import Form from '../../components/Form';
import FormRowVertical from '../../components/FormRowVertical';

export interface FormData {
  companyName: string;
  phone: string;
  companyAddress: {
    line1: string;
    line2: string;
  };
  city: string;
  pinCode: string;
}

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

export default function CompanyInfo() {
  const { user, setUser, fetchUserProfile } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      companyName: '',
      phone: '',
      companyAddress: {
        line1: '',
        line2: '',
      },
      city: '',
      pinCode: '',
    },
  });
  
const phoneValue = watch('phone');
  useEffect(() => {
    if (user) {
      setValue('companyName', user.companyName || '');
      setValue('phone', user.mobile || '');
      setValue('companyAddress.line1', user.companyAddress?.line1 || '');
      setValue('companyAddress.line2', user.companyAddress?.line2 || '');
      setValue('city', user.companyAddress?.city || '');
      setValue('pinCode', user.companyAddress?.pinCode || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!isDirty) {
      toast.error('Please update any changes to save the company info');
      return;
    }
    if (user === null) return;
    await updateCompanyInfo(user._id, data);
    const updatedUser = await fetchUserProfile();
    if (updatedUser) {
      setUser(updatedUser);
    }
  };


  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical error={errors.companyName?.message}>
          <Input
            type="text"
            label="Company Name"
            value={watch('companyName')}
            onChangeText={(e) => {
              setValue('companyName', e.target.value);
              clearErrors('companyName');
            }}
            register={register('companyName', {
              required: 'Company Name is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.phone?.message}>
          <Input
            type="tel"
            label="Phone Number"
            value={phoneValue}
            onChangePhone={(value) => setValue('phone', value)}
            register={register('phone', {
              required: 'Phone number is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.companyAddress?.line1?.message}>
          <Input
            type="text"
            label="Address Line 1"
            value={watch('companyAddress.line1')}
            onChangeText={(e) => {
              setValue('companyAddress.line1', e.target.value);
              clearErrors('companyAddress.line1');
            }}
            register={register('companyAddress.line1')}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.companyAddress?.line2?.message}>
          <Input
            type="text"
            label="Address Line 2"
            value={watch('companyAddress.line2')}
            onChangeText={(e) => {
              setValue('companyAddress.line2', e.target.value);
              clearErrors('companyAddress.line2');
            }}
            register={register('companyAddress.line2')}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.city?.message}>
          <Input
            type="text"
            label="City"
            value={watch('city')}
            onChangeText={(e) => {
              setValue('city', e.target.value);
              clearErrors('city');
            }}
            register={register('city', { required: 'City is required' })}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.pinCode?.message}>
          <Input
            type="text"
            label="Pin Code"
            value={watch('pinCode')}
            onChangeText={(e) => {
              setValue('pinCode', e.target.value);
              clearErrors('pinCode');
            }}
            register={register('pinCode', { required: 'Pin Code is required' })}
          />
        </FormRowVertical>
        <Row $contentposition="center">
          <Button
            variant="outlined"
            sx={{
              width: '172px',
              borderRadius: '12px',
              height: '53px',
              boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
              backgroundColor: '#5a9eee',
              color: 'white',
              textTransform: 'none',
              fontSize: '25px',
              alignItems: 'center',
              fontWeight: '700',
              ':hover': { backgroundColor: '#5a9eee', color: 'white' },
            }}
            type="submit"
          >
            Save
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
