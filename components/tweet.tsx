import { Component, createSignal } from "solid-js";
import pb from "../server";

const resultList = await pb
  .collection("comment")
  .getList(1, 50)
  .then((res) => {
    return res.items;
  });

interface Props {
  tweet: string;
  id: string;
}

const comment = async (input: string, id: string) => {
  const comment = await pb.collection("comment").create({
    body: input,
    comment: id,
  });
};

const Tweet: Component<Props> = (props) => {
  let myComment: HTMLInputElement;
  const handleComment = (e: Event) => {
    e.preventDefault();
    comment(myComment.value, props.id);
    myComment.value = "";
    window.location.reload();
  };
  return (
    <div class="m-4 p-4">
      <p class="text-4xl font-thin text-fuchsia-400">{props.tweet}</p>

      {resultList.map((result) => {
        if (result.comment === props.id) {
          return <p class="text-gray-600">{result.body}</p>;
        }
      })}

      <form onsubmit={handleComment}>
        <input ref={myComment} />
        <button
          type="submit"
          class=" bg-blue-500 hover:bg-blue-700 text-white ml-4 py-2 px-4 rounded "
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default Tweet;
