import MainScreen from '../main/main-screen';

type AppScreenProps = {
  title: string;
  genre: string;
  releaseDate: number;
}

function App({title, genre, releaseDate}:AppScreenProps): JSX.Element {
  return (<MainScreen title={title} genre={genre} releaseDate={releaseDate}/>);
}

export default App;
