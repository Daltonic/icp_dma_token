import React, { useEffect, useState } from 'react'
import { dma_backend } from 'declarations/dma_backend'

function Header() {
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const name = await dma_backend.getName()
      setName(name)
    }

    fetchData()
  }, [])
  return (
    <header>
      <div className="blue window" id="logo">
        <h1>
          <span role="img" aria-label="tap emoji">
            💎
          </span>
          {name}
        </h1>
      </div>
    </header>
  )
}

export default Header
