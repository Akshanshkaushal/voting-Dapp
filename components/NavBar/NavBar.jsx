import React,{useState,useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import {AiFillLock,AiFillUnlock} from react-icons/ai;
import { VotingContext } from "../../context/voter";
import Style from './NavBar.module.css';
import Loading from 'C:\Users\K S\Desktop\new_dapp\assets\images\b4d657e7ef262b88eb5f7ac021edda87_w200.webp';
import { Span } from "next/dist/trace";
const NavBar=()=>{
    const{connectwallet, error,currentAccount} = useContext(VotingContext);
    const[openNav,setOpenNav]=useState(true);
    const openNavigation =()=>{
        if(openNav){
            setOpenNav(false)
        }
        else if(!openNav){
            setOpenNav(true)
        }
    }
    return (<div className={Style.navbar}>
        {error===""?(
            ""
        ):(
            <div className={Style.message_box}>
                <div className={Style.message}>
                    <p>{error}</p>
                </div>
            </div>
        )}
        <div className={Style.navbar_box}>
            <div className={Style.title}>
                <Link href ={{pathname:'/'}}>
                    <Image src ={Loading} alt ="logo" width={80} height ={80}/>
                </Link>

            </div>
            <div className={Style.connect}>
                {currentAccount ? (
                <div>
                    <div className={Style.connect_flex}>
                        <button onClick={()=> openNavigation()}>
                            {currentAccount.slice(0,10)}..
                        </button>
                        {currentAccount && (<span>{openNav ?(<AiFillUnlock onClick={()=>openNavigation()}/>):
                        ( <AiFillLock nClick={()=>openNavigation()}/>)}
                        </span>
                        )}

                    </div>
                    <div >
                        {openNav && (
                            <div className={Style.navigation}>
                                <p>
                                    <Link href ={ {pathname:'/'}}>Home
                                    </Link>
                                </p>
                                <p>
                                    <Link href ={ {pathname:"candidate-registrations"}}>Candidate registration
                                    </Link>
                                </p>
                                <p>
                                    <Link href ={ {pathname:"allwd-voters"}}>Voter Registration
                                    </Link>
                                </p>
                                <p>
                                    <Link href ={ {pathname:"voterList"}}>Voter List
                                    </Link>
                                </p>
                                </div>
                        )}
                    </div>
                    </div>
                    
                
                ):(
                    <button onClick={()=> connectwallet()}connect Wallet></button>
                )}
            </div>
        </div>
    </div>
    );

};