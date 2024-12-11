import supabase from 'demos/supabaseClient';  // Adjust this import if needed
import { useEffect, useState } from 'react';

const ProcedureDentistType = () => {
  const [data, setData] = useState(null);  // State for the fetched data
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the custom SQL function using .rpc() to handle the join manually
        const { data, error } = await supabase
          .rpc('custom_join_query'); // This calls the raw SQL function

        if (error) {
          throw error;  // If there's an error, throw it
        }

        setData(data);  // Set the fetched data to the state
      } catch (err) {
        setError(err.message);  // Set any error to the state
      }
    };

    fetchData();  // Call fetchData when the component mounts
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (error) {
    return <div>Error: {error}</div>;  // Show error if there's one
  }

  if (!data) {
    return <div>Loading...</div>;  // Show loading state if no data is fetched yet
  }

  return (
    <div>
      <h2>Procedure and Dentist Type</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Procedure:</strong> {item.procedure_name} - <strong>Dentist Type:</strong> {item.dentist_type_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcedureDentistType;
