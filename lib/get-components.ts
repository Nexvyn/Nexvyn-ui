// Mock component data structure
export interface Component {
    name: string
    thumbnail: {
        url: string
    }
    demo: {
        url: string
    }
}

// Mock data for demo purposes
export const mockComponents: Component[] = [
    {
        name: "image-trail",
        thumbnail: {
            url: "/abstract-colorful-image-trail-effect.jpg",
        },
        demo: {
            url: "/abstract-colorful-image-trail-effect.jpg",
        },
    },
    {
        name: "text-highlighter",
        thumbnail: {
            url: "/text-highlighter-with-yellow-marker.jpg",
        },
        demo: {
            url: "/text-highlighter-with-yellow-marker.jpg",
        },
    },
    {
        name: "gravity",
        thumbnail: {
            url: "/gravity-text-effect-with-floating-letters.jpg",
        },
        demo: {
            url: "/gravity-text-effect-with-floating-letters.jpg",
        },
    },
    {
        name: "css-box",
        thumbnail: {
            url: "/3d-css-box-rotating-animation.jpg",
        },
        demo: {
            url: "/3d-css-box-rotating-animation.jpg",
        },
    },
    {
        name: "marquee-along-svg-path",
        thumbnail: {
            url: "/colorful-marquee-along-svg-path.jpg",
        },
        demo: {
            url: "/colorful-marquee-along-svg-path.jpg",
        },
    },
]

export async function getAllComponents(): Promise<Component[]> {
    return mockComponents
}
