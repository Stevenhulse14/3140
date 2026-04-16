function Home(props) {
  console.log(props);
  const { catlitter, catfood } = props;
  return (
    <div className="home">
      <h1>
        Welcome to the Home Page! {catlitter} {catfood}
      </h1>
      <p>This is the main landing page of our application.</p>
    </div>
  );
}

export default Home;
