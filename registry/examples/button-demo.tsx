import { Button } from '@/components/Button';

export default function ButtonExample() {
    return (
        <div className="flex flex-col gap-4 p-8">
            <h2 className="text-2xl font-bold">Button Examples</h2>

            {/* Variants */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Variants</h3>
                <div className="flex flex-wrap gap-2">
                    <Button variant="default">Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Sizes</h3>
                <div className="flex flex-wrap gap-2 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">🚀</Button>
                </div>
            </div>

            {/* Effects */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Effects</h3>
                <div className="flex flex-wrap gap-2">
                    <Button effect="ringHover">Ring Hover</Button>
                    <Button effect="shine">Shine</Button>
                    <Button effect="shineHover">Shine Hover</Button>
                    <Button effect="gooeyRight">Gooey Right</Button>
                    <Button effect="gradientSlideShow">Gradient</Button>
                </div>
            </div>

            {/* States */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">States</h3>
                <div className="flex flex-wrap gap-2">
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
            </div>
        </div>
    );
}
