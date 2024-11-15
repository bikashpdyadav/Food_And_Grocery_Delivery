import { Provider } from "react-redux";
import Navigator from "./components/Navigator";
import appStore from "./components/utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
        <Navigator />
    </Provider >
  );
}

export default App;
