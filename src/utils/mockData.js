export const generateMockData = (count = 150) => {
  const localidades = ['Dr. Manuel Belgrano', 'Ledesma', 'San Pedro', 'Palpalá', 'El Carmen', 'San Antonio', 'Santa Bárbara', 'Valle Grande', 'Humahuaca', 'Tilcara', 'Tumbaya', 'Cochinoca', 'Yavi', 'Santa Catalina', 'Rinconada', 'Susques'];
  const edades = ['18-25', '26-35', '36-45', '46-55', '56+'];
  const names = ['Ana', 'Juan', 'María', 'Pedro', 'Laura', 'Carlos', 'Sofía', 'Luis', 'Marta', 'Diego', 'Lucía', 'Martín'];
  const surnames = ['García', 'López', 'Pérez', 'González', 'Rodríguez', 'Fernández', 'Martínez', 'Gómez', 'Díaz', 'Sánchez'];

  const data = [];
  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const fullName = `${name} ${surname}`;
    const email = `${name.toLowerCase()}.${surname.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
    const edad = edades[Math.floor(Math.random() * edades.length)];
    const localidad = localidades[Math.floor(Math.random() * localidades.length)];
    
    // Simulate typical scores
    const teamAScore = Math.floor(Math.random() * 4); // 0 to 3
    const teamBScore = Math.floor(Math.random() * 4); // 0 to 3

    data.push({
      id: crypto.randomUUID(),
      nombre: fullName,
      mail: email,
      edad: edad,
      localidad: localidad,
      teamA: 'Argentina',
      teamB: 'Argelia',
      teamAScore: teamAScore,
      teamBScore: teamBScore
    });
  }
  return data;
};
