// import React from 'react';
import {
  Avatar,
  Button,
  // Card,
  // CardHeader,
  // CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  // Favorite as HeartIcon,
  Visibility as EyeIcon,
  //   NotificationsIcon,
} from '@mui/icons-material';
import Row from '../../components/Row';
import { FaTooth, FaHeartbeat, FaEye } from 'react-icons/fa';
import { RiBrainLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import { color } from 'framer-motion';
// Styled components
const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
  background:
    'linear-gradient(to bottom, #c1d3e6 0%, #dfe9f0 20%, #eaeaea 100%)',

  borderRadius: '20px',
});

const Header = styled('header')({
  width: '100%',
  //   background: 'linear-gradient(to right, #192e46, #022ffb)',
  background:
    'linear-gradient(to bottom, rgba(79, 95, 239, 0.5), rgba(35, 35, 234, 0.5)), linear-gradient(to right, #226abc, #022ffb)',
  padding: '2rem',
  color: 'white',
  borderRadius: '20px 20px 5px 5px',
});

const GreetingText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

const Main = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '1rem',
  gap: '1.5rem',
});

const Section = styled('section')({});

const CategoryContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
});

const CategoryIconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '5rem',
  height: '5rem',
  backgroundColor: 'white',
  borderRadius: '9999px',
  transition: 'background-color 0.3s, transform 0.3s', // Optional: smooth transition for hover effects
  //   backgroundColor: 'black',
  '&:hover': {
    backgroundColor: '#435ff0', // Change background color on hover
    transform: 'scale(1.0)', // Slightly enlarge the container on hover
  },
});

const categories = {
  Dental: FaTooth,
  Eye: FaEye,
  Heart: FaHeartbeat,
  Brain: RiBrainLine,
  A: FaTooth,
  R: EyeIcon,

  // Add other categories and their corresponding icons here
};
// const categories = {
//   'Dental': EyeIcon,
//   'Heart': Tooth,
//   'Eyes': '',
//   'Brain': '',
//   'Back': '',
// };
const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* padding-top: 20; */
  }
`;
export default function Dashboard() {
  //   const constraintsRef = useRef(null);

  return (
    <Container>
      <Header>
        <Row type="vertical">
          <Row>
            <Row $contentposition="left">
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  border: '2px solid white',
                  marginBottom: 0,
                }}
                alt="User"
                src="/placeholder-user.jpg"
              />
            </Row>
            <Row $contentposition="right">
              <IconButton>
                <NotificationsIcon
                  fontSize="large"
                  style={{ color: 'white' }}
                />
              </IconButton>
            </Row>
          </Row>
          <GreetingText>
            <Typography variant="body2">
              Good Morning and stay healthy
            </Typography>
            <Typography variant="h6">Hi Jeny, how are you?</Typography>
          </GreetingText>
        </Row>
      </Header>
      <Main>
        <Section>
          <Typography
            variant="h6"
            style={{ marginTop: 2, marginBottom: 20, fontWeight: 600 }}
          >
            Categories
          </Typography>
          <CategoryContainer>
            <StyledSwiper slidesPerView={4} spaceBetween={30}>
              {Object.entries(categories).map(([category, Icon], index) => (
                <SwiperSlide key={index}>
                  <CategoryIconContainer>
                    <Icon style={{ color: '#f7d8b9' }} />
                  </CategoryIconContainer>
                  <Row
                    $contentposition="center"
                    size="large"
                    style={{ fontSize: 16, marginTop: 15, fontWeight: 600 }}
                  >
                    {category}
                  </Row>
                </SwiperSlide>
              ))}
            </StyledSwiper>
          </CategoryContainer>
        </Section>
        <Section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Recommended Doctors</Typography>
            <Button variant="text" style={{ color: '#4299e1' }}>
              See All
            </Button>
          </div>
          {/* <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
            {[
              {
                name: 'Dr. Amelia Daniel',
                specialty: 'Dermatologist',
                img: '/placeholder-doctor1.jpg',
              },
              {
                name: 'Dr. Erik Wagner',
                specialty: 'Urology',
                img: '/placeholder-doctor2.jpg',
              },
              {
                name: 'Dr. Benjamin Smith',
                specialty: 'Cardiologist',
                img: '/placeholder-doctor3.jpg',
              },
            ].map((doctor, index) => (
              <Card key={index} style={{ width: '12rem' }}>
                <CardHeader
                  avatar={<Avatar src={doctor.img} alt={doctor.name} />}
                  title={<Typography variant="h6">{doctor.name}</Typography>}
                  subheader={
                    <Typography variant="body2">{doctor.specialty}</Typography>
                  }
                />
                <CardActions>
                  <IconButton>
                    <HeartIcon style={{ color: '#e53e3e' }} />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </div> */}
        </Section>
        <Section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Consultation Schedule</Typography>
            <Button variant="text" style={{ color: '#4299e1' }}>
              See All
            </Button>
          </div>
          {/* <Card
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              marginTop: '1rem',
            }}
          >
            <Avatar src="/placeholder-user.jpg" alt="Dr. Jackson Moraes" />
            <div>
              <Typography variant="h6">Dr. Jackson Moraes</Typography>
              <Typography variant="body2">Dermatology & Leprosy</Typography>
            </div>
          </Card> */}
        </Section>
      </Main>
      {/* <Footer>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <FooterButton>
            <HomeIcon />
          </FooterButton>
          <FooterButton>
            <SearchIcon />
          </FooterButton>
          <FooterButton>
            <UserIcon />
          </FooterButton>
        </div>
      </Footer> */}
    </Container>
  );
}
