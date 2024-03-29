/* Autor: Hinako Ogawa (2019) */

startQuestions = () => {
    getQuestionnaireItems();
    preventDefaultForm();

    
}


/**
 * Function: loads strings of questionnaire texts from accompanied file depending on the most recently finished level
 * Arguments: null
 * Returns: null
 */
getQuestionnaireItems = () => {
    // Pick the correct questionnaire JSON file depending on the stage completed
    console.log("*afterlevelquestions() statecheck: " + stateController.levelSelected);
    switch (stateController.levelSelected){        
        case 0:
            $.getJSON("page_assets/after_level_questions_introduction.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
        case 4:
            $.getJSON("page_assets/after_level_questions_final.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            })
            break;
        default:
            $.getJSON("page_assets/after_level_questions_default.json", (response) => {
                fillQuestionnaire(response.questionnaireItems)
            });
            break;
    }   
}

/**
 * Function: Fill Questionnaire page with the questions from the corresponding JSON file
 * Arguments: JSON string
 * Returns: null
 */
fillQuestionnaire = (questionnaireItems) => {
    let form = document.getElementById("questionnaireForm");
    questionnaireItems.forEach(item => {
        let label;
        let scale;
        switch(item.type){
            case "5-likert": 
                label = addQuestion(item.question);
                scale = addLikertScale(item.title, 5);
                form.append(label, scale);
                break;
            case "10-likert": 
                label = addQuestion(item.question);        
                scale = addLikertScale(item.title, 10);
                form.append(label, scale);
                break;
            case "textArea": 
                label = addQuestion(item.question);
                let textArea = document.createElement('textarea');
                textArea.name = "comment";
                textArea.placeholder = "Hier typen...";
                let br = document.createElement('br')
                form.append(label, br, textArea);
                break;
            default:
                console.warn("The type given to a questionnaire Item is unknown.");
                break;
        }
    });
}

/**
 * Function: Create a label for each question
 * Arguments: String
 * Returns: label
 */
addQuestion = (question) => {
    let label = document.createElement('label');
    label.className = "questionnaireItem";
    label.innerHTML = question;
    return label;
} 

// Add the Likert scale, returns the UL with the selected amount of choices
/**
 * Function: Create a Likert scale (as an unordered list) 
 * Arguments: String, integer
 * Returns: ul
 */
addLikertScale = (title, likertAmount) => {
    let ul = document.createElement("ul");
    ul.className = "likert";
    for (i=0;i<likertAmount;i++){
        let li = document.createElement("li");
        li.className = "likert-"+likertAmount;
        let radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = title;
        radioBtn.value = i;
        li.appendChild(radioBtn);
        ul.appendChild(li);
    }
    return ul;
}

/**
 * Function: Setup form to not use default html functionality
 * ARgument: none
 * Returns: none
 */
preventDefaultForm = () => {
    let form = document.getElementById('questionnaireForm');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
    }
}

/**
 * Function: Proces form and check input
 * Arguments: clickevent
 * Returns: false
 */
processForm = (e) => {
    if (e.preventDefault) e.preventDefault();
    console.log("processing evaluation form");

    // Put all answers of this questionnaire into a JSON object    
    var levelAnswers = {};
    var generalAnswers = {};
    Array.prototype.forEach.call(e.target, function(target){
        if (target.checked & target.name != "comment") {   // comments will not be saved
            if (target.name.includes("_algemeen")){ // answers for the general questions
                tgk = target.name.slice(0, -9);
                generalAnswers[tgk] = target.value;
            } else { // answers for the level specific questions
                levelAnswers[target.name] = target.value;       
            }
        } else {
            // do nothing
        }
    });

    // get last finished level from stateController
    var currLevel = stateController.levelSelected;
    
    saveAsJson('levelEvaluations', currLevel, levelAnswers);
    saveAsJson('generalEvaluations', currLevel, generalAnswers);
    console.log(stateController.getLocalStorage('levelEvaluations'));
    
 
    stateController.changeState(2); // return to level select menu

    // You must return false to prevent the default form behavior
    return false;
}

/**
 * Function: Saves a given Object into localStorage in JSON format
 * Arguments: String, integer, Object
 * Returns: false
 */
saveAsJson = (objName, objPos, answerObj) => {
    var jsonObj =  stateController.getLocalStorage(objName); // Retrieve evaluation answers object from local storage
    if (jQuery.isEmptyObject(jsonObj)) { // If there's no evaluation answer obj yet, make one 
        jsonObj = {};
        jsonObj[objPos] = [];
        jsonObj[objPos].push(answerObj);
        stateController.setLocalStorage(objName, jsonObj);
    } else {
        if (jsonObj.hasOwnProperty(objPos)){ // If entry for current level exists, add new evaluations to array
            jsonObj[objPos].push(answerObj);
        } else { // Otherwise make new array for the answers
            jsonObj[objPos] = [];
            jsonObj[objPos].push(answerObj);
        }
        stateController.setLocalStorage(objName, jsonObj); // Save to local storage
    }
}

startQuestions();