const googleForm = () => {
    // [1] - get all the data first from the form
    const clearBtn = document.querySelector('[data-js-clear-btn]');
    const form = document.querySelector('[data-js-google-form]');
    const recommendRateBtns = document.querySelectorAll('input[name="recommend_rate"]');
    const disappointedRateBtns = document.querySelectorAll('input[name="disappointed_rate"]');
    const learnRateBtns = document.querySelectorAll('input[name="learn_rate"]');
    const challengeRateBtns = document.querySelectorAll('input[name="challenge_rate"]');
    const sessionRateBtns = document.querySelectorAll('input[name="session_rate"]');
    const response = document.querySelector('[data-js-response]');

    // this check each radio btn from the list and get their value, otherwise return false
    const validateRadioBtns = (radioBtns) => {
        let value;

        for (const radioBtn of radioBtns) {
            if (radioBtn.checked) {
                value = radioBtn.value;
                break;
            } 
            
            else {
                value = false;
            }
        }

        return value;
    };

    // checks radio btn values, if false, adds ".-error" class
    const toggleError = (value, dataset) => {
        const formBox = document.querySelector(dataset);
        formBox.classList.toggle('-error', !value);
    };

    // resets radio btns value and remove ".-error"
    const resetInputValue = (radioBtns, dataset) => {
        const formBox = document.querySelector(dataset);

        for (const radioBtn of radioBtns) {
            if (radioBtn.checked) {
                radioBtn.checked = false;
                break;
            }
        }

        formBox.classList.remove('-error');
    };

    // [2] - start validation when the form submits
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // get each radio btn's value, or else, return false
        const recommendRate = validateRadioBtns(recommendRateBtns);
        const disappointedRate = validateRadioBtns(disappointedRateBtns);

        const learnRate = validateRadioBtns(learnRateBtns);
        const challengeRate = validateRadioBtns(challengeRateBtns);
        const sessionRate = validateRadioBtns(sessionRateBtns);
        const satisfactionRate = learnRate && challengeRate && sessionRate;

        // if the radio btn's value is false, run this code
        toggleError(recommendRate, '[data-js-recommend-rate]');
        toggleError(disappointedRate, '[data-js-disappointed-rate]');
        toggleError(satisfactionRate, '[data-js-satisfaction-rate]');

        // if all data is complete, display the results here
        if (recommendRate && disappointedRate && satisfactionRate) {
            console.log('recommend_rate: ', recommendRate);
            console.log('disappointed_rate: ', disappointedRate);
            console.log('learn_rate: ', learnRate);
            console.log('challenge_rate: ', challengeRate);
            console.log('session_rate: ', sessionRate);
            console.log('response: ', response.value.trim());
        }
    });

    // when clicked, reset/remove all values from the inputs
    clearBtn.addEventListener('click', () => {
        resetInputValue(recommendRateBtns, '[data-js-recommend-rate]');
        resetInputValue(disappointedRateBtns, '[data-js-disappointed-rate]');

        resetInputValue(learnRateBtns, '[data-js-satisfaction-rate]');
        resetInputValue(challengeRateBtns, '[data-js-satisfaction-rate]');
        resetInputValue(sessionRateBtns, '[data-js-satisfaction-rate]');

        response.value = '';
    });
};

// make sure the page is loaded first
document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete') googleForm();
});