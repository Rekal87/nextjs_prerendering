//import fs to use files
import fs from 'fs/promises';
//import path to read pathing
import path from 'path';

export default function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // constructing a path for the ReadFile to read file
  // cwd = current working directory
  /* process.cwd = root directory, then you add in arguments for where you wanna go,
    then the name of the file. You can add as many arguments as you want.
  */
  console.log('(Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
