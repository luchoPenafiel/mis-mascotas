import React, { ReactElement, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Router from 'next/router';
import { PetContext } from '../contexts/PetContext';
import { getLocalStorage } from '../services';
import {
  Button,
  CardDetail,
  Container,
  EmptyState,
  Navbar,
  Splashscreen,
  PageWrapper,
  Separetor,
  StickyTitles,
} from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { Title1 } from '../components/Types/Titles/Titles';
import IPet from '../interfaces/pet';
import formatDate from '../utils/formatDate';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 100px;
`;

const CarnetSanitario = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [petData, setPetData] = useState<IPet>();
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetData(response);
    setLoading(false);
  };

  const handleClickEmptyStateButton = () => {
    Router.replace('/mi-veterinaria');
  };

  useEffect(() => {
    setLoading(true);

    if (!!pet.id) {
      setPetData(pet);
      setLoading(false);
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Carnet Sanitario | Vetapp</title>
      </Head>
      <Navbar previusScreen="mascota" />
      {loading ? (
        <Splashscreen />
      ) : (
        <PageWrapper>
          <Container>
            {petData?.carnetSanitario ? (
              <>
                <Separetor />
                <StickyTitles>
                  <Title1>Carnet Sanitario</Title1>
                </StickyTitles>
                <Separetor />

                {petData?.carnetSanitario?.vacAntirrabica && (
                  <CardDetail title="Vacuna Antirrábica">
                    <>
                      <ParagraphMD>
                        <strong>Fecha</strong>{' '}
                        {petData?.carnetSanitario?.vacAntirrabica?.fecha
                          ? formatDate(petData?.carnetSanitario?.vacAntirrabica?.fecha)
                          : '-'}
                      </ParagraphMD>
                      <ParagraphMD>
                        <strong>Próxima dosis</strong>{' '}
                        {petData?.carnetSanitario?.vacAntirrabica?.proximaDosis
                          ? formatDate(petData?.carnetSanitario?.vacAntirrabica?.proximaDosis)
                          : '-'}
                      </ParagraphMD>
                    </>
                  </CardDetail>
                )}

                {petData?.carnetSanitario?.otrasVacunas?.length &&
                  petData.carnetSanitario.otrasVacunas.map((vacuna, idx) => {
                    return (
                      <CardDetail title={vacuna.nombre} key={`${vacuna.nombre}-${idx}`}>
                        <>
                          <ParagraphMD>
                            <strong>Fecha</strong> {vacuna.fecha ? formatDate(vacuna.fecha) : '-'}
                          </ParagraphMD>
                          <ParagraphMD>
                            <strong>Próxima dosis</strong> {vacuna.proximaDosis ? formatDate(vacuna.proximaDosis) : '-'}
                          </ParagraphMD>
                        </>
                      </CardDetail>
                    );
                  })}
              </>
            ) : (
              <EmptyState>
                <>
                  <ParagraphMD>{petData.nombre} no tiene vacunas cargadas todavía.</ParagraphMD>
                  <ParagraphMD>¡Pide turno a la veterinaria!</ParagraphMD>
                  <ButtonWrapper>
                    <Button onClick={handleClickEmptyStateButton}>
                      <>Mi Veterinaria</>
                    </Button>
                  </ButtonWrapper>
                </>
              </EmptyState>
            )}
          </Container>
        </PageWrapper>
      )}
    </>
  );
};

export default CarnetSanitario;