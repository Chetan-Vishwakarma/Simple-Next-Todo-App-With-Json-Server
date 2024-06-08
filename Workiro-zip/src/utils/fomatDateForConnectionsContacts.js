function startFormattingDate(dt) {
    const timestamp = parseInt(/\d+/.exec(dt));
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return formattedDate;
}
export const formateDate = (data) => {
    let key = "Date Of Birth"
    data.map((item, i) => {
        if (item[key] !== null) {
            item[key] = startFormattingDate(item[key]);
        }
    })
    return data;
}