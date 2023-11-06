import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import Home from "../pages/Home";
import { RockForm } from "./RockForm.jsx";
import { RockList } from "./RockList.jsx";
import { Register } from "../pages/Register.jsx";

export const ApplicationViews = () => {
  const [rocksState, setRocksState] = useState([
    {
      id: 0,
      name: "",
      type: {
        id: 0,
        label: "",
      },
    },
  ]);

  const fetchRocksFromAPI = async (apiLink) => {
    const response = await fetch(apiLink, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rock_token")).token
        }`,
      },
    });
    const rocks = await response.json();
    setRocksState(rocks);
  };

  //   const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/allrocks") {
      // Fetch the rocks data from the API for all rocks
      fetchRocksFromAPI("http://localhost:8000/rocks");
    } else if (location.pathname === "/mine") {
      // Fetch the rocks data from the API for rocks owned by the current user
      fetchRocksFromAPI("http://localhost:8000/rocks?owner=current");
    }
  }, [location.pathname]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/allrocks"
            element={
              <RockList
                rocks={rocksState}
                fetchRocks={() =>
                  fetchRocksFromAPI("http://localhost:8000/rocks")
                }
              />
            }
          />
          <Route
            path="/create"
            element={
              <RockForm
                fetchRocks={() =>
                  fetchRocksFromAPI("http://localhost:8000/rocks")
                }
              />
            }
          />
          <Route
            path="/mine"
            element={
              <RockList
                rocks={rocksState}
                fetchRocks={() =>
                  fetchRocksFromAPI("http://localhost:8000/rocks?owner=current")
                }
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
