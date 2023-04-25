function calculateOld() {
    // Récupération des champs de saisie
    let dayInput = document.getElementById("day");
    let monthInput = document.getElementById("month");
    let yearInput = document.getElementById("year");

    // Validation de la date
    const dayValid = isValidDate(dayInput.value, monthInput.value, yearInput.value, "d");
    const monthValid = isValidDate(dayInput.value, monthInput.value, yearInput.value, "m");
    const yearValid = isValidDate(dayInput.value, monthInput.value, yearInput.value, "y");
    const isValid = isValidDate(dayInput.value, monthInput.value, yearInput.value);

    if (isValid) {
        // Reset de la couleur
        validateForm("#dadada", "#6a6a6a", "", "day");
        validateForm("#dadada", "#6a6a6a", "", "month");
        validateForm("#dadada", "#6a6a6a", "", "year");

        // Récupération de la date actuelle
        let now = new Date();

        // Calcul de l'âge en jours
        let birthDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
        let ageInDays = Math.floor((now - birthDate) / (24 * 60 * 60 * 1000));

        // Calcul de l'âge en années, mois et jours
        let ageInYears = Math.floor(ageInDays / 365);
        let ageInMonths = Math.floor((ageInDays-(ageInYears*365))/31);
        let ageInDaysLeft = Math.floor(ageInDays-((ageInYears*365)+(ageInMonths*31)));

        // Affichage de l'âge dans les éléments HTML correspondants
        document.getElementById("yearNumber").textContent = ageInYears.toString();
        document.getElementById("yearText").textContent = ageInYears > 1 ? "years" : "year";
        document.getElementById("monthNumber").textContent = ageInMonths.toString();
        document.getElementById("monthText").textContent = ageInMonths > 1 ? "months" : "month";
        document.getElementById("dayNumber").textContent = ageInDaysLeft.toString();
        document.getElementById("dayText").textContent = ageInDaysLeft > 1 ? "days" : "day";
    } if (!dayValid) {
        validateForm("red", "red", "Must be a valid day", "day");
    } if (!monthValid) {
        validateForm("red", "red", "Must be a valid month", "month");
    } if (!yearValid) {
        validateForm("red", "red", "Must be in the past", "year");
    }

    /*else if (dayInput.value && monthInput.value) {
        // Afficher un message d'erreur
        validateForm("red", "red", "This field is required", "year");
    } else if (dayInput.value && yearInput.value) {
        // Afficher un message d'erreur
        validateForm("red", "red", "This field is required", "month");
    } else if (monthInput.value && yearInput.value) {
        // Afficher un message d'erreur
        validateForm("red", "red", "This field is required", "day");
    }*/
}

function isValidDate(day, month, year, check) {
    const currentYear = new Date().getFullYear();
    if (check === "d") {
        if (day < 1 || day > 31) {
            return false;
        }
    } else if (check === "m") {
        if (day < 1 || day > 31) {
            day = 1;
        }
        if (month < 1 || month > 12) {
            return false;
        }
    } else if (check === "y") {
        if (day < 1 || day > 31) {
            day = 1;
        }
        if (month < 1 || month > 12) {
            month = 12;
        }
        if (year > currentYear) {
            return false;
        }
    }

    const date = new Date(year, month - 1, day);

    if (check === "d") {
        return date.getDate() === parseInt(day);
    } else if (check === "m") {
        return date.getMonth() + 1 === parseInt(month);
    } else if (check === "y") {
        return date.getFullYear() === parseInt(year) && year <= currentYear;
    } else {
        return (
            date.getFullYear() === parseInt(year) &&
            date.getMonth() + 1 === parseInt(month) &&
            date.getDate() === parseInt(day) &&
            year <= currentYear
        );
    }
}

function validateForm(borderColor, labelColor, Message, Selector) {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const labelStyle = `color: ${labelColor};`;
    const borderStyle = `border: 1px solid ${borderColor};`;

    switch (Selector) {
        case "day":
            dayInput.setAttribute("style", borderStyle);

            const dayLabel = document.querySelector('label[for="day"]');
            dayLabel.setAttribute("style", labelStyle);

            const dayError = dayInput.parentNode.querySelector(".error-message");
            dayError.innerHTML = Message || "";
            dayError.setAttribute("style", "color: red;");
            break;

        case "month":
            monthInput.setAttribute("style", borderStyle);

            const monthLabel = document.querySelector('label[for="month"]');
            monthLabel.setAttribute("style", labelStyle);

            const monthError = monthInput.parentNode.querySelector(".error-message");
            monthError.innerHTML = Message || "";
            monthError.setAttribute("style", "color: red;");
            break;

        case "year":
            yearInput.setAttribute("style", borderStyle);

            const yearLabel = document.querySelector('label[for="year"]');
            yearLabel.setAttribute("style", labelStyle);

            const yearError = yearInput.parentNode.querySelector(".error-message");
            yearError.innerHTML = Message || "";
            yearError.setAttribute("style", "color: red;");
            break;
    }
}
