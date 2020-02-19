describe('declaring variables', () => {
    describe('using let', () => {
        it('uninitialized let', () => {
            let x;

            x = 12;
            expect(x).toBe(12);

            x = 'Pizza';
            expect(x).toBe('Pizza');
        });
        it('using a typed let', () => {
            let x: number;

            x = 12;
            expect(x).toBe(12);

            // x = 'Pizza'; // NOT VALID TYPESCRIPT
            // expect(x).toBe('Pizza');
        });
        it('using an initialized let', () => {
            let x = 12;

            expect(x).toBe(12);

            // x = 'Tacos'; // nope type number is inferred

            x = 42; // if you never re-assign to a variable it will change x to a const

            const PI = 3.14;
        });
    });
    describe('using const', () => {
        it('protects you from reassigning a variable', () => {
            const minAge = 21;

            // minAge = 18; // Can't do this this stuff

            const friends = ['Sean', 'Amy', 'Jessika'];
            friends[0] = 'Mikey';
            expect(friends).toEqual(['Mikey', 'Amy', 'Jessika']);

            const message = { from: 'Mikey', note: 'Get Almond Milk' };
            message.note = 'Get Soy Milk';

        });
    });
    describe('advanced types', () => {
        it('has union types', () => {
            let x: number | string;

            x = 12;

            x = 'Puppy';
        });
        it('has type aliases', () => {
            type ThingWithLettersAndStuff = string;

            let name: ThingWithLettersAndStuff;

            name = 'Putintane';

            type NumberOrString = number | string;

            type CreditCardNumber = string;
            interface Person {
                name: string;
                age: number;
                cc: CreditCardNumber;
            }
        });
    });
    describe('some of the built-in types', () => {
        it('has numbers', () => {
            const n1 = 3;
            const n2 = 3.14;
            const n3 = 0xFF;
            const n4 = 0o22;
            const n5 = 0b1010;
            const myPay = 1_333_222;

            let x: number;

            x = n1;
            x = n2;
            x = n3;
        });

        it('has strings', () => {
            const s1 = 'This is a string';
            // tslint:disable-next-line: quotemark
            const s2 = "Double Quote";

            const s3 = 'She said "Ok"';
            // tslint:disable-next-line: quotemark
            const s4 = "The name is Flanner O'Connor";

            const s5 = 'It is Four O\'Clock';

        });

        it('template strings', () => {
            const s1 = `Mykey`;

            const story = `Chapter 1.

            It was a dark and stormy night.

            ${s1} was sleepy.
            The; end.`;

            const age = 50;
            const s3 = 'The name is ' + s1 + ' and the age is ' + age + '.';
            const s4 = `The name is ${s1} and the age is ${age}.`;

            expect(s3).toEqual(s4);
        });
    });
    it('what is so bad about the var keyword??', () => {
        const age = 27;

        if (age >= 18) {
            // tslint:disable-next-line: no-var-keyword
            var message = 'Old Enough';
        }

        expect(message).toBe('Old Enough');
    });

    describe('arrays', () => {
        it('has a literal syntax', () => {
            const friends = ['Amy', 'David', 'Jessika'];

            expect(friends[0]).toBe('Amy');

            friends[1] = 'Mykey';
            expect(friends[1]).toBe('Mykey');

            // friends[2] = 99; // NO! This is an array of strings

            const what = friends[999];
            expect(what).toBeUndefined();

            friends[999] = 'Gaia';

            expect(friends[999]).toBe('Gaia');
        });
        it('more on declaring them', () => {
            let favNums: number[]; // an array of numbers

            let favNumsAgain: Array<number>; // same thing, good for arrays of type unions

            let stuff: (number | string)[];
            let stuffAgain: Array<number | string>;

            stuffAgain = [12, 'tacos'];
        });
    });
    describe('solving problems with tuples', () => {
        it('first the problem, w/o a tuple', () => {
            function formatName(first: string, last: string): { fullName: string, numberOfLetters: number } {
                const result = `${last}, ${first}`;
                return {
                    fullName: result,
                    numberOfLetters: result.length
                };
            }

            const formattingResponse = formatName('Han', 'Solo');

            expect(formattingResponse.fullName).toBe('Solo, Han');
            expect(formattingResponse.numberOfLetters).toBe(9);

            const { fullName: hisName } = formatName('Kylo', 'Ren'); // object destructuring
            expect(hisName).toBe('Ren, Kylo');

            const movie = {
                title: 'Jaws',
                director: 'Spielberg',
                yearReleased: 1977
            };

            const { title, director: by } = movie;
            expect(title).toBe('Jaws');
            expect(by).toBe('Spielberg');

            const titleAgain = movie.title;
            const byAgain = movie.director;
            expect(titleAgain).toBe('Jaws');
            expect(byAgain).toBe('Spielberg');
        });
        it('doing it w/ a tuple', () => {
            function formatName(first: string, last: string): [string, number] {
                const result = `${last}, ${first}`;
                return [result, result.length];
            }

            const formattingResponse = formatName('Han', 'Solo');
            expect(formattingResponse[0]).toBe('Solo, Han');
            expect(formattingResponse[1]).toBe(9);

            const [name, letters] = formatName('Kylo', 'Ren');
            expect(name).toBe('Ren, Kylo');
            expect(letters).toBe(9);
        });
        it('array destructuring', () => {
            const someNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const [first, second, , fourth] = someNums;

            expect(first).toBe(1);
            expect(second).toBe(2);
            expect(fourth).toBe(4);

            const [head, ...rest] = someNums;
            expect(first).toBe(1);
            expect(rest).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it('object destructuring', () => {
            const person = {
                firstName: 'Ben',
                lastName: 'Solo',
                job: 'Jedi Trainee'
            };

            const { firstName, lastName: ln, ...rest } = person;
            expect(firstName).toBe('Ben');
            expect(ln).toBe('Solo');
            expect(rest).toEqual({ job: 'Jedi Trainee' });
        });
        it('array spread operator', () => {
            const nums = [1, 2, 3];
            const newNums = [0, ...nums, 4];
            expect(newNums).toEqual([0, 1, 2, 3, 4]);
        });
        it('object spread operator', () => {
            const movie = { title: 'Star Wars', director: 'Lucas', yearReleased: 1978 };
            const movie2 = { ...movie, yearReleased: 1977 };
            expect(movie2).toEqual({ title: 'Star Wars', director: 'Lucas', yearReleased: 1977 });
        });
    });
    describe('object literals', () => {
        it('has them', () => {
            interface Person {
                name: string;
                department: string;
                salary: number;
                manager?: string;
            }

            const bob: Person = {
                name: 'Bob Smith',
                department: 'QA',
                salary: 100_000,
                manager: 'Mary'
            };

            const mary: Person = {
                name: 'Mary Jones',
                department: 'CEO',
                salary: 80_000
            };

            function printEmployeeInfo(p: Person) {
                let prelude = `Person ${p.name} works in ${p.department} and makes ${p.salary}`;
                if (p.manager) {
                    prelude += ` and they are managed by ${p.manager}`;
                } else {
                    prelude += ' and they have no manager';
                }
                console.log(prelude);
            }

            printEmployeeInfo(bob);
            printEmployeeInfo(mary);
        });
        it('has truth and falsy values', () => {
            expect('tacos').toBeTruthy();
            expect('').toBeFalsy();
            expect(0).toBeFalsy();
            expect(-1).toBeTruthy();
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
        });
        it('has duck typing', () => {
            interface MessageHavingThing { message: string; }
            function logMessage(thingy: MessageHavingThing) {
                console.log(`Got: ${thingy.message}`);
            }

            logMessage({ message: 'Call your Mom' });

            const book = {
                title: 'Clean your garage',
                message: 'A clean garage is a sign of a healthy mind'
            };

            logMessage(book);
        });
    });
});
describe('extending interfaces', () => {
    it('example', () => {
        type MpaaRating = 'G' | 'PG' | 'PG13' | 'R' | 'NC-17';

        interface Movie {
            title: string;
            director: string;
            yearReleased: number;
            cast: { [key: string]: CastMember };
            mpaaRating: MpaaRating;
        }

        interface CastMember {
            role: string;
            actor: string;
        }
        const starWars: Movie = {
            title: 'Star Wars Iv: A New Hope',
            director: 'Lucas',
            yearReleased: 1977,
            cast: {
                'Luke Skywalker': { role: 'Luke', actor: 'Mark Hamill' },
                Han: { role: 'Han Solo', actor: 'Harrison Ford' }
            },
            mpaaRating: 'PG'
        };

        expect(starWars.cast['Luke Skywalker'].actor).toBe('Mark Hamill');
        expect(starWars.cast.Han.actor).toBe('Harrison Ford');
    });
    it('one more example', () => {
        const bob = {
            name: 'Bob Smith',
            phone: '555-1212',
            department: 'DEV',
            salary: 850_000
        };

        const jenny = {
            name: 'Jenny',
            phone: '867-5309',
            location: 'PA',
            email: 'jenny@tutone.net'
        };

        // interface PhoneablePerson { name: string; phone: string; } // works for first two
        interface PhoneablePerson { name: string; phone: string;[key: string]: any; } // needed for last one
        function printPhoneList(person: PhoneablePerson) {
            console.log(`Call ${person.name} at ${person.phone}`);
        }

        printPhoneList(bob);
        printPhoneList(jenny);

        const bill: PhoneablePerson = {
            name: 'Bill Johnson',
            phone: '724-3334',
            location: 'WA',
            hairColor: 'GRAY'
        };

    });
});

describe('generics briefly', () => {
    it('creating a generic dictionary', () => {

        interface Dictionary<T> {
            [key: string]: T;
        }
        interface Vehicle {
            make: string;
            model: string;
        }
        const vehicles: Dictionary<Vehicle> = {
            738837: { make: 'Ford', model: 'Explorer' },
            348373: { make: 'Audi', model: 'TT' },
            38377388: { make: 'Chevy', model: 'Bolt' }
        };


        const friends: Dictionary<{ name: string }> = {
            bill: { name: 'Bill Hulley' }
        };

        expect(vehicles['738837'].make).toBe('Ford');
    });
});
