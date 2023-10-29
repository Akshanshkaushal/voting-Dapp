import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Countdown from "react-countdown";
import { VotingContext } from "../context/voter";
import Style from "../styles/index.module.css";
import Card from "../components/Card/Card";
import image from "../assets/candidate-1.jpg";
import { Span } from "next/dist/trace";

const index = () => {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    voterLength,
    getAllVotetData,
  } = useContext(VotingContext);
  useEffect(() => {
    checkIfWalletIsConnected();
    getAllVotetData();
  });
  return (
    <div className={Style.home}>
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <p>
                No Candidate:<span>{candidateLength}</span>
              </p>
            </div>
            <div className={Style.candidate_list}>
              <p>
                No Voter:<Span>{voterLength}</Span>
              </p>
            </div>
          </div>
          <div className={Style.winner_messsage}>
            <small>
              <Countdown date={Date.now() + 100000} />
            </small>
          </div>
        </div>
      )}
      <Card candidateArray={candidateArray} giveVote={giveVote} />
    </div>
  );
};
export default index;
