function App(props) {
  console.log(props);
  const subject = props.subject;
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello, {subject}!!</p>
      </header>
    </div>
  );
}

export default App;
