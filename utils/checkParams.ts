export function checkParams(param?: any): param is string {
    if (!param) {
        return false;
    }

    return typeof param === "string";
}
