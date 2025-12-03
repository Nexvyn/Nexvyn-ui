export async function StarsCount() {
    const data = await fetch("https://api.github.com/repos/Nexvyn/ui", {
        next: { revalidate: 86400 },
    })
    const json = await data.json()

    const formattedCount =
        json.stargazers_count >= 1000
            ? json.stargazers_count % 1000 === 0
                ? `${Math.floor(json.stargazers_count / 1000)}k`
                : `${(json.stargazers_count / 1000).toFixed(1)}k`
            : json.stargazers_count.toLocaleString()

    return (
        <span className="text-muted-foreground w-fit text-xs tabular-nums">
            {formattedCount.replace(".0k", "k")}
        </span>
    )
}
