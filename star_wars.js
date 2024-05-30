document.addEventListener("DOMContentLoaded", () => {
    // Función para obtener información sobre un personaje de Star Wars
    async function getCharacterInfo(characterName) {
        try {
            // Hacer una solicitud GET al endpoint de personas (characters)
            const response = await fetch(`https://swapi.dev/api/people/?search=${characterName}`);
            
            // Verificar si la solicitud fue exitosa (código de estado 200)
            if (response.ok) {
                const data = await response.json();
                
                // Verificar si se encontraron resultados
                if (data.count > 0) {
                    // Obtener el ID del primer resultado (asumiendo que Luke Skywalker es el primer resultado)
                    const characterId = data.results[0].url.split("/")[5];
                    
                    // Hacer una solicitud GET al endpoint específico del personaje utilizando su ID
                    const characterResponse = await fetch(`https://swapi.dev/api/people/${characterId}/`);
                    
                    // Verificar si la solicitud fue exitosa (código de estado 200)
                    if (characterResponse.ok) {
                        const characterData = await characterResponse.json();
                        
                        // Mostrar información sobre el personaje en la página
                        document.getElementById("name").textContent = characterData.name;
                        document.getElementById("height").textContent = characterData.height;
                        document.getElementById("mass").textContent = characterData.mass;
                        document.getElementById("hair_color").textContent = characterData.hair_color;
                        document.getElementById("eye_color").textContent = characterData.eye_color;
                        document.getElementById("birth_year").textContent = characterData.birth_year;

                        // Agregar avatar del personaje utilizando Star Wars Visual Guide
                        document.getElementById("characterAvatar").src = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
                        
                        // Mostrar la imagen y la sección de información
                        document.getElementById("characterAvatar").style.display = "block";
                        document.getElementById("informacionPersonaje").style.display = "block";
                    } else {
                        console.error("Error al obtener información sobre el personaje.");
                    }
                } else {
                    console.error("No se encontró información sobre el personaje.");
                }
            } else {
                console.error("Error al conectar con la API de Star Wars.");
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    }

    // Agregar un event listener al botón para obtener información al hacer clic
    document.getElementById("btnGetInfo").addEventListener("click", () => {
        // Llamar a la función para obtener información sobre Luke Skywalker
        getCharacterInfo("Luke Skywalker");
    });
});
