// src/App.jsx
import React, { useState } from 'react';  // Correct import of useState
import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from "components/hero/TwoColumnWithInput";
import FullScreenLogin from 'FullScreenLogin';
import DentistPage from 'DentistPage';
import LocationPage from 'LocationPage';
import LocPage from 'LocPage';
import BoxPage from 'BoxPage';

const Features = React.lazy(() => import(/* webpackPrefetch: true */ "components/features/TwoColSingleFeatureWithStats.js"));
const MainFeature = React.lazy(() => import(/* webpackPrefetch: true */ "components/features/ThreeColSimple.js"));
const FAQ = React.lazy(() => import(/* webpackPrefetch: true */ "components/faqs/SimpleWithSideImage.js"));
// const SubscribeNewsLetterForm = React.lazy(() => import(/* webpackPrefetch: true */ "components/forms/SimpleSubscribeNewsletter.js"));
const Footer = React.lazy(() => import(/* webpackPrefetch: true */ "components/footers/MiniCenteredFooter.js"));
const Search = React.lazy(() => import(/* webpackPrefetch: true */ "components/cards/MapSe.js"));




const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpenModal = () => {
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};
  return (
    <>
    <GlobalStyles />
    {/* <AnimationRevealPage> */}

    <Router>
    <Routes>


        <Route path="/dentist/:id" element={<DentistPage />} /> {/* dynamic route */}
        <Route path="/locations/" element={<BoxPage />} />
        {/* <Route path="/locations/" element={<LocPage />} />  */}

        <Route path="/locations/:id" element={<LocationPage />} /> {/* dynamic route */}
      <Route path="/dentist/:id" element={<DentistPage />} /> {/* dynamic route */}

      <Route path="/" element={


      <div>
      <Hero onOpenModal={handleOpenModal} />


          {isModalOpen && <FullScreenLogin onClose={handleCloseModal} />}


          {!isModalOpen && (
            <>
            <Search/>
            <Features/>
            <MainFeature />
            <FAQ />
            {/* <SubscribeNewsLetterForm /> */}
             <Footer />
             </>
          )
          }

      </div>} />


      </Routes>


    </Router>
    {/* </AnimationRevealPage> */}


    </>
  );
};

export default App;
