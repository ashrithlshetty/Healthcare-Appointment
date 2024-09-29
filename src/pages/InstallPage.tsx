import { useState, useEffect } from 'react';
import Input from '../components/Input';
import styled from 'styled-components';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DeferredPrompt,
  handleBeforeInstallPrompt,
  handleAppInstalled,
  handleInstallClick,
} from '../features/install/InstallPage';
import Row from '../components/Row';
import { useLoginApi } from '../services/useLoginApi';
import Login from '../features/user/Login';

// Extend the Navigator interface to include the standalone property
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

const First = styled.div`
  background-color: lightgray;
  padding: 20px;
  margin-top: 50px;
`;

const Logo = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const Welcome = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #000;
`;

const Second = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Note = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 16px;
  color: #000;
`;

const InstallPage = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);
  const [isInstallButtonClicked, setIsInstallButtonClicked] = useState(false);
  const [role, setRole] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const { login } = useLoginApi();
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPrompt | null>(
    null
  );

  useEffect(() => {
    const beforeInstallPromptHandler = (e: Event) =>
      handleBeforeInstallPrompt(e, setDeferredPrompt, setShowInstallPrompt);
    const appInstalledHandler = () => handleAppInstalled(setShowInstallPrompt);

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    window.addEventListener('appinstalled', appInstalledHandler);

    // Check if the app is already installed
    const isAppInstalled =
      window.navigator.standalone ||
      window.matchMedia('(display-mode: standalone)').matches;
    setShowInstallPrompt(!isAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler
      );
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(apiKey,role);
  };

  return (
    <>
    {role != 'user' && (
      <First>
        <Logo>LOGO</Logo>
        <Welcome>Welcome</Welcome>
      </First>
    )}
      <Second>
        {!showInstallPrompt ? (
          <div>
            <LoadingButton
              variant="outlined"
              loading={isInstallButtonClicked}
              loadingIndicator="Loading…"
              sx={{
                color: isInstallButtonClicked ? 'black' : 'white',
                backgroundColor: isInstallButtonClicked ? 'white' : 'black',
                width: '229px',
                height: '60px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                textAlign: 'center',
                font: 'Helvetica',
                ':hover': { backgroundColor: 'black', color: 'white' },
              }}
              onClick={() => {
                handleInstallClick(
                  deferredPrompt,
                  setShowInstallPrompt,
                  () => {},
                  setDeferredPrompt,
                  setIsInstallButtonClicked
                );
                setIsInstallButtonClicked(true);
              }}
              size="large"
            >
              Install Now
            </LoadingButton>
            <Note>Note: To proceed please install first</Note>
          </div>
      
        ) : (
          <div>
            {!role ? (
              <div>
                <h2>Select Role</h2>
                <Row $contentposition="center">
                  <Button
                    variant="outlined"
                    onClick={() => setRole('user')}
                    sx={{
                      color: 'white',
                      width: '172px',
                      textTransform: 'none',
                      height: '53px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '700',
                      textAlign: 'center',
                      boxShadow: ' 0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                      backgroundColor: '#5A9EEE',
                      ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
                      margin: '10px',
                    }}
                  >
                    User Login
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setRole('receptionist')}
                    sx={{
                      color: 'white',
                      width: '172px',
                      textTransform: 'none',
                      height: '53px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '700',
                      textAlign: 'center',
                      boxShadow: ' 0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                      backgroundColor: '#5A9EEE',
                      ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
                      margin: '10px',
                    }}
                  >
                    Receptionist Login
                  </Button>
                </Row>
              </div>
            ) : (
              role === 'receptionist' ? (
              <form onSubmit={handleLogin}>
                <Row $contentposition="center">
                  <Input
                    type="text"
                    label="key"
                    placeholder="Enter the key"
                    value={apiKey}
                    onChangeText={(e) => setApiKey(e.target.value)}
                  />
                </Row>
                <Row $contentposition="center">
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      color: 'white',
                      width: '172px',
                      textTransform: 'none',
                      height: '53px',
                      borderRadius: '12px',
                      fontSize: '25px',
                      fontWeight: '700',
                      textAlign: 'center',
                      boxShadow: ' 0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                      backgroundColor: '#5A9EEE',
                      ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
                    }}
                  >
                    LOGIN
                  </Button>
                </Row>
              </form>
              ):(
                <Login/>
              )
            )}
          </div>
        )}
      </Second>
    </>
  );
};

export default InstallPage;
