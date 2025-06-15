import Router from "./routes/Router";
import InitializedAuth from "./auth/InitializedAuth";

function App() {
  return (
    <>
      <InitializedAuth />
      <Router />
    </>
  );
}

export default App;
