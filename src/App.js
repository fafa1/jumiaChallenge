import { ContainerUser } from "./components/containerUser";
import { ListUser } from "./components/listUser";

function App() {
  return (
    <div style={{ background: '#f5f5f5', height: '100%' }}>
      <ContainerUser>
        <div style={{ paddingTop: 70, margin: '0 10px' }}>
          <ListUser />
        </div>
      </ContainerUser>

    </div>
  );
}

export default App;
