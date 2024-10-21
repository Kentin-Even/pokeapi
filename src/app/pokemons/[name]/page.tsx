import Image from "next/image"
import { getClient } from "@/lib/apolloClient"
import { gql } from "@apollo/client"

const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon(name: $name) {
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

interface PokemonPageProps {
  params: {
    name: string
  }
}

const PokemonPage = async ({ params }: PokemonPageProps) => {
  const client = getClient()

  try {
    const { data } = await client.query({
      query: GET_POKEMON_BY_NAME,
      variables: { name: params.name }
    })

    const pokemon = data?.pokemon

    if (!pokemon) {
      return (
        <div className="text-center mt-10">
          Pokémon {params.name} non trouvé
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-6">
          <div className="w-full h-48 flex items-center justify-center">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={150}
              height={150}
              className="w-auto h-auto"
              priority={true}
            />
          </div>
          <h1 className="text-3xl font-bold mt-4">{pokemon.name}</h1>
          <div className="mt-4 text-center">
            <p>HP Max: {pokemon.maxHP}</p>
            <p>CP Max: {pokemon.maxCP}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Attaques spéciales:</h2>
            <ul>
              {pokemon.attacks.special.map(
                (attack: { name: string; damage: number }) => (
                  <li key={attack.name} className="mb-1">
                    {attack.name} - Dégâts: {attack.damage}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données du Pokémon:",
      error
    )
  }
}

export default PokemonPage
