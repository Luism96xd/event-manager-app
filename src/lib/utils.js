export const formatDate = (fecha) => {
    const d = new Date(fecha)
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
}