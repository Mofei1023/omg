import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import services from "../services";

function Comment() {
  const [comment, setComment] = useState("")
   /** @type {React.ChangeEventHandler<HTMLInputElement>} */
   const handleTextInputChange = ({ target: { name, value } }) => {
    // const { name, value } = event.target
    // obj = { ...prev }; obj[name] = value
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    console.log(event)
    
  };
    return (
      <form className="mt-8 space-y-6" onSubmit={handleCommentSubmit}>
      <div>
            <div>Comment Section</div>
            <div>
                <input 
                  name="comment" 
                  type="text" 
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  placeholder="Please Leave a comment"
                 //value={comment}
                 //onChange={handleTextInputChange}
                  />
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Submit
                  </button>
            </div>
        </div>
        </form>
    );
    }

export default Comment