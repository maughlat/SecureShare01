import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Portal } from "./components/Portal";
import { PortalLayout } from "./components/PortalLayout";
import { FilesPage } from "./components/FilesPage";
import { SharedPage } from "./components/SharedPage";
import { TrashPage } from "./components/TrashPage";
import { SettingsPage } from "./components/SettingsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortalLayout />}> 
          <Route index element={<Portal />} />
          <Route path="portal" element={<Portal />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="shared" element={<SharedPage />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
