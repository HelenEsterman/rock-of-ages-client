/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom";

export const RockList = ({ rocks, fetchRocks }) => {
  const location = useLocation();
  const deleteRock = (rockId) => {
    return fetch(`http://localhost:8000/rocks/${rockId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rock_token")).token
        }`,
      },
    });
  };

  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          {rock.name} ({rock.type.label}) weighs {rock.weight} kgs
          <p>
            In the collection of {rock.user?.first_name} {rock.user?.last_name}
          </p>
          {location.pathname === "/allrocks" ? (
            ""
          ) : (
            <button
              className="border border-solid bg-indigo-500"
              onClick={() => {
                deleteRock(rock.id).then(fetchRocks);
              }}
            >
              Delete
            </button>
          )}
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  );
};
