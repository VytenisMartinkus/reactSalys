import React, { useEffect } from "react"

const Filter = ({searchInput,setSearchInput,setFiltered,setCountries,countries,}) => {
  
  const regions = [
    {
      name: "Filter by region",
      desc: "All",
    },
    {
      name: "Africa",
      desc: "Africa",
    },
    {
      name: "Americas",
      desc: "Americas",
    },
    {
      name: "Asia",
      desc: "Asia",
    },
    {
      name: "Europe",
      desc: "Europe",
    },
    {
      name: "Oceania",
      desc: "Oceania",
    },
  ]

  // Sustabdo puslapio reloada kai submitinama forma
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // šaliu ieškojimas
  const searchCountries = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredCountries)
    } else {
      setFiltered(countries)
    }
  }

  // Regiono filtras

  const filterRegions = async (region) => {
    const url = `https://restcountries.com/v2/region/${region}`
    const res = await fetch(url)
    const data = await res.json()
    setCountries(data)
  }

  useEffect(() => {
    filterRegions()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <form className="form" id="form" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          placeholder="Search Country"
          onChange={(e) => searchCountries(e.target.value)}
        />

        <div className="select">
          <select
            name="select"
            id="select"
            onChange={(e) => filterRegions(e.target.value)}
            value={regions.name}
          >
            <option value="Africa">Afrika</option>
            <option value="Asia">Azija</option>
            <option value="Europe">Europa</option>
            <option value="Americas">Amerika</option>
            <option value="Oceania">Okeanija</option>
          </select>
        </div>
      </form>
    </>
  )
}

export default Filter
