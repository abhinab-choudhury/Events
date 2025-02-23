

async function getRequest() {
    try {  
        const res = await fetch('https://simple-math-api.vercel.app/')
        if(!res.ok) {
            throw new Error("Failed to Fetch the Data")
        }
        return res.text()
    } catch (error) {
        console.log(error);
    }
}

// We're adding this here to disable the default caching of subsequent
// requests so that the loading UI can be displayed even after refreshing
// the page.
export const dynamic = "force-dynamic";

export default async function ssr() {
    const res = await getRequest();

    return(
        <code className="grid place-content-center min-h-screen">
            {res}
        </code>
    )
}