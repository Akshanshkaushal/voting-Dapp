import React, { useState, useEffect, useCallback, useContext } from "react";
import { userouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { VotingContext } from "../context/voter";
import Style from "../styles/index.module.css";
import Button from "../components/Button/Button";
import image from "../assets";
import Input from "../components/Input/Input";
const allowVoters = () => {
  const [fileurl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = usestate({
    name: "",
    address: "",
    position: "",
  });
  const router = userouter();
  const { uploadToIPFS, createVoter, voterArray, getAllVoterData } =
    useContext(VotingContext);
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxsize: 5000000,
  });
  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div className={Style.create}>
      <div>
        {fileurl && (
          <div className={Style.voterInfo}>
            <img src={fileurl} alt="voter image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name:<span>&nbps;{formInput.name}</span>
              </p>
              <p>
                Add: &nbps ; <span>{formInput.address.slice(0, 20)}</span>
              </p>
              <p>
                Pos: &nbps; <span>{formInput.position}</span>
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
              {voterArray.map((el, i) => (
                <div className={Style.card_box}>
                  <div className={Style.image}>
                    <img src={el[4]} alt="profile photo" />
                  </div>
                  <div className={Style.card_info}>
                    <p>{el[1]}</p>
                    <p>Address:{el[3].slice(0, 10)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Voter</h1>
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
              setFormInput({ ...candidateForm, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) =>
              setFormInput({ ...candidateForm, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Position"
            placeholder="Voter Position"
            handleClick={(e) =>
              setFormInput({ ...candidateForm, position: e.target.value })
            }
          />
          <div className={Style.Button}>
            <Button
              btnName="Authorized Voter"
              handleClick={() => setCandidate(candidateForm, fileurl, router)}
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
