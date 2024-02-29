export function asyncHandler(func: Function) {
    return (req: any, res: any, next: any) => Promise.resolve(func(req, res, next)).catch(next);
}
