
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from 'demos/supabaseClient';
import GlobalStyles from 'styles/GlobalStyles';
// import {  Popup } from 'react-leaflet';
// import { PopupButton } from 'react-calendly';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts';
import tw from 'twin.macro';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import toothIcon from 'images/tooth.png'; // Update with your image path
import Header from "components/headers/topOfPage.js";
// import { css } from "styled-components/macro";

import Footer from "components/footers/MiniCenteredFooter.js";
import { ReactComponent as DiagonalRightUp } from "images/diagonal-arrow-right-up-svgrepo-com.svg";
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";
import "slick-carousel/slick/slick.css";
// import Slider from "react-slick";

// import { SectionHeading } from "components/misc/Headings.js";
// 
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
// import loveIllustrationImageSrc from "images/love-illustration.svg";
// import { ReactComponent as StarIconBase } from "images/star-icon.svg";
// import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg";
// import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";

const Row = tw.div`flex flex-col md:flex-row justify-between items-center`;
// const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
// const ImageColumn = tw(Column)`md:w-5/12 xl:w-6/12 flex-shrink-0 relative`;
// const TextColumn = styled(Column)(props => [
//   tw`md:w-7/12 xl:w-6/12 mt-16 md:mt-0`,
//   props.textOnLeft ? tw`md:pr-12 lg:pr-16 md:order-first` : tw`md:pl-12 lg:pl-16 md:order-last`
// ]);

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

const SuggestionsList = styled.ul`
  ${tw`absolute w-72 bg-white border border-gray-300 rounded-lg max-h-[150px] overflow-y-auto shadow-lg z-10 transition duration-300`}
  position: absolute;  /* Position it absolutely */
`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
// const Description = tw.p`mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

// const TestimonialSlider = styled(Slider)`
//   ${tw`w-full mt-10 text-center md:text-left`}
//   .slick-track {
//     ${tw`flex`}
//   }
//   .slick-slide {
//     ${tw`h-auto flex justify-center mb-1`}
//   }
// `;

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

const ControlButton2 = styled.button`
  ${tw`mx-3 p-4 rounded-full transition duration-300 bg-gray-100 hover:bg-gray-100 text-primary-100 hover:text-primary-100 focus:outline-none focus:shadow-outline`}
    svg {
      ${tw`w-4 h-4 stroke-3`}
      stroke: white; /* For stroke-based icons */
      fill: white;   /* For fill-based icons */
    }
  }
`;

// const Testimonial = tw.div`outline-none h-full flex! flex-col`;
// const StarsContainer = styled.div``;
// const StarIcon = tw(StarIconBase)`inline-block w-5 h-5 text-orange-400 fill-current mr-1 last:mr-0`;
// const TestimonialHeading = tw.div`mt-4 text-xl font-bold`;
// const Quote = tw.blockquote`mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700`;

// const CustomerInfoAndControlsContainer = tw.div`mt-auto flex justify-between items-center flex-col sm:flex-row`;

// const CustomerInfo = tw.div`flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
// const CustomerProfilePicture = tw.img`rounded-full w-16 h-16 sm:w-20 sm:h-20`;
// const CustomerTextInfo = tw.div`text-center md:text-left sm:ml-6 mt-2 sm:mt-0`;
// const CustomerName = tw.h5`font-bold text-xl`;
// const CustomerTitle = tw.p`font-medium text-secondary-100`;


// const HeadingRow = tw.div`flex`;
// const Heading = tw(SectionHeading)`text-gray-900`;

const Posts = tw.div`mt-6 lg:ml-10 sm:-mr-8 flex flex-wrap`;
const PostContainer = tw.div`mt-10 w-full sm:w-1/2 lg:w-1/2 sm:pr-8`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
// const StyledMapContainer = styled.div`
//   ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
// `;

const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
// // const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
// // const Description = tw.div``;
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

// const StyledPopupButton = styled(PopupButton)`
//   ${tw`px-8 py-4 text-xl bg-primary-700 text-white rounded-full transition-all duration-300`}
//   &:hover {
//     ${tw`bg-purple-700`}
//   }
// `;



