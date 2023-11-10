let isPaused = false;
let timerInterval;
let seconds = 0;
const pause = (timeoutMsec) => new Promise(resolve => setTimeout(resolve, timeoutMsec))
let speed = 5//to control speed using delay function
let arr = []
let pre;
let width = window.innerWidth;
let size = 50// size of array to be created 
let dist = 30//distance in blocks
if (width <= 960) {
    size = Math.ceil(size / 4.4);
}
let conid = document.getElementById('array')
let flag = true;
// slider input for array size
slider = document.getElementById('myRange');
slider.oninput = function () {
    size = this.value
    dist = 30
    if (width <= 960) {
        size = Math.ceil(size / 4.4);
    }
    // to change distance b/w blocks if size of array is high
    if (size > 50) {
        dist = 15
    }
}

// slider input for algo speed
let speedEl = document.getElementById('speed')
speedEl.oninput = function () {
    speed = 10 - this.value;
}
//recreate the first array
function recreateArray(inputArray) {
    // clear the element if already generated
    conid.innerHTML = "";

    arr = [];

    for (let i = 0; i < inputArray.length; i++) {
        let x = inputArray[i];
        let ele = document.createElement("div");
        ele.classList.add("block");

        // give height and translate the block class element
        ele.style.height = `${x * 3}px`;
        if (width <= 960) {
            ele.style.height = `${x * 6}px`;
        }
        ele.style.transform = `translate(${i * dist}px)`;

        // creating label to label the blocks with element size
        let label = document.createElement("label");
        label.classList.add("label");
        label.innerText = x;
        ele.appendChild(label);
        conid.appendChild(ele);

        //to change width if size>50 to fit in screen
        if (size > 50) {
            let m = document.querySelectorAll('.block');
            m[i].style.width = "10px";
        }
        if (width <= 960) {
            let m = document.querySelectorAll('.block')
            m[i].style.width = "15px"
        }
        arr.push(x);
    }
}

function createArray() {
    seconds = -1;
    updateTimer();
    // clear the element if already generated
    conid.innerHTML = ""

    arr = []

    for (let i = 0; i < size; i++) {
        let x = Math.floor(Math.random() * 100)
        let ele = document.createElement("div")
        ele.classList.add("block")
        // give height and translate the block class element
        ele.style.height = `${x * 3}px`
        if (width <= 960) {
            ele.style.height = `${x * 6}px`;
        }
        ele.style.transform = `translate(${i * dist}px)`
        // creating label to label the blocks with element size
        let label = document.createElement("label")
        label.classList.add("label")
        label.innerText = x
        ele.appendChild(label)
        conid.appendChild(ele)
        console.log(size)
        //to change width if size>50 to fit in screen
        if (size > 50) {
            let m = document.querySelectorAll('.block')
            m[i].style.width = "10px"
        }
        if (width <= 960) {
            let m = document.querySelectorAll('.block')
            m[i].style.width = "15px"
        }
        arr.push(x)
    }
    pre = [...arr];
}
createArray()
//event listener to call createArray fn
let generate = document.getElementById('createArray')
generate.addEventListener('click', () => {
    if (flag === true) {
        createArray()
    }
})

function resetSorting() {
    isPaused = false;
    seconds = -1;
    updateTimer();
    stopTimer()
    recreateArray(pre);
}
document.getElementById('repeat-button').addEventListener('click', resetSorting);
//BUbble Sort


function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    seconds++;
    document.getElementById('timer').innerHTML = `<strong>${seconds} seconds </strong>`;
}

