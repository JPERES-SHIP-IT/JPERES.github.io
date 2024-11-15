const tablaPeriodica = {
    "H": { nombre: "Hidrógeno", masaAtomica: 1.008, densidad: 0.08988, color: "Incoloro", oxidacion: [1], familia: "No metales" },
    "He": { nombre: "Helio", masaAtomica: 4.0026, densidad: 0.1786, color: "Incoloro", oxidacion: [0], familia: "Gases nobles" },
    "Li": { nombre: "Litio", masaAtomica: 6.94, densidad: 0.534, color: "Plateado", oxidacion: [1], familia: "Metales alcalinos" },
    "Be": { nombre: "Berilio", masaAtomica: 9.0122, densidad: 1.85, color: "Gris", oxidacion: [2], familia: "Metales alcalinotérreos" },
    "B": { nombre: "Boro", masaAtomica: 10.81, densidad: 2.34, color: "Negro", oxidacion: [3], familia: "Metaloides" },
    "C": { nombre: "Carbono", masaAtomica: 12.011, densidad: 2.267, color: "Negro", oxidacion: [-4, 4], familia: "No metales" },
    "N": { nombre: "Nitrógeno", masaAtomica: 14.007, densidad: 1.251, color: "Incoloro", oxidacion: [-3, 3, 5], familia: "No metales" },
    "O": { nombre: "Oxígeno", masaAtomica: 15.999, densidad: 1.429, color: "Incoloro", oxidacion: [-2], familia: "No metales" },
    "F": { nombre: "Flúor", masaAtomica: 18.998, densidad: 1.696, color: "Amarillo pálido", oxidacion: [-1], familia: "Halógenos" },
    "Ne": { nombre: "Neón", masaAtomica: 20.180, densidad: 0.9002, color: "Incoloro", oxidacion: [0], familia: "Gases nobles" },
    "Na": { nombre: "Sodio", masaAtomica: 22.989, densidad: 0.971, color: "Plateado", oxidacion: [1], familia: "Metales alcalinos" },
    "Mg": { nombre: "Magnesio", masaAtomica: 24.305, densidad: 1.738, color: "Plateado", oxidacion: [2], familia: "Metales alcalinotérreos" },
    "Al": { nombre: "Aluminio", masaAtomica: 26.982, densidad: 2.7, color: "Plateado", oxidacion: [3], familia: "Metales" },
    "Si": { nombre: "Silicio", masaAtomica: 28.085, densidad: 2.33, color: "Gris", oxidacion: [4], familia: "Metaloides" },
    "P": { nombre: "Fósforo", masaAtomica: 30.974, densidad: 1.823, color: "Blanco, rojo o negro", oxidacion: [3, 5], familia: "No metales" },
    "S": { nombre: "Azufre", masaAtomica: 32.06, densidad: 2.067, color: "Amarillo", oxidacion: [-2, 4, 6], familia: "No metales" },
    "Cl": { nombre: "Cloro", masaAtomica: 35.45, densidad: 3.214, color: "Amarillo verdoso", oxidacion: [-1, 1, 3, 5, 7], familia: "Halógenos" },
    "Ar": { nombre: "Argón", masaAtomica: 39.948, densidad: 1.784, color: "Incoloro", oxidacion: [0], familia: "Gases nobles" },
    "K": { nombre: "Potasio", masaAtomica: 39.098, densidad: 0.862, color: "Plateado", oxidacion: [1], familia: "Metales alcalinos" },
    "Ca": { nombre: "Calcio", masaAtomica: 40.078, densidad: 1.54, color: "Plateado", oxidacion: [2], familia: "Metales alcalinotérreos" }
};

function calcularMasa() {
    const formula = document.getElementById("formulaInput").value.trim();
    const resultado = document.getElementById("resultado");
    const historial = document.getElementById("historial");

    // Expresión regular para extraer elementos y cantidades (Ej: H2, O1, etc.)
    const matches = formula.match(/([A-Z][a-z]?)(\d*)/g);
    let masaTotal = 0;
    let informacionElemento = "";

    if (matches) {
        for (let match of matches) {
            let [elemento, cantidad] = match.match(/([A-Z][a-z]?)(\d*)/).slice(1);
            cantidad = cantidad ? parseInt(cantidad) : 1;

            if (tablaPeriodica[elemento]) {
                const data = tablaPeriodica[elemento];
                masaTotal += data.masaAtomica * cantidad;
                informacionElemento += `
                    <p><strong>${data.nombre} (${elemento})</strong>:<br>
                    Masa Atómica: ${data.masaAtomica} g/mol<br>
                    Densidad: ${data.densidad} g/L<br>
                    Color: ${data.color}<br>
                    Números de Oxidación: ${data.oxidacion.join(", ")}<br>
                    Familia: ${data.familia}</p>
                `;
            } else {
                resultado.innerHTML = `Elemento desconocido: ${elemento}`;
                return;
            }
        }

        resultado.innerHTML = `
            <p><strong>Masa molecular de ${formula}:</strong> ${masaTotal.toFixed(3)} g/mol</p>
            ${informacionElemento}
        `;

        // Guardar en historial
        const itemHistorial = document.createElement("li");
        itemHistorial.innerHTML = `<strong>${formula}:</strong> ${masaTotal.toFixed(3)} g/mol`;
        historial.prepend(itemHistorial);
    } else {
        resultado.textContent = "Fórmula no válida. Intenta de nuevo.";
    }
}
