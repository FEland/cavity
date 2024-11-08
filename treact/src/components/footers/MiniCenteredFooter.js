import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {Container as ContainerBase } from "components/misc/Layouts.js"
import logo from "../../images/tooth.png";
// import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
// import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
// import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";


const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider hover:text-gray-700`;

// const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
// const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

// const SocialLinksContainer = tw.div`mt-10`;
// const SocialLink = styled.a`
//   ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
//   svg {
//     ${tw`w-5 h-5`}
//   }
// `;

const Actions = styled.div`
scroll-behavior: smooth;

${tw`mb-8 lg:mb-0`}
.action {
${tw`text-center inline-block w-full sm:w-24 py-4 font-semibold rounded hocus:outline-none focus:shadow-outline transition duration-300 `}
}
.primaryAction {
${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
}
.secondaryAction {
${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
}
`;

const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`
export default () => {
  return (
    <div id="footer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="action primaryAction fixed bottom-10 right-10 p-4 rounded-full z-50 text-2xl font-bold">
    <Container>
      <Content>
        <Row>

        {/* <Actions>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="action primaryAction fixed bottom-10 right-10 p-4 rounded-full z-50 text-2xl font-bold">
        ↑
        </button>
      </Actions> */}
          <LogoContainer >
            <LogoImg src={logo} />
                    <Actions>

            <LogoText>cavity</LogoText>
          </Actions>

          </LogoContainer>
          {/* <LinksContainer>
            <Link href="#">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Careers</Link>
          </LinksContainer>
          <SocialLinksContainer>
            <SocialLink href="https://facebook.com">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://twitter.com">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://youtube.com">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer> */}
          <CopyrightText>
            &copy; Copyright 2024, Cavity Inc. All Rights Reserved.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
    </div>
  );
};
