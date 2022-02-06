import React from 'react';
import blob1_Src from '../../public/blobs.png';
import blob2_Src from '../../public/blob5.png';

export default function Main() {
  return (
    <div className="main-container">
      <button> Check Answers</button>
      <img src={blob1_Src} className="main-blob1"></img>
      <img src={blob2_Src} className="main-blob2"></img>
    </div>
  );
}
