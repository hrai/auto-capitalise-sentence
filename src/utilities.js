
 export function shouldCapitaliseForI(text) {
        var regex = /\s+i(\s+|')$/;
        var matches = regex.test(text);

        return matches;
    }