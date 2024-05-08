export default (task) => {
    let timestamp;
    let timestamp2;
    let date = "";
    let date2 = "";
    if (task.CreationDate) {
        timestamp = parseInt(task.CreationDate.slice(6, -2));
        if (!isNaN(timestamp)) {
            date = new Date(timestamp); // Create Date object using timestamp
        } else {
            // console.error("Invalid timestamp:", timestamp);
        }
    } else {
        date = task.CreationDate;
    }
    if (task.EndDateTime) {
        timestamp2 = parseInt(task.EndDateTime.slice(6, -2));
        if (!isNaN(timestamp2)) {
            date2 = new Date(timestamp2); // Create Date object using timestamp2
        } else {
            // console.error("Invalid timestamp2:", timestamp2);
        }
    } else {
        date2 = task.EndDateTime;
    }
    return { ...task, CreationDate: date, EndDateTime: date2 };
}