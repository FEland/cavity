import React, { useState, useEffect } from 'react';
import supabase from 'demos/supabaseClient';

import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
// import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-icon.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
// import DentistTypeGrid from "demos/DentistTypeGrid";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const ThreeColumn = tw.div`flex flex-wrap`;
const Column = tw.div``;
const HeadingColumn = tw(Column)`w-full xl:w-1/3`;
const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;

const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardType = tw.div`text-primary-500 font-bold text-lg`;
const CardPrice = tw.div`font-semibold text-sm text-gray-600`;
const CardPriceAmount = tw.span`font-bold text-gray-800 text-lg`;

const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;


export default () => {

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  
  
  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('Dentists2')
        .select('*')
        .range((page - 1) * pageSize, page * pageSize - 1);
        // console.log(data);
      if (error) {
        console.error('Error fetching cards:', error);
      } else {
        setCards(data);
      }
    };

    fetchCards();
    
  }, [page, pageSize]);


  // const cards = [
  //   {
  //     imageSrc:
  //       "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
  //     type: "Beachfront",
  //     pricePerDay: "$99",
  //     title: "A Trip to the Bahamas and the Carribean Ocean",
  //     trendingText: "Trending",
  //     durationText: "7 Days Tour",
  //     locationText: "Africa"
  //   },
  //   {
  //     imageSrc:
  //       "https://images.unsplash.com/photo-1584200186925-87fa8f93be9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
  //     type: "Cruise",
  //     pricePerDay: "$169",
  //     title: "Cruise to the Mariana Trench and the Phillipines",
  //     trendingText: "Trending",
  //     durationText: "15 Days Tour",
  //     locationText: "Australia"
  //   }
  // ];

  //   const cards2 = [
  //   {
  //     imageSrc:
  //       "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
  //     type: "Beachfront",
  //     pricePerDay: "$99",
  //     title: "A Trip to the Bahamas and the Carribean Ocean",
  //     trendingText: "Trending",
  //     durationText: "7 Days Tour",
  //     locationText: "Africa"
  //   },
  //   {
  //     imageSrc:
  //       "https://images.unsplash.com/photo-1584200186925-87fa8f93be9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
  //     type: "Cruise",
  //     pricePerDay: "$169",
  //     title: "Cruise to the Mariana Trench and the Phillipines",
  //     trendingText: "Trending",
  //     durationText: "15 Days Tour",
  //     locationText: "Australia"
  //   }
  // ];


  const getRandomColor = () => {
    const colors = ['#6a0dad', '#483d8b', '#4b0082', '#8a2be2', '#5f9ea0', '#4682b4', '#6495ed', '#7b68ee'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const cardStyle = {
    backgroundColor: getRandomColor(),
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
    color: '#fff'
  };
  
  return (
    <Container>
      <Content>
        <ThreeColumn>
          
          <HeadingColumn>
            <HeadingInfoContainer>
            <button onClick={() => setPage(page + 1)}> <HeadingTitle>Types of Dentists</HeadingTitle> </button>
            <button onClick={() => setPage(page > 1 ? page - 1 : 1)}> <HeadingDescription>  Find your ideal medical practictioner. </HeadingDescription> </button>
              <PrimaryLink>
              {page}/7 Explore more <ArrowRightIcon /> 
              </PrimaryLink>


            </HeadingInfoContainer>
          </HeadingColumn>

          {/* <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
            <option value={10}>10</option>
            <option value={5}>20</option>
            <option value={50}>50</option>
          </select> */}


          
          {cards.map((card, index) => (
            <CardColumn key={index}>
              <Card>
                <CardImage imageSrc={card.ImageLink} />
                {/* <div className="dentist-card" style={cardStyle}>
                image
                </div> */}

                <CardText>
                  <CardHeader>
                    <CardType>{card.DentistType}</CardType>
                    {/* <CardPrice>
                      <CardPriceAmount>{card.pricePerDay}</CardPriceAmount> per day
                    </CardPrice> */}
                  </CardHeader>
                  <CardTitle>{card.DentistDescription}</CardTitle>
                  {/* <CardMeta>
                    <CardMetaFeature>
                      <TrendingIcon /> {card.trendingText}
                    </CardMetaFeature>
                    <CardMetaFeature>
                      <TimeIcon /> {card.durationText}
                    </CardMetaFeature>
                    <CardMetaFeature>
                      <LocationIcon /> {card.locationText}
                    </CardMetaFeature>
                  </CardMeta> */}
                  <CardAction>Book Now</CardAction>
                </CardText>
              </Card>
            </CardColumn>
          ))}
        </ThreeColumn>
      </Content>
    </Container>
  );
};
