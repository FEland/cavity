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
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import DenGrid from 'components/cards/DenGrid.js'
// import DentistGrid from './DentistGrid';

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <DenGrid />

    {/* <TrendingCard />  */}
    {/* <MapCards />
    {/* <SliderCard /> */}
     <MainFeature />
     {/* <ProcedureGrid /> */}
    {/* <Blog /> */}
    {/* <Testimonial textOnLeft={true}/> */}
    <FAQ />
    <SubscribeNewsLetterForm />
    <Footer /> 
  </AnimationRevealPage>
);
