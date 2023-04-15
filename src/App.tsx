import { Component, createSignal } from "solid-js";
import pb from "../server";
import Tweet from "../components/tweet";
const email = import.meta.env.VITE_EMAIL;

const pass = import.meta.env.VITE_PASS;

const authData = await pb.admins.authWithPassword(email, pass);

let posts;
let tweets;
const result = await pb
  .collection("tweet")
  .getList(1, 10)
  .then((res) => {
    posts = res.items;
  });
const tweetlist = await pb
  .collection("tweet")
  .getList(1, 10)
  .then((res) => {
    tweets = res.items;
  });

const tweet = async (input: string) => {
  const tweet = await pb.collection("tweet").create({
    tweet: input,
  });
};

const App: Component = () => {
  let myInput: HTMLInputElement;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    tweet(myInput.value);
    myInput.value = "";
    window.location.reload();
  };

  return (
    <div class="text-center py-20">
      <p class="text-4xl font-bold text-amber-900 py-8">MetaPolitika</p>

      <form
        class="flex items-center justify-center p-4"
        onSubmit={handleSubmit}
      >
        <input
          ref={myInput}
          class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          placeholder="Enter your post"
        />

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded"
          type="submit"
        >
          Post
        </button>
      </form>
      {posts.map((post) => {
        return <Tweet {...post} />;
      })}

      <p class="text-xl font-thin text-fuchsia-400 py-5"></p>
    </div>
  );
};

export default App;
