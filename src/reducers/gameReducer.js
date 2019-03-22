export const buildInitialState = () => {
    let initial = []

    for(let row = 1; row <= 10; row++) {
        for(let col = 1; col <= 10; col++) {
            initial.push({row, col, value: null})
        }
    }
    return initial
}

export const gameReducer = (state = [], action) => {
    return state;
}