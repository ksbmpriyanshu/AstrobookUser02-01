// GlobalContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getData } from '../utils/storage';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [openModal,setOpenModal] = useState(true)

  useEffect(() => {
    const fetchLocalStorageData = async () => {
      const notesData = await getData('notes');
      const labelsData = await getData('labels');

      if (notesData) setNotes(notesData);
      if (labelsData) setLabels(labelsData);
    };

    fetchLocalStorageData();
  }, []);

  function handleModal(){
    setOpenModal(!openModal)
  }


  return (
    <GlobalContext.Provider value={{ notes, setNotes, labels, setLabels,handleModal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
