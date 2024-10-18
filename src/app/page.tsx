import { gql } from "@apollo/client"
import Image from "next/image"
import { getClient } from "@/lib/apolloClient"
import Link from "next/link"

const GET_POKEMONS = gql`
  {
    pokemons(first: 9) {
      id
      name
      image
      maxHP
      maxCP
      attacks {
        special {
          name
          damage
        }
      }
    }
  }
`

const Pokemon = async () => {
  const client = getClient()
  const { data } = await client.query({
    query: GET_POKEMONS
  })

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mt-5 mb-6 text-center">
        Liste des Pokémon
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.pokemons.map(
          (pokemon: { id: string; name: string; image: string }) => (
            <div
              key={pokemon.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
              <div className="w-full h-48 flex items-center justify-center">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <div className="p-4 w-full text-center">
                <Link href={`/pokemons/${pokemon.id}`}>{pokemon.name}</Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Pokemon
