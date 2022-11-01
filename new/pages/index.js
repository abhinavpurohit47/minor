import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Dashboard from "./components/Home/Dashboard";
import Title from "./components/Home/Title";

import Upload from "./components/Upload";
// import PrivatePage from './components/uploadnew';

export default function Home() {
  return (
    <div className="flex flex-col ">
      <div className="border-2 border-black p-5 m-10">
        <Title />
        <div className="flex flex-row w-full h-full justify-center ">
          <Dashboard />
          {/* <GlobalStyles /> */}

          <Upload />
          {/* <PrivatePage /> */}
        </div>
      </div>
    </div>
  );
}
