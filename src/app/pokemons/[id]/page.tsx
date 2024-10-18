import Image from "next/image"
import { getClient } from "@/lib/apolloClient"
import { gql } from "@apollo/client"

const GET_POKEMONS_BY_ID = gql`
  query GetPokemonById($id: String!) {
    pokemon(id: $id) {
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
    id: string
  }
}

const PokemonPage = async ({ params }: PokemonPageProps) => {
  const client = getClient()
  const { data } = await client.query({
    query: GET_POKEMONS_BY_ID,
    variables: { id: params.id }
  })

  const pokemon = data.pokemon

  if (!pokemon) {
    return <div>Pokémon non trouvé</div>
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
            className="object-contain"
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
            {pokemon.attacks.special.map((attack: { name: string, damage: number }) => (
              <li key={attack.name} className="mb-1">
                {attack.name} - Dégâts: {attack.damage}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PokemonPage
