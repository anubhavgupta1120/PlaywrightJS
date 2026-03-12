// let, var, const 

// var : Function scope

var a = 10; // Global scope
function test1() {
    var b = 20;
    var a = 30; // Function scope or Local Scope
    console.log(b, a);
    if (true) {
        var a = 40;
        console.log(a);
    }
    console.log("F ->", a);
}
test1();
console.log(a);

// var allows redeclaration and reassignmnet.

// let : Block scope

let x = 10;
function test2() {
    let y = 20;
    //let y = 20;
    let x = 30;
    console.log(y, x);
    if (true) {
        let x = 40;
        console.log(x);
    }
    console.log("F ->", x);
}
test2();
console.log(x);

// let allows reassignmnet but not redeclaration(in same block).

// const : Block scope

const y = 10;
function test3() {
    const z = 20;
    //const z = 20;
    // z = 35;
    const y = 30;
    console.log(z, y);
    if (true) {
        const y = 40;
        console.log(z, y);
    }
    console.log("F ->", y, z);
}
test3();
console.log(y);

// const does not allow reassignmnet, redeclaration and must be initialized at the time of declaration.