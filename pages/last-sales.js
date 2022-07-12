import { useEffect, useState } from 'react';

export default function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://nextjs-course-9b48b-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
    )
      .then((Response) => Response.json())
      .then((data) => {
        // converting the data to array
        const transformedSales = [];
        // for every key in data
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Lading...</p>;
  }

  /* when the react component is loaded, the useState is undefined 
  so react cant read off of something thats undefined. So we're telling react to
  run through all the code then fill in after data has been loaded
  */
  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}
