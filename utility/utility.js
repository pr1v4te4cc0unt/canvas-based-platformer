export async function getJsonFileAsync(uri){
   return await fetch(uri).then((response) => response.json()).then((json) => json);
}