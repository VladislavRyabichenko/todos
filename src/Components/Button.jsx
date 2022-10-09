import React from 'react';

export default function ButtonSubmit({ text, isDisabled }) {
  return (
    <button type="submit" disabled={isDisabled}>
      <span>{text}</span>
    </button>
  );
}
