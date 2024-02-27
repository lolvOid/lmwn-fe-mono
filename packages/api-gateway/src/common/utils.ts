/**
 * A function that wraps the input function to handle asynchronous operations and errors.
 *
 * @param {Function} func - the input function to be wrapped
 * @return {Function} a function that handles asynchronous operations and errors
 */
export function asyncHandler(func: Function) {
    return (req: any, res: any, next: any) => Promise.resolve(func(req, res, next)).catch(next);
}