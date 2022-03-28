import styled from 'styled-components'
import { useQuery} from "@apollo/client";
import { GET_COUNTRIES } from "../utilities/queries";


const StyledCountry = styled.article`
  display: inline-block;
  padding: 5px;
  width: 225px;
  transition: box-shadow 0.2s ease;
  margin: 10px 5px 10px 0;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: solid 1px;
`
const Container = styled.div`
  display: block;
  background-color: #eee;
  justify-content: left;
`

const Center = styled.div`
  column-count: 3;
  background-color: #eee;
  width: 225px;
`

const Country = ({...props}) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES)
  const { search, filter } = props;

  const filterCountries = () => {
    if (search === '') return [];
    let filtered = [];
    if (!loading) {
      let countries = data.countries;
      countries.forEach( country => {
        if ( country.name.includes(search) ) filtered.push(country)
      } )
    }
    return filtered; 
  }

  const groupByProperty = (arr, filter) => {
    if (search === '') return [];
    let result = {};
    if ( filter ) {
      let propertyMap = []
      arr.forEach((country) => {
        let { languages } = country;
        languages.forEach((language) => propertyMap.push(language.name))
        })
        propertyMap = new Set(propertyMap);
        propertyMap.forEach((prop) => {
          console.log(prop)
          result = {...result, [prop]: 
            arr.map((c) => {
              let spokenLanguages = c.languages.map(l => l.name);
              let aux = spokenLanguages.find(l => l === prop );
              if (aux !== undefined) return c;
              return undefined;
            })
        }})
      return result;
    }
    else if ( !filter ) {
      let propertyMap = []
      arr.forEach((country) => {
        let { continent } = country;
        propertyMap.push(continent.name)
      })
      propertyMap = new Set(propertyMap);
      propertyMap.forEach((prop) => {
        result = {...result, [prop]: 
          arr.map((c) => {
            let { continent } = c;
            if ( continent.name === prop ) return c
            return undefined;
          })
        }
      })
    }
    return result;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let filteredCountries = filterCountries();
  let groupedCountries = groupByProperty(filteredCountries, filter);
  return (
    <Container>
      {
        Object.keys(groupedCountries).map((obj,i) => {
          console.log(obj,i)
          console.log(groupedCountries)
          return (
            <>
              <h2>{obj}</h2>
              {groupedCountries[obj].map( country =>
                country !== undefined 
                ? 
                <Center>
                  <StyledCountry>
                    <h3>{country.emoji}  {country.name}</h3>
                    <span><b>Capital:</b> {country.capital}</span>
                    <br/>
                    <span><b>Currency:</b> {country.currency}</span>
                  </StyledCountry>
                </Center>
                : null
              )}
            </>
          )
      })
      }
    </Container>
  )
}


export default Country;