async function bubbleSort() {
    flag = false;
    let bl = document.querySelectorAll(".block")

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            bl[j].style.backgroundColor = 'palevioletred'
            bl[j + 1].style.backgroundColor = 'palevioletred'
            if (arr[j] > arr[j + 1]) {
                let temp2 = bl[j].style.transform
                bl[j].style.transform = bl[j + 1].style.transform;
                bl[j + 1].style.transform = temp2
                conid.insertBefore(bl[j + 1], bl[j])
                //speed
                await pause(speed * 100)
                // Wait until resume button is clicked
                while (isPaused) {
                    await pause(100);
                }
                bl = document.querySelectorAll(".block")
                let temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
            bl[j].style.backgroundColor = 'dodgerblue'
            bl[j + 1].style.backgroundColor = 'dodgerblue'
        }
        bl[bl.length - i - 1].style.backgroundColor = 'green'

    }
    bl[0].style.backgroundColor = 'green'
    stopTimer()
    flag = true;
}
//Merge Sort
async function mergeSort(l, r) {
    flag = false;
    if (l >= r) {
        return
    }
    let mid = l + Math.floor((r - l) / 2)
    await mergeSort(l, mid)
    await mergeSort(mid + 1, r)
    await merge(l, mid, r)
}
async function merge(l, mid, r) {
    let bl = document.querySelectorAll(".block")
    let left = [], right = []
    let lSize = mid - l + 1
    let rSize = r - mid
    await pause(speed * 100)
    while (isPaused) {
        await pause(100);
    }
    for (let i = 0; i < lSize; i++) {
        left[i] = arr[l + i]
    }
    for (let i = 0; i < rSize; i++) {
        right[i] = arr[mid + i + 1]
    }

    for (let i = l; i <= r; i++) {
        bl[i].style.backgroundColor = `#eb4034`
    }
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
        if (left[i] > right[j]) {
            arr[k] = right[j]
            bl[k].style.backgroundColor = 'palevioletred'
            bl[k].style.height = `${right[j] * 3}px`;
            bl[k].children[0].innerText = right[j]
            j++
            k++
        }
        else {
            arr[k] = left[i]
            bl[k].style.backgroundColor = 'palevioletred'
            bl[k].style.height = `${left[i] * 3}px`;
            bl[k].children[0].innerText = left[i]
            i++
            k++
        }
        bl = document.querySelectorAll(".block")
    }
    while (i < left.length) {
        arr[k] = left[i]
        bl[k].style.backgroundColor = 'palevioletred'
        bl[k].style.height = `${left[i] * 3}px`;
        bl[k].children[0].innerText = left[i]
        i++
        k++
        bl = document.querySelectorAll(".block")
    }

    while (j < right.length) {
        arr[k] = right[j]
        bl[k].style.backgroundColor = 'palevioletred'
        bl[k].style.height = `${right[j] * 3}px`;
        bl[k].children[0].innerText = right[j]
        j++
        k++
        bl = document.querySelectorAll(".block")
    }

}

//Selection Sort
async function selectionSort() {
    flag = false;
    let bl = document.querySelectorAll('.block')
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;
        bl[i].style.backgroundColor = 'palevioletred'
        for (let j = i + 1; j < arr.length; j++) {
            bl[j].style.backgroundColor = "darkgoldenrod";
            if (parseInt(bl[j].childNodes[0].innerText) < parseInt(bl[min].childNodes[0].innerText)) {
                bl[min].style.backgroundColor = 'dodgerblue'
            }
            await pause(speed * 100)
            while (isPaused) {
                await pause(100);
            }
            if (parseInt(bl[j].childNodes[0].innerText) < parseInt(bl[min].childNodes[0].innerText)) {
                min = j
                if (min !== i) {
                    bl[min].style.backgroundColor = 'darkgoldenrod'
                }
            }
            else {
                bl[j].style.backgroundColor = 'dodgerblue'
            }

        }

        let h = bl[min].style.height
        let l = bl[min].childNodes[0].innerText

        bl[min].style.height = bl[i].style.height
        bl[min].childNodes[0].innerText = bl[i].childNodes[0].innerText

        bl[i].style.height = h
        bl[i].childNodes[0].innerText = l

        await pause(speed * 100)
        // Wait until resume button is clicked
        while (isPaused) {
            await pause(100);
        }
        bl[min].style.backgroundColor = 'dodgerblue'
        bl[i].style.backgroundColor = 'green'

    }
    bl[arr.length - 1].style.backgroundColor = 'green'
    flag = true;
    stopTimer()


}
//Insertion Sort
async function insertionSort() {
    let blocks = document.querySelectorAll('.block');
    for (let i = 1; i < blocks.length; i++) {
        let key = parseInt(blocks[i].childNodes[0].innerText);
        let j = i - 1;
        blocks[i].style.backgroundColor = 'green';
        while (j >= 0 && parseInt(blocks[j].childNodes[0].innerText) > key) {
            while (isPaused) {
                await pause(100);
            }
            blocks[j].style.backgroundColor = "darkgoldenrod";
            let temp_hi8 = blocks[j + 1].style.height;
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j].style.height = temp_hi8;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            j = j - 1;
            await pause(speed * 100);
        }
        blocks[j + 1].childNodes[0].innerText = key;
        for (let k = 0; k <= i; k++) {
            blocks[k].style.backgroundColor = 'dodgerblue';
        }
        await pause(speed * 100);
        while (isPaused) {
            await pause(100);
        }

    }
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = 'green';
    }
    flag = true;
    stopTimer()
}

//Quick Sort
async function quickSort(arr, left, right) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await Promise.all([
            quickSort(arr, left, pivotIndex - 1),
            quickSort(arr, pivotIndex + 1, right)
        ]);
    }

}

