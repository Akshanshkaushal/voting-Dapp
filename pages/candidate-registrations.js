import React, { useState, useEffect, useCallback, useContext } from "react";
import { userouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { VotingContext } from "../context/voter";
import Style from "../styles/index.module.css";
import Button from "../components/Button/Button";
import image from "../assets";
import Input from "../components/Input/Input";
const candidateRegistration = () => {
  const [fileurl, setFileUrl] = useState(null);
  const [candidateForm, setCandidateForm] = usestate({
    name: "",
    address: "",
    age: "",
  });
  const router = userouter();
  const {
    setCandidate,
    uploadToIPFSCandidate,
    candidateArray,
    getNewCandidate,
  } = useContext(VotingContext);
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFSCandidate(acceptedFil[0]);
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxsize: 5000000,
  });
  useEffect(() => {
    getNewCandidate();
  }, []);

  return (
    <div className={Style.create}>
      <div>
        {fileurl && (
          <div className={Style.voterInfo}>
            <img src={fileurl} alt="voter image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name:<span>&nbps;{candidateForm.name}</span>
              </p>
              <p>
                Add: &nbps ; <span>{candidateForm.address.slice(0, 20)}</span>
              </p>
              <p>
                age: &nbps; <span>{candidateForm.position}</span>
              </p>
            </div>
          </div>
        )}
        {!fileurl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create candidate for voting </h4>
              <p>Blockchain voting organization provides ethereum ecosystem</p>
              <p className={Style.sideInfo_para}> contract candidate</p>
            </div>
            <div className={Style.card}>
              {candidateArrayArray.map((el, i) => (
                <div className={Style.card_box}>
                  <div className={Style.image}>
                    <img src={el[3]} alt="profile photo" />
                  </div>
                  <div className={Style.card_info}>
                    <p>
                      {el[1]}#{el[2].toNumber()}
                    </p>
                    <p>{el[0]}</p>
                    <p>Address:{el[6].slice(0, 10)}..</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Candidate</h1>
          <div className={Style.voter_container_box}>
            <div className={Style.voter_container_box_div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.voter_container_box_div_info}>
                  <p>Upload File: jpg,png,gif,wenm max 10mb</p>
                  <div className={Style.voter_container_box_div_image}>
                    <Image
                      src={images.upload}
                      width={150}
                      height={150}
                      objectFit="contain"
                      alt="File Upload"
                    />
                  </div>
                  <p>Drag & Drop File</p>
                  <p> or Browse Media on you device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.input_container}>
          <Input
            inputType="text"
            title="Name"
            placeholder="Voter name"
            handleClick={(e) =>
              setCandidateForm({ ...formInput, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) =>
              setCandidateForm({ ...formInput, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="age"
            placeholder="Voter age"
            handleClick={(e) =>
              setCandidateForm({ ...formInput, age: e.target.value })
            }
          />
          <div className={Style.Button}>
            <Button
              btnName="Authorized Candidate"
              handleClick={() => createVoter(formInput, fileurl, router)}
            />
          </div>
        </div>
      </div>
      <div className={Style.createdVoter}>
        <div className={Style.createdVoter_info}>
          <Image src={images.creator} alt="user profile" />
          <p>Notice For User</p>
          <p>
            Organiser<span>0x939939..</span>
          </p>
          <p>
            only organizer of the voting contract can create voter for election
          </p>
        </div>
      </div>
    </div>
  );
};
