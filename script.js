(function () {
    let firstNum = 0, secondNum = 0, operation = "", bResetNum = false
    let isDotActive = false
    let floatMultiplier = 1
    const result = document.querySelector(".result")
    const controls = document.querySelectorAll("[class*='control-']")
    controls.forEach(c => {
        const textValue = c.textContent
        const isNum = !isNaN(parseInt(textValue))
        const isDot = textValue === "."
        const isDel = textValue === "del"
        const isReset = textValue === "reset"
        const isEq = textValue === "="

        if (isNum) c.addEventListener("click", () => addNumber(textValue))
        if (isDot) c.addEventListener("click", setDot)
        if (isDel) c.addEventListener("click", deleteLast)
        if (isReset) c.addEventListener("click", resetAll)
        if (isEq) c.addEventListener("click", calculate)
        // TODO: napisi normalan uslov
        if (!isNum && !isDot && !isDel && !isReset && !isEq) c.addEventListener("click", () => setOperation(textValue))
    })

    function addNumber(number) {
        let res
        if (bResetNum) {
            res = 0
            bResetNum = !bResetNum
        } else res = parseFloat(result.textContent)
        const sign = Math.sign(res) || 1
        !isDotActive ? res = res * 10 + parseInt(number) * sign : res = res + parseInt(number) / Math.pow(10, floatMultiplier++) * sign
        result.textContent = res.toFixed(floatMultiplier - 1)
    }

    function setDot() {
        isDotActive = true
    }

    function resetAll() {
        floatMultiplier = 1
        isDotActive = false
        operation = ""
        result.textContent = "0"
    }

    function deleteLast() {
        if (isDotActive && floatMultiplier !== 1) floatMultiplier--
        if (result.textContent.length === 1) {
            result.textContent = "0"
            return
        }
        result.textContent.substr(-2, 1) === "." ? result.textContent = result.textContent.slice(0, -2) : result.textContent = result.textContent.slice(0, -1)
    }

    function setOperation(op) {
        operation = op
        firstNum = parseFloat(result.textContent)
        bResetNum = true
        floatMultiplier = 1
        isDotActive = false
    }

    function calculate() {
        if (operation === "") return
        let res
        secondNum = parseFloat(result.textContent)
        // bruh
        switch (operation) {
            case "/":
                res = firstNum / secondNum
                break
            case "x":
                res = firstNum * secondNum
                break
            case "+":
                res = firstNum + secondNum
                break
            case "-":
                res = firstNum - secondNum
                break
        }
        result.textContent = res
    }

    // Easter egg
    // not so hidden tho
    const nanObserver = new MutationObserver(mutations => mutations[0].addedNodes[0].data === "NaN" || mutations[0].addedNodes[0].data === "" ? result.textContent = "NaN".repeat(5) + " Robert Prosinecki" : null)
    nanObserver.observe(result, { childList: true, characterData: true })
})()
