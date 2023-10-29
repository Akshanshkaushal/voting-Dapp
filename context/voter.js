import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";
import { VotingAddress, VotingABI } from "./contants";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingABI, signerOrProvider);
export const VotingContext = React.createContext();
export const Votingprovider = ({ children }) => {
  const votingTitle = "My first smart contract app";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setcandidateLength] = useState("");
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  use[(error, setError)] = useState("");
  const highestVote = [];
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("pleaseinstall metamask");

    const account = await window.ethereum.request({ method: "eth_account" });
    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("please install metamask and connect");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return setError("pleaseinstall metamask");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account[0]);
  };

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = "https://ipfs.infura.io/ipfs/${added.path}";
      return url;
    } catch (error) {
      setError("error uploading file to ipfs");
    }
  };
  const uploadToIPFSCandidate = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = "https://ipfs.infura.io/ipfs/${added.path}";
      return url;
    } catch (error) {
      setError("error uploading file to ipfs");
    }
  };

  const createVoter = async (formInput, fileurl, router) => {
    try {
      const { name, address, position } = formInput;
      if (!name || !address || !position)
        return setError("Input data is mising");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({ name, address, position, image: fileurl });
      const added = await client.add(data);
      const url = "https://ipfs.infura.io/ipfs/${added.path}";
      const voter = await contract.voterRight(address, name, url, fileurl);
      voter.wait();
      router.push("/voterList");
    } catch (error) {
      console.log(error);
    }
    const getAllVoterData = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);
      voterListData.map(async (eL) => {
        const singlevoterData = await contract.getVoterdata(eL);
        pushVoter.push(singlevoterData);
      });
      const voterList = await contract.getVoterLength();
      setVoterLength(voterList.toNumber());
    };
    try {
    } catch (error) {
      setError("something went wrong");
    }
    // useEffect(() => {
    // getAllVoterData();
    //}, []);
    const giveVote = async (id) => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    const setCandidate = async (candidateForm, fileurl, router) => {
      try {
        const { name, address, position } = candidateForm;
        if (!name || !address || !age) return setError("Input data is mising");
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const data = JSON.stringify({ name, address, image: fileurl, age });
        const added = await client.add(data);
        const ipfs = "https://ipfs.infura.io/ipfs/${added.path}";
        const voter = await contract.setCandidate(
          address,
          name,
          name,
          fileurl,
          ipfs
        );
        voter.wait();
        router.push("/");
      } catch (error) {
        setError("something went wrong");
      }
    };
    const getNewCandidate = async () => {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const allCandidate = await contract.getCandidate();
        allCandidate.map(async (eL) => {
          const singleCandidateData = await contract.getCandidatedata(eL);
          pushCandidate.push(singleCandidateData);
          candidateIndex.push(singleCandidateData[2].toNumber());
        });
        const allCandidateLength = await contract.getCandidateLength();
        setcandidateLength(allCandidateLength.toNumber());
      } catch (error) {
        setError("something went wrong");
      }
    };
    useEffect(() => {
      getNewCandidate();
    }, []);
    return (
      <VotingContext.Provider
        value={{
          votingTitle,
          checkIfWalletIsConnected,
          connectWallet,
          uploadToIPFS,
          createVoter,
          getAllVoterData,
          giveVote,
          setCandidate,
          getNewCandidate,
          error,
          voterArray,
          voterLength,
          voterAddress,
          currentAccount,
          candidateLength,
          candidateArray,
          uploadToIPFSCandidate,
        }}
      >
        {children}
      </VotingContext.Provider>
    );
  };
  const Voter = () => {
    return <div></div>;
  };
};
