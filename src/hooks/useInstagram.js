import { useEffect, useState } from "react";

const url = "/.netlify/functions/instagram";

export const useInstagram = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
    }, []);
    return posts;
}

