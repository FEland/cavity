// src/App.jsx
import React from 'react';
import GlobalStyles from 'styles/GlobalStyles';
import styled from "styled-components";

import tw from "twin.macro";

import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";


// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
import { BrowserRouter as Router } from 'react-router-dom';

// import Hero3 from "components/hero/FullWidthWithImage.js";
import Hero from "components/hero/TwoColumnWithInput";
// import TopOfPage from 'components/headers/topOfPage';
// import Features from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature from "components/features/ThreeColSimple.js"
// import FAQ from "components/faqs/SimpleWithSideImage.js";
// import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
// import Footer from "components/footers/MiniCenteredFooter.js";
// import DenGrid from 'components/cards/DenGrid.js'
// import DenGrid3 from 'components/cards/DenGrid3.js'

// import AllOnMap7 from 'components/cards/AllOnMap7.js'
// import DentistMap from 'components/cards/DentistMap.js'

// import HotelTravelLandingPage from 'demos/HotelTravelLandingPage';

const Features = React.lazy(() => import(/* webpackPrefetch: true */ "components/features/TwoColSingleFeatureWithStats.js"));
const MainFeature = React.lazy(() => import(/* webpackPrefetch: true */ "components/features/ThreeColSimple.js"));
const FAQ = React.lazy(() => import(/* webpackPrefetch: true */ "components/faqs/SimpleWithSideImage.js"));
const SubscribeNewsLetterForm = React.lazy(() => import(/* webpackPrefetch: true */ "components/forms/SimpleSubscribeNewsletter.js"));
const Footer = React.lazy(() => import(/* webpackPrefetch: true */ "components/footers/MiniCenteredFooter.js"));
const DenGrid3 = React.lazy(() => import(/* webpackPrefetch: true */ 'components/cards/DenGrid3.js'));
const MapSearch = React.lazy(() => import(/* webpackPrefetch: true */ 'components/cards/MapSearch.js'));

const AllTogether = React.lazy(() => import(/* webpackPrefetch: true */ 'components/cards/AllTogether.js'));

// const AllOnMap7 = React.lazy(() => import(/* webpackPrefetch: true */ 'components/cards/AllOnMap7.js'));

// const HotelTravelLandingPage = React.lazy(() => import(/* webpackPrefetch: true */ 'demos/HotelTravelLandingPage'));

// const Home = React.lazy(() => import(/* webpackPrefetch: true */ './Home'));
// const About = React.lazy(() => import(/* webpackPrefetch: true */ './About'));
// const Services = React.lazy(() => import(/* webpackPrefetch: true */ './components/cards/DenGrid.js'));
// const Contact = React.lazy(() => import(/* webpackPrefetch: true */ 'components/footers/MiniCenteredFooter.js'));

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


const App = () => {

  // const scrollToSection = (id) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     window.scrollTo({
  //       top: element.offsetTop,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  return (
    <>
    <GlobalStyles />
    <Router>
                <AnimationRevealPage>

      <div>
        {/* <header className="fixed w-full bg-white shadow">
          <nav className="flex justify-around p-20">
            <button onClick={() => scrollToSection('home')} >Home</button>
            <button onClick={() => scrollToSection('FAQ')} >FAQ</button>
            <button onClick={() => scrollToSection('MainFeature')} >Main Feature</button>
            <button onClick={() => scrollToSection('footer')} >Footer</button>
            <button onClick={() => scrollToSection('search')} >Search</button>
            <button onClick={() => scrollToSection('features')} >Features</button>
          </nav>
        </header> */}
    

        {/* <main className="pt-16"> */}
        {/* <TopOfPage/> */}

{/* <DenGrid4/> */}
          <Hero />
          {/* <AllOnMap7 searchField="London" /> */}
          {/* <DentistMap searchField="London"/> */}
          {/* <DenGrid3/> */}
          {/* <MapSearch/> */}
          <AllTogether/>
            <Features/>
            <MainFeature />
            <FAQ />
            <SubscribeNewsLetterForm />
             <Footer />

        {/* </main> */}

        <Actions>

  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="action primaryAction bottom-10 right-10 p-4rounded-full z-50 text-2xl font-bold">
    ↑
  </button>
</Actions>

      </div>
      </AnimationRevealPage>

    </Router>

    </>
  );
};

export default App;
