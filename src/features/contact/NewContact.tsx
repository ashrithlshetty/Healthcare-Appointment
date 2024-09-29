import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Input from '../../components/Input'; // Custom Input component
import Row from '../../components/Row';
import { useLocation, useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@mui/material';
// import { toast } from 'react-hot-toast';
// import 'react-phone-number-input/style.css';
import Form from '../../components/Form';
import FormRowVertical from '../../components/FormRowVertical';
import {
  createUser,
  editContact,
  fetchContactById,
} from '../../services/realmServices';

interface FormData {
  name: string;
  phone: string;
  gender: string;
  dob: string;
  address1: string;
  address2: string;
  city: string;
  pincode: string;
}

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  margin: 10px 0;
  font-size: 20px;
  color: #000;
`;

export default function NewContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams({ strict: false });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      gender: '',
      dob: '',
      address1: '',
      address2: '',
      city: '',
      pincode: '',
    },
  });

  const phoneValue = watch('phone');

  const isEditContact = location.pathname.split('/')[1] === 'editcontact';

  useEffect(() => {
    async function fetchContact() {
      if (isEditContact && id !== undefined) {
        const data = await fetchContactById(id);
        for (const [key, value] of Object.entries(data)) {
          setValue(key as keyof FormData, value as string);
        }
      }
    }
    fetchContact();
  }, [isEditContact, id, setValue]);

  const onSubmit = async (data: FormData) => {
    if (isEditContact) {
      if (id === undefined) return;
      await editContact(id, data);
    } else {
      const newId = await createUser(data);
      navigate({ to: `/createAppointment/${newId?.insertedId.toString()}` });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical error={errors.name?.message}>
          <Input
            type="text"
            label="Name"
            value={watch('name')}
            onChangeText={(e) => {
              setValue('name', e.target.value);
              clearErrors('name');
            }}
            register={register('name', { required: 'Name is required' })}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.phone?.message}>
          <Input
            type="tel"
            label="Phone Number"
            value={phoneValue}
            onChangeText={(e) => {
              setValue('phone', e.target.value);
              clearErrors('phone');
            }}
            register={register('phone', {
              required: 'Phone number is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Content>
            <Row type="vertical">
              <Row size="xxLarge" type="horizontal" $contentposition="center">
                Gender:
                <Input
                  type="radio"
                  label="Male"
                  value="male"
                  register={register('gender', {
                    required: 'Gender is required',
                  })}
                />
                <Input
                  type="radio"
                  label="Female"
                  value="female"
                  register={register('gender')}
                />
              </Row>
            </Row>
          </Content>
        </FormRowVertical>
        <FormRowVertical error={errors.dob?.message}>
          <Input
            type="date"
            label="Date of Birth"
            value={watch('dob')}
            onChangeText={(e) => {
              setValue('dob', e.target.value);
              clearErrors('dob');
            }}
            register={register('dob', {
              required: 'Date of birth is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.address1?.message}>
          <Input
            type="text"
            label="Address Line 1"
            value={watch('address1')}
            onChangeText={(e) => {
              setValue('address1', e.target.value);
              clearErrors('address1');
            }}
            register={register('address1', {
              required: 'Address Line 1 is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Input
            type="text"
            label="Address Line 2"
            value={watch('address2')}
            onChangeText={(e) => setValue('address2', e.target.value)}
            register={register('address2')}
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
            register={register('city', {
              required: 'City is required',
            })}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.pincode?.message}>
          <Input
            type="text"
            label="Pin Code"
            value={watch('pincode')}
            onChangeText={(e) => {
              setValue('pincode', e.target.value);
              clearErrors('pincode');
            }}
            register={register('pincode', {
              required: 'Pincode is required',
            })}
          />
        </FormRowVertical>
        <Row $contentposition="center">
          <Button
            variant="outlined"
            type="submit"
            sx={{
              color: 'white',
              backgroundColor: '#5A9EEE',
              fontWeight: '700',
              font: 'Helvetica',
              fontSize: '15px',
              borderRadius: '12px',
              width: '100px',
              height: '45px',
              ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
            }}
          >
            {isEditContact ? 'Save' : 'Next'}
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
