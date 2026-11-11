const BASE_URL = " https://pokeapi.co/api/v2/";
​
export async function getPokemonList(offset) {
  return await fetch (`${BASE_URL}pokemon?limit=20&offset=${offset}`)
              .then(response => {
                if (!response.ok) {
        throw new Error("Erreur leurs de chargement des Pokémon")
      }
           return response.json()
       })
       .then ()
      
     
    }
    export async function getPokemon(name){
      await fetch (`${BASE_URL}pokemon/${name.toLowerCase()}`)
       .then(response=> {
        if(!response.ok){
          throw new Error("Resultat not found")
        }
        return response.json()
       }) 
       .then(data => {



        const caracter = {
          id: data.id ,
          name: data.name ,
           type:                                  
            level
        }



       })
    


    }