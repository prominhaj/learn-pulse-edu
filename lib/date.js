export const formatMyDate = (date) => {
    let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
};

export const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const convertDuration = (seconds) => {
    const minutes = seconds / 60;

    if (minutes <= 60) {
        return {
            duration: minutes.toFixed(2),
            unit: 'minutes'
        };
    } else {
        const hours = minutes / 60;
        return {
            duration: hours.toFixed(2),
            unit: 'hours'
        };
    }
};
