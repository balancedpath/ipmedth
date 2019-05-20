startFirstTime = () => {
    document.getElementById('backButton').addEventListener('click', () => {
        stateController.changeState(2)
    })

    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    output.innerHTML = slider.value + " cm"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value + " cm";
    }

    let startButton = document.getElementById("startButton");
    startButton.addEventListener('click', () => {
        stateController.setLocalStorage('playedBefore', true)
        stateController.setLocalStorage('playerHeight', slider.value)
        stateController.levelSelected = 0
        stateController.changeState(7)
    })

}

setTimeout(startFirstTime, 100);