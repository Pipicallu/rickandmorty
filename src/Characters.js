import React from "react";
import { useState, useEffect } from "react";

export const Characters = () => {
  const getCharacterData = async (pageNumber = 1) => {
    const urlToFetch = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const JsonCharacterData = await response.json();
        const results = JsonCharacterData;
        console.log(results);
        return results;
      }
      throw new Error("request failed for some reason");
    } catch (error) {
      console.log(error);
    }
  };

  const [characterData, setCharacterData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getCharacterData(pageNumber).then((data) => setCharacterData(data));
  }, [pageNumber]);

  if (!characterData) {
    return <div>loading ...</div>;
  }

  return (
    <>
      <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
      <ul>
        {characterData["results"].map((character) => (
          <>
            <li key={character.id}>
              <img src={character.image} alt={character.name} />
              <div>{character.name}</div>
            </li>
          </>
        ))}
      </ul>
      <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
    </>
  );
};
