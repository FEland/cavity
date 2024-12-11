import React, { useState, useEffect } from 'react';
import supabase from 'demos/supabaseClient';

import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
// import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
// import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
// import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
// // import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-icon.svg";
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

const DentistTypesForProcedure = ({ procedureId }) => {
    const [dentistTypes, setDentistTypes] = useState([]);
  
    useEffect(() => {
      const fetchDentistTypes = async () => {
        const { data, error } = await supabase
          // .from('procedure_dentist_type')
          // .select('dentist_types')
          // .eq('procedure_id', procedureId)
          // .single();
          .from('procedure_dentist_type')
          .select('*')
          .eq('procedure_id', '5');
        if (error) { 
            console.error('Error fetching dentist types:', error);
        } else {
          // console.log(data);
            // setDentistTypes(data?.dentist_types || []);
            setDentistTypes(data);
            console.log(data);

            // console.error(data);

        }
      };
      fetchDentistTypes();
    }, [procedureId]);
  
    return (
      <ul>
        hi
        {/* {dentistTypes} */}
        {dentistTypes.map((type, index) => (
          <li key={index}>{type.name}</li>
        ))}
      </ul>
    );
  };

export default () => {

//   const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [procedures, setProcedures] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('procedures')
        .select('*')
        .order('name', { ascending: true })
        // .range((page - 1) * pageSize, page * pageSize - 1);
        // console.log(data);
      if (error) {
        console.error('Error fetching cards:', error);
      } else {
        setProcedures(data);
    }
    };

    fetchData();
    
  }, [page, pageSize]);

  const filteredProcedures = procedures.filter(procedure =>
    procedure.name.toLowerCase().includes(search.toLowerCase())
  );


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
      <HeadingColumn>
            <HeadingInfoContainer>
            <input type="text" placeholder="Search Procedures"
                value={search} onChange={(e) => setSearch(e.target.value)}
            />


            {/* <button onClick={() => setPage(page + 1)}> <HeadingTitle>Types of Procedures</HeadingTitle> </button>
            <button onClick={() => setPage(page > 1 ? page - 1 : 1)}> <HeadingDescription>  Services offered. </HeadingDescription> </button>
              <PrimaryLink>
              {page}/7 Explore more <ArrowRightIcon /> 
              </PrimaryLink>
              <button onClick={() => DentistTypesForProcedurep(id)}> <HeadingTitle>Types of Procedures</HeadingTitle> </button> */}


            </HeadingInfoContainer>
          </HeadingColumn>
        <ThreeColumn>
          
     

          {/* <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
            <option value={10}>10</option>
            <option value={5}>20</option>
            <option value={50}>50</option>
          </select> */}

          
          {filteredProcedures.map((procedure, index) => (
            <CardColumn key={index}>
              <Card>
                <CardText>
                    <CardHeader>
                            <h3>{procedure.name}</h3>
                            <h3>{procedure.id}</h3>

                            <DentistTypesForProcedure procedureId={procedure.id} />
                    </CardHeader>
                    {/* <CardAction>Book Now</CardAction> */}
                </CardText>
              </Card>
            </CardColumn>
          ))
          }
        </ThreeColumn>
      </Content>
    </Container>
  );
};
