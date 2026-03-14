let normalArr = Array.from({length: 110}, () => Math.floor(Math.random() * 200));

let sparseArr = []; 
sparseArr[0] = 50;
sparseArr[50] = 2;
sparseArr[120] = 15; 

console.log("\n%c Тест: нерозріджений масив", "font-weight: bold");
sortLib.bubbleSort(normalArr);
sortLib.selectionSort(normalArr);
sortLib.insertionSort(normalArr);
sortLib.shellSort(normalArr);
sortLib.quickSort(normalArr);

console.log("\n%c Тест: розріджений масив", "font-weight: bold");
console.log("Результат Хоара (спадання):", sortLib.quickSort(sparseArr, false));
