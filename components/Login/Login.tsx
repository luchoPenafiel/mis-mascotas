import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import cookie from 'js-cookie';
import { Title1 } from '../Types/Titles/Titles';
import Container from '../Container/Container';
import theme from '../../constants/theme';
import TextField from '@material-ui/core/TextField';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { login } from '../../services';
import Router from 'next/router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 0;

  box-sizing: border-box;
`;

const Title = styled(Title1)``;

const Subtitle = styled(Title1)`
  margin-bottom: 30px;

  font-weight: ${theme.fontStyle.medium};
`;

const InputWrapper = styled.div`
  margin-bottom: 30px;
`;

const ForgotPasswordLink = styled.a`
  color: ${theme.color.gray1};
  text-decoration: none;
  font-size: 14px;
  font-family: ${theme.fontFamily.primary};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
`;

const CreateUser = styled.a`
  display: block;
  margin-top: 15px;

  color: ${theme.color.primary};
  text-decoration: none;
  font-size: 22px;
  font-family: ${theme.fontFamily.primary};
  font-weight: ${theme.fontStyle.semibold};
`;

const Logo = styled.img`
  display: block;

  width: 25%;
  max-height: 100px;
  margin: 0 auto;
`;

const Error = styled.p`
  color: ${theme.color.error};
  text-align: center;
  font-family: ${theme.fontFamily.primary};
  font-size: 18px;
  font-weight: ${theme.fontStyle.regular};
`;

const Login = (): ReactElement => {
  const [errorServices, setErrorServices] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ email, password }) => {
    // eslint-disable-next-line no-console
    console.log('Logeando...');

    try {
      setErrorServices('');

      const response = await login(email, password);
      const token = response.stsTokenManager.accessToken;

      cookie.set('token', token, { expires: 1 * 360 });
      Router.push('/');
    } catch (err) {
      setErrorServices(err.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <div>
          <Title>Hola.</Title>
          <Subtitle>Comencemos</Subtitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper>
              <TextField
                name="email"
                label="Email"
                fullWidth
                type="email"
                InputProps={{
                  inputProps: {
                    name: 'email',
                    ref: register({ required: 'Tienes que ingresar tu email' }),
                  },
                }}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                name="password"
                label="Contraseña"
                fullWidth
                type="password"
                InputProps={{
                  inputProps: {
                    name: 'password',
                    ref: register({ required: 'Tienes que ingresar tu contraseña' }),
                  },
                }}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </InputWrapper>
            <NextLink href={`/forgot-password`} passHref>
              <ForgotPasswordLink>¿Olvidaste tu contraseña?</ForgotPasswordLink>
            </NextLink>
            <ButtonWrapper>
              <Button type="submit">
                <>Ingresar</>
              </Button>

              <NextLink href={`/signup`} passHref>
                <CreateUser>o crear usuario</CreateUser>
              </NextLink>
            </ButtonWrapper>
          </form>
          <Error>{errorServices}</Error>
        </div>

        <Logo src="/images/logo.svg" alt="Vetapp" />
      </Wrapper>
    </Container>
  );
};

export default Login;