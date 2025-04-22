import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";
import Layout from "./pages/Layout";
import NoteDetails from "./pages/NotesDetails";
import AllNotes from "./pages/AllNotes";
import Settings from "./pages/Settings";

const App = () => {
  return (
      <Routes>
        {/* Parent route with Layout */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes rendered inside Layout via <Outlet /> */}
          <Route index element={<Home />} />
          <Route path="new" element={<NewNote />} />
          <Route path="notes" element={<AllNotes />} />
          <Route path="settings" element={<Settings />} />
          <Route path="note/:id" element={<NoteDetails />} />
        </Route>
      </Routes>
  );
};

export default App;
