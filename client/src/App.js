import React, { useState, useEffect } from "react";
import LinkedList from "./linkedList";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
  background-color: rgba(58, 210, 11, 0.5);
  padding: 10px;
`;

const Title = styled.h2`
  color: white;
  margin: 10px;
  padding: 0;
`

const linkedList = new LinkedList();

function App() {
  let [loading, setLoading] = useState(true);
  let [currentWord, setCurrentWord] = useState({});
  let [value, setValue] = useState("");
  let [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/data")
      .then((res) => {
        res.json().then((data) => {
          setLoading(false);
          data.map((item) => {
            linkedList.add(item);
          });
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (value) {
      const result = linkedList.findNodeWithValue(value.toLowerCase());
      setSuggestions(result.slice(0, 10), []);
    } else {
      setCurrentWord(null);
      setSuggestions([]);
    }
  }, [value]);

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = () => {};

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (val) => {
    setCurrentWord(val);
    return val.word;
  };

  const renderSuggestion = (suggestion) => {
    return <>{suggestion.word}</>;
  };

  const inputProps = {
    placeholder: "Type a word that you want to search",
    value,
    onChange,
  };

  return (
    <Container>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <Title>Meme Dictionary</Title>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          {currentWord ? (
            <div style={{ margin: '10px', color: 'white', fontWeight: 500 }}>
              <div>Từ: {currentWord.word}</div>
              <div>Loại từ: {currentWord.type}</div>
              <div>Phát âm{currentWord.pronounce}</div>
              <div>Ý nghĩa: {currentWord.def}</div>
              <div>Ví dụ: {currentWord.example}</div>
            </div>
          ) : null}
        </>
      )}
    </Container>
  );
}

export default App;
