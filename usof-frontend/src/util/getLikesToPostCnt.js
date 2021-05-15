export const likesCnt = (likes) => {
    let cnt = 0;
    for (let val of likes) {
        if (val.type === 'like') cnt++;
        else cnt--;
    }
    return cnt;
}