function triangle(val1, type1, val2, type2) {
    const types = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    
    if (!types.includes(type1) || !types.includes(type2)) {
        console.log("Помилка: Неправильний тип аргументу.");
        return "failed";
    }

    if (val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "Zero or negative input";
    }

    let a, b, c, alpha, beta;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    let params = {};
    params[type1] = val1;
    params[type2] = val2;

    // Два катети
    if (params["leg"] && Object.keys(params).filter(k => k === "leg").length === 1 && type1 === type2) {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    } 
    //  Катет і гіпотенуза
    else if (params["leg"] && params["hypotenuse"]) {
        a = params["leg"];
        c = params["hypotenuse"];
        if (a >= c) {
            console.log("Катет не може бути більшим за гіпотенузу");
            return "failed";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }
    // Катет і протилежний кут
    else if (params["leg"] && params["opposite angle"]) {
        a = params["leg"];
        alpha = params["opposite angle"];
        if (alpha >= 90) return "failed";
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }
    // Катет і прилеглий кут
    else if (params["leg"] && params["adjacent angle"]) {
        a = params["leg"];
        beta = params["adjacent angle"];
        if (beta >= 90) return "failed";
        c = a / Math.cos(toRad(beta));
        b = Math.sqrt(c * c - a * a);
        alpha = 90 - beta;
    }
    // Гіпотенуза і кут
    else if (params["hypotenuse"] && params["angle"]) {
        c = params["hypotenuse"];
        alpha = params["angle"];
        if (alpha >= 90) return "failed";
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
        beta = 90 - alpha;
    }
    else {
        console.log("Ця комбінація не підтримується або введена невірно.");
        return "failed";
    }

    console.log(`a = ${a.toFixed(2)}`);
    console.log(`b = ${b.toFixed(2)}`);
    console.log(`c = ${c.toFixed(2)}`);
    console.log(`alpha = ${alpha.toFixed(2)}`);
    console.log(`beta = ${beta.toFixed(2)}`);

    return "success";
}

console.log("Інструкція: викликайте triangle(значення1, 'тип1', значення2, 'тип2')");
