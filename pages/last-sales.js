import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function LastSalesPage() {
  const [sales, setSales] = useState();
  //   const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    'https://nextjs-course-9b48b-default-rtdb.europe-west1.firebasedatabase.app/sales.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       'https://nextjs-course-9b48b-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
  //     )
  //       .then((Response) => Response.json())
  //       .then((data) => {
  //         // converting the data to array
  //         const transformedSales = [];
  //         // for every key in data
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  /* when the react component is loaded, the useState is undefined 
  so react cant read off of something thats undefined. So we're telling react to
  run through all the pre-rendered code then fill in after data has been loaded
  */

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
