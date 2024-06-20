import moment from "moment";


export const filterWordCount = (name: string, count: number = 2) => {
    const splitNames = name.split(" ").filter(text => text.length);
    return (splitNames.length > count) ? splitNames.slice(0, count).join(" ") : name;
}

export const Greeting = () => {
    const presentTime = new Date();
    const hrs = presentTime.getHours();
    if (hrs < 12) {
        return "Good morning";
    } else if (hrs >= 12 && hrs < 17) {
        return "Good afternoon";
    } else return "Good evening";
};

export function sterilizeNumber(text: string): string {
    const value = parseInt(text.replace(/[^0-9]/g, ''));
    return (value) ? value.toString() : '';
}

export const heatCheck = (dob: string) => {
    const today = moment().format("YYYY-MM-DD");
    const maturityDate = moment(dob).add(6, 'months').format("YYYY-MM-DD");
    return {
        mature: today > maturityDate,
        maturityDate: maturityDate,
        formattedDate: moment(maturityDate).format("dddd, Do MMM YYYY")
    }
}

export const randomString = (length: number = 16, chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const timeReference = (prefix?: string, suffix?: string, separator: string = '_') => {
    const prefixString = (Boolean(prefix) ? (prefix + separator) : '');
    const suffixString = (Boolean(suffix) ? (separator + suffix) : '');

    return prefixString + (new Date()).getTime().toString() + suffixString;
}


export const maxItems = (data: any[] = [], count?: number) => {
    if (count && count <= data.length) return data.slice(0, count)
    return data;
}

export const redirectTo = (address: string) => {
    window.location.href = address;
    return;
}

export const convertObjectToURLParams = (data: any) => {
    const params = Object.keys(data).map((key) => {
        const rc = data[key];

        if(rc !== undefined && rc !== null){
            if(typeof rc !== 'string' && rc.length){
                const arrayed_item = rc.map((value:string) => {
                    return `${key}[]=${encodeURIComponent(value)}`;
                }).join('&')

                return arrayed_item;
            }else{
                return `${key}=${encodeURIComponent(rc)}`;
            }
        }
        return '';
    }).join('&');
    // console.log(params)
    return params;
}

export const rangeOfNumbers = (start: number = 0, end: number = 0) => {
    return Array.from({ length: (end + 1 - start) }, (_, k) => k + start);
}