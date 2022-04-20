import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DownLoad from './pages/DownLoad';
import FileContextProvider from './contexts/FileContext';
import Upload from './pages/Upload';

function App() {
    return (
        <FileContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Upload} />
                    <Route exact path="/files/:uuid" component={DownLoad} />
                </Switch>
            </Router>
        </FileContextProvider>

    );
}

export default App;
