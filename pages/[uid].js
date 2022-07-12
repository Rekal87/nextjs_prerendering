export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;

  // accessing the concrete values encoded in the URL
  const userID = params.uid;

  return {
    props: {
      id: 'userid-' + userID,
    },
  };
}
