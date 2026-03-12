//Identifiers, Literal, Operators
let _name = "Anubhav";
let $age = 25;
let name = "Anubhav";
let age = 25;

var $name = "Anubhav";
var _age = 25;
_age = 37;

//Identifiers : Name given to a variable, function, class, object, etc.
/*
Rules for Identifiers :
1. Must start with a letter (a-z, A-Z), underscore (_), or dollar sign ($)
2. Cannot start with a digit (0-9)
3. Can contain letters, digits, underscores (_), and dollar signs ($)
4. Cannot use reserved keywords (e.g. let, var, const, function, class)
5. Case-sensitive: myVar and myvar are different identifiers
6. No spaces allowed in identifier names
7. Unicode characters are allowed (not recommended)

Naming Conventions (best practices):
- camelCase   → for variables and functions  e.g. firstName, getUserData
- PascalCase  → for classes                  e.g. UserProfile, PlaywrightTest
- UPPER_SNAKE → for constants                e.g. MAX_RETRIES, BASE_URL
- _prefix     → for private/internal use     e.g. _count
- $prefix     → often used in frameworks     e.g. $element
*/
//Literal : Actual value of a variable.
//Operators : +, -, *, /, %, =, ==, ===, !=, !==, >, <, >=, <=
console.log(_name);
console.log($age);
console.log(name);
console.log(age);
console.log($name);
console.log(_age);
// In JS, semicolon is optional.