async function partition(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;

    let pivotBlock = document.querySelector(`.block:nth-child(${right + 1})`);
    pivotBlock.style.backgroundColor = 'red';

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j);
        }
    }
    await swap(arr, i + 1, right);
    pivotBlock.style.backgroundColor = 'dodgerblue';

    return i + 1;
}

async function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    let blocks = document.querySelectorAll('.block');
    blocks[i].style.backgroundColor = "darkgoldenrod";
    blocks[j].style.backgroundColor = "darkgoldenrod";
    let tempHeight = blocks[i].style.height;
    blocks[i].style.height = blocks[j].style.height;
    blocks[j].style.height = tempHeight;

    let tempText = blocks[i].childNodes[0].innerText;
    blocks[i].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
    blocks[j].childNodes[0].innerText = tempText;
    await pause(speed * 100);
    while (isPaused) {
        await pause(100);
    }

    blocks[i].style.backgroundColor = "dodgerblue";
    blocks[j].style.backgroundColor = "dodgerblue";
}

document.getElementById('pause-button').addEventListener('click', function () {
    isPaused = true;
    stopTimer();
});

document.getElementById('resume-button').addEventListener('click', function () {
    isPaused = false;
    startTimer();
});
function getSelectedOption() {
    var selectElement = document.getElementById("sortingAlgorithm");
    var selectedOption = selectElement.options[selectElement.selectedIndex];

    selectElement.disabled = true;
    if (selectedOption.innerText == "Bubble Sort") {
        if (flag === true) {
            let el = document.getElementById('info')
            el.innerHTML = `
            <h3>
                <center><strong>Bubble Sort</strong></center>
                Worst complexity: O(n^2) <br>
                Average complexity: O(n^2)<br>
                Best complexity: O(n)<br>
                Space complexity: O(1)
                </h3>
            `;
            el.style.textAlign = 'center';
            bubbleSort()
        }
    }
    else if (selectedOption.innerText == "Insertion Sort") {
        if (flag === true) {
            let el = document.getElementById('info')
            el.innerHTML = `
            <h3>
                <center><strong>Insertion Sort</strong></center>
                Worst complexity: O(n^2) <br>
                Average complexity: O(n^2)<br>
                Best complexity: O(n^2)<br>
                Space complexity: O(1)
                </h3>
            `;
            insertionSort()
        }
    }
    else if (selectedOption.innerText == "Selection Sort") {
        if (flag === true) {
            let el = document.getElementById('info')
            el.innerHTML = `
              <h3>
                <center><strong>Selection Sort</strong></center>
                Worst complexity: O(n^2) <br>
                Average complexity: O(n^2)<br>
                Best complexity: O(n^2)<br>
                Space complexity: O(1)
                </h3>
            `;
            selectionSort()
        }
    }
    else if (selectedOption.innerText == "Merge Sort") {
        if (flag === true) {
            let el = document.getElementById('info')
            el.innerHTML = `
            <h3>
                <center><strong>Merge Sort</strong></center>
                Worst complexity: O(n*log(n)) <br>
                Average complexity: O(n*log(n))<br>
                Best complexity: O(n*log(n))<br>
                Space complexity: O(n)
                </h3>
            `;
            mergeSort(0, arr.length - 1)
            let blocks = document.querySelectorAll('.block');
            const sortAndChangeColor = async () => {
                await mergeSort(0, arr.length - 1);
                for (let i = 0; i < blocks.length; i++) {
                    blocks[i].style.backgroundColor = 'green';
                }
                flag = true;
                stopTimer();
            }
            sortAndChangeColor();
        }
    }
    else if (selectedOption.innerText == "Quick Sort") {
        if (flag === true) {
            let el = document.getElementById('info')
            el.innerHTML = `
            <h3>
            <center><strong>Quick Sort</strong></center>
            Worst complexity: O(n^2) <br>
            Average complexity: O(n log n)<br>
            Best complexity: O(n log n) <br>
            Space complexity: O(log n)
            </h3>
        `;
            let blocks = document.querySelectorAll('.block');
            let arr = [];
            for (let i = 0; i < blocks.length; i++) {
                arr.push(parseInt(blocks[i].childNodes[0].innerText));
            }
            flag = false;
            const sortAndChangeColor = async () => {
                await quickSort(arr, 0, arr.length - 1);
                for (let i = 0; i < blocks.length; i++) {
                    blocks[i].style.backgroundColor = 'green';
                }
                flag = true;
                stopTimer()
            }
            sortAndChangeColor();
        }
    }
    selectElement.disabled = false;
}
