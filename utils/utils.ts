export const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const calculateCompletionPercentage = (completedTasks: number, totalTasks: number): number => {
    if (totalTasks === 0) return 0;
    const percentage = (completedTasks / totalTasks) * 100;
    return Math.round(percentage);
}
