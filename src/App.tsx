import { BacRepresentation, BacRequestDto, Drinker, Gender, Product } from './alkkis.types'
import ProductsList from './components/ProductsList'
import React, { useState } from 'react'
import logo from './logo_alkit.png'
import './main.css'

const App = () => {
  const [drinker, setDrinker] = useState({
    gender: Gender.Female,
    weight: 60,
    time: 1
  } as Drinker)
  const [products, setProducts] = useState([] as Product[])
  const [selected, setSelected] = useState([] as Product[])
  const [result, setResult] = useState('')
  const [searchText, setSearchText] = useState('')

  function handleGenderChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDrinker({...drinker, gender: parseInt(event.target.value) as Gender})
  }

  function handleWeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDrinker({...drinker, weight: parseInt(event.target.value)})
  }

  function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDrinker({...drinker, time: parseInt(event.target.value)})
  }

  function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  function toggleSelected(product?: Product) {
    if (!product) setSelected([])
    else if (selected.includes(product)) setSelected([...selected].filter(p => p.num !== product.num))
    else setSelected([...selected].concat(product))
  }

  async function search() {
    setProducts(
      await fetch(`http://localhost:3000/api/v1/search?name=${searchText}`)
      .then(res => res.json())
    )
  }

  async function calculateBac() {
    const data: BacRequestDto = {
      products: selected,
      drinker: drinker
    }

    const representation: BacRepresentation = await fetch(`http://localhost:3000/api/v1/bac`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    setResult(representation.text)
  }

  return (
    <div className="container">
      <img src={logo} className="logo" alt="Alkoholistit asialla" />
        <section>
          <div className="box">
            <h1 className="subtitle">Juomarin parametrit</h1>
            <label className="inline" htmlFor="gender">Sukupuoli:</label>
            <select className="inline" id="gender" value={drinker.gender} onChange={handleGenderChange}>
              <option value={Gender.Female}>Nainen</option>
              <option value={Gender.Male}>Mies</option>
            </select>
            <br />
            <label htmlFor="weight">Paino (kg):</label>
            <input className="stacked" id="weight" type="number" value={drinker.weight} onChange={handleWeightChange} />
            <label htmlFor="time">Juoma-aika tunneissa:</label>
            <input className="stacked" id="time" type="number" value={drinker.time} onChange={handleTimeChange} />
          </div>
        </section>
        <section>
          <div className="box">
            <h1 className="subtitle">Tuotehaku</h1>
            <label className="inline" htmlFor="search-text">Hakusana</label>
            <input className="inline" id="search-text" type="text" value={searchText} onChange={handleSearchTextChange} />
            <button className="grey" onClick={search}>Hae</button>
            {products.length > 0 ?
              <ProductsList selected={selected} products={products} toggleSelected={toggleSelected} /> :
              <div></div>
            }
          </div>
        </section>
        <button className="green" onClick={calculateBac}>Laske</button>
        {result ?
          <p>{result}</p> :
          <div></div>
        }
      </div>
    );
}

export default App