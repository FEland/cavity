
import React, { useEffect, useState, useCallback } from 'react';
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
// import L from 'leaflet';
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
import { ReactComponent as DiagonalRightUp } from "images/diagonal-arrow-right-up-svgrepo-com.svg";


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
  ${tw`w-full mt-10 text-center md:text-left`}
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
const PostContainer = tw.div`mt-10 w-full sm:w-1/2 lg:w-1/2 sm:pr-8`;
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
  ${tw`px-8 py-4 text-xl bg-primary-700 text-white rounded-full transition-all duration-300`}
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


function LocGrid() {
    const [towns, setTowns] = useState([]); // State to hold the towns for the current page
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Track total number of pages
    const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page, initially 5
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Fetch towns with pagination
    useEffect(() => {
        const fetchTowns = async () => {
            try {
                // Fetch all the Town_City values from the database
                const { data, error: townsError } = await supabase
                    .from('Dentists3')
                    .select('Town_City'); // Retrieve all Town_City values

                if (townsError) throw townsError; // Handle any errors

                // Remove duplicates using Set
                const uniqueTowns = [...new Set(data.map((item) => item.Town_City))];

                // Sort the unique towns alphabetically
                uniqueTowns.sort((a, b) => a.localeCompare(b));

                // Calculate total pages based on the total number of unique towns
                const totalTownsCount = uniqueTowns.length;
                const pages = Math.ceil(totalTownsCount / itemsPerPage);
                setTotalPages(pages);

                // Paginate the unique towns array
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = currentPage * itemsPerPage;
                const paginatedTowns = uniqueTowns.slice(startIndex, endIndex);

                setTowns(paginatedTowns); // Set the towns for the current page
            } catch (err) {
                setError(err.message); // Set error if any
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchTowns(); // Call the fetch function
    }, [currentPage, itemsPerPage]); // Re-fetch data when currentPage or itemsPerPage changes

    const handleTownClick = (town) => {
        setSearchTerm(town); // Update the search term when a town button is clicked
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Inline styles for the component
    const containerStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    };

    const cardsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '15px',
        padding: '20px',
    };

    const cardStyle = {
        display: 'inline-block',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '200px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        cursor: 'pointer', // Indicate that the card is clickable
    };

    const headingStyle = {
        fontSize: '2rem',
        marginBottom: '20px',
    };

    const paginationStyle = {
        // marginTop: '20px',
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);  // Reset to first page
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Unique Towns</h1>

            {/* Dropdown to select items per page */}
   
            <div style={paginationStyle}>
            <div>
                <label htmlFor="itemsPerPage">Items per page: </label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

                <ArrowLeftIcon disabled={currentPage === totalPages} style={{ width: '36px' }} onClick={() => setCurrentPage((prev) => prev + 1)}/>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <ArrowRightIcon disabled={currentPage === totalPages}  style={{ width: '36px' }} onClick={() => setCurrentPage((prev) => prev + 1)}/>

            </div>

            <div style={cardsContainerStyle}>
                {towns.map((town, index) => (
                    <div key={index} style={cardStyle} onClick={() => handleTownClick(town)}>
                        <h3>{town}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LocPage() {

  // const imageSrc = loveIllustrationImageSrc;
  // const imageRounded = true;
  // const imageBorder = false;
  // const imageShadow = false;
  const subheading = "Testimonials";
  const heading = "Our Clients Love Us.";
  // const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam.";
  const textOnLeft = false;
  const testimonials = [
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1563269156-df1e9688c08a?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Amazing Dentist Experience",
      quote:
        "Fixed my cavity in no time, with no pain and healthy dose of Novocain.",
      customerName: "Charlotte Hale",
    },
    {
      stars: 4,
      profileImageSrc:
        "https://www.pexels.com/photo/woman-in-green-button-up-shirt-wearing-black-framed-eyeglasses-reading-book-4855373/",
      heading: "Beautiful office",
      quote:
        "Really nice space, comfortable waiting room, kind staff. Overall good experience",
      customerName: "David Mac",
      customerTitle: "Father of 4"
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1581162595376-1b4643513309?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Quick and Painless",
      quote: "I was in and out of my appointment in no time, and there was no pain.",
      customerName: "Emily Clark",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1607600203297-2a649ad5e7cd?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Friendly and Professional",
      quote:
        "The staff was incredibly friendly, and the dentist was very professional. Will be back!",
      customerName: "Oliver Wright",
    },
    {
      stars: 4,
      profileImageSrc:
        "https://images.unsplash.com/photo-1574750520867-2a634a3d5d31?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Great Location",
      quote:
        "Convenient location for me and very easy to find. Loved the experience!",
      customerName: "Samantha Gold",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1590772142684-730a8907e0e6?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Comfortable and Thorough",
      quote:
        "The dentist took the time to explain everything and made me feel very comfortable.",
      customerName: "Liam Turner",
    },
    {
      stars: 4,
      profileImageSrc:
        "https://images.unsplash.com/photo-1603481077345-c99d5687f4ab?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Efficient and Caring",
      quote:
        "I really appreciated how quickly the procedure was done while still being gentle.",
      customerName: "Sophia Johnson",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1612844259701-161cb7d019cd?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Great Experience",
      quote:
        "I had a fantastic visit. The staff was amazing and the service was top-notch.",
      customerName: "Mia Davis",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1590080404689-f580201779ea?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Highly Recommend",
      quote:
        "I would definitely recommend this practice to anyone looking for a new dentist.",
      customerName: "Ethan Martin",
    },
    {
      stars: 4,
      profileImageSrc:
        "https://images.unsplash.com/photo-1558950988-19868188896b?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Amazing Staff",
      quote:
        "The staff here was incredibly welcoming. I felt very taken care of during my visit.",
      customerName: "Isabella Green",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1584061956581-9ae6895719e2?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Superb Service",
      quote:
        "From the moment I walked in until the moment I left, everything was perfect. Excellent service!",
      customerName: "Ava Parker",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1598481461137-48fcab943f99?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Professional and Skilled",
      quote:
        "The dentist was both professional and very skilled, which gave me confidence throughout the procedure.",
      customerName: "Henry Scott",
    },
    {
      stars: 4,
      profileImageSrc:
        "https://images.unsplash.com/photo-1596788073694-f23482f5b6ad?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3NjJ8MHwxfGFsbHwxfHx8fHx8fHwxNjA3MDU5OTY3&ixlib=rb-1.2.1&q=80&w=1080",
      heading: "Comfortable Waiting Room",
      quote:
        "The waiting area was cozy and comfortable, and I was seen right on time!",
      customerName: "Benjamin Brooks",
    }
  ];
  
  
    const [searchTerm, setSearchTerm] = useState('Edgware');
    const [dentists, setDentists] = useState([]);
    const [error, setError] = useState(null);
  
    const handleSearch = async () => {
        const { data, error, count } = await supabase
        .from('Dentists3')
        .select('*', { count: 'exact' }) // Get the total count of records
        .eq('Town_City', searchTerm) // Filter by Town_City
        .range((page - 1) * limit, page * limit - 1); // Pagination: start and end index

      if (error) {
        setError(error.message);
        setDentists([]);
      } else {
        setDentists(data);
        setTotalCount(count); // Save total count

      }
    };

    const fetchInitialDentists = useCallback(async (townCity = 'London') => {
        const { data, error, count } = await supabase
          .from('Dentists3')
          .select('*', { count: 'exact' }) // Get the total count of records
          .eq('Town_City', townCity)
          .range((page - 1) * limit, page * limit - 1); // Pagination: start and end index

    
          if (error) {
            setError(error.message);
            setDentists([]);
          } else {
            setDentists(data);
            setTotalCount(count); // Save total count
          }
      }, []);
    
      useEffect(() => {
        fetchInitialDentists();
      }, [fetchInitialDentists]);

      
        // Calculate total number of pages

  // Function to change pages
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      handleSearch(); // Re-fetch the data for the new page
    }
  };


  const [sliderRef, setSliderRef] = useState(null);

  const { id } = useParams();
  const [dentist, setDentist] = useState(null);
  const [initialPosition, setInitialPosition] = useState([51.5074, -0.1278]);

  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(10); // Number of records per page (state for limit)
  const totalPages = Math.ceil(totalCount / limit);  
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
                    <LocGrid/>

        <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter town or city"
                />
                <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    </select>
                <button onClick={handleSearch}>Search</button>
                
                {error && <p>Error: {error}</p>}
{/*                 
                <ul>
                    {dentists.map((item) => (
                    <li key={item.id}>{item.Name} - {item.Town_City}</li>
                    ))}
                </ul> */}
        </div>

        <Container>

        <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
          <Row>
          {/* <ImageColumn> */}
            {/* <Image src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded} /> */}
            <Posts>
            {dentists.map((dentist) => (
                    
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
      <strong style={{ fontSize: '1.2em' }} > {dentist.Name} </strong> 

      <DiagonalRightUp style={{ marginLeft: '8px' }} /> {/* Add space between text and arrow */}
    </a>
                    {/* <strong style={{ fontSize: '1.5em' }}>{dentist.Name}</strong> */}
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

        </Container>
                  </ContentWithPaddingXl>

        <Footer/>
      </AnimationRevealPage>
      </div>

    </>
  );
}

export default LocPage;
// import React, { useState, useEffect } from 'react';
// import supabase from 'demos/supabaseClient'; // Import supabase client


// export default LocPage;
