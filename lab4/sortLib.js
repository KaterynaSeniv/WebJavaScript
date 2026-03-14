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
            console.warn("Повідомлення: У масиві виявлено undefined-елементи. Їх проігноровано при сортуванні."); 
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
        let n = a.length, comparisons = 0, moves = 0;
        for (let i = 1; i < n; i++) {
            let key = a[i];
            let j = i - 1;
            while (j >= 0 && (ascending ? a[j] > key : a[j] < key)) {
                comparisons++;
                a[j + 1] = a[j];
                j--;
                moves++;
            }
            a[j + 1] = key;
        }
        console.log(`Вставками: Порівнянь: ${comparisons}, Переміщень: ${moves}`);
        return a;
    };

    sortLib.shellSort = function(arr, ascending = true) {
        let a = cleanArray(arr);
        let n = a.length, comparisons = 0, moves = 0;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = a[i];
                let j = i;
                while (j >= gap) {
                    comparisons++;
                    if (ascending ? a[j - gap] > temp : a[j - gap] < temp) {
                        a[j] = a[j - gap];
                        moves++;
                        j -= gap;
                    } else break;
                }
                a[j] = temp;
            }
        }
        console.log(`Шелла: Порівнянь: ${comparisons}, Переміщень: ${moves}`);
        return a;
    };
    
    sortLib.quickSort = function(arr, ascending = true) {
        let a = cleanArray(arr);
        let comps = 0, swaps = 0;
        function qSort(left, right) {
            if (left >= right) return;
            let pivot = a[Math.floor((left + right) / 2)];
            let i = left, j = right;
            while (i <= j) {
                while (ascending ? a[i] < pivot : a[i] > pivot) { i++; comps++; }
                while (ascending ? a[j] > pivot : a[j] < pivot) { j--; comps++; }
                if (i <= j) {
                    [a[i], a[j]] = [a[j], a[i]];
                    i++; j--; swaps++;
                }
            }
            qSort(left, j); qSort(i, right);
        }
        qSort(0, a.length - 1);
        console.log(`Хоара: Порівнянь: ${comps}, Обмінів: ${swaps}`);
        return a;
    };

    window.sortLib = sortLib; 
})(window);
