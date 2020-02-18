describe('writing functions', () => {
    describe('how to create them', () => {
        it('the syntax', () => {

            expect(add(2, 2)).toBe(4);
            // named function
            function add(a: number, b: number): number {
                return a + b;
            }

            // anonymous functions

            type MathOperation = (a: number, b: number) => number;
            const multiply: MathOperation = function (a: number, b: number): number {
                return a * b;
            };

            const divide: MathOperation = (a: number, b: number) => a / b;

            expect(multiply(2, 7)).toBe(14);
            expect(divide(32, 4)).toBe(8);

            let someOp: MathOperation;
            someOp = multiply;
            expect(someOp(3, 9)).toBe(27);
            someOp = divide;
            expect(someOp(18, 3)).toBe(6);

            someOp = (a, b) => a - b;
            expect(someOp(17, 3)).toBe(14);
        });
        describe('some things about parameters to functions', () => {
            it('does not allow you to overload a function', () => {
                function formatName(first: string, last: string, mi?: string) {
                    return mi ? `${last}, ${first} ${mi}.` : `${last}, ${first}`;
                }

                expect(formatName('Han', 'Solo')).toBe('Solo, Han');
                expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');

            });
            it('default values', () => {
                function add(a: number = 10, b: number = 5, ...rest: number[]) {
                    const firstTwo = a + b;
                    return rest.reduce((state, next) => state + next, firstTwo);
                }

                expect(add()).toBe(15);
                expect(add(20)).toBe(25);
                expect(add(2, 2)).toBe(4);
                expect(add(undefined, 20)).toBe(30);
                expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            });
        });
    });
    describe('higher order functions', () => {
        it('`functions that take a functions`', () => {
            type MathOperation = (a: number, b: number) => number;

            function messItUp(a: number, b: number, c: MathOperation) {
                a += a;
                b += b;
                return c(a, b);
            }

            expect(messItUp(2, 3, (a, b) => a + b)).toBe(10);
            expect(messItUp(5, 10, (x, y) => x * y)).toBe(200);
        });
        describe('HOF that returns a function', () => {
            it('doing it old-skool', () => {

                function makeElement(tag: string, content: string): string {
                    return `<${tag}>${content}</${tag}>`;
                }

                expect(makeElement('h1', 'Hello')).toBe('<h1>Hello</h1>');
                expect(makeElement('h1', 'Bye')).toBe('<h1>Bye</h1>');
                expect(makeElement('p', 'Story')).toBe('<p>Story</p>');
            });

            it('doing it using a class (OOP Style)', () => {

                class TagMaker {

                    private tag: string;
                    constructor(tag: string) {
                        this.tag = tag;
                    }

                    make(content: string) {
                        return `<${this.tag}>${content}</${this.tag}>`;
                    }
                }

                const h1Maker = new TagMaker('h1');
                const pMaker = new TagMaker('p');

                expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker.make('Bye')).toBe('<h1>Bye</h1>');
                expect(pMaker.make('Story')).toBe('<p>Story</p>');


            });

            it('doing it with a higher-order function', () => {

                function tagMaker(tag: string) {
                    return (content: string) => `<${tag}>${content}</${tag}>`;
                } // CLOSURE

                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker('Bye')).toBe('<h1>Bye</h1>');
                expect(pMaker('Story')).toBe('<p>Story</p>');
            });
        });
    });
});

describe('array methods', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it('look at each one of them', () => {
        nums.forEach(n => console.log(`Got ${n}`));
    });
    describe('that return new arrays', () => {
        it('filter', () => {
            const evens = nums.filter(isEven);
            expect(evens).toEqual([2, 4, 6, 8]);

            function isEven(n: number): boolean {
                return n % 2 === 0;
            }
        });
        it('map', () => {
            const result = nums.map(n => n * 2);
            expect(result).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
        });
    });
    describe('some methdos that return a single (scalar) value', () => {
        it('checking the membership', () => {
            expect(nums.some(n => n % 2 === 0)).toBeTrue();
            expect(nums.every(n => n % 2 === 0)).toBeFalse();
        });
        it('reduce', () => {
            expect(nums.reduce((s, n) => s + n)).toBe(45);
            expect(nums.reduce((s, n) => s + n, 100)).toBe(145);
        });
    });
});
