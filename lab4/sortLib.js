
(function(window) {
    var sortLib = {};
  
    function cleanArray(arr) {
        let hasUndefined = false;
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                hasUndefined = true;
            } else {
                result.push(arr[i]);
            }
        }
        if (hasUndefined) {
            console.warn("Попередження: У масиві знайдено undefined елементи. Їх було проігноровано.");
        }
        return result;
    }

    sortLib.bubbleSort = function(arr, ascending = true) {
        let a = cleanArray(arr);
        let n = a.length, comparisons = 0, swaps = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                comparisons++;
                if (ascending ? a[j] > a[j + 1] : a[j] < a[j + 1]) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    swaps++;
                }
            }
        }
        console.log(`Бульбашка: Порівнянь: ${comparisons}, Обмінів: ${swaps}`);
        return a;
    };

    sortLib.selectionSort = function(arr, ascending = true) {
        let a = cleanArray(arr);
        let n = a.length, comparisons = 0, swaps = 0;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++;
                if (ascending ? a[j] < a[minIdx] : a[j] > a[minIdx]) minIdx = j;
            }
            if (minIdx !== i) {
                [a[i], a[minIdx]] = [a[minIdx], a[i]];
                swaps++;
            }
        }
        console.log(`Вибором: Порівнянь: ${comparisons}, Обмінів: ${swaps}`);
        return a;
    };

    sortLib.insertionSort = function(arr, ascending = true) {
        let a = cleanArray(arr);
        let n = a.length, comparisons = 0, insertions = 0;
        for (let i = 1; i < n; i++) {
            let key = a[i];
            let j = i - 1;
            while (j >= 0 && (ascending ? a[j] > key : a[j] < key)) {
                comparisons++;
                a[j + 1] = a[j];
                j--;
                insertions++;
            }
            a[j + 1] = key;
        }
        console.log(`Вставками: Порівнянь: ${comparisons}, Переміщень: ${insertions}`);
        return a;
    };

    window.sortLib = sortLib;

})(window);
