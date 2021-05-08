export const convertDate = (posts) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };

    if (!posts.length) {
        let date = new Date(posts.publish_date)
        posts.publish_date = date.toLocaleString("en-US", options);
    } else {
        for (let i = 0; i < posts.length; i++) {
            let date = new Date(posts[i].publish_date)
            posts[i].publish_date = date.toLocaleString("en-US", options);
        }
    }
}
