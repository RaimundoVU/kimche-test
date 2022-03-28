import styled from 'styled-components'
import { ApolloProvider , useQuery} from "@apollo/client";
import { GET_COUNTRIES } from "../utilities/queries";


const StyledCountry = styled.article`
  display: inline-block;
  padding: 5px;
  width: 250px;
  transition: box-shadow 0.2s ease;
  margin: 40px 10px 0 10px;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: solid 1px;
`
const Container = styled.div`
  display: flex;
  background-color: #eee;
  justify-content: center;
`

const Center = styled.div`
  column-count: 3;
  width: 1000px;
`

const Country = ({...props}) => {
  const { loading, error, data} = useQuery(GET_COUNTRIES)
  const { search } = props;

  const filterCountries = () => {
    console.log('search', search)
    let filtered = [];
    if (!loading) {
      let countries = data.countries;
      countries.forEach( country => {
        console.log(country)
        if ( country.name.includes(search) ) filtered.push(country)
      } )
    }
    return filtered; 
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let filteredCountries = filterCountries();
  console.log('filtrados')
  console.log(filteredCountries)
  return (
    <>
      { filteredCountries.map( country =>   
      <Container>
        <Center>
          <StyledCountry>
            <h3>{country.emoji}  {country.name}</h3>
            <span> <b>Capital:</b> {country.capital}</span>
            <br />
            <span> <b>Currency:</b> {country.currency}</span>
          </StyledCountry>
        </Center>
      </Container>
      )}
    </>
  )
}


export default Country;
