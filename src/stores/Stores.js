import { writable } from "svelte/store";
// numRandomAPI = 'https://www.random.org/integers/?num=1&min=0&col=1&base=10&format=plain&rnd=new&max=';

// function getRandomNumber(boardGameSize){
//     if(boardGameSize === "5x5"){

//     }
// }
export const randomNumber = writable(null);

const numRandomAPI =
  "https://www.random.org/integers/?num=1&min=0&col=1&base=10&format=plain&rnd=new&max=";

export async function getRandomNumber(boardGameSize) {

    if(boardGameSize === "5x5"){
        try {
            const response = await fetch(`${numRandomAPI}${4}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.text();
            randomNumber.set(parseInt(data))
           
        
          } catch (error) {
            console.error("Fetch error:", error);
            randomNumber.set(null)
          }
    }else{
        try {
            const response = await fetch(`${numRandomAPI}${6}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.text();
            randomNumber.set(parseInt(data))
           
        
          } catch (error) {
            console.error("Fetch error:", error);
            randomNumber.set(null)
          }
    }
  
}
