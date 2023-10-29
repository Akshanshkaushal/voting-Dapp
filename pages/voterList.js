import React, { useState, useEffect, useContext } from "react";
import VoterCard from "../components/VoterCard/VoterCard";
import Style from "../styles/voterlist.module.css";
import { VotingContext } from "../context/voter";

const VoterList = () => {
  const { getAllVoterData, voterArray } = useContext(VotingContext);
  useEffect(() => {
    getAllVoterData();
  }, []);
  return (
    <div className={Style.VoterList}>
      <VoterCard voterArray={voterArray} />
    </div>
  );
};
export default VoterList;
