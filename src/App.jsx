import Header from "./components/Header/Header";
import PostsList from "./components/Posts/PostsList";
import "./App.css";

const App = () => {
  return (
    <>
      <section id="task-form">
        <Header />
      </section>
      <section id="tasks">
        <PostsList />
      </section>
    </>
  );
};

export default App;
