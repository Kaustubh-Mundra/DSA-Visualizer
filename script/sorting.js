class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 20;
        this.animationSpeed = 3;
        this.isAnimating = false;
        this.selectedAlgorithm = '';
        this.currentLanguage = 'java';
        
        this.speedMap = {
            1: 2000,
            2: 1000,
            3: 500,
            4: 200,
            5: 50
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

        this.algorithmCodes = {
            'bubble-sort': {
                java: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap arr[j+1] and arr[j]
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
                # swap arr[j+1] and arr[j]
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
                cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap arr[j+1] and arr[j]
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
}

void merge(int[] arr, int l, int m, int r) {
    // Merge two sorted subarrays
}`,
                python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left = arr[:mid]
        right = arr[mid:]
        
        merge_sort(left)
        merge_sort(right)
        
        i = j = k = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1`,
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
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            // swap arr[i] and arr[j]
        }
    }
    // swap arr[i+1] and arr[high]
    return i + 1;
}`,
                python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            # swap arr[i] and arr[j]
    
    # swap arr[i+1] and arr[high]
    return i + 1`,
                cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            // swap arr[i] and arr[j]
        }
    }
    // swap arr[i+1] and arr[high]
    return i + 1;
}`
            },
            'heap-sort': {
                java: `public void heapSort(int[] arr) {
    int n = arr.length;
    
    // Build heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
    }
}

void heapify(int[] arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    
    if (l < n && arr[l] > arr[largest])
        largest = l;
    
    if (r < n && arr[r] > arr[largest])
        largest = r;
    
    if (largest != i) {
        // swap arr[i] and arr[largest]
        heapify(arr, n, largest);
    }
}`,
                python: `def heap_sort(arr):
    n = len(arr)
    
    # Build heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap
    for i in range(n - 1, 0, -1):
        # Move current root to end
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    
    if l < n and arr[l] > arr[largest]:
        largest = l
    
    if r < n and arr[r] > arr[largest]:
        largest = r
    
    if largest != i:
        # swap arr[i] and arr[largest]
        heapify(arr, n, largest)`,
                cpp: `void heapSort(int arr[], int n) {
    // Build heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    
    if (l < n && arr[l] > arr[largest])
        largest = l;
    
    if (r < n && arr[r] > arr[largest])
        largest = r;
    
    if (largest != i) {
        // swap arr[i] and arr[largest]
        heapify(arr, n, largest);
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
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
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
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        // swap arr[min_idx] and arr[i]
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
        
        # swap arr[min_idx] and arr[i]
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
                cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        // swap arr[min_idx] and arr[i]
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
        document.getElementById('reset-sorting').addEventListener('click', () => this.resetArray());

        // Sliders
        document.getElementById('speed-slider').addEventListener('input', (e) => {
            this.animationSpeed = parseInt(e.target.value);
        });

        document.getElementById('array-size-slider').addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            this.generateRandomArray();
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
        document.getElementById('start-sorting').disabled = false;
        
        // Update complexity display
        const complexity = this.complexityData[algorithmId];
        document.getElementById('best-time').textContent = complexity.best;
        document.getElementById('average-time').textContent = complexity.average;
        document.getElementById('worst-time').textContent = complexity.worst;
        document.getElementById('space-complexity').textContent = complexity.space;
        
        // Update code display
        this.updateCodeDisplay();
        
        // Update button text
        const algorithmNames = {
            'bubble-sort': 'Bubble Sort',
            'merge-sort': 'Merge Sort',
            'quick-sort': 'Quick Sort',
            'heap-sort': 'Heap Sort',
            'insertion-sort': 'Insertion Sort',
            'selection-sort': 'Selection Sort'
        };
        document.getElementById('sorting-algorithms-grp-btn').textContent = algorithmNames[algorithmId];
    }

    updateCodeDisplay() {
        if (!this.selectedAlgorithm) return;
        
        const code = this.algorithmCodes[this.selectedAlgorithm][this.currentLanguage];
        const codeDisplay = document.getElementById('code-display');
        codeDisplay.innerHTML = `<code class="language-${this.currentLanguage}">${this.escapeHtml(code)}</code>`;
        
        // Add line numbers and highlighting capability
        const lines = code.split('\n');
        const numberedLines = lines.map((line, index) => 
            `<span class="code-line" data-line="${index + 1}">${this.escapeHtml(line)}</span>`
        ).join('\n');
        codeDisplay.innerHTML = `<code class="language-${this.currentLanguage}">${numberedLines}</code>`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    generateRandomArray() {
        if (this.isAnimating) return;
        
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 100) + 1);
        }
        this.renderBars();
    }

    renderBars() {
        const container = document.getElementById('bars-container');
        container.innerHTML = '';
        
        const maxValue = Math.max(...this.array);
        const containerHeight = 360; // 400px - 40px padding
        
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
        this.disableControls();
        
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
        
        await this.markAllSorted();
        this.isAnimating = false;
        this.enableControls();
    }

    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
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
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArr = this.array.slice(left, mid + 1);
        const rightArr = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
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
            this.array[k] = leftArr[i];
            this.updateBar(k, this.array[k]);
            i++;
            k++;
            await this.delay();
        }
        
        while (j < rightArr.length) {
            this.array[k] = rightArr[j];
            this.updateBar(k, this.array[k]);
            j++;
            k++;
            await this.delay();
        }
    }

    async quickSort(low, high) {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
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
            await this.heapify(n, i);
        }
        
        // Extract elements from heap
        for (let i = n - 1; i > 0; i--) {
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
            const key = this.array[i];
            let j = i - 1;
            
            while (j >= 0) {
                await this.compare(j, i);
                if (this.array[j] > key) {
                    this.array[j + 1] = this.array[j];
                    this.updateBar(j + 1, this.array[j + 1]);
                    j--;
                    await this.delay();
                } else {
                    break;
                }
            }
            this.array[j + 1] = key;
            this.updateBar(j + 1, key);
            await this.delay();
        }
    }

    async selectionSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            
            for (let j = i + 1; j < n; j++) {
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

    resetArray() {
        if (this.isAnimating) return;
        
        this.generateRandomArray();
    }

    disableControls() {
        document.getElementById('start-sorting').disabled = true;
        document.getElementById('generate-array').disabled = true;
        document.getElementById('reset-sorting').disabled = true;
        document.getElementById('array-size-slider').disabled = true;
        document.getElementById('speed-slider').disabled = true;
        document.getElementById('sorting-algorithms-grp-btn').disabled = true;
    }

    enableControls() {
        document.getElementById('start-sorting').disabled = false;
        document.getElementById('generate-array').disabled = false;
        document.getElementById('reset-sorting').disabled = false;
        document.getElementById('array-size-slider').disabled = false;
        document.getElementById('speed-slider').disabled = false;
        document.getElementById('sorting-algorithms-grp-btn').disabled = false;
    }

    delay(customDelay) {
        const delayMs = customDelay || this.speedMap[this.animationSpeed];
        return new Promise(resolve => setTimeout(resolve, delayMs));
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
