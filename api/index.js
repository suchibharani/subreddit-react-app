import  fetch from 'isomorphic-unfetch'


const URL = 'https://www.reddit.com/r/dataisbeautiful/';
const fetchSubreddit = async (filter) => {
    let url = `${URL}`+filter.sort+'.json?limit=10';
    url = (filter.page) ? url+'&after='+filter.page : url;
    const response = await fetch(url);
    const data = await response.json();
    var allData = data.data.children;
    var after = data.data.after;
    allData = allData.map(item => {
       
        return {
            ...item,
            voted: false,
            upvoted: false,
            downvoted: false,
            currentScore : item.data.score
        }
    });

    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return {
        posts : allData,
        after : after
    };
};

const fetchSubredditPost = async (id) => {
    const response = await fetch(`${URL}`+'comments/'+id+'.json');
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data[0].data.children;
};

export {
    fetchSubreddit,
    fetchSubredditPost
};