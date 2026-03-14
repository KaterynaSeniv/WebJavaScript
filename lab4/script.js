let normalArray = Array.from({length: 100}, () => Math.floor(Math.random() * 100));

let sparseArray = [5, 12, 8];
sparseArray[50] = 45;
sparseArray[99] = 100; 

console.log("%c Тест: нерозріджений масив ", "color: blue; font-weight: bold");
console.log("Оригінал:", normalArray);
sortLib.bubbleSort(normalArray);
sortLib.selectionSort(normalArray);
sortLib.insertionSort(normalArray);

console.log("\n%c Тест: розріджений масив", "color: red; font-weight: bold");
console.log("Сортування за спаданням:", sortLib.bubbleSort(sparseArray, false));
