
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from 'demos/supabaseClient';
import GlobalStyles from 'styles/GlobalStyles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PopupButton } from 'react-calendly';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts';
import tw from 'twin.macro';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import toothIcon from 'images/tooth.png'; // Update with your image path
import Header from "components/headers/topOfPage.js";
// import { css } from "styled-components/macro";

import Footer from "components/footers/MiniCenteredFooter.js";

import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
// import loveIllustrationImageSrc from "images/love-illustration.svg";
import { ReactComponent as StarIconBase } from "images/star-icon.svg";
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";

const Row = tw.div`flex flex-col md:flex-row justify-between items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
// const ImageColumn = tw(Column)`md:w-5/12 xl:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 xl:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:pr-12 lg:pr-16 md:order-first` : tw`md:pl-12 lg:pl-16 md:order-last`
]);

// const Image = styled.img(props => [
//   props.imageRounded && tw`rounded`,
//   props.imageBorder && tw`border`,
//   props.imageShadow && tw`shadow`
// ]);

// Initialize Supabase client
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const toothIconPic = new L.Icon({
//   iconUrl: toothIcon,
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//   iconSize: [38, 38],
//   iconAnchor: [14, 28],
//   popupAnchor: [0, -28]
// });

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const TestimonialSlider = styled(Slider)`
  ${tw`w-full mt-10 text-center md:text-left rounded-lg mt-4`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;

const Controls = styled.div`
  ${tw`flex mt-8 sm:mt-0`}
  .divider {
    ${tw`my-3 border-r`}
  }
`;
const ControlButton = styled.button`
  ${tw`mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline`}
  svg {
    ${tw`w-4 h-4 stroke-3`}
  }
`;

const Testimonial = tw.div`outline-none h-full flex! flex-col`;
const StarsContainer = styled.div``;
const StarIcon = tw(StarIconBase)`inline-block w-5 h-5 text-orange-400 fill-current mr-1 last:mr-0`;
const TestimonialHeading = tw.div`mt-4 text-xl font-bold`;
const Quote = tw.blockquote`mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700`;

const CustomerInfoAndControlsContainer = tw.div`mt-auto flex justify-between items-center flex-col sm:flex-row`;

const CustomerInfo = tw.div`flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
const CustomerProfilePicture = tw.img`rounded-full w-16 h-16 sm:w-20 sm:h-20`;
const CustomerTextInfo = tw.div`text-center md:text-left sm:ml-6 mt-2 sm:mt-0`;
const CustomerName = tw.h5`font-bold text-xl`;
const CustomerTitle = tw.p`font-medium text-secondary-100`;


const HeadingRow = tw.div`flex`;
// const Heading = tw(SectionHeading)`text-gray-900`;

const Posts = tw.div`mt-6 lg:ml-10 sm:-mr-8 flex flex-wrap`;
// const PostContainer = tw.div`mt-10 w-full sm:w-1/2 lg:w-1/2 sm:pr-8`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const StyledMapContainer = styled.div`
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;

const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
// const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
// const Description = tw.div``;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;

// const Image = styled.div`
//   ${props => css`background-image: url("${props.imageSrc}");`}
//   ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
// `;
// const ButtonWrapper = styled.div`
//   ${tw`flex justify-center mt-6`}
//   @media (min-width: 768px) {
//     ${tw`absolute right-0 top-1/2 transform -translate-y-1/2`}
//   }
// `;

const StyledPopupButton = styled(PopupButton)`
  ${tw`px-8 py-4 text-xl bg-primary-700 text-white rounded-full transition-all duration-300 mb-8`}
  &:hover {
    ${tw`bg-purple-700`}
  }
`;



const DentistPopup = ({ dentist }) => (
  <>
{dentist ? (
<Popup>
  <div>
    <strong style={{ fontSize: '1.5em' }}>{dentist.Name}</strong>
    <div style={{ margin: '10px 0' }} />
    {dentist.Provider_Name !== dentist.Name && (
      <div>
        <strong>Provider:</strong> {dentist.Provider_Name}
      </div>
    )}
    <div style={{ fontStyle: 'italic' }}>
      <strong>Specialty:</strong> {dentist.Dentist_Type}
    </div>
    <div style={{ margin: '10px 0' }} />
    <div style={{ fontSize: '0.9em' }}>
      <strong>Address:</strong> {dentist.Address_1}, {dentist.Town_City}
    </div>
    <div style={{ margin: '10px 0' }} />
    {dentist.Phone_Number && (
      <div>
        <strong>Phone:</strong> <a href={`tel:${dentist.Phone_Number}`}>{dentist.Phone_Number}</a>
      </div>
    )}
    {dentist.Website || dentist.URL ? (
      <div>
        <strong>Website:</strong> <a href={dentist.Website || dentist.URL} target="_blank" rel="noopener noreferrer">
          {dentist.Website || dentist.URL}
        </a>
      </div>
    ) : null}
  </div>
</Popup> ) : <div> No Info </div>}
</>
);

function DentistPage() {

  // const imageSrc = loveIllustrationImageSrc;
  // const imageRounded = true;
  // const imageBorder = false;
  // const imageShadow = false;
  const subheading = "Testimonials";
  const heading = "Our Clients Love Us.";
  const description = "Reach Out Today";
  const textOnLeft = false;
  const testimonials = [
      {
        stars: 5,
        profileImageSrc:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
        heading: "Amazing Dentist Experience",
        quote:
          "Fixed my cavity in no time, with no pain and healthy dose of of Novocain.",
        customerName: "Charlotte Hale",
        // customerTitle: "CEO, Delos Inc."
      },
      {
        stars: 4,
        profileImageSrc:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
        heading: "Beautiful office",
        quote:
          "Really nice space, comfortable waiting room, kind staff. Overall good experience",
        customerName: "David Mac",
        customerTitle: "Father of 4", 
      },
      {
        stars: 4,
        profileImageSrc:
        "https://images.pexels.com/photos/4855373/pexels-photo-4855373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Quick and Painless",
        quote: "I was in and out of my appointment in no time, and there was no pain.",
        customerName: "Emily Clark",
      },
      {
        stars: 5,
        profileImageSrc:
        "https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Friendly and Professional",
        quote:
          "The staff was incredibly friendly, and the dentist was very professional. Will be back!",
        customerName: "Olivia Wright",
      },
      {
        stars: 4,
        profileImageSrc:
"https://images.pexels.com/photos/6998345/pexels-photo-6998345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Great Location",
        quote:
          "Convenient location for me and very easy to find. Loved the experience!",
        customerName: "Samantha Gold",
      },
      {
        stars: 5,
        profileImageSrc:
"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Comfortable and Thorough",
        quote:
          "The dentist took the time to explain everything and made me feel very comfortable.",
        customerName: "Liam Turner",
      },
      {
        stars: 4,
        profileImageSrc:
"https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Efficient and Caring",
        quote:
          "I really appreciated how quickly the procedure was done while still being gentle.",
        customerName: "Ethan Martin",
      },
      {
        stars: 5,
        profileImageSrc:
"https://images.pexels.com/photos/7298637/pexels-photo-7298637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Great Experience",
        quote:
          "I had a fantastic visit. The staff was amazing and the service was top-notch.",
        customerName: "Mia Davis",
      },
      {
        stars: 5,
        profileImageSrc:
"https://images.pexels.com/photos/1984117/pexels-photo-1984117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Highly Recommend",
        quote:
          "I would definitely recommend this practice to anyone looking for a new dentist.",
        customerName: "Sophia Johnson",
      },
      {
        stars: 4,
        profileImageSrc:
"https://images.pexels.com/photos/7994398/pexels-photo-7994398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Amazing Staff",
        quote:
          "The staff here was incredibly welcoming. I felt very taken care of during my visit.",
        customerName: "Isabella Green",
      },
      {
        stars: 5,
        profileImageSrc:
        "https://images.pexels.com/photos/9482297/pexels-photo-9482297.jpeg?auto=compress&cs=tinysrgb&w=800",
        heading: "Superb Service",
        quote:
          "From the moment I walked in until the moment I left, everything was perfect. Excellent service!",
        customerName: "Ava Parker",
      },
      {
        stars: 5,
        profileImageSrc:
        "https://images.pexels.com/photos/5990911/pexels-photo-5990911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        heading: "Professional and Skilled",
        quote:
          "The dentist was both professional and very skilled, which gave me confidence throughout the procedure.",
        customerName: "Henry Scott",
      },
      {
        stars: 4,
        profileImageSrc:
"https://images.pexels.com/photos/5906433/pexels-photo-5906433.jpeg?auto=compress&cs=tinysrgb&w=800",
        heading: "Comfortable Waiting Room",
        quote:
          "The waiting area was cozy and comfortable, and I was seen right on time!",
        customerName: "Benjamin Brooks",
      }
    ];
  
  const [sliderRef, setSliderRef] = useState(null);

  const { id } = useParams();
  const [dentist, setDentist] = useState(null);
  const [initialPosition, setInitialPosition] = useState([51.5074, -0.1278]);
  // const [headingText, setHeadingText] = useState('Loading...');

  useEffect(() => {
    const fetchDentist = async () => {
      const { data, error } = await supabase
        .from('Dentists3')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching dentist data:', error);
      } else {
        setDentist(data);
        setInitialPosition([data.Latitude, data.Longitude]);
        // setHeadingText(data.Name);
      }
    };

    fetchDentist();
  }, [id]);

  if (!dentist) {
    return (<>
          <GlobalStyles />
          <AnimationRevealPage/>
          <Header/>
          <HeadingRow>
              <Heading>
              <div>Loading...</div>

              </Heading> </HeadingRow> </>
    )
  }

  return (
    <>
      <GlobalStyles />
      <AnimationRevealPage>
        <Header/>
                  <ContentWithPaddingXl>

        <Container>

          
          {/* <ContentWithPaddingXl> */}
            <HeadingRow>
              <Heading>{dentist.Name}</Heading>
            </HeadingRow>
            {/* <Row> */}
            {/* <Posts>
              <PostContainer>
                <Post>
                  <StyledMapContainer>
                    <MapContainer center={initialPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey}`}
                      />
                      <Marker key={dentist.id} position={[dentist.Latitude, dentist.Longitude]}>
                        <Popup>{dentist.Address_1}</Popup>
                      </Marker>
                    </MapContainer>
                  </StyledMapContainer>

                  <Info>
                    <CreationDate>
                      <div style={{ fontStyle: 'italic' }}>
                        <strong>Specialty:</strong> {dentist.Dentist_Type}
                      </div>
                    </CreationDate>
                    <strong style={{ fontSize: '1.5em' }}>{dentist.Name}</strong>
                    <div style={{ margin: '10px 0' }} />
                    <div style={{ fontSize: '0.9em' }}>
                      <strong>Address:</strong> {dentist.Address_1}, {dentist.Town_City}, {dentist.Postcode}
                    </div>
                    {dentist.Phone_Number && (
                      <div>
                        <strong>Phone:</strong> <a href={`tel:${dentist.Phone_Number}`}>{dentist.Phone_Number}</a>
                      </div>
                    )}
                                                            <Category>

                    {dentist.Website || dentist.URL ? (
                      <div>
                        <strong>Website:</strong>{' '}
                        <a href={dentist.Website || dentist.URL} target="_blank" rel="noopener noreferrer" >
                          {dentist.Website || dentist.URL}
                        </a>
                      </div>

                    ) : null}
                      </Category>

                  </Info>

                </Post>

              </PostContainer>

              <PostContainer>
                <Post>
                 
                 <Info>
                  <Image imageSrc= "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80" />

                  </Info>

                </Post>

              </PostContainer>


            </Posts> */}

            
{/* 
            <ButtonWrapper>


              <StyledPopupButton
                url="https://calendly.com/wigoxam352-confmin/30min"
                rootElement={document.getElementById('root')}
                text="Book Now!"
              />
            </ButtonWrapper> */}

          <Row>
          {/* <ImageColumn> */}
            {/* <Image src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded} /> */}
            <Posts>
              {/* <PostContainer> */}
                <Post>
                  <StyledMapContainer>
                    <MapContainer center={initialPosition} zoom={15} style={{ height: '100%', width: '100%', zIndex: 20}}>
                      <TileLayer
                        url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey}`}
                      />
                      <Marker key={dentist.id} 
                      position={[dentist.Latitude, dentist.Longitude]}
                      icon={L.divIcon({
                        className: 'custom-marker',
                        html: `<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%;"></div>`,
                      })}
                      
                      >
                        <Popup>{dentist.Address_1}</Popup>

                        <DentistPopup dentist={dentist} />

                      </Marker>
                    </MapContainer>
                  </StyledMapContainer>

                  <Info>
                    <CreationDate>
                      <div style={{ fontStyle: 'italic' }}>
                        <strong>Specialty:</strong> {dentist.Dentist_Type}
                      </div>
                    </CreationDate>
                    <div style={{ margin: '10px 0' }} />

                    <div style={{ fontSize: '0.9em' }}>
                      <strong>Provider:</strong> {dentist.Provider_Name}
                    </div>
                    {/* <strong style={{ fontSize: '1.5em' }}>{dentist.Name}</strong> */}
                    <div style={{ fontSize: '0.9em' }}>
                      <strong>Address:</strong> {dentist.Address_1}, {dentist.Town_City}, {dentist.Postcode}
                    </div>
                    {dentist.Phone_Number && (
                      <div>
                        <strong>Phone:</strong> <a href={`tel:${dentist.Phone_Number}`}>{dentist.Phone_Number}</a>
                      </div>
                    )}
                                                            <Category>

                    {dentist.Website || dentist.URL ? (
                      <div>
                        <strong>Website:</strong>{' '}
                        <a href={dentist.Website || dentist.URL} target="_blank" rel="noopener noreferrer" >
                          {dentist.Website || dentist.URL}
                        </a>
                      </div>

                    ) : null}

                      </Category>

                  </Info>

                </Post>

              {/* </PostContainer> */}

            </Posts>

          {/* </ImageColumn> */}
          <TextColumn textOnLeft={textOnLeft}>
            
          {/* <Heading>{heading}</Heading> */}
          {/* <Description>{description}</Description> */}

            <Description>
            {/* <ButtonWrapper> */}

            <StyledPopupButton
              url="https://calendly.com/wigoxam352-confmin/30min"
              rootElement={document.getElementById('root')}
              text="Schedule Appointment"
            />
            {/* </ButtonWrapper> */}
            </Description>
            {'   '}
            <Subheading>{subheading}</Subheading>

            {/* <Description>{description}</Description> */}

            <TestimonialSlider arrows={false} ref={setSliderRef}>
              {testimonials.sort(() => Math.random() - 0.5) // Shuffle the array
                .slice(0, 4) // Select the first 4 
                .map((testimonial, index) => (
                <Testimonial key={index}>
                  <StarsContainer>
                    {Array.from({ length: testimonial.stars }).map((_,indexIcon) => (
                      <StarIcon key={indexIcon} />
                    ))}
                  </StarsContainer>
                  <TestimonialHeading>{testimonial.heading}</TestimonialHeading>
                  <Quote>{testimonial.quote}</Quote>
                  <CustomerInfoAndControlsContainer>
                    <CustomerInfo>
                      <CustomerProfilePicture src={testimonial.profileImageSrc} alt={testimonial.customerName} />
                      <CustomerTextInfo>
                        <CustomerName>{testimonial.customerName}</CustomerName>
                        <CustomerTitle>{testimonial.customerTitle}</CustomerTitle>
                      </CustomerTextInfo>
                    </CustomerInfo>
                    <Controls>
                      <ControlButton onClick={sliderRef?.slickPrev}>
                        <ArrowLeftIcon />
                      </ControlButton>
                      <div className="divider" />
                      <ControlButton onClick={sliderRef?.slickNext}>
                        <ArrowRightIcon />
                      </ControlButton>
                    </Controls>
                  </CustomerInfoAndControlsContainer>
                </Testimonial>
              ))}
            </TestimonialSlider>
          </TextColumn>
        </Row>

        </Container>
                  </ContentWithPaddingXl>

        <Footer/>
      </AnimationRevealPage>
    </>
  );
}

export default DentistPage;
