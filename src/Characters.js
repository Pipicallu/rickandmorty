import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const Characters = () => {
  const getCharacterData = async () => {
    const baseUrl = "https://rickandmortyapi.com/api/character";
    const urlToFetch = params ? `${baseUrl}?${params} ` : baseUrl;

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
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");

  const pageValue = parseInt(pageNumber.get("page"));

  const startParams = {
    gender: gender.gender,
    name: name.name,
    page: pageValue,
  };
  const [params, setParams] = useSearchParams({ startParams });
  console.log(startParams);
  console.log(useParams());

  useEffect(() => {
    getCharacterData(pageNumber).then((data) => setCharacterData(data));
  }, [pageNumber, params]);

  if (!characterData) {
    return <div>loading ...</div>;
  }

  return (
    <>
      <button
        onClick={() => {
          setPageNumber({ page: pageValue - 1 });
        }}
      >
        Prev
      </button>
      <button onClick={() => setPageNumber({ page: pageValue + 1 })}>
        Next
      </button>
      {/* <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button> */}
      {/*Sort by Gender*/}
      <div>
        <label for="gender">sort by gender:</label>
        <select
          name="genders"
          id="genders"
          onChange={(e) => setGender({ gender: e.target.value })}
        >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="unknown">unknown</option>
          <option value="genderless">genderless</option>
        </select>
      </div>

      {/*search by name*/}
      <label for="name">Search by name:</label>

      <input
        name="genders"
        id="genders"
        onChange={(e) => setName({ name: e.target.value })}
      />

      <button
        onClick={() => {
          setParams(startParams);
        }}
      >
        search
      </button>
      <ul>
        {characterData["results"].map((character) => (
          <>
            <li key={character.id}>
              <img src={character.image} alt={character.name} />
              <div>
                {character.name}, {character.gender}
              </div>
            </li>
          </>
        ))}
      </ul>
      <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
    </>
  );
};