// const DentistPopup = ({ dentist }) => (
//   <>
// {dentist ? (
// <Popup>
//   <div>
//     <strong style={{ fontSize: '1.5em' }}>{dentist.Name}</strong>
//     <div style={{ margin: '10px 0' }} />
//     {dentist.Provider_Name !== dentist.Name && (
//       <div>
//         <strong>Provider:</strong> {dentist.Provider_Name}
//       </div>
//     )}
//     <div style={{ fontStyle: 'italic' }}>
//       <strong>Specialty:</strong> {dentist.Dentist_Type}
//     </div>
//     <div style={{ margin: '10px 0' }} />
//     <div style={{ fontSize: '0.9em' }}>
//       <strong>Address:</strong> {dentist.Address_1}, {dentist.Town_City}
//     </div>
//     <div style={{ margin: '10px 0' }} />
//     {dentist.Phone_Number && (
//       <div>
//         <strong>Phone:</strong> <a href={`tel:${dentist.Phone_Number}`}>{dentist.Phone_Number}</a>
//       </div>
//     )}
//     {dentist.Website || dentist.URL ? (
//       <div>
//         <strong>Website:</strong> <a href={dentist.Website || dentist.URL} target="_blank" rel="noopener noreferrer">
//           {dentist.Website || dentist.URL}
//         </a>
//       </div>
//     ) : null}
//   </div>
// </Popup> ) : <div> No Info </div>}
// </>
// );

