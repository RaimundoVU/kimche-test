import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Country from './components/Country'
import { Formik, Form, Field} from 'formik'
import { useState } from 'react'
import styled from 'styled-components'

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache()
});


const StyledHeader = styled.header`
  display: block;
  justify-content: center;
  padding: 10px;
  background-color: #eee;
  input {
    width: 400px;
    border-radius: 4px;
    background-color: #eee;
  }
`
const App = () => {
  const [searchString, setSearchString] = useState('')
  return (
    <ApolloProvider client={client}>
      <StyledHeader>
        <h1>Country search</h1>
        <span> Some random text</span>
      <Formik
        initialValues={{search: ''}}
        onSubmit = { values => setSearchString(values.search) }
      >
        <Form>
          <Field name='search'/>
        </Form>
      </Formik>
      </StyledHeader>
      <Country search={searchString}/>
    </ApolloProvider>
  )
};
export default App;
