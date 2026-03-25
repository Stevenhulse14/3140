function RComponent(props) {
  // Void
  // array of names
  // image ref
  props.type === "menu" && console.log("Menu");
  props.type === "tab" && console.log("Tab");
  props.type === "Icon" && console.log("Icon");

  return <h1>{props.type}</h1>;
}
