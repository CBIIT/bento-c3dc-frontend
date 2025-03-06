import React from "react";
import { withStyles, CssBaseline } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import Footer from '../ResponsiveFooter/';
import Header from '../ResponsiveHeader/';
import Home from '../../pages/landing/landingController';
import About from '../../pages/about/aboutView';
import Resources from '../../pages/resources/resourcesView';
//import News from '../../pages/news/newsView';
import Error from '../../pages/error/Error';
import Search from '../../pages/search/searchView';
import Inventory from '../../pages/inventory/inventoryController';
import Studies from '../../pages/studies/studiesController';
//import Cart from '../../pages/cart/cartController';
import ScrollButton from '../ScrollButton/ScrollButtonView';
import DataModel from "../../pages/DataModel/dataModel";
import PdfReader from "../../pages/pdfReader/pdfReader";
import StudyDetail from "../../pages/studyDetail/studyDetailController";
import OverlayWindow from "../OverlayWindow/OverlayWindow";
import AnnouncementPage from "../../pages/announcement/announcementPage";
import CohortManager from "../../pages/CohortManager/CohortManagerController";
import ReleaseNoteController from "../../pages/releaseNote/releaseNoteController";
import  CohortAnalyzerController  from "../../pages/CohortAnalyzer/CohortAnalyzerController";

// import NewsDetail from '../../pages/news/newsDetailView';

const Layout = () => {
    return (
    <>
      <CssBaseline />
        <Header />
        <OverlayWindow />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/:studyId" element={<StudyDetail />} />          
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/announcements" element={<AnnouncementPage />} />
          <Route path="/sitesearch" element={<Search />} />
          <Route path="/explore" element={<Inventory />} />
          <Route path="/explore/:filterQuery" element={<Inventory />} />
          <Route path="/user_guide" element={<PdfReader />} />
          <Route path="/data_model" element={<DataModel />} />
          <Route path="/release_notes" element={<ReleaseNoteController />} />
          <Route path="/release_notes_pdf" element={<PdfReader />} />
          <Route path="/cohort_Manager" element={<CohortManager />} />
          <Route path="/cohortAnalyzer" element={<CohortAnalyzerController />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        <ScrollButton />
    </>
    )
}

const styles = (theme) => ({
  '@global': {
    body:{
      backgroundColor:"#ffffff"
    }
  },
});

export default withStyles(styles)(Layout);