import React from 'react';

const DentistCardAlone = ({ dentist, onClick }) => {
  return (
    <div className="dentist-card-alone" onClick={() => onClick(dentist)}>
      <h3>{dentist.name}</h3>
    </div>
  );
};

export default DentistCardAlone;