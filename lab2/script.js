// 1 частина

var car1 = new Object();
car1.color = "Yellow";
car1.maxSpeed = 220;
car1.driver = {
    name: "Seniv Kateryna", 
    category: "B",
    "personal limitations": "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

var car2 = {
    color: "Silver",
    maxSpeed: 190,
    driver: {
        name: "Seniv Kateryna", 
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};

car1.drive = function() { console.log("I am not driving at night"); };
car2.drive = function() { console.log("I can drive anytime"); };

console.log(" Machine test ");
car1.drive();
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
    
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let night = this.driver.nightDriving ? "drives at night" : "does not drive at night";
            console.log(`Driver ${this.driver.name} ${night} and has ${this.driver.experience} years of experience.`);
        }
    };
}


Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = { name, nightDriving, experience };
};

console.log("Truck test");
var truck1 = new Truck("White", 5000, 80, "Volvo", "FH16");
var truck2 = new Truck("Blue", 4500, 85, "MAN", "TGX");

truck1.AssignDriver("Dmytro Seniv", true, 10);
truck2.AssignDriver("Maryana Lysak", false, 5);

truck1.trip();
truck2.trip();

// 2 частина

class Square {
    constructor(a) { this.a = a; }
    static help() { console.log("Square: A regular quadrilateral with four equal sides and four equal angles (90°)."); }
    length() { return this.a * 4; }
    square() { return this.a * this.a; }
    info() {
        console.log(`Square. Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}. Angles: 90, 90, 90, 90.`);
        console.log(`Perimeter: ${this.length()}`);
        console.log(`Area: ${this.square()}`);
    }
}

class Rectangle extends Square {
    constructor(a, b) { super(a); this.b = b; }
    static help() { console.log("Rectangle: A quadrilateral with four right angles (90°)."); }
    length() { return 2 * (this.a + this.b); }
    square() { return this.a * this.b; }
    info() {
        console.log(`Rectangle. Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}. Angles: 90, 90, 90, 90.`);
        console.log(`Perimeter: ${this.length()}`);
        console.log(`Area: ${this.square()}`);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) { 
        super(a); 
        this._alpha = alpha; 
        this._beta = beta;   
    }
  
    get alpha() { return this._alpha; }
    set alpha(val) { this._alpha = val; }
    get beta() { return this._beta; }
    set beta(val) { this._beta = val; }

    static help() { console.log("Rhombus: A parallelogram with four equal sides."); } 
    length() { return this.a * 4; } 
    square() { return Math.round(this.a * this.a * Math.sin(this._beta * Math.PI / 180)); } 
    info() { 
        console.log(`Rhombus. Sides: ${this.a} (all 4). Angles: ${this._alpha}, ${this._beta}, ${this._alpha}, ${this._beta}.`);
        console.log(`Perimeter: ${this.length()}`);
        console.log(`Area: ${this.square()}`);
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) { super(a, b); this.alpha = alpha; this.beta = beta; }
    static help() { console.log("Parallelogram: A quadrilateral with two pairs of parallel sides."); }
    square() { return Math.round(this.a * this.b * Math.sin(this.beta * Math.PI / 180)); }
    info() {
        console.log(`Parallelogram. Sides: ${this.a}, ${this.b}. Angles: ${this.alpha}, ${this.beta}, ${this.alpha}, ${this.beta}.`);
        console.log(`Perimeter: ${this.length()}`);
        console.log(`Area: ${this.square()}`);
    }
}

console.log(" Geometry Test ");
Square.help(); Rectangle.help(); Rhombus.help(); Parallelogram.help();

const figures = [
    new Square(5), 
    new Rectangle(4, 8), 
    new Rhombus(6, 120, 60), 
    new Parallelogram(7, 10, 130, 50)
];
figures.forEach(f => f.info());

// 3 частина

function Triangular(a = 3, b = 4, c = 5) { return { a, b, c }; }
console.log("--- Triangular Function Test ---");
console.log(Triangular());
console.log(Triangular(6, 8, 10));

function PiMultiplier(num) { return function() { return Math.PI * num; }; }
const p1 = PiMultiplier(2);
const p2 = PiMultiplier(2/3);
const p3 = PiMultiplier(0.5); 
console.log(`Pi * 2 = ${p1()}`);
console.log(`Pi * 2/3 = ${p2()}`);
console.log(`Pi / 2 = ${p3()}`);

function Painter(color) {
    return function(obj) {
        if (obj.type) { console.log(`Color: ${color}, Type: ${obj.type}`); }
        else { console.log("No 'type' property occurred!"); }
    };
}
const PaintBlue = Painter("Blue"), PaintRed = Painter("Red"), PaintYellow = Painter("Yellow");
const obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
const obj3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log(" Painter Test ");
PaintBlue(obj1); PaintRed(obj2); PaintYellow(obj3);
