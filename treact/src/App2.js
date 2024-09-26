import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/TwoColSingleFeatureWithStats.js";
import MainFeature from "components/features/ThreeColSimple.js"
// import MapCards from "components/cards/MapCards.js";
// import SliderCard from "components/cards/ThreeColSlider.js";
// import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
// import ProcedureGrid from "components/cards/ProcedureType.js";

// import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
// import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
// import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import DenGrid from 'components/cards/DenGrid.js'

import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line


// import HotelTravelLandingPage from "demos/HotelTravelLandingPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SimpleSubscribeNewsletter from "components/forms/SimpleSubscribeNewsletter.js";
// import ProcedureType from "components/cards/ProcedureType";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;


  return (
    <>
    HELLO
      <AnimationRevealPage>
      <GlobalStyles />

      <Hero />
      {/* <Footer />  */}


        <Features />
        {/* <DenGrid /> */}
    
        {/* <TrendingCard />  */}
        {/* <MapCards />
        {/* <SliderCard />

        {/* <ProcedureGrid /> */}
        {/* <Blog /> */}
        {/* <Testimonial textOnLeft={true}/> */}

        {/* <MainFeature />
        <FAQ />
        <SubscribeNewsLetterForm /> */}

<Router>
  <Routes>    

            <Route path="/" element={<MainFeature />}/>
            <Route path="/Features" element={<Features />}/>
            <Route path="/FAQ" element={<FAQ />}/>
            {/* <Route path="/Procedures" element={<ProcedureGrid />}/> */}
            {/* <Route path="/Subscribe" element={<SimpleSubscribeNewsletter />}/> */}
            <Route path="/Search" element={<DenGrid />}/>

        </Routes>
      </Router>

      </AnimationRevealPage>


          {/* <Route path="/components/:type/:subtype/:name" element={<ComponentRenderer />} /> */}
          {/* <Route path="/components/:type/:name" element={<ComponentRenderer />} /> */}
          {/* <Route path="#search" element={<DenGrid />} /> */}
   
    </>
  );
}