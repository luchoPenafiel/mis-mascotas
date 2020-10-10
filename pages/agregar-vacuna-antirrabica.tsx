import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  Button,
  CenterButton,
  Container,
  ErrorText,
  InputWrapper,
  Loading,
  PageWrapper,
  Navbar,
  Separetor,
  Splashscreen,
  StickyTitles,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { PetContext } from '../contexts/PetContext';
import { addVacunaAntirrabica, getLocalStorage, setLocalStorage } from '../services';
import IPet from '../interfaces/pet';
import IUser from '../interfaces/user';

const AgregarVacuna = (): ReactElement => {
  const [showSplashScreen, setShowSplasScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorService, setErrorService] = useState('');

  const [petData, setPetData] = useState<IPet>();
  const [userData, setUserData] = useState<IUser>();

  const { pet, changeStatePet } = useContext(PetContext);
  const { register, handleSubmit, errors } = useForm();

  const loadInitialUserData = async () => {
    const userFromLocalStorage = await getLocalStorage('user');
    setUserData(userFromLocalStorage);

    setShowSplasScreen(false);
  };

  const loadInitialData = async () => {
    const petFromLocalStorage = await getLocalStorage('pet');
    setPetData(petFromLocalStorage);
  };

  const onSubmit = async (data) => {
    if (!data.fecha && !data.proximaDosis) {
      setErrorService('Debes agregar al menos una fecha');

      return;
    }

    setErrorService('');
    setIsLoading(true);

    const carnetSanitario = {
      vacAntirrabica: {
        fecha: data.fecha,
        proximaDosis: data.proximaDosis,
      },
      otrasVacunas: [...petData.carnetSanitario.otrasVacunas],
    };

    try {
      await addVacunaAntirrabica({
        petId: petData.id,
        petName: petData.nombre,
        tutorData: userData,
        carnetSanitario,
        vacunControl: data,
      });

      changeStatePet({ ...petData, carnetSanitario });
      await setLocalStorage('pet', { ...petData, carnetSanitario });

      Router.replace('/success-vacuna');
      setIsLoading(false);
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pet.id) {
      setPetData(pet);
    } else {
      loadInitialData();
      loadInitialUserData();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna Antirrábica | Vetapp</title>
      </Head>
      {showSplashScreen ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar previusScreen="carnet" />
          <PageWrapper>
            <Container>
              <Separetor />
              <StickyTitles>
                <>
                  <Title1>Vacuna</Title1>
                  <Title1>antirrábica</Title1>
                </>
              </StickyTitles>
              <Separetor />

              <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                  <TextField
                    name="fecha"
                    label="Fecha"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'fecha',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.fecha)}
                    helperText={errors.fecha?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="proximaDosis"
                    label="Próxima dosis"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'proximaDosis',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.proximaDosis)}
                    helperText={errors.proximaDosis?.message}
                  />
                </InputWrapper>

                <ErrorText>{errorService}</ErrorText>

                <Separetor />
                <CenterButton>
                  <Button type="submit" color="primary">
                    <>Agregar</>
                  </Button>
                </CenterButton>
              </form>
            </Container>
          </PageWrapper>
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default AgregarVacuna;
