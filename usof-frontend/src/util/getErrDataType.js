export const errType = (data) => {
    let type = data.match(/"(.*?)"/g);
    type = type[0].substring(1);
    return type.substring(0, type.length - 1);
}