function LocationPage() {

  // const imageSrc = loveIllustrationImageSrc;
  // const imageRounded = true;
  // const imageBorder = false;
  // const imageShadow = false;
  // const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam.";
  // const textOnLeft = false;
  // const [sliderRef, setSliderRef] = useState(null);

  const { id } = useParams();
  // const { searchedCity } = useParams();

  // const [dentist, setDentist] = useState(null);
  // const [initialPosition, setInitialPosition] = useState([51.5074, -0.1278]);

  // const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);
      // Update isDesktop state based on window size
  const updateScreenSize = () => {
    setIsDesktop(window.innerWidth > 768);  // Adjust this value to your preference for desktop breakpoint
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);


  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(50); // Number of records per page (state for limit)
  const totalPages = Math.ceil(totalCount / limit); 

  const [allTowns, setAllTowns] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(); 

  
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchedSuggestionTerm, setSearchSuggestionTerm] = useState(null);

    const [dentists, setDentists] = useState([]);
    const [error, setError] = useState(null);
    const [previousSearchTerm, setPrevSearchTerm] = useState(null);

    useEffect(() => {
      const fetchTowns = async () => {
            // Fetch all the Town_City values from the database
            const { data, error} = await supabase
                .from('Dentists3')
                .select('Town_City'); // Retrieve all Town_City values

            if (error) throw error; // Handle any errors

            // Remove duplicates using Set
            const uniqueTowns = [...new Set(data.map((item) => item.Town_City))];
            // Sort the unique towns alphabetically
            uniqueTowns.sort((a, b) => a.localeCompare(b));
            setAllTowns(uniqueTowns); // Set the towns for the current page
      };

      fetchTowns(); // Call the fetch function
  }, []); 

    // This useEffect will trigger when searchTerm changes
    useEffect(() => {
      if (searchedSuggestionTerm !== null) {
        console.log("searchedSuggestionTerm updated:", searchedSuggestionTerm);
        handleSearch();  // Call handleSearch after the searchedSuggestionTerm update
      }
    }, [searchedSuggestionTerm]);  // Trigger this effect whenever searchTerm changes
  

    const handleSearch = async () => {
      console.log("entered handlesearch()")
      // if ( searchedSuggestionTerm === previousSearchTerm){
        
      //   console.log("ELANANAA");
      //   return;
      // }
      if (searchTerm !== previousSearchTerm) {
        setPage(1); // Reset to the first page
        setSuggestions([]);
        console.log("searchterm", searchTerm, " != prevSearch", previousSearchTerm);
      }

      let searchFor = (searchTerm === null ) ?  id : searchTerm;
        const { data, error, count } = await supabase
        .from('Dentists3')
        .select('*', { count: 'exact' }) // Get the total count of records
        .ilike('Town_City', searchFor) // Case-insensitive filter by Town_City
        .order('Name', { ascending: true }) // Sort by 'Name' in ascending order
        .range((page - 1) * limit, page * limit - 1); // Pagination: start and end index

      if (error) {
        setError(error.message);
        setDentists([]);
      } else {
        setDentists(data);
        setTotalCount(count); // Save total count

      }
      console.log(" you", searchTerm, previousSearchTerm)
      setPrevSearchTerm(searchTerm);

    };

    // const fetchInitialDentists = useCallback(async (townCity = 'London') => {
      
    //     const { data, error, count } = await supabase
    //       .from('Dentists3')
    //       .select('*', { count: 'exact' }) // Get the total count of records
    //       .eq('Town_City', townCity)
    //       .range((page - 1) * limit, page * limit - 1); // Pagination: start and end index

    
    //       if (error) {
    //         setError(error.message);
    //         setDentists([]);
    //       } else {
    //         setDentists(data);
    //         setTotalCount(count); // Save total count
    //       }
    //   }, []);
    
    //   useEffect(() => {
    //     fetchInitialDentists();
    //   }, [fetchInitialDentists]);


      useEffect(() => {
        const fetchInitialDentists = async () => {
          const { data, error, count } = await supabase
            .from('Dentists3')
            .select('*', { count: 'exact' }) // Get the total count of records
            .eq('Town_City', id)
            .order('Name', { ascending: true }) // Sort by 'Name' in ascending order
            .range((page - 1) * limit, page * limit - 1); // Pagination: start and end index
    
          if (error) {
            console.error('Error fetching locations:', error);
            setDentists([]);

          } else {
            setDentists(data);
            setTotalCount(count); // Save total count
          }
        };
    
        fetchInitialDentists();
      }, [id]);

      
        // Calculate total number of pages

    const handleInputTyping = (term) => {
      const filtered = allTowns.filter(town => 
        town.toLowerCase().startsWith(term.toLowerCase())
      );
      setSearchTerm(term);
      setSuggestions(filtered.slice(0, 5));
      // setSuggestions([...new Set(filtered.map(Town => allTowns[searchBy]))].slice(0, 5));
    };

    const handleSuggestionClick = (value) => {

      setSearchTerm(value);
      setSearchSuggestionTerm(value);
      setSuggestions([]);
      setPage(1);
    };

  // Function to change pages
  const handlePageChange = (pageValue) => {
    if (pageValue > 0 && pageValue < totalPages) {
      setPage(pageValue);
      handleSearch(); // Re-fetch the data for the new page
    }
    if (pageValue === 0){
      setPage(1);
    }
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSuggestions([]);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // const [headingText, setHeadingText] = useState('Loading...');

//   useEffect(() => {
//     const fetchDentist = async () => {
//       const { data, error } = await supabase
//         .from('Dentists3')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) {
//         console.error('Error fetching dentist data:', error);
//       } else {
//         setDentist(data);
//         setInitialPosition([data.Latitude, data.Longitude]);
//         // setHeadingText(data.Name);
//       }
//     };

//     fetchDentist();
//   }, [id]);

//   if (!dentist) {
//     return (<>
//           <GlobalStyles />
//           <AnimationRevealPage/>
//           <Header/>
//           <HeadingRow>
//               <Heading>
//               <div>Loading...</div>

//               </Heading> </HeadingRow> </>
//     )
//   }

  return (
    <>
        <div id="locations">

      <GlobalStyles />
      <AnimationRevealPage>
        <Header/>
                  <ContentWithPaddingXl>

                  {/* <Heading>{id}</Heading> */}
                  {(searchTerm !== null && searchTerm !== id) ? <Heading>{previousSearchTerm}</Heading>  : <Heading>{id}</Heading>}
                <Subheading>({totalCount} Results)</Subheading>
                  

      <div style={{
          position: isDesktop ? 'sticky' : 'static',
          top: 0,
          backgroundColor: '#fff',
          zIndex: 100,
          justifyContent: 'space-between', // Space elements evenly in the row
          padding: '10px',
          boxShadow: '0 4px 2px -2px gray',
          display: 'flex',
          alignItems: 'center',  // Align items vertically in the center
          gap: '10px',  // Optional: adds spacing between elements
          
        }}
      >
        {/* <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter town or city"
        /> */}
        <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleInputTyping(e.target.value)}
          placeholder="Enter town or city"
        />
        {/* <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select> */}

        <button onClick={handleSearch}>Search</button>
        </div>
           {(totalPages > 1 ) ?
 <Controls>
  {(page !== 1) ? 
                      <ControlButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                        <ArrowLeftIcon  />
                      </ControlButton>
                      :
                      <ControlButton2 onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                      <ArrowLeftIcon />
                    </ControlButton2>
                      }
                    <span>Page &nbsp;
                    <input
                      type="number"
                      value={page}
                      onChange={(e) => {
                        let newPage = e.target.value;
                        if (newPage === '' || (newPage > 0 && newPage <= totalPages)) { 
                          handlePageChange(newPage === '' ? '' : newPage); // Allow empty input
                  
                        }
                      }}
                      placeholder=''
                      style={{ width: '3ch' }}  // Makes the input width equal to 2 characters
                    /> of {totalPages} </span>
                      <div className="divider" />
                      {(page >= totalPages) ? 
                      <ControlButton2 onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                        <ArrowRightIcon  />
                      </ControlButton2>
                      :
                      <ControlButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                      <ArrowRightIcon />
                    </ControlButton>
                      }
                    </Controls>
: null  }
        
        {error && <p>Error: {error}</p>}
        </div>

      <SuggestionsList ref={suggestionsRef}>
              {suggestions.map((suggestion, index) => (
      
                <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer hover:bg-gray-300 hover:border-gray-400 transition-colors duration-300 p-4 border border-transparent absolute top-full left-0 w-full z-10 mt-1"
                >
                {suggestion}
              </li>
              ))}
            </SuggestionsList>



                    <div
        style={{
          maxHeight: '500px',
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        <Container>
          <Row>
          {/* <ImageColumn> */}
            {/* <Image src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded} /> */}
            <Posts>
            {dentists.sort((a, b) => a.Name.localeCompare(b.Name)).map((dentist) => (
                    
              <PostContainer>
                <Post>
                    {/*  
                {dentist.Latitude && (
                  <StyledMapContainer>
                    <MapContainer center={[dentist.Latitude, dentist.Longitude]} zoom={14} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey}`}
                      />
                      <Marker key={dentist.id} position={[dentist.Latitude, dentist.Longitude]}>
                        <Popup>{dentist.Address_1}</Popup> 

                        <DentistPopup dentist={dentist} />

                      </Marker>
                    </MapContainer>
                  </StyledMapContainer>)}
                */}
                  <Info>
                    <CreationDate>
                      <div style={{ fontStyle: 'italic' }}>
                        <strong>Specialty:</strong> {dentist.Dentist_Type}
                      </div>
                    </CreationDate>
                    <a
                  href={`/dentist/${dentist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',   // Use flexbox to align text and arrow side by side
                    alignItems: 'center',     // Vertically center text and the arrow
                    textDecoration: 'none',   // Remove underline from link
                    fontSize: '16px',         // Adjust font size
                    color: 'black',           // Text color
                  }}
                >
                  <strong style={{ fontSize: '1.5em' }}>{dentist.Name}</strong>

                  <DiagonalRightUp style={{ marginLeft: '8px' }} /> {/* Add space between text and arrow */}
                </a>
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
                                    ))}
                                    



            </Posts>

        </Row>
        {/* <Row style={{  display: 'flex', justifyContent: 'center', 
      alignItems: 'flex-start',   // Aligns to the top of the page
    }}>    
           {(totalPages !== 0 ) ?
 <Controls>
                      <ControlButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                        <ArrowLeftIcon />
                      </ControlButton>
                    Page {page} of {totalPages}
                      <div className="divider" />
                      <ControlButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                        <ArrowRightIcon />
                      </ControlButton>  
                    </Controls>
: null  }
                    </Row> */}

        </Container>
        </div>

                  </ContentWithPaddingXl>

        <Footer/>
      </AnimationRevealPage>
      </div>

    </>
  );
}

export default LocationPage;
