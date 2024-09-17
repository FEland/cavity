import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import DentistTypeCard from './DentistTypeCard';

const DentistTypeGrid = () => {
  const [dentists, setDentists] = useState([]);
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('Name');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const fetchDentists = async () => {
      const { data } = await supabase
        .from('TypesOfDentists')
        .select('*')
        .range((page - 1) * pageSize, page * pageSize - 1);
      setDentists(data);
    };

    fetchDentists();
  }, [page, pageSize]);

  const filteredDentists = dentists.filter(dentist =>
    dentist[searchField].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder={`Search for a dentist by ${searchField.toLowerCase()}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setSearchField(e.target.value)} value={searchField}>
        <option value="DentistType">Type of Dentist</option>
        <option value="DentistDescription">Description</option>
        {/* <option value="Address_1">Address</option> */}
      </select>
      <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <div className="pagination">
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <div className="dentist-grid">
        {filteredDentists.map(dentist => (
          <DentistTypeCard key={dentist.id} dentist={dentist} />
        ))}
      </div>
    </div>
  );
};

export default DentistTypeGrid;

// import React, { useState, useEffect } from 'react';
// import supabase from './supabaseClient';
// import DentistCard from './DentistCard';



// const DentistGrid = () => {
//   const [dentists, setDentists] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     const fetchDentists = async () => {
//       const { data } = await supabase
//         .from('Dentists1')
//         .select('*')
//         .range(0,30);
//       setDentists(data);
//     };

//     fetchDentists();
//   }, []);

//   const filteredDentists = dentists.filter(dentist =>
//     dentist.Name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for a dentist"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <div className="dentist-grid">
//         {filteredDentists.map(dentist => (
//           <DentistCard key={dentist.id} dentist={dentist} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DentistGrid;







// import Typed from 'typed.js';

//   const typeHello = new Typed('#element', {
//     strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
//     typeSpeed: 50,
//   });
    

// import React, { useState, useEffect } from 'react';
// import supabase from './supabaseClient';
// import DentistCard from './DentistCard';

// const DentistGrid = () => {
//   const [dentists, setDentists] = useState([]);
//   const [search, setSearch] = useState('');
//   const [searchField, setSearchField] = useState('name');

//   useEffect(() => {
//     const fetchDentists = async () => {
//       const { data } = await supabase
//         .from('dentists')
//         .select('*');
//       setDentists(data);
//     };

//     fetchDentists();
//   }, []);

//   const filteredDentists = dentists.filter(dentist =>
//     dentist[searchField].toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="search-bar">
//         <select onChange={(e) => setSearchField(e.target.value)}>
//           <option value="name">Name</option>
//           <option value="address">Address</option>
//           <option value="phone">Phone</option>
//         </select>
//         <input
//           type="text"
//           placeholder={`Search by ${searchField}`}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <div className="dentist-grid">
//         {filteredDentists.map(dentist => (
//           <DentistCard key={dentist.id} dentist={dentist} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DentistGrid;