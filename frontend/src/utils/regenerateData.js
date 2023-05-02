import { fetchQuora, fetchReddit, fetchTwitter, fetchYoutube, postNewlyGeneratedData } from "./api-calls";
import shuffleArray from "./shuffleArray";

let percentageDone = 0;

const fn = async () => {
    const bcaResults = await fetchQuora("bca");
    const mcaResults = await fetchQuora("mca");
    if (bcaResults && mcaResults)
        percentageDone = ''
    return bcaResults.concat(mcaResults);

}
const fn2 = async () => {
    const bcaResults = await fetchReddit("bachelor in computer application");
    const mcaResults = await fetchReddit("master in computer application");
    if (bcaResults && mcaResults)
        return bcaResults.concat(mcaResults);
}
const fn3 = async () => {
    const bcaResults = await fetchYoutube("bachelor in computer application")
    const mcaResults = await fetchYoutube("masters in computer applications")
    if (bcaResults && mcaResults)
        return bcaResults.concat(mcaResults);

}
const fn4 = async () => {
    const bcaResults = await fetchTwitter("bachelor in computer application");
    const mcaResults = await fetchTwitter("master in computer application");
    if (bcaResults && mcaResults) return bcaResults;
}



const regenerateData = async () => {
    const quora = await fn();
    const reddit = await fn2();
    const youtube = await fn3();
    const twitter = await fn4();
    if (quora && quora.length && reddit && reddit.length && youtube && youtube.length && twitter && twitter.length) {
        let result = shuffleArray(quora.concat(reddit).concat(youtube).concat(twitter))
        await postNewlyGeneratedData(result)
        return result;
    }

}


export default regenerateData;