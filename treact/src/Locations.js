import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import supabase from 'demos/supabaseClient';

import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import tw from 'twin.macro';
import Header from "components/headers/topOfPage.js";
import GlobalStyles from 'styles/GlobalStyles';
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts';
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";

import { ClipLoader } from 'react-spinners';  // Import ClipLoader


  // Inline styles for the spinner container
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height to center vertically
  };

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const TownLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  color: black;
  transition: color 0.3s ease;

  &:hover {
    color: blue;  /* Change color on hover */
  }
`;




export default function Locations() {
    const [towns, setTowns] = useState([]); // State to hold the towns for the current page
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const [expandedLetters, setExpandedLetters] = useState(new Set()); // Track expanded letters
    const [groupedTowns, setGroupedTowns] = useState({});
    const [columnsPerRow, setColumnsPerRow] = useState(6); // Default number of columns for large screens

    const subheading = "Find your city by first letter";
    const heading = "Locations Served";

    // Toggle the expansion of a specific letter
    const handleToggle = (letter) => {
        setExpandedLetters((prev) => {
            const newExpandedLetters = new Set(prev);
            if (newExpandedLetters.has(letter)) {
                newExpandedLetters.delete(letter); // Remove the letter if it is already expanded
            } else {
                newExpandedLetters.add(letter); // Add the letter to expanded set
            }
            return newExpandedLetters;
        });
    };

    // Fetch towns with pagination
    useEffect(() => {
        const fetchTowns = async () => {

            try {
              setLoading(true);  // Set loading to true before the fetch begins

                // Fetch all the Town_City values from the database
                const { data, error: townsError } = await supabase
                    .from('Dentists3')
                    .select('Town_City'); // Retrieve all Town_City values

                if (townsError) {
                  setLoading(false);
                  throw townsError; // Handle any errors

                }

                // Remove duplicates using Set
                const uniqueTowns = [...new Set(data.map((item) => item.Town_City))];
                // Sort the unique towns alphabetically
                uniqueTowns.sort((a, b) => a.localeCompare(b));
                setTowns(uniqueTowns); // Set the towns for the current page

                const grouped = {};
                uniqueTowns.sort().forEach(town => {
                    const firstLetter = town[0].toUpperCase(); // Get the first letter of the town
                    if (!grouped[firstLetter]) {
                        grouped[firstLetter] = [];
                    }
                    grouped[firstLetter].push(town);
                });
                setGroupedTowns(grouped);

            } catch (err) {
                setError(err.message); // Set error if any
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchTowns(); // Call the fetch function
    }, []); // Re-fetch data when currentPage or itemsPerPage changes

    // Helper function to split towns into groups based on the number of columns
    const splitIntoColumns = (towns) => {
        const columns = [];
        const townsPerColumn =columnsPerRow; // Divide towns by the number of columns

        // const townsPerColumn = Math.ceil(towns.length / (columnsPerRow)); // Divide towns by the number of columns

        for (let i = 0; i < towns.length; i += townsPerColumn) {
            columns.push(towns.slice(i, i + townsPerColumn)); // Slice out groups of towns
        }
        return columns;
    };

    // Adjust number of columns based on window size
    const updateColumnsPerRow = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 600) {
            setColumnsPerRow(30); // For mobile screens, use 3 columns
        } else if (windowWidth < 1200) {
            setColumnsPerRow(10); // For tablets, use 4 columns
        } else {
            setColumnsPerRow(8); // For larger screens, use 6 columns
        }
    };

    const [hoveredTown, setHoveredTown] = useState(null);


    // Listen for window resize events
    useEffect(() => {
        updateColumnsPerRow(); // Set the columns per row on initial load
        window.addEventListener('resize', updateColumnsPerRow); // Update columns when the window is resized
        return () => {
            window.removeEventListener('resize', updateColumnsPerRow); // Clean up the event listener
        };
    }, []); // Empty dependency array so it only runs on mount

    return (
      <>
      <GlobalStyles />
      <AnimationRevealPage>
        <Header/>
        <ContentWithPaddingXl>
                  {/* <Container> */}

                  <Heading>{heading}</Heading>
                <Subheading>{subheading}</Subheading>

  
        <TableContainer component={Paper}>
        {loading ? (
        // Show spinner while loading
        <div style={spinnerContainerStyle}>
          <ClipLoader size={50} color="#00BFFF" loading={loading} />
        </div>
      ) : (
        <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {/* <TableCell > City</TableCell> */}
                        {/* <TableCell align="right">Count</TableCell> */}
                        {/* <TableCell /> */}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(groupedTowns).map(letter => {
                        const townCount = groupedTowns[letter].length; // Get the number of towns for the letter
                        return (
                            <TableRow key={letter} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                {/* <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => handleToggle(letter)} // Toggle the letter expansion
                                    >
                                        {expandedLetters.has(letter) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell> */}
                                <TableCell component="th" scope="row">
                                    {letter}  {/* Display letter and the number of towns */}
                                    ({townCount}) {/* Display letter and the number of towns */}

                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => handleToggle(letter)} // Toggle the letter expansion
                                    >
                                        {expandedLetters.has(letter) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>

                                </TableCell>
                                {/* <TableCell component="th" scope="row"> */}
                                    {/* ({townCount}) Display letter and the number of towns */}
                                {/* </TableCell> */}
                                {/* Render the grouped towns in multiple columns */}
                                {expandedLetters.has(letter) && (
                                    splitIntoColumns(groupedTowns[letter]).map((townGroup, index) => (
                                        <TableCell key={index} align="left">
                                            <ul>
                                                {townGroup.map((town, townIndex) => (
                                                    <li key={townIndex}>
                                            <TownLink
                                                href={`/locations/${town}`}
                                                rel="noopener noreferrer"
                                              >
                                                {town}
                                              </TownLink>
                                                        </li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                    ))
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
             )}
        </TableContainer>
        {/* </Container> */}
        </ContentWithPaddingXl>
        </AnimationRevealPage>
</>
    );
}


{/* <div>
<h3>Column Names in Dentists3 Table:</h3>
{columns.length === 0 ? (
  <p>No columns found.</p>
) : (
  <ul>
    {columns.map((column, index) => (
      <li key={index}>{column}</li> // Render each column name
    ))}
  </ul>
)}
</div> */}