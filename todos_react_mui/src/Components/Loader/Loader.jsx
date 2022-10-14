import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loader() {
  return (
    <div className="loader--container">
      <ClipLoader color="#00BDD3" size="48px" />
    </div>
  );
}
