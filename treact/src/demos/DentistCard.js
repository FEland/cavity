// // import React, { useState } from 'react';

// // const DentistCard = ({ dentist }) => {
// //   const [expanded, setExpanded] = useState(false);

// //   const toggleExpand = () => {
// //     setExpanded(!expanded);
// //   };

// //   const getRandomColor = () => {
// //     const colors = ['#6a0dad', '#483d8b', '#4b0082', '#8a2be2', '#5f9ea0', '#4682b4', '#6495ed', '#7b68ee'];
// //     return colors[Math.floor(Math.random() * colors.length)];
// //   };

// //   const cardStyle = {
// //     backgroundColor: getRandomColor(),
// //     // backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
// //     padding: '16px',
// //     borderRadius: '8px',
// //     marginBottom: '20px',
// //     color: '#fff'
// //   };

// //   const getFaviconUrl = (url) => {
// //     const domain = new URL(url).hostname;
// //     // {domain ? domain : 'google.com'}
// //     console.log('domain: %s', domain);
// //     // return `https://api.statvoo.com/favicon/${domain}`;
// //   };

// //   return (
// //     <div className="dentist-card" style={cardStyle}>
// //       <h2 style={{ fontWeight: 'bold' }}>{dentist.Name}</h2>
// //       <p>{dentist.Address}</p>
// //       <p>
// //         <a href={dentist.Website} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>{dentist.Website}</a>
// //         {/* <a href={dentist.Website} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
// //           <img height="16" width="16" src={getFaviconUrl(dentist.Website)} alt="favicon" /> {dentist.Website}
// //         </a> */}
// //       </p>
// //       <button onClick={toggleExpand}>
// //         {expanded ? 'Show Less' : 'Show More'}
// //       </button>
      
// //       {expanded && (
// //         <div className="additional-info">
// //         <p><a href={`tel:${dentist.Phone_Number}`} style={{ color: '#fff' }}>{dentist.Phone_Number}</a></p>
// //         <p>{dentist.Services}</p>
// //         <p>{dentist.Address_1}</p>
// //         <p>{dentist.Address_2}</p>
// //         <p>{dentist.Town_City}</p>
// //         <p>{dentist.County}</p>
// //         <p>{dentist.Postcode}</p>
// //           {/* Add other fields here */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DentistCard;


// import React, { useState, useEffect } from 'react';

// const DentistCard = ({ dentist }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [faviconExists, setFaviconExists] = useState(false);
//   const domain = "google.com";

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const getRandomColor = () => {
//     const colors = ['#6a0dad', '#483d8b', '#4b0082', '#8a2be2', '#5f9ea0', '#4682b4', '#6495ed', '#7b68ee'];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   const cardStyle = {
//     backgroundColor: getRandomColor(),
//     padding: '16px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//     color: '#fff'
//   };

// //   const getFaviconUrl = (url) => {
// //     const domain = new URL(url).hostname;
// //     return `https://api.statvoo.com/favicon/${domain}`;
// //   };

// //   useEffect(() => {
// //     const checkFavicon = async () => {
// //       const faviconUrl = getFaviconUrl(dentist.Website);
// //       try {
// //         const response = await fetch(faviconUrl);
// //         if (response.ok) {
// //           setFaviconExists(true);
// //         }
// //       } catch (error) {
// //         setFaviconExists(false);
// //       }
// //     };

// //     checkFavicon();
// //   }, [dentist.Website]);

//   return (
//     <div className="dentist-card" style={cardStyle}>
//       <h2 style={{ fontWeight: 'bold' }}>{dentist.Name}</h2>
//       <p>{dentist.Town_City}</p>

//       <button onClick={toggleExpand}>
//         {expanded ? 'Show Less' : 'Show More'}
//       </button>
//       {expanded && (
//         <div className="additional-info">
//           <p><a href={`tel:${dentist.Phone_Number}`} style={{ color: '#fff' }}>{dentist.Phone_Number}</a></p>
//         <p>{dentist.Services}</p>
//         <p>{dentist.Address_1}</p>
//         <p>{dentist.Address_2}</p>
//         <p>{dentist.County}</p>
//         <p>{dentist.Postcode}</p>
//         <p>
//         <a href={dentist.Website} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>{dentist.Website}</a>

//         {/* <a href={dentist.Website} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
//           {faviconExists && <img height="16" width="16" src={getFaviconUrl(dentist.Website)} alt="favicon" />} {dentist.Website}
//         </a> */}
//       </p>

//           {/* Add other fields here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DentistCard;






import React, { useState } from 'react';

const DentistCard = ({ dentist }) => {
  const [expanded, setExpanded] = useState(false);
  const [faviconExists, setFaviconExists] = useState(false);
  
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

  const toggleExpand = async () => {
    setExpanded(!expanded);
  };

  const [url, setUrl] = useState('');
  const [favicon, setFavicon] = useState('https://www.google.com/s2/favicons?domain=www.google.com');

  const fetchFavicon = async (url) => {
    const options = {
        method: 'GET',
        // mode: 'no-cors',
        // cache: 'no-cache',
        // credentials: 'same-origin' ,
        // headers: {},
    };
    let ui = '';
    let ui2 = '';
    let ui3 = '';
    let ui4 = '';
    ui = `https://proxy.cors.sh/icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`;
    ui2 = `https://proxy.cors.sh/www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
    ui3 = `https://corsproxy.io/?https://api.statvoo.com/favicon/${new URL(url).hostname.substring(4)}`;
    ui4 = `https://corsproxy.io/?www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
    // console.log(ui3);

    try {
    //   const response1 = await fetch(`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`, options);

      const response2 = await fetch(ui2, options);

      if (response2.ok ) {
        const blob = await response2.blob();
        setFavicon(URL.createObjectURL(blob));
        // console.log('response2 blob %s', ui2, blob, favicon)
        console.log('response2 %s', response2);
      } else {
        console.log('stuck response was %s:', response2.json);
        console.error('stuck here1');
      }
    } catch (error) {
      console.error('stuck here2', error);
    }
  };

  return (
    <div className="dentist-card" style={cardStyle}>
      <h2 style={{ fontWeight: 'bold' }}>{dentist.Name}</h2>
      <p>{dentist.Address_1}</p>
      <p><a href={`tel:${dentist.Phone_Number}`} style={{ color: '#fff' }}>{dentist.Phone_Number}</a></p>
      <p><a href={`${dentist.Website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}> {dentist.Website} </a></p>

      <button onClick={toggleExpand}>
        {expanded ? '-' : '+'}
      </button>
      {expanded && (
        <div className="additional-info">
            <p>{dentist.Website && <img height="16" width="16" src={fetchFavicon(dentist.Website)} alt="Favicon" />}</p>
            
            <p>Address1: {dentist.Address_1}</p>
            <p>Address2: {dentist.Address_2}</p>
            <p>County: {dentist.County}</p>
            <p>Postcode: {dentist.Postcode}</p>
            <p>Region: {dentist.Region}</p>
            <p>Provider: {dentist.Provider_Name}</p>
            <p>Treatment: {dentist.Treatment}</p>

        </div>
      )}
    </div>
  );
};

export default DentistCard;