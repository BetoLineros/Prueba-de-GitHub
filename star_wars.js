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
                    const lukeId = data.results[0].url.split("/")[5];
                    
                    // Hacer una solicitud GET al endpoint específico de Luke Skywalker utilizando su ID
                    const lukeResponse = await fetch(`https://swapi.dev/api/people/${lukeId}/`);
                    
                    // Verificar si la solicitud fue exitosa (código de estado 200)
                    if (lukeResponse.ok) {
                        const lukeData = await lukeResponse.json();
                        
                        // Mostrar información sobre Luke Skywalker en la página
                        document.getElementById("name").textContent = lukeData.name;
                        document.getElementById("height").textContent = lukeData.height;
                        document.getElementById("mass").textContent = lukeData.mass;
                        document.getElementById("hair_color").textContent = lukeData.hair_color;
                        document.getElementById("eye_color").textContent = lukeData.eye_color;
                        document.getElementById("birth_year").textContent = lukeData.birth_year;
                        
                        // Mostrar la sección de información
                        document.getElementById("informacionPersonaje").style.display = "block";
                    } else {
                        console.error("Error al obtener información sobre Luke Skywalker.");
                    }
                } else {
                    console.error("No se encontró información sobre Luke Skywalker.");
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
