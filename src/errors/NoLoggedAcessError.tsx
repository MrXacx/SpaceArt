export class NoLoggedAcessError extends Error {
    static throw(message: string):never{
        throw new NoLoggedAcessError(message);
    }
}