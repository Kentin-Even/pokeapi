import { ApolloWrapper } from "@/lib/apollo-wrapper"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pokémon App",
  description: "Une application pour explorer les Pokémon"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
