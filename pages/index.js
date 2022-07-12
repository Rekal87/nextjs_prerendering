//import fs to use files
import fs from 'fs/promises';
import Link from 'next/link';
//import path to read pathing
import path from 'path';

export default function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  // constructing a path for the ReadFile to read file
  // cwd = current working directory
  /* process.cwd = root directory, then you add in arguments for where you wanna go,
    then the name of the file. You can add as many arguments as you want.
  */
  console.log('(Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // if no data existed and you wanted to redirect the user to a different page
  if (!data) {
    return {
      redirect: {
        destnation: '/no-data',
      },
    };
  }

  // if you fail to fetch data, you'll get the 404 not found page
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
