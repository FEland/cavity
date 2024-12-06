import React from 'react';
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import Header from "components/headers/topOfPage.js";


import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:mt-0 text-center max-w-lg mx-auto lg:max-w-none lg:text-left md:ml-12 lg:ml-20`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end md:mr-12 lg:mr-20`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`mt-5 lg:mt-8 text-base xl:text-lg break-words whitespace-normal` ;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;



export default ({ roundedHeaderButton, onOpenModal }) => {
 
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} onOpenModal={onOpenModal} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Find The Best Dentists 
              </Heading>

            <Heading tw="text-primary-500">anywhere in the U.K
            </Heading>
            <DecoratorBlob1 />

            <Paragraph>
            Stop stressing. Tooth hurts? We can help. 
            <br/>
            Finding a Dentist has never been so easy.
            </Paragraph>

            {/* <Actions>
              <input type="text" placeholder="Your E-mail Address" />
              <button onClick={() => fetchUserLocation()}>Get Started</button>
            </Actions> */}
            {/* <TwoColumn> */}
            {/* <Actions>

            <button onClick={() => fetchUserLocation()} >
              {userLocation ? userLocation : 'Find Me '}  < LocationIcon/>
            </button>            
              </Actions> */}

            {/* </TwoColumn> */}
            {/* <CustomersLogoStrip>
              <p>Our TRUSTED Customers</p>
              <img src={CustomersLogoStripImage} alt="Our Customers" />
            </CustomersLogoStrip> */}
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={"https://www.cityorthopeds.com/wp-content/uploads/2015/05/Young-girl-sitting-on-dental-chair-getting-her-teeth-checked-by-a-dentist.jpg"} alt="Design Illustration" />
            </IllustrationContainer>
            
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
