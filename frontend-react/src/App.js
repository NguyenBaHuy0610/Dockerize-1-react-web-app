import './App.css';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Room(props) {
  return (
    <li>
      Room {props.info.room_id}: {props.info.name}, price: {props.info.price}
    </li>
  );
}

function App() {
  const api = 'https://laughing-halibut-666g6wp4qqr2rg7g-8080.app.github.dev/room';
  const { data, error, isLoading } = useSWR(api, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h3>The quick brown fox jumps over the lazy dog</h3>
        <ul>
          {data.rooms.map((item) => (
            <Room key={item.room_id} info={item} />
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;