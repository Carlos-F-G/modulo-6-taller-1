export async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("HospitalDB", 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("citas", { keyPath: "id" });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al abrir IndexedDB");
    });
}

// ✅ Agregar Cita a IndexedDB
export async function agregarCita(cita) {
    const db = await openDatabase();
    const tx = db.transaction("citas", "readwrite");
    const store = tx.objectStore("citas");
    store.add(cita);
}

// ✅ Obtener citas con carga parcial (Lazy Loading)
export async function obtenerCitasLazy(limit = 10) {
    const db = await openDatabase();
    const tx = db.transaction("citas", "readonly");
    const store = tx.objectStore("citas");

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result.slice(0, limit));
        request.onerror = () => reject("Error al obtener las citas");
    });
}

// ✅ Limpiar todas las citas
export async function limpiarCitas() {
    const db = await openDatabase();
    const tx = db.transaction("citas", "readwrite");
    tx.objectStore("citas").clear();
}
