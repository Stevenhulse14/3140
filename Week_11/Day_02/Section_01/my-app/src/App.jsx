import { useState } from "react";
import Home from "./Components/Home";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  let array = [1, 2, 3, 4, 5];
  array = [1, 2];
  console.log("App component rendered", count, array);
  return (
    <>
      <Home catlitter={"FurryPaws"} catfood={"Whiskers Delight"} />
      <div>
        {array.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </div>
    </>
  );
}

export default App;
