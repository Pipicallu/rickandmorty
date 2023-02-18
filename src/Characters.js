import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Characters = ({ category, filter }) => {
  const getCharacterData = async (pageNumber = 1) => {
    const baseUrl = "https://rickandmortyapi.com/api/character";
    const urlToFetch =
      !category && !filter
        ? `${baseUrl}?${pageNumber}`
        : `${baseUrl}?${category}=${filter}&${pageNumber}`;
    console.log(urlToFetch);
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
  const [pageNumber, setPageNumber] = useSearchParams({ page: 1 });

  const pageValue = parseInt(pageNumber.get("page"));

  useEffect(() => {
    getCharacterData(pageNumber).then((data) => setCharacterData(data));
  }, [pageNumber]);

  if (!characterData) {
    return <div>loading ...</div>;
  }

  return (
    <>
      <button onClick={() => setPageNumber({ page: pageValue - 1 })}>
        Prev
      </button>
      <button onClick={() => setPageNumber({ page: pageValue + 1 })}>
        Next
      </button>
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
      <button onClick={() => setPageNumber(pageValue - 1)}>Prev</button>
      <button onClick={() => setPageNumber(pageValue + 1)}>Next</button>
    </>
  );
};
