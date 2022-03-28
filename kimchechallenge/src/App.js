import React from "react";
import GlobalFonts from './fonts/fonts';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Country from './components/Country'
import Button from './components/Button'
import Container from './components/Container'
import ButtonContainer from "./components/ButtonContainer";
import { Formik, Form, Field} from 'formik'
import { useState } from 'react'

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache()
});

const App = () => {
  const [searchString, setSearchString] = useState('')
  const [filter, setFilter] = useState(true);

  return (
    <ApolloProvider client={client}>
      <Container>
      <GlobalFonts />
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
        <ButtonContainer>
          <h4>Group by:</h4>
          <Button filter={!filter} onClick={ () => setFilter(false) }> Continent</Button>
          <Button filter={filter} onClick={ () => setFilter(true) }> Language</Button>
        </ButtonContainer>
      <Country search={searchString} filter={filter}/>
      </Container>
    </ApolloProvider>
  )
};
export default App;
