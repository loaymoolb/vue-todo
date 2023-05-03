// Śnieżka (snowflake).
// Mamy tablicę śnieżek. Każda śnieżka ma 6 ramion.
// Śnieżka ma postać krotki (tuple) 6-elementowej, np (1,2,2,3,4,5).
// Podajemy długości poszczególnych ramion (zgodnie z ruchem wskazówek zegara).

// Należy sprawdzić czy na liście znajdują się co najmniej 2 takie same śnieżki.

// Dla przykładowych zbiorów danych mamy następujące odpowiedzi:
// [(1,2,3,4,5,6), (2,3,4,5,6,7), (3,4,5,6,7,8)] => nie
// [(1,2,3,4,5,6), (1,2,3,4,5,6), (3,4,5,6,7,8)] => tak
// [(1,2,3,4,5,6), (3,4,5,6,7,8), (1,2,3,4,5,6)] => tak
// [(1,2,3,4,5,6), (2,3,4,5,6,1), (3,4,5,6,7,8)] => tak
// [(1,2,3,4,5,6), (6,5,4,3,2,1), (3,4,5,6,7,8)] => tak
// [(1,2,3,4,5,6), (1,2,3,4,6,5), (3,4,5,6,7,8)] => nie
// TypeScript

// Using a Map
// Time Complexity: O(n * m)
// Space Complexity: O(n * m)

function hasDuplicateSnowflakes(arr: number[][]): boolean {
  const map = new Map<string, boolean>();
  for (let i = 0; i < arr.length; i++) {
    const tuple: number[] = arr[i];
    const variations: number[][] = [];
    for (let j = 0; j < tuple.length; j++) {
      tuple.unshift(tuple.pop()!);
      variations.push([...tuple]);
    }
    for (let k = 0; k < variations.length; k++) {
      const variation = variations[k];
      const variationKey = variation.join(",");
      if (map.has(variationKey)) {
        return true;
      }
      map.set(variationKey, true);
      const reversedVariationKey = [...variation].reverse().join(",");
      if (map.has(reversedVariationKey)) {
        return true;
      }
      map.set(reversedVariationKey, true);
    }
  }
  return false;
}

// Test Cases
const snowflakes1 = [
  [1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8],
];
console.log(hasDuplicateSnowflakes(snowflakes1)); // false

const snowflakes2 = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [3, 4, 5, 6, 7, 8],
];
console.log(hasDuplicateSnowflakes(snowflakes2)); // true

const snowflakes3 = [
  [1, 2, 3, 4, 5, 6],
  [3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6],
];
console.log(hasDuplicateSnowflakes(snowflakes3)); // true

const snowflakes4 = [
  [1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 1],
  [3, 4, 5, 6, 7, 8],
];
console.log(hasDuplicateSnowflakes(snowflakes4)); // true

const snowflakes5 = [
  [1, 2, 3, 4, 5, 6],
  [6, 5, 4, 3, 2, 1],
  [3, 4, 5, 6, 7, 8],
];
console.log(hasDuplicateSnowflakes(snowflakes5)); // true

const snowflakes6 = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 6, 5],
  [3, 4, 5, 6, 7, 8],
];
console.log(hasDuplicateSnowflakes(snowflakes6)); // false
