class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 20;
        this.animationSpeed = 3;
        this.isAnimating = false;
        this.selectedAlgorithm = '';
        this.currentLanguage = 'java';
        this.shouldStop = false;
        
        this.speedMap = {
            1: { delay: 2000, label: 'Very Slow' },
            2: { delay: 1000, label: 'Slow' },
            3: { delay: 500, label: 'Medium' },
            4: { delay: 200, label: 'Fast' },
            5: { delay: 50, label: 'Very Fast' }
        };

        this.complexityData = {
            'bubble-sort': {
                best: 'O(n)',
                average: 'O(n²)',
                worst: 'O(n²)',
                space: 'O(1)'
            },
            'merge-sort': {
                best: 'O(n log n)',
                average: 'O(n log n)',
                worst: 'O(n log n)',
                space: 'O(n)'
            },
            'quick-sort': {
                best: 'O(n log n)',
                average: 'O(n log n)',
                worst: 'O(n²)',
                space: 'O(log n)'
            },
            'heap-sort': {
                best: 'O(n log n)',
                average: 'O(n log n)',
                worst: 'O(n log n)',
                space: 'O(1)'
            },
            'insertion-sort': {
                best: 'O(n)',
                average: 'O(n²)',
                worst: 'O(n²)',
                space: 'O(1)'
            },
            'selection-sort': {
                best: 'O(n²)',
                average: 'O(n²)',
                worst: 'O(n²)',
                space: 'O(1)'
            }
        };

        this.algorithmCode = {
            'bubble-sort': {
                java: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
                python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # swap arr[j] and arr[j+1]
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
                cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
            },
            'merge-sort': {
                java: `public void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
                python: `def merge_sort(arr, l, r):
    if l < r:
        m = l + (r - l) // 2
        merge_sort(arr, l, m)
        merge_sort(arr, m + 1, r)
        merge(arr, l, m, r)`,
                cpp: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
            },
            'quick-sort': {
                java: `public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
                python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`,
                cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
            },
            'heap-sort': {
                java: `public void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
                python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)`,
                cpp: `void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`
            },
            'insertion-sort': {
                java: `public void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
                python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
                cpp: `void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
            },
            'selection-sort': {
                java: `public void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
                python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
                cpp: `void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`
            }
        };

        this.init();
    }

    init() {
        this.generateRandomArray();
        this.setupEventListeners();
        this.renderBars();
        this.updateSliderDisplays();
    }

    setupEventListeners() {
        // Algorithm selection
        document.getElementById('bubble-sort').addEventListener('click', () => this.selectAlgorithm('bubble-sort'));
        document.getElementById('merge-sort').addEventListener('click', () => this.selectAlgorithm('merge-sort'));
        document.getElementById('quick-sort').addEventListener('click', () => this.selectAlgorithm('quick-sort'));
        document.getElementById('heap-sort').addEventListener('click', () => this.selectAlgorithm('heap-sort'));
        document.getElementById('insertion-sort').addEventListener('click', () => this.selectAlgorithm('insertion-sort'));
        document.getElementById('selection-sort').addEventListener('click', () => this.selectAlgorithm('selection-sort'));

        // Control buttons
        document.getElementById('generate-array').addEventListener('click', () => this.generateRandomArray());
        document.getElementById('start-sorting').addEventListener('click', () => this.startSorting());
        document.getElementById('stop-sorting').addEventListener('click', () => this.stopSorting());
        document.getElementById('reset-sorting').addEventListener('click', () => this.resetArray());

        // Sliders
        document.getElementById('speed-slider').addEventListener('input', (e) => {
            this.animationSpeed = parseInt(e.target.value);
            document.getElementById('speed-value').textContent = this.speedMap[this.animationSpeed].label;
        });

        document.getElementById('array-size-slider').addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            document.getElementById('array-size-value').textContent = this.arraySize;
            this.generateRandomArray();
        });

        // Manual input
        document.getElementById('apply-manual-input').addEventListener('click', () => this.applyManualInput());
        document.getElementById('manual-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.applyManualInput();
        });

        // Language selection
        document.querySelectorAll('.language-selector').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentLanguage = e.target.dataset.lang;
                document.getElementById('selected-language').textContent = 
                    this.currentLanguage.charAt(0).toUpperCase() + this.currentLanguage.slice(1);
                this.updateCodeDisplay();
            });
        });
    }

    selectAlgorithm(algorithmId) {
        if (this.isAnimating) return;
        
        this.selectedAlgorithm = algorithmId;
        document.getElementById('sorting-algorithms-grp-btn').textContent = 
            algorithmId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        document.getElementById('start-sorting').disabled = false;
        
        this.updateComplexityDisplay();
        this.updateCodeDisplay();
    }

    updateCodeDisplay() {
        if (!this.selectedAlgorithm) return;
        
        const code = this.algorithmCode[this.selectedAlgorithm][this.currentLanguage];
        document.getElementById('code-display').innerHTML = `<code class="language-${this.currentLanguage}">${code}</code>`;
    }

    updateComplexityDisplay() {
        if (!this.selectedAlgorithm) return;
        
        const complexity = this.complexityData[this.selectedAlgorithm];
        document.getElementById('best-time').textContent = complexity.best;
        document.getElementById('average-time').textContent = complexity.average;
        document.getElementById('worst-time').textContent = complexity.worst;
        document.getElementById('space-complexity').textContent = complexity.space;
    }

    generateRandomArray() {
        if (this.isAnimating) return;
        
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 100) + 10);
        }
        this.renderBars();
    }

    renderBars() {
        const container = document.getElementById('bars-container');
        container.innerHTML = '';
        
        const maxValue = Math.max(...this.array);
        const containerHeight = 360;
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'sorting-bar';
            bar.style.height = `${(value / maxValue) * containerHeight}px`;
            bar.textContent = value;
            bar.dataset.index = index;
            container.appendChild(bar);
        });
    }

    async startSorting() {
        if (this.isAnimating || !this.selectedAlgorithm) return;
        
        this.isAnimating = true;
        this.shouldStop = false;
        this.disableControls();
        
        // Reset all bars to unsorted state
        this.resetBarsState();
        
        try {
            switch (this.selectedAlgorithm) {
                case 'bubble-sort':
                    await this.bubbleSort();
                    break;
                case 'merge-sort':
                    await this.mergeSort(0, this.array.length - 1);
                    break;
                case 'quick-sort':
                    await this.quickSort(0, this.array.length - 1);
                    break;
                case 'heap-sort':
                    await this.heapSort();
                    break;
                case 'insertion-sort':
                    await this.insertionSort();
                    break;
                case 'selection-sort':
                    await this.selectionSort();
                    break;
            }
            
            if (!this.shouldStop) {
                await this.markAllSorted();
            }
        } catch (error) {
            console.log('Sorting stopped:', error);
        }
        
        this.isAnimating = false;
        this.enableControls();
    }

    stopSorting() {
        if (this.isAnimating) {
            this.shouldStop = true;
            this.isAnimating = false;
            this.enableControls();
        }
    }

    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.shouldStop) return;
                await this.compare(j, j + 1);
                if (this.array[j] > this.array[j + 1]) {
                    await this.swap(j, j + 1);
                }
            }
            this.markSorted(n - i - 1);
        }
        this.markSorted(0);
    }

    async mergeSort(left, right) {
        if (left >= right || this.shouldStop) return;
        
        const mid = Math.floor((left + right) / 2);
        await this.mergeSort(left, mid);
        await this.mergeSort(mid + 1, right);
        await this.merge(left, mid, right);
    }

    async merge(left, mid, right) {
        const leftArr = this.array.slice(left, mid + 1);
        const rightArr = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (this.shouldStop) return;
            
            await this.compare(left + i, mid + 1 + j);
            
            if (leftArr[i] <= rightArr[j]) {
                this.array[k] = leftArr[i];
                i++;
            } else {
                this.array[k] = rightArr[j];
                j++;
            }
            this.updateBar(k, this.array[k]);
            k++;
            await this.delay();
        }
        
        while (i < leftArr.length) {
            if (this.shouldStop) return;
            this.array[k] = leftArr[i];
            this.updateBar(k, this.array[k]);
            i++;
            k++;
            await this.delay();
        }
        
        while (j < rightArr.length) {
            if (this.shouldStop) return;
            this.array[k] = rightArr[j];
            this.updateBar(k, this.array[k]);
            j++;
            k++;
            await this.delay();
        }
    }

    async quickSort(low, high) {
        if (low < high && !this.shouldStop) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (this.shouldStop) return i + 1;
            
            await this.compare(j, high);
            if (this.array[j] < pivot) {
                i++;
                await this.swap(i, j);
            }
        }
        
        await this.swap(i + 1, high);
        return i + 1;
    }

    async heapSort() {
        const n = this.array.length;
        
        // Build heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            if (this.shouldStop) return;
            await this.heapify(n, i);
        }
        
        // Extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            if (this.shouldStop) return;
            await this.swap(0, i);
            this.markSorted(i);
            await this.heapify(i, 0);
        }
        this.markSorted(0);
    }

    async heapify(n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n) {
            await this.compare(left, largest);
            if (this.array[left] > this.array[largest]) {
                largest = left;
            }
        }
        
        if (right < n) {
            await this.compare(right, largest);
            if (this.array[right] > this.array[largest]) {
                largest = right;
            }
        }
        
        if (largest !== i) {
            await this.swap(i, largest);
            await this.heapify(n, largest);
        }
    }

    async insertionSort() {
        const n = this.array.length;
        
        for (let i = 1; i < n; i++) {
            if (this.shouldStop) return;
            
            const key = this.array[i];
            let j = i - 1;
            
            while (j >= 0 && this.array[j] > key) {
                if (this.shouldStop) return;
                await this.compare(j, j + 1);
                this.array[j + 1] = this.array[j];
                this.updateBar(j + 1, this.array[j + 1]);
                j--;
                await this.delay();
            }
            
            this.array[j + 1] = key;
            this.updateBar(j + 1, key);
            await this.delay();
        }
    }

    async selectionSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            if (this.shouldStop) return;
            
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (this.shouldStop) return;
                await this.compare(j, minIdx);
                if (this.array[j] < this.array[minIdx]) {
                    minIdx = j;
                }
            }
            
            if (minIdx !== i) {
                await this.swap(i, minIdx);
            }
            this.markSorted(i);
        }
        this.markSorted(n - 1);
    }

    async compare(i, j) {
        this.highlightBars([i, j], 'comparing');
        this.highlightCodeLine('compare');
        await this.delay();
        this.unhighlightBars([i, j]);
    }

    async swap(i, j) {
        this.highlightBars([i, j], 'swapping');
        this.highlightCodeLine('swap');
        
        const temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
        
        this.updateBar(i, this.array[i]);
        this.updateBar(j, this.array[j]);
        
        await this.delay();
        this.unhighlightBars([i, j]);
    }

    updateBar(index, value) {
        const bars = document.querySelectorAll('.sorting-bar');
        const maxValue = Math.max(...this.array);
        const containerHeight = 360;
        
        bars[index].style.height = `${(value / maxValue) * containerHeight}px`;
        bars[index].textContent = value;
    }

    highlightBars(indices, className) {
        const bars = document.querySelectorAll('.sorting-bar');
        indices.forEach(index => {
            bars[index].classList.add(className);
        });
    }

    unhighlightBars(indices) {
        const bars = document.querySelectorAll('.sorting-bar');
        indices.forEach(index => {
            bars[index].classList.remove('comparing', 'swapping');
        });
    }

    markSorted(index) {
        const bars = document.querySelectorAll('.sorting-bar');
        bars[index].classList.add('sorted');
    }

    async markAllSorted() {
        const bars = document.querySelectorAll('.sorting-bar');
        for (let i = 0; i < bars.length; i++) {
            if (this.shouldStop) return;
            bars[i].classList.add('sorted');
            await this.delay(20);
        }
    }

    highlightCodeLine(type) {
        // This is a simplified version - you can make it more sophisticated
        const lines = document.querySelectorAll('.code-line');
        lines.forEach(line => line.classList.remove('highlighted'));
        
        // Find and highlight relevant line based on operation type
        const codeText = document.querySelector('#code-display code').textContent;
        const linesArray = codeText.split('\n');
        
        let targetLine = -1;
        for (let i = 0; i < linesArray.length; i++) {
            if ((type === 'compare' && linesArray[i].includes('if')) ||
                (type === 'swap' && linesArray[i].includes('swap'))) {
                targetLine = i;
                break;
            }
        }
        
        if (targetLine >= 0 && lines[targetLine]) {
            lines[targetLine].classList.add('highlighted');
        }
    }

    resetBarsState() {
        const bars = document.querySelectorAll('.sorting-bar');
        bars.forEach(bar => {
            bar.classList.remove('comparing', 'swapping', 'sorted');
        });
    }

    resetArray() {
        if (this.isAnimating) return;
        
        this.generateRandomArray();
    }

    disableControls() {
        document.getElementById('start-sorting').disabled = true;
        document.getElementById('stop-sorting').disabled = false;
        document.getElementById('generate-array').disabled = true;
        document.getElementById('reset-sorting').disabled = true;
        document.getElementById('array-size-slider').disabled = true;
        document.getElementById('speed-slider').disabled = true;
        document.getElementById('sorting-algorithms-grp-btn').disabled = true;
    }

    enableControls() {
        document.getElementById('start-sorting').disabled = false;
        document.getElementById('stop-sorting').disabled = true;
        document.getElementById('generate-array').disabled = false;
        document.getElementById('reset-sorting').disabled = false;
        document.getElementById('array-size-slider').disabled = false;
        document.getElementById('speed-slider').disabled = false;
        document.getElementById('sorting-algorithms-grp-btn').disabled = false;
    }

    delay(customDelay) {
        if (this.shouldStop) {
            throw new Error('Sorting stopped');
        }
        const delayMs = customDelay || this.speedMap[this.animationSpeed].delay;
        return new Promise(resolve => setTimeout(resolve, delayMs));
    }

    updateSliderDisplays() {
        document.getElementById('speed-value').textContent = this.speedMap[this.animationSpeed].label;
        document.getElementById('array-size-value').textContent = this.arraySize;
    }

    applyManualInput() {
        if (this.isAnimating) return;
        
        const input = document.getElementById('manual-input').value.trim();
        if (!input) {
            this.generateRandomArray();
            return;
        }
        
        const values = input.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v) && v > 0);
        
        if (values.length === 0) {
            alert('Please enter valid positive numbers separated by commas');
            return;
        }
        
        if (values.length > 50) {
            alert('Maximum array size is 50 elements');
            return;
        }
        
        this.array = values;
        this.arraySize = values.length;
        document.getElementById('array-size-slider').value = this.arraySize;
        document.getElementById('array-size-value').textContent = this.arraySize;
        this.renderBars();
    }
}

// Initialize the sorting visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.sortingVisualizer = new SortingVisualizer();
});

// Add tab switching support
document.getElementById('sorting-algorithms').addEventListener('click', function() {
    setTimeout(() => {
        if (window.sortingVisualizer) {
            window.sortingVisualizer.renderBars();
        }
    }, 100);
});
