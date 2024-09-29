// ** React Imports
import { useState, ChangeEvent, MouseEvent } from 'react';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';
import { app } from '../../firebase';
// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';

import Google from 'mdi-material-ui/Google';
import Facebook from 'mdi-material-ui/Facebook';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
// import OAuth from '../../components/OAuth';

interface State {
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '100%' },
  //   [theme.breakpoints.down('sm')]: { width: '100%', margin: theme.spacing(2) },
  marginTop: 0,
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const Login = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });
  const [login, setLogin] = useState(false);

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  async function handleOAuthLogin(providerName: string) {
    if (providerName === 'google') {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      return result;
    } else if (providerName === 'facebook') {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      return result;
    }
  }
  return (
    <Card sx={{ zIndex: 1 }}>
      <CardContent
        sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}
      >
        <Box
          sx={{
            mb: 5,
            transition: 'all 0.5s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              ml: 0,
              marginTop: -10,
              lineHeight: 0,
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '1.5rem !important',
            }}
          >
            {login ? 'Login In' : 'Sign In'}
          </Typography>
        </Box>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          {!login && (
            <TextField
              autoFocus
              fullWidth
              id="username"
              label="Username"
              sx={{ marginBottom: 4 }}
            />
          )}
          <TextField
            fullWidth
            type="email"
            label="Email"
            sx={{ marginBottom: 4 }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="auth-register-password">Password</InputLabel>
            <OutlinedInput
              label="Password"
              value={values.password}
              id="auth-register-password"
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label="toggle password visibility"
                  >
                    {values.showPassword ? (
                      <EyeOutline fontSize="small" />
                    ) : (
                      <EyeOffOutline fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              marginBottom: 5,
              marginTop: 5,
              transition: 'margin-bottom 0.3s ease-in-out',
            }}
          >
            {login ? 'Login' : 'Sign up'}
          </Button>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ marginRight: 2 }}>
              {!login ? 'Already have an account?' : 'Dont have an Account?'}
            </Typography>
            <Typography variant="body2">
              <div
                onClick={() => setLogin(!login)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <LinkStyled>
                  {login ? 'Sign in instead' : 'Login instead'}
                </LinkStyled>
              </div>
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }}>or</Divider>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              marginBottom: -3,
            }}
          >
            <IconButton
              component="a"
              onClick={() => handleOAuthLogin('facebook')}
            >
              <Facebook fontSize="large" sx={{ color: '#497ce2' }} />
            </IconButton>

            <IconButton
              component="a"
              onClick={() => handleOAuthLogin('google')}
            >
              <Google fontSize="large" sx={{ color: '#db4437' }} />
            </IconButton>
          </Box>
        </form>
      </CardContent>
    </Card>
    // </Box>
  );
};

export default Login;
