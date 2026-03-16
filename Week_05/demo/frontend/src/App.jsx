import "./App.css";
import Navbar from "../components/Navbar";
import Box from "../components/Box";
import { useState, useEffect } from "react";
//useState and useEffect are not used in this component, so we can remove the import statement for them.

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // fetch data from the backend
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <Box color="lightblue" children={"Steven"}></Box>
      <Box color="lightgreen"></Box>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </>
  );
}

export default App;
