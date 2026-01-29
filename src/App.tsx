import "./App.scss";
import { HistoryContent } from "./components/HistoryContent/HistoryContent";
import { HistoryData } from "./components/HistoryData/HistoryData";

function App() {
  return (
    <div className="page">
      <div className="container">
        <HistoryData />
        <HistoryContent />
      </div>
    </div>
  );
}

export default App;
