//PROPs
function Box(Props) {
  const { color, children } = Props;
  console.log("Rendering Box with color:", children);
  return (
    <div
      style={{ backgroundColor: color, padding: "20px", borderRadius: "5px" }}
    >
      {children}
    </div>
  );
}

export default Box